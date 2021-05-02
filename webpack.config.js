const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const {version} = require('./package.json');

module.exports = (env, argv) => {
    const config = {
        entry: {
            main: './src/index.tsx'
        },
        output: {
            filename: 'js/[name].[chunkhash:8].js',
            path: path.resolve(__dirname, 'dist'),
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ]
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader'
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                name: '[name].[hash:8].[ext]',
                            },
                        }
                    ],
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: `Function Plotter ${version}`,
                template: 'src/index.html',
                inject: false
            }),
            new WorkerPlugin({
                globalObject: 'self'
            }),
            new ManifestPlugin({
                seed: {
                    name: 'Function Plotter',
                    version: version,
                    developer: {
                        name: 'Lin Fang',
                        url: 'https://www.plotter.fun/'
                    },
                    icons: [{
                        src: 'images/icon.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }]
                },
                filter: () => false
            })
        ],
        devServer: {
            contentBase: path.resolve('src'),
        }
    };

    if (argv.mode !== 'development') {
        config.devtool = 'none';
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            minimize: true,
            minimizer: [new TerserPlugin()]
        };
    }

    return config;
};


