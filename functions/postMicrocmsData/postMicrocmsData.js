const axios = require('axios');

const headers = {
    "Access-Control-Allow-Origin": "*", //デプロイ後のサイトURLを指定する
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
};

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }


    try {
        const { data } = await axios.get(process.env.REQUEST_KEY_BASE, {
            headers: {
                "Content-Type": "application/json",
                "X-WRITE-API-KEY": `${process.env.XMICROCMS_API_KEY}`,
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers
        }

    } catch (error) {
        const { statusCode, statusText, headers, data } = error.response

        return {
            statusCode: statusCode,
            body: JSON.stringify({ statusCode, statusText, headers, data }),
        }
    }
}

module.exports = { handler }