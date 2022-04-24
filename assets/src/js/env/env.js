'use strict';
const presets = {
    siteName: '藤岡行政書士事務所',
    developmentUrl: 'http://' + location.host + '/', //環境用
    siteUrl: 'https://reverent-volhard-d99d5d.netlify.app/', //本番用
    prefixid: '#index_id',
    images: 'images/',
};

const { REQUEST_KEY_BASE, XMICROCMS_API_KEY } = process.env;

if (REQUEST_KEY_BASE === undefined || XMICROCMS_API_KEY === undefined) {
    throw new Error("Could not retrieve environment variables. Please review your settings....(;_;)");
}

/**
 * { string } URL
 * @returns 
 */
const requestURLconnected = () => {
    if (typeof REQUEST_KEY_BASE === "string") return REQUEST_KEY_BASE;
}

/**
 * { string } API_KEY
 * @returns 
 */
const requestAPIconnected = () => {
    if (typeof XMICROCMS_API_KEY === "string") return XMICROCMS_API_KEY;
}

export { presets , requestURLconnected, requestAPIconnected};