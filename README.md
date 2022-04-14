<a href="https://reverent-volhard-d99d5d.netlify.app/">
  <img src="https://reverent-volhard-d99d5d.netlify.app/images/logo.svg" align="right" height="60" title="藤岡行政書士事務所ホームページ">
</a>

# 藤岡行政書士事務所
[![Netlify Status](https://api.netlify.com/api/v1/badges/191398e6-dd2b-4294-aac2-b5320edc2cdc/deploy-status)](https://app.netlify.com/sites/reverent-volhard-d99d5d/deploys)
<a href="https://jamstack.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Jamstack-F0047F.svg?logo=jamstack&style=popout-square"></a>

## 概要
藤岡行政書士事務所(架空)のコーポレートサイトです。
こちらのポートフォリオは、コードメンターから発売されているデザイン素材を購入し作成しました。
コーディングを専門としていますので、ソースコードから技術能力を判断していただけますと幸いです。

### 免責
<small>

- お使いになるデバイスやソフトウェアバージョンによってうまく動作しない場合がございます。

- お使いのデバイスでウイルス感染などが原因によるデータ漏洩、第三者による意図的なソースコード埋め込み、改変、コピー、その他データ損失、不具合、不都合、エラーなどが発生しましても当方は一切責任は負わないものとします。

あらかじめご了承ください。
</small>
<br>
URL: [藤岡行政書士事務所 | ホーム](https://reverent-volhard-d99d5d.netlify.app/)

## Languages and Tools
<a href="https://azure.microsoft.com/ja-jp/products/visual-studio-code/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Visualstudiocode-007ACC.svg?logo=visualstudiocode&style=popout-square"></a><a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Npm-CB3837.svg?logo=npm&style=popout-square"></a><a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Webpack-2b3a42.svg?logo=webpack&style=popout-square"></a><a href="https://momdo.github.io/html/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Html5-f2f2f2.svg?logo=html5&style=popout-square"></a><a href="https://postcss.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-PostCSS-DD3A0A.svg?logo=postcss&style=popout-square"></a><a href="https://www.webcomponents.org/"  target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Webcomponents.org-f2f2f2.svg?logo=webcomponents.org&style=popout-square"></a><a href="https://www.adobe.com/jp/products/xd.html" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Adobe%20xd-FF2BC2.svg?logo=adobe-xd&style=popout-square"></a><a href="https://github.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Github-181717.svg?logo=github&style=popout-square"></a>


## 技術選定について
このポートフォリオでは、私がこれまで培ってきた技術、設計思想を全て盛り込んだ作品にしようと思いました。

昨今のフロントエンド技術では、ReactやVueなどのJavaScriptフレームワークを用いた開発が主流になってきているかと思います。その上で、ReactやVueを用いたポートフォリオにしなかった理由は、流行りに乗ることが先走ってしまい、基本的な技術の習得が追い付いていないと本末転倒になってしまうと思ったからです。
フレームワークを通した実装からでは、基本的な技術の習得ができているかを判断していただくのは困難と考えます。

そのため、このポートフォリオではフレームワークやライブラリを使わず、VanillaJSとWeb componentsで実装することに決めました。

## 実装方針

ブログ機能やコンタクトフォームなどの実装は全てフロントエンドで行うため、WordPress(PHP,SQL)は使用せず、HTML (Living Standard), PostCSS, JavaScript, microCMS APIを活用したJAMstackで開発します。

## 機能
1. 投稿記事表示機能
2. ページネーション
3. SNSシェアボタンの設置
4. お問合せフォーム (Googleフォーム)
5. フォームバリデーション
6. パンくずリスト
7. モーダルウインドウ(コンセプトムービーの表示)
8. ニュースティッカー

### お問合せフォームについて
フォームバリデーションは実装済みです。
お問合せフォームはデータ送信機能はありません。

そのため以下をご確認の上、お試しください。

[免責事項をご確認ください](#免責)

- フォームを通常通りご入力します。
- 入力後、送信ボタンをクリックしますと、JavaScriptによってフォームの内容は初期化され、データ送信機能がストップします。フォームの内容は送信されません。
- 「送信しました」とアラートが出力されます。
- 完了ページへ遷移します。

**データ送信がストップしているかをご確認していただくためにアラートを出力しています。**
## Web componentsを用いた再利用性の向上

Header, Footer, Sidebar, Drawer, Breadcrumbsなどの共通コンポーネントは、細かく区切って再利用できるように工夫しました。
Web componentsを使うことは初めてでしたが、ReactやVueの概念と紐付けできていたため、実装自体に時間はかかりませんでした。

Web componentsでは様々なパターンが存在します。
今回の実装では、HTMLを共通化するためだけですので、``<template><slot>``などは使用しませんでした。
全てのコンポーネントは、``this.attachShadow({ mode: 'closed' });``にすることで、デフォルトのスタイルシートからスタイルを当てています。
Web componentsの更なる活用ができるように現在学習を進めています。

## 環境構築
### npm-scriptsでPostCSSを導入する

こちらにまとめています。


🔗[【環境設定】npm-scriptsでPostCSSを導入する](https://github.com/street-m3/npm-scripts-postcss)

SCSSでは、フォルダ単位でのファイルの読み込みができなくなったことを受けて、PostCSSで実装を行いました。


### Webpack
Webpackの導入は初めての経験でした。Webpackは、プラグインの選定からwebpack.config.js落とし込むまでの流れがどうしても時間がかかるなど、学習コストがやや高い印象を現在も持っています。

なので、とてもシンプルな設定構成です。

```` webpack.config.js
const Dotenv = require('dotenv-webpack');
module.exports = {
    mode: 'production', //production or development
    entry: `./assets/src/js/main.js`,
    plugins: [
        new Dotenv()
    ],
    
    output: {
        path: `${__dirname}/assets/dist/js`,
        filename: "main.js"
    },

    resolve: {
        extensions: ['.js', '.json', '.wasm'],
    },
};
````


npm-scriptsに全てのタスクを埋め込んでいたおかげで、Webpackにloaderやバージョンによる変更などで書き換える箇所が減るなどのメリットは得られそうです。

## 改善点
### 要件定義とタスク化
要件定義とタスク管理の重要性をとても感じました。
今までもコーディングはタスク分割はしていたのですが、このポートフォリオでは、JAMstackやGridレイアウトなど新しいことも学びながら進めていたこともあり、タスク管理が少し甘く、要件定義もあまりしないままになっていました。
初期の段階では、Web componentsやWebpackを導入するほどではないと思い、そのまま環境構築と開発を進めてしまいました。

**そうならないように気をつけたいこと**

- どんな機能を実装したいのか
- 完成までの日数を決めること
- 無理のないスケジュールでタスクを振る

少なくとも上記を深く考えて実装に踏み切ることができていたら、もっと時間を短縮できたと思います。ゴールのないポートフォリオづくりになってしまわないように今後気をつけたいと思います。

### 今後必要になりそうな技術は一度でもいいから触れてみる

フロントエンド技術の進化や移り変わりが早いことは重々承知しています。
その進化する技術において、「今は困っていないからやらなくていい」という考えも一利あると思っています。ただそれが言い訳になってしまうのはとても勿体無いことだとも思っています。
私はこれまで、CSSプロパティの`display: grid;`の概念がとても難しく触れてきませんでした。
今回のポートフォリオを作るにあたっては、全て`display: flex;`でレイアウトするつもりでしたが、見込みが甘く実装にすごく時間を費やしていましました。
Gridを学んでからは、いろんな気づきを得られたので「早く学んでおけば良かったな🤔」と思っています。

<b>最後までお読みいただきまして、ありがとうございました🙏</b>