const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
module.exports = {
    mode: 'production', //production or development
    entry: `./assets/src/js/main.js`,
    plugins: [
        env !== undefined
        ? new webpack.DefinePlugin({
            "process.env": JSON.stringify(env),
        })
        : new webpack.DefinePlugin({
            "process.env.REQUEST_KEY_BASE": JSON.stringify(process.env.REQUEST_KEY_BASE),
            "process.env.XMICROCMS_API_KEY": JSON.stringify(process.env.XMICROCMS_API_KEY),
        })
    ],
    
    output: {
        path: `${__dirname}/assets/dist/js`,
        filename: "main.js"
    },

    resolve: {
        extensions: ['.js', '.json', '.wasm'],
    },
};