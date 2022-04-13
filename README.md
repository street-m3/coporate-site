<a href="https://reverent-volhard-d99d5d.netlify.app/">
  <img src="https://reverent-volhard-d99d5d.netlify.app/images/logo.svg" align="right" height="60" title="藤岡行政書士事務所ホームページ">
</a>

# 藤岡行政書士事務所
[![Netlify Status](https://api.netlify.com/api/v1/badges/191398e6-dd2b-4294-aac2-b5320edc2cdc/deploy-status)](https://app.netlify.com/sites/reverent-volhard-d99d5d/deploys)
<img src="https://img.shields.io/badge/-Jamstack-F0047F.svg?logo=jamstack&style=popout-square">

## 概要
藤岡行政書士事務所(架空)のコーポレートサイトです。
こちらのポートフォリオは、コードメンターから発売されているデザイン素材を購入し作成しました。
コーディングを専門としていますので、ソースコードから技術能力を判断していただけますと幸いです。

URL: [藤岡行政書士事務所 | ホーム](https://reverent-volhard-d99d5d.netlify.app/)

## Languages and Tools
<img src="https://img.shields.io/badge/-Visualstudiocode-007ACC.svg?logo=visualstudiocode&style=popout-square"><img src="https://img.shields.io/badge/-Npm-CB3837.svg?logo=npm&style=popout-square"><img src="https://img.shields.io/badge/-Webpack-2b3a42.svg?logo=webpack&style=popout-square"><img src="https://img.shields.io/badge/-Html5-f2f2f2.svg?logo=html5&style=popout-square"><img src="https://img.shields.io/badge/-PostCSS-DD3A0A.svg?logo=postcss&style=popout-square"><img src="https://img.shields.io/badge/-Webcomponents.org-f2f2f2.svg?logo=webcomponents.org&style=popout-square"><img src="https://img.shields.io/badge/-Adobe%20xd-FF2BC2.svg?logo=adobe-xd&style=popout-square"><img src="https://img.shields.io/badge/-Github-181717.svg?logo=github&style=popout-square">


## 技術選定について
このポートフォリオでは、私がこれまで培ってきた技術、設計思想を全て盛り込んだ作品にしようと思いました。

昨今のフロントエンド技術では、ReactやVueなどのJavaScriptフレームワークを用いた開発が主流になってきているかと思います。その上で、ReactやVueを用いたポートフォリオにしなかった理由は、流行りに乗ることが先走ってしまい、基本的な技術の習得が追い付いていないと本末転倒になってしまうからです。
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

補足: 
お問合せフォームは現在機能しません。
ですが、内容を入力をしていただいて、送信ボタンをクリックしていただくとフォームの内容は初期化され、サンクスページへ遷移します。
送信ボタンはクリックイベントが発生したタイミングでJavaScriptによって、preventDefaultの処理をしてます。こちらの機能が動作しているかどうかを判別するため、alertが出力されます。
## Web componentsを用いた再利用性の向上

ヘッダー, フッター, サイドバー, ドロワーナビゲーションなどの共通コンポーネントは、細かく区切って再利用できるように工夫しました。
Web componentsを使うことは初めてでしたが、ReactやVueの概念と紐付けできていたため、実装自体に時間はかかりませんでした。

Web componentsでは様々な機能が存在します。
今回の実装では、HTMLを共通化するためだけですので、``<template><slot>``などは使用しませんでした。
全てのコンポーネントは、``this.attachShadow({ mode: 'closed' });``にすることで、デフォルトのスタイルシートからスタイルを当てています。
Web componentsの更なる活用ができるように現在学習を進めています。

## 環境構築
### npm-scriptsでPostCSSを導入する

こちらにまとめています。


🔗[【環境設定】npm-scriptsでPostCSSを導入する](https://github.com/street-m3/npm-scripts-postcss)

SCSSでは、globによるファイルの読み込みができなくなったことを受けて、PostCSSで実装を行いました。


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


## 反省点
- 開発初期に、Web componentsやWebpackを導入するほどの用件ではないと思い、そのまま環境構築を進めてしまいました。その甘い考えがゴールのないポートフォリオづくりになってしまうことを思い知りました。

ポートフォリオを作るにあたっても用件定義、タスクが明確で迷いのないコーディングができれば良かったと感じています。

- Gridレイアウトについては、かなり苦労しました。
ブロークングリッドを勉強するために、Gridレイアウトのチュートリアルを済ませてから取り組みました。この遠回りは時間がかかりモチベーションを維持するのに苦労しましたが、得られるものはとても大きかったと感じています。


<b>最後までお読みいただきまして、ありがとうございます🙏</b>