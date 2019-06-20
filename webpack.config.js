const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: "source-map",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // changed from extensions: [".js", ".jsx"]
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' } },
            { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' } },
            // addition - add source-map support
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },
};