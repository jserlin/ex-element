const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 清理文件夹
const { VueLoaderPlugin } = require('vue-loader')
const glob = require("glob");

const list = {};

async function makeList(dirPath,list){
  const files = glob.sync(`${dirPath}/**/index.js`);
  for(let file of files){
    const output = file.split(/[/.]/)[2];
    list[output] = `./${file}`;
  }
}

makeList('packages/lib',list);

console.log(list)

module.exports = {
  entry: list,
  mode: 'production', // production development
  output: {
    filename: '[name].umd.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'mui',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  externals: { // 不需要打包进来的包 配置下，比如exSwitch是基于elemntui扩展的
    Vue: 'Vue',
    'element-ui': 'element-ui',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          }
        ]
      }
    ]
  },
};