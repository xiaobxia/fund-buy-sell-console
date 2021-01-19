const gulpfile = require('gulp')
const iconfont = require('gulp-iconfont')
const iconfontCss = require('gulp-iconfont-css')
gulpfile.task('iconfont', function () {
  const svg = ['./src/assets/svg/*/*.svg', './src/assets/svg/*.svg']
  const fontName = 'iconfont-newgrand'
  gulpfile.src(svg).pipe(iconfontCss({
    cssClass: 'icon-newgrand',
    fontName: fontName,
    targetPath: 'font.css', // 生成的css样式的路径
    fontPath: '' // 生成的iconfont的路径
  })).pipe(iconfont({
    fontName: fontName, // required
    prependUnicode: true, // recommended option
    formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'], // default, 'woff2' and 'svg' are available
    timestamp: new Date().getTime(),
    normalize: true,
    fontHeight: 1001
  })).pipe(gulpfile.dest('./src/styles/font-newgrand'))
})
gulpfile.task('default', gulpfile.series('iconfont'))
