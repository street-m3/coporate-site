'use strict';
const globalvariables = {
    siteName: '藤岡行政書士事務所',
    developmentUrl: 'http://' + location.host + '/', //環境用
    siteUrl: 'https://reverent-volhard-d99d5d.netlify.app/', //本番用
    prefixid: '#index_id',
    images: 'images/',
};

const parentIndexPath = {
    index: 'ホーム',
    service: 'サービス',
    price: '価格',
    news: 'お知らせ',
    blog: 'ブログ',
    company: '会社情報',
    faq: 'よくある質問',
    sitemap: 'サイトマップ',
    policy: 'プライバシーポリシー',
    contact: 'お問い合わせ',
};

export { globalvariables, parentIndexPath };