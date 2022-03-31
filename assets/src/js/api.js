import { singularTemplate } from './template/singular';
import { newsTicker } from './site/newsticker.js';
import { sidebarTemplate } from './template/sidebar.js';
import { globalvariables } from './env/env.js';
const NEWS_TICKER_LIMIT = 4; //ニュースティッカーを表示する件数
const SIDEBAR_CARD_LIST = 5; //サイドバーに表示する件数
const GET_PAGING_PARAMS = parseInt(new URLSearchParams(window.location.search).get("page")) || 1; //整数値を返す変数
const SIDEBAR_CARD_CALC = SIDEBAR_CARD_LIST * (GET_PAGING_PARAMS - 1);
const SIDEBAR_CARD_RECENT = `&limit=${SIDEBAR_CARD_LIST}&offset=${SIDEBAR_CARD_CALC}`;
const NEWS_TICKER_CALC = NEWS_TICKER_LIMIT * (GET_PAGING_PARAMS - 1);
const NEWS_TICKER_TOPIC = `&limit=${NEWS_TICKER_LIMIT}&offset=${NEWS_TICKER_CALC}`;
const REQUEST_KEY_ORDER = 'news?orders-=publishedAt';
const GET_PARAMETER = location.search.substring(1).split('=')[1];


/**
 * responseFetchContents: 
 * microCMSからデータを取得し成功すればJSONを返却します。追加の処理は.then()を用いて記述します。
 * @param {string} url microCMSのリクエストURLを設定します。
 * @returns 
 */
const responseFetchContents = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin', 
        headers: {
            'X-MICROCMS-API-KEY': `${process.env.XMICROCMS_API_KEY}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer-when-downgrade',
    })
    .catch(error => {
        console.warn(error);
    })
    return response.json();
}

/**
 * newsContentsMainFunctions: 
 * microCMSからデータの取り出すための初期化処理
 */
function newsContentsMainFunctions() {
    responseFetchContents(`${process.env.REQUEST_KEY_BASE}${REQUEST_KEY_ORDER}`).then((json) => {
        const data = json.contents;
        data.forEach((d) => {
            d.id === GET_PARAMETER ? _contentArticleServe(d) : '';
        });
    });
    responseFetchContents(`${process.env.REQUEST_KEY_BASE}${REQUEST_KEY_ORDER}${NEWS_TICKER_TOPIC}`).then((json) => {
        const data = json.contents;
        data.forEach((d) => {
            _newsTickerArticleServe(d);
        });
    });
    responseFetchContents(`${process.env.REQUEST_KEY_BASE}${REQUEST_KEY_ORDER}${SIDEBAR_CARD_RECENT}`).then((json) => {
        const data = json.contents;
        data.forEach((d) => {
            _sidebarContentServe(d);
        });
    });
    const limit = 2;
    const page = parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
    const offset = limit * (page - 1);
    const insertTarget = document.querySelector('[data-structure-api="0x4ebf74"]');
    if (!insertTarget) return;
    responseFetchContents(`${process.env.REQUEST_KEY_BASE}${REQUEST_KEY_ORDER}&limit=${limit}&offset=${offset}`).then(json => {
        const data = json.contents;
        data.forEach(d => {
            const article = document.createElement('article');
            article.setAttribute('class', 'p-PostList-Block-Card js-observe anim-fadein-up');
            const weekLabel = ['日', '月', '火', '水', '木', '金', '土'];
            const published = new Date(d.publishedAt);
            const getday = published.getDay();
            article.insertAdjacentHTML('afterbegin', `
                <a href="${globalvariables.siteUrl}blog/index.html?id=${d.id}">
                    <div class="p-PostList-Block-Card_Meta">
                        <time class="p-PostList-Block-Card_Meta-Date c-headline-lv4">${published.toLocaleDateString() + '(' + weekLabel[getday] + ')'}</time>
                        <span class="c-category-Label">${d.category}</span>
                    </div>
                    <div class="p-PostList-Block-Card_Title">
                        <h2 class="c-headline-lv4">${d.title}</h2>
                    </div>
                </a>
            `);
            insertTarget.appendChild(article);
        })
        const totalCount = json.totalCount;
        const pageCount = Math.ceil(totalCount / limit);
        const insertPagination = document.querySelector('[data-structure-api="ffj90rj3"]');
        const paginationRender = `
            <ol class="c-Pagination_navList">
                ${page >= 2 ? `<li class="c-Pagination_navList-Item"><a href='./index.html?page=${page - 1}' class="c-Pagination_nav-Link"><img src="../images/arrow.svg" alt="Left-Arrow" style="transform: scale(-1, 1);"></a></li>` : ""}
                ${Array.from(Array(pageCount)).map((noValue, index) => { const targetPage = index + 1; return targetPage === page ? `<li class="c-Pagination_navList-Item"><a class="c-Pagination_nav-Link" aria-current="page">${index + 1}</a></li>` : `<li><a href='./index.html?page=${index + 1}' class="c-Pagination_nav-Link">${index + 1}</a></li>`; }).join("\n")}
                ${page < pageCount ? `<li class="c-Pagination_navList-Item"><a href='./index.html?page=${page + 1}' class="c-Pagination_nav-Link"><img src="../images/arrow.svg" alt="Left-Arrow"></a></li>` : ""}
            </ol>
        `;
        insertPagination.insertAdjacentHTML('afterbegin', paginationRender);
    });
}

/**
 * _contentArticleServe:
 * ブログ記事を表示する
 * @param {object} d json.contets
 * @returns 
 */
function _contentArticleServe(d) {
    const contentArticleRoot = document.querySelector('[data-structure-api="0x4ebf75"]');
    if (!contentArticleRoot) return;
    const article = document.createElement('article');
    article.setAttribute('class', 'th-Article-Template');
    article.insertAdjacentHTML('afterbegin', singularTemplate(d));
    contentArticleRoot.appendChild(article);
}

/**
 * _sidebarContentServe:
 * サイドバー新着記事一覧用カード
 * @param {object} d json.contets
 * @returns 
 */
function _sidebarContentServe(d) {
    const sidebarContainer = document.querySelector('[data-structure-api="0x4ebf79"]');
    if (!sidebarContainer) return;
    const article = document.createElement('article');
    article.setAttribute('class', 'p-Sidebar-List-Card');
    article.dataset.thumbnail = 'true';
    article.insertAdjacentHTML('afterbegin', sidebarTemplate(d));
    sidebarContainer.appendChild(article);
}

/**
 * _newsTickerArticleServe:
 * ニュースティッカー用最新の投稿記事表示用
 * @param {object} d json.contets
 * @returns 
 */
function _newsTickerArticleServe(d) {
    const newsTickerRoot = document.querySelector('[data-structure-api="0x4ebf73"]')
    if (!newsTickerRoot) return;
    const li = document.createElement('li');
    li.setAttribute('class', 'c-newsTicker_List-Item');
    li.insertAdjacentHTML('afterbegin', newsTicker(d));
    newsTickerRoot.appendChild(li);
}

export { newsContentsMainFunctions };