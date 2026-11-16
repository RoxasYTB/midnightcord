const path = require("node:path");
const webpack = require('webpack');

module.exports = {
        output: {
            hashFunction: 'xxhash64'
        },
        module: {
            rules: [
                {
                    test: /\.svelte$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            compilerOptions: {
                                dev: process.env.NODE_ENV !== 'production'
                            }
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.mjs', '.js', '.svelte', '.json'],
            conditionNames: ['svelte', '...']
        },
        plugins: [
            new webpack.DefinePlugin({
                __static: `(process.env.NODE_ENV === 'production' ? process.resourcesPath + '/assets' : ${JSON.stringify(path.resolve(__dirname, 'assets'))})`
            })
        ]
};
