module.exports = {
    entry: {
        "main": "./src/main.js",
    },
    output: {
        path: `${__dirname}/js`,
        filename: "[name].bundle.js",
    },
    node: { fs: 'empty' },
    devtool: 'inline-source-map'
};