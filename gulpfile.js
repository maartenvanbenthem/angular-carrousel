var gulp = require('gulp')
var compass = require('gulp-compass');
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
 
gulp.task('js', function () {
  gulp.src(['src/**/main.js', 'src/**/module.js', 'src/**/services.js', 'src/**/controllers.js', 'src/**/directives.js', 'src/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js/'))
})

gulp.task('compass', function () {
    gulp.src('./sass/*.scss')
    	.pipe(sourcemaps.init())
        .pipe(compass({
	      config_file: './config.rb',
	      css: 'stylesheets',
	      sass: 'sass'
	    }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./stylesheets'));
});

gulp.task('watch', ['js','compass'], function () {
  gulp.watch('src/**/*.js', ['js'])
  gulp.watch('sass/**/*.scss', ['compass'])
})

gulp.task('default', ['js','compass'], function() {

});