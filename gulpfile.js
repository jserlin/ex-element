const gulp = require("gulp")

// gulp-sass手册地址 https://www.npmjs.com/package/gulp-sass
const sass = require('gulp-sass')(require('sass'))

const minifyCSS = require('gulp-minify-css')
const del = require('del');

gulp.task("sass", async function() {
  await del(['dist/css']);    
  return gulp.src("packages/css/**/*.scss")    
    .pipe(sass())
    .pipe(minifyCSS())    
    .pipe(gulp.dest("dist/css"))
})
