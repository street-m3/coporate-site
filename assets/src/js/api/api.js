import { accessManagement, BASE_ADJUST_API } from './../env/env';
const NEWS_TICKER_LIMIT = 4; //ニュースティッカーを表示する件数
const SIDEBAR_CARD_LIST = 5; //サイドバーに表示する件数
const GET_PAGING_PARAMS = parseInt(new URLSearchParams(window.location.search).get("page")) || 1; //整数値を返す変数
const SIDEBAR_CARD_CALC = SIDEBAR_CARD_LIST * (GET_PAGING_PARAMS - 1);
const SIDEBAR_CARD_RECENT = `&limit=${SIDEBAR_CARD_LIST}&offset=${SIDEBAR_CARD_CALC}`;
const NEWS_TICKER_CALC = NEWS_TICKER_LIMIT * (GET_PAGING_PARAMS - 1);
const NEWS_TICKER_TOPIC = `&limit=${NEWS_TICKER_LIMIT}&offset=${NEWS_TICKER_CALC}`;
const REQUEST_KEY_ORDER = 'news?orders-=publishedAt';
const GET_PARAMETER = location.search.substring(1).split('=')[1];
const PAGINATION_LIMIT = 2;
const PAGINATION_RADIX = parseInt(new URLSearchParams(window.location.search).get("page")) || 1;;
const PAGINATION_OFFSET = PAGINATION_LIMIT * (PAGINATION_RADIX - 1);


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
                'X-MICROCMS-API-KEY': `${accessManagement(BASE_ADJUST_API)}`,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer-when-downgrade',
        })
        .catch(error => {
            console.warn(error);
        })
    return response.json();
}

export { responseFetchContents, SIDEBAR_CARD_RECENT, NEWS_TICKER_TOPIC, REQUEST_KEY_ORDER, GET_PARAMETER, PAGINATION_LIMIT, PAGINATION_RADIX, PAGINATION_OFFSET };