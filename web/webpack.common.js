const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        chat:    './src/chat.js',
        login:   './src/login.js'
    },
    plugins: [
        // Generate html pages
        new HtmlWebpackPlugin({
            // Use chat.html as a template
            template: 'src/chat.html',
            chunks: ['chat']
        }),
        new HtmlWebpackPlugin({
            // Use login.html as a template
            template: 'src/login.html',
            filename: 'login.html',
            chunks: ['login'],
        }),
    ],
    output: {
        filename: 'bundle_[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
//          ---------------- HTML ---------------
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
//          ---------------- CSS ---------------
            {
                test: /\.((s[ac])|c)ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translate CCS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
//          ------------ JAVASCRIPT ---------------
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
//          ------------- ASSETS ---------------
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
            },
//          ------------- FONTS ---------------
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            Assets: path.resolve(__dirname, 'assets/')
        },
    },
}
