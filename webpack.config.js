const path = require('path');
module.exports = {
    // 入口文件
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                // 一个用以匹配 loaders 所处理文件的拓展名的正则表达式（必须）
                test: /\.js$/,
                // loader 的名称
                loader: 'babel-loader',
                // include/exclude：手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）
                include: path.join(__dirname, '..', 'src')
            },
            {
                // 正则匹配css结尾的文件
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss|sass$/,
                use: ['style-loader', 'css-loader','sass-loader']
            }
        ]
    },
    devServer: {
        // 本地服务器所加载的文件目录
        contentBase: './dist',
        port: 8088,
        // 文件修改后实时刷新
        inline: true,
        // 不跳转
        historyApiFallback: true
    }
}