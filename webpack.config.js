module.exports = {
    mode: 'development',
    entry: `./assets/src/js/main.js`,

    output: {
        path: `${__dirname}/assets/dist/js`,
        filename: "main.js"
    },

    resolve: {
        extensions: ['.js', '.json', '.wasm'],
    },
};