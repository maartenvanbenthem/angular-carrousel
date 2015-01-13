var gulp = require('gulp')
var compass = require('gulp-compass');
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
 
gulp.task('build', function () {
    gulp.src('dev/sass/*.scss')
        .pipe(compass({
	      config_file: './config.rb',
	      css: 'dist/stylesheets',
	      sass: 'dev/sass'
	    }))
	gulp.src(['dev/sass/*.scss'])
        .pipe(gulp.dest('./dist/sass'));
    gulp.src(['dev/js/DmCarrousel.js'])
      .pipe(concat('DmCarrousel.js'))
    .pipe(gulp.dest('./dist/js'))
});


gulp.task('watch', ['build'], function () {
  gulp.watch('dev/**/*.js', ['build'])
  gulp.watch('dev/**/*.scss', ['build'])
})

gulp.task('default', ['build'], function() {

});