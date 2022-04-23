'use strict';
const fetch = require("node-fetch");

const headers = {
    "Access-Control-Allow-Origin": "*", //デプロイ後のサイトURLを指定する
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
};

exports.handler = async (event, context) => {

    // POST以外は許可しない
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    // 寄稿記事内容をjsonで取得
    const requestBody = JSON.parse(event.body)

    const requestUrl = process.env.CMS_POST_URL;
    const dataResponse = await fetch(requestUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XMICROCMS_API_KEY": process.env.XMICROCMS_API_KEY,
        },
        // 寄稿記事内容をmicroCMSにPOST
        body: JSON.stringify({
            content: requestBody.content
        }),
    });

    // 結果を返す
    const responceData = await dataResponse.json();
    return {
        statusCode: 200,
        // body: JSON.stringify(responceData),
        body: JSON.stringify({ message: "Hello World" }),
        headers
    };
}