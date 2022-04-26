<a href="https://reverent-volhard-d99d5d.netlify.app/">
  <img src="https://reverent-volhard-d99d5d.netlify.app/images/logo.svg" align="right" height="60" title="藤岡行政書士事務所ホームページ">
</a>

# 藤岡行政書士事務所
[![Netlify Status](https://api.netlify.com/api/v1/badges/191398e6-dd2b-4294-aac2-b5320edc2cdc/deploy-status)](https://app.netlify.com/sites/reverent-volhard-d99d5d/deploys)
<a href="https://jamstack.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Jamstack-F0047F.svg?logo=jamstack&style=popout-square"></a>

## 概要
藤岡行政書士事務所（架空）のコーポレートサイトです。
こちらのポートフォリオは、コードメンターから発売されているデザイン素材を購入し作成しました。
コーディングを専門としていますので、ソースコードから技術能力を判断していただけますと幸いです。

URL: [藤岡行政書士事務所 | ホーム](https://reverent-volhard-d99d5d.netlify.app/)


## Languages and Tools
<a href="https://azure.microsoft.com/ja-jp/products/visual-studio-code/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Visualstudiocode-007ACC.svg?logo=visualstudiocode&style=popout-square"></a><a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Npm-CB3837.svg?logo=npm&style=popout-square"></a><a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Webpack-2b3a42.svg?logo=webpack&style=popout-square"></a><a href="https://momdo.github.io/html/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Html5-f2f2f2.svg?logo=html5&style=popout-square"></a><a href="https://postcss.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-PostCSS-DD3A0A.svg?logo=postcss&style=popout-square"></a><a href="https://www.webcomponents.org/"  target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Webcomponents.org-f2f2f2.svg?logo=webcomponents.org&style=popout-square"></a><a href="https://www.adobe.com/jp/products/xd.html" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Adobe%20xd-FF2BC2.svg?logo=adobe-xd&style=popout-square"></a><a href="https://github.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Github-181717.svg?logo=github&style=popout-square"></a>


## 技術選定について
このポートフォリオでは、私がこれまで培ってきた技術、設計思想を盛り込んだ作品にしようと思いました。

昨今のフロントエンド技術では、ReactやVueなどのJavaScriptフレームワークを用いた開発が主流になってきているかと思います。その上で、ReactやVueを用いたポートフォリオにしなかった理由は、流行りに乗ることが先走ってしまい、基本的な技術の習得が追い付いていないと本末転倒になってしまうと思ったからです。
フレームワークを通した実装からでは、基本的な技術の習得ができているかを判断していただくのは困難と考えます。

そのため、このポートフォリオではフレームワークやライブラリを使わず、VanillaJSとWeb componentsで実装することに決めました。


## 実装方針
ブログ機能やコンタクトフォームなどの実装はすべてフロントエンドで行うため、WordPress(PHP,SQL)は使用せず、HTML (Living Standard), PostCSS, JavaScript, microCMS APIを活用したJAMstackで開発します。


## 機能
1. 投稿記事表示機能
2. ページネーション
3. SNSシェアボタンの設置
4. お問合せフォーム（Googleフォーム）
5. フォームバリデーション
6. パンくずリスト
7. モーダルウインドウ（コンセプトムービーの表示）
8. ニュースティッカー


### お問合せフォームについて
フォームバリデーションは実装済。
お問合せフォームにデータ送信機能はありませんので、ご了承ください。


## Web componentsを用いた再利用性の向上
Header, Footer, Sidebar, Drawer, Breadcrumbsなどの共通コンポーネントは、細かく区切って再利用できるように工夫しました。
Web componentsの使用経験はありませんでしたが、ReactやVueの概念と紐付けできていたため、実装自体に時間はかかりませんでした。

Web componentsはさまざまな実装パターンが存在します。
今回の実装では、HTMLを共通化するためだけですので、``<template><slot>``は使用していません。
各コンポーネントは、``this.attachShadow({ mode: 'closed' });``にすることで、デフォルトのスタイルシートからスタイルを当てています。
Web componentsの更なる活用ができるように現在学習を進めています。

## 環境構築
### npm-scriptsでPostCSSを導入する
静的サイトのコーディング環境で、Sass(SCSS)を利用することは、デファクトスタンダードと言えるかと思います。
しかし、フォルダー単位でのファイルの読み込みができず、体感的に手間が発生しているのも事実です。
Sass(SCSS)のようなオールインワンパッケージを用意するのではなく、必要に応じて機能を追加することのできる「PostCSS」を導入しました。

導入の背景やソースコードは、こちらにまとめています。

🔗[【環境設定】npm-scriptsでPostCSSを導入する](https://github.com/street-m3/npm-scripts-postcss)


### webpack
webpackの導入ははじめてでした。webpackは、プラグインの選定からwebpack.config.js落とし込むまで、学習コストがやや高い印象を現在も持っています。

今回は、単純にJSファイルをバンドルするためだけですので、シンプルな構成です。

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

#### 余談
npm-scriptsにすべてのタスクを埋め込んでいたおかげで、webpackにloaderやバージョンによる変更などで書き換える箇所が減るなどのメリットは得られそうです。


## 改善点
### 要件定義とタスク化
要件定義とタスク管理の重要性をとても感じました。
今までもコーディングはタスク分割を行い、作業の優先度を確認しながら進行していました。
このポートフォリオでは、JAMstackやGridレイアウトなど新しいことも学びながら進めていたため、とても時間がかかりました


**そうならないように気をつけたいこと**

- どんな機能を実装したいのか
- 完成までの日数を決めること
- 無理のないスケジュールでタスクを振る

少なくとも上記を深く考えて実装に踏み切ることができていたら、もっと時間を短縮できたと思います。ゴールのない建築物になってしまわないように今後気をつけたいと思います。


###今後必要になりそうな技術は一度でもいいから触れてみる
フロントエンド技術の進化や移り変わりが早いことは重々承知しています。
その進化する技術において、「今は困っていないから習得する必要がない」という考えも一利あると思っています。ただそれが言い訳になってしまうのはとても勿体ないことだとも思っています。
なるべく新しいツールを使ってみたり、好きな言語の進化に触れるなど完全に理解することができなくても、それが後々、「なんかやったことあるなあ!🤔」って思えるタイミングが出てきたら良いのかなと思っています。


**最後までお読みいただきまして、ありがとうございました🙏**
