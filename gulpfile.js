var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
 
gulp.task('js', function () {
  gulp.src(['src/**/main.js', 'src/**/module.js', 'src/**/services.js', 'src/**/controllers.js', 'src/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js/'))
})

gulp.task('watch', ['js'], function () {
  gulp.watch('src/**/*.js', ['js'])
})