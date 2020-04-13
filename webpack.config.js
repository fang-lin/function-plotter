const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { version } = require('./package.json');

module.exports = (env, argv) => {
    const config = {
        entry: './src/index.tsx',
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
                title: `Function Diagram ${ version }`,
                template: 'src/index.html',
                inject: false
            }),
            new WorkerPlugin({
                globalObject: 'self'
            }),
            new ManifestPlugin({
                seed: {
                    /* eslint-disable @typescript-eslint/camelcase */
                    name: 'Function Diagram',
                    version: version,
                    developer: {
                        name: 'Lin Fang',
                        url: 'http://www.fanglin.me'
                    },
                    icons: [{
                        src: 'images/icon.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }]
                    /* eslint-enable @typescript-eslint/camelcase */
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
            minimize: true,
            minimizer: [new TerserPlugin()]
        };
    }

    return config;
};


