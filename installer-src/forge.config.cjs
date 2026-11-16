const { WebpackPlugin } = require('@electron-forge/plugin-webpack');
const mainConfig = require('./webpack.main.cjs');
const rendererConfig = require('./webpack.renderer.cjs');

module.exports = {
    packagerConfig: {
        asar: true,
        extraResource: ['assets']
    },
    makers: [],
    plugins: [
        new WebpackPlugin({
            mainConfig,
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: './index.html',
                        js: './src/renderer/index.js',
                        name: 'main_window',
                        nodeIntegration: true
                    }
                ]
            }
        })
    ]
};
