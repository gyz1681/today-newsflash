// postcss.config.js
module.exports = {
    plugins: {

        'postcss-pxtorem': {
            rootValue: 37.5,
            propList: ['*'],
        },
    },
    exclude: 'github-markdown'
};