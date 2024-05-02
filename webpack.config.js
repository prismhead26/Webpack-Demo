const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    // sets the mode to development which will enable some development features and provide a better debugging experience
    // also sets the process.env.NODE_ENV to development and removes the console error messages during the build
    mode: 'development',
    // entry: the entry point of the application accessing the src/index.js file as the webpack entry point
    entry: {
        // the key is the name of the bundle and the value is the path to the entry file
        // the path.resolve() method is used to resolve the path to the entry file
        bundle: path.resolve(__dirname, '/src/index.js'),
    },
    // output: the output configuration for the webpack build
    output: {
        // the path to the output directory which is the dist folder
        path: path.resolve(__dirname, 'dist'),
        // the name of the output file which is in this case bundle[hash].js
        // default is main.js
        // the [name] placeholder is used to keep the original name of the entry file
        filename: '[name][contenthash].js',
        // the clean option is set to true to clean the dist folder before each build
        clean: true,
        // the assetModuleFilename is set to [name][ext] to keep the original name of the asset files
        assetModuleFilename: '[name][ext]',
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    /**
     * loaders: the loaders configuration for the webpack build
     * the loaders are used to process the files before they are added to the bundle
     * the loaders are defined in the rules array
     */

    // module is an object that contains the rules array
    module: {
        // rules: an array of objects that define the loaders to be used
        rules: [
            {
                // test: a regular expression that matches the file extension of the files to be processed
                test: /\.scss$/,
                // npm i -D style-loader css-loader sass sass-loader
                // the use array is used to define the loaders to be used
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                // test: a regular expression that matches the file extension of the files to be processed
                test: /\.js$/,
                // exclude: an array of directories or files to be excluded from the processing
                exclude: /node_modules/,
                // the use object is used to define the loader to be used
                // npm i -D babel-loader @babel/core @babel/preset-env
                use: {
                    // loader: the name of the loader to be used
                    loader: 'babel-loader',
                    // options: an object that contains the options for the loader
                    options: {
                        // setting the presets option to @babel/preset-env to enable to use of the latest Js features
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                // testing for image files
                test: /\.(png|svg|jpg|jpeg|gif$)/i,
                // type: the type of the asset to be processed
                type: 'asset/resource',
            }
        ]
    },
    // plugins: an array of plugins to be used in the webpack build
    plugins: [
        // the HtmlWebpackPlugin is used to generate the index.html file in the dist folder
        new HtmlWebpackPlugin({
            // the title option is used to set the title of the generated html file
            // the title can be accessed in the template file using the ejs syntax <%= htmlWebpackPlugin.options.title %>
            title: 'Webpack App',
            // the filename option is used to set the name of the generated html file
            filename: 'index.html',
            // the template option is used to set the path to the template file
            template: path.resolve(__dirname, '/src/template.html')
        }),
        // the BundleAnalyzerPlugin is used to generate a report of the bundle size
        
        new BundleAnalyzerPlugin(),
    ]
}