const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs');

const info = require("./package.json")


module.exports = {
    entry: './src/tooltip.js',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'tooltip.css'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false
        }),
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin(() => {
            let license = fs.readFileSync('./LICENSE', 'utf-8')
            return `@preserve\n${info.name}, ${info.version}\n\n${license}`
        }),
    ],
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'

            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 25000,
                        },
                    },
                ]
            }
        ]
    },
    output: {
        filename: "aristotletooltip.min.js",
        library: "aristotleTooltip",
        libraryExport: 'default',
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist"),
    },
};
