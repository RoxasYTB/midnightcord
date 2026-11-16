const path = require('node:path');
const webpack = require('webpack');

module.exports = {
        entry: './src/main/index.js',
        output: {
            hashFunction: 'xxhash64'
        },
        plugins: [
            new webpack.DefinePlugin({
                __static: `(process.env.NODE_ENV === 'production' ? process.resourcesPath + '/assets' : ${JSON.stringify(path.resolve(__dirname, 'assets'))})`
            })
        ]
};
