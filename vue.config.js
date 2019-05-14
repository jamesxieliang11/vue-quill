const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/demo/',
}
