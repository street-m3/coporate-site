module.exports = (ctx) => ({
    plugins: {
        "postcss-import-ext-glob": {},
        "postcss-import": {},
        "postcss-mixins": {},
        "postcss-nested": {},
        "postcss-preset-env": {
            stage: 1,
            autoprefixer: {
                grid: true
            },
        },
        "postcss-simple-vars": {
            silent: true,
        },
        "postcss-extend-rule": {},
        "postcss-calc": {},
        "postcss-pxtorem": {
            rootValue: 16,
            replace: true,
            exclude: /node_modules/i,
        },
        'postcss-sorting': {
            'order': [
                'custom-properties',
                'dollar-variables',
                'declarations',
                'at-rules',
                'rules'
            ],
            'properties-order': 'alphabetical',
            'unspecified-properties-position': 'bottom'
        },
        "postcss-sort-media-queries": {}, //
        "cssnano": {
            "autoprefixer": false,
            preset: [
                'default',
                {
                    discardComments: { removeAll: false },
                },
            ],
        },
    }
});