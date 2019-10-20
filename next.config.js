const withSass = require("@zeit/next-sass");

module.exports = withSass({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[path].[local].[hash:base64:5]",
        camelCase: true,
    },
});