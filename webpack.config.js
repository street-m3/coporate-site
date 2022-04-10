const Dotenv = require('dotenv-webpack');
module.exports = {
    mode: 'development', //production or development
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