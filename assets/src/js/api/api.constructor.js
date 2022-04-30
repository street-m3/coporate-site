import { singularTemplate } from './../template/singular';
import { newsTicker } from './../site/newsticker';
import { sidebarTemplate } from './../template/sidebar.js';
import { presets, accessManagement, BASE_ADJUST_ADR } from '../env/env';
import { responseFetchContents, SIDEBAR_CARD_RECENT, NEWS_TICKER_TOPIC, REQUEST_KEY_ORDER, GET_PARAMETER, PAGINATION_LIMIT, PAGINATION_RADIX, PAGINATION_OFFSET } from './api';

/**
 * _contentArticleServe:
 * ブログ記事を表示する
 * @param {object} d json.contents
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
 * @param {object} d json.contents
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
 * @param {object} d json.contents
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


/**
 * contentAPIasyncFunctions: 
 * microCMSからデータの取り出すための初期化処理
 */
function contentAPIasyncFunctions() {
    responseFetchContents(`${accessManagement(BASE_ADJUST_ADR)}${REQUEST_KEY_ORDER}`).then((json) => {
        const data = json.contents;
        data.forEach((d) => {
            d.id === GET_PARAMETER ? _contentArticleServe(d) : '';
        });
    });
    responseFetchContents(`${accessManagement(BASE_ADJUST_ADR)}${REQUEST_KEY_ORDER}${NEWS_TICKER_TOPIC}`).then((json) => {
        const data = json.contents;
        data.forEach((d) => {
            _newsTickerArticleServe(d);
        });
    });
    responseFetchContents(`${accessManagement(BASE_ADJUST_ADR)}${REQUEST_KEY_ORDER}${SIDEBAR_CARD_RECENT}`).then((json) => {
        const data = json.contents;
        data.forEach((d) => {
            _sidebarContentServe(d);
        });
    });
    responseFetchContents(`${accessManagement(BASE_ADJUST_ADR)}${REQUEST_KEY_ORDER}&limit=${PAGINATION_LIMIT}&offset=${PAGINATION_OFFSET}`).then(json => {
        const paginationContainer = document.querySelector('[data-structure-api="0x4ebf74"]');
        if (!paginationContainer) return;
        const data = json.contents;
        data.forEach(d => {
            const article = document.createElement('article');
            article.setAttribute('class', 'p-PostList-Block-Card js-observe anim-fadein-up');
            const weekLabel = ['日', '月', '火', '水', '木', '金', '土'];
            const published = new Date(d.publishedAt);
            const getday = published.getDay();
            article.insertAdjacentHTML('afterbegin', `
                <a href="${presets.siteUrl}blog/index.html?id=${d.id}">
                    <div class="p-PostList-Block-Card_Meta">
                        <time class="p-PostList-Block-Card_Meta-Date c-headline-lv4">${published.toLocaleDateString() + '(' + weekLabel[getday] + ')'}</time>
                        <span class="c-category-Label">${d.category}</span>
                    </div>
                    <div class="p-PostList-Block-Card_Title">
                        <h2 class="c-headline-lv4">${d.title}</h2>
                    </div>
                </a>
            `);
            paginationContainer.appendChild(article);
        })
        const totalCount = json.totalCount;
        const pageCount = Math.ceil(totalCount / PAGINATION_LIMIT);
        const insertPagination = document.querySelector('[data-structure-api="ffj90rj3"]');
        const paginationRender = `
            <ol class="c-Pagination_navList">
                ${PAGINATION_RADIX >= 2 ? `<li class="c-Pagination_navList-Item"><a href='./index.html?page=${PAGINATION_RADIX - 1}' class="c-Pagination_nav-Link"><img src="../images/arrow.svg" alt="Left-Arrow" style="transform: scale(-1, 1);"></a></li>` : ""}
                ${Array.from(Array(pageCount)).map((noValue, index) => { const targetPage = index + 1; return targetPage === PAGINATION_RADIX ? `<li class="c-Pagination_navList-Item"><a class="c-Pagination_nav-Link" aria-current="page">${index + 1}</a></li>` : `<li><a href='./index.html?page=${index + 1}' class="c-Pagination_nav-Link">${index + 1}</a></li>`; }).join("\n")}
                ${PAGINATION_RADIX < pageCount ? `<li class="c-Pagination_navList-Item"><a href='./index.html?page=${PAGINATION_RADIX + 1}' class="c-Pagination_nav-Link"><img src="../images/arrow.svg" alt="Left-Arrow"></a></li>` : ""}
            </ol>
        `;
        insertPagination.insertAdjacentHTML('afterbegin', paginationRender);
    });
}

export { contentAPIasyncFunctions };