var gulp = require ("gulp");
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var cache = require('gulp-cached'); //変更のあったもの(scss)
var plumber = require('gulp-plumber'); //watch中にエラー防止
var notify = require('gulp-notify');
var progeny = require('gulp-progeny');


var paths = {
  /*styles:{
    src:'./src/*.scss',
    dest:'./src',
    map:'./src/maps'
  }*/
  styles:{
    src:'./*.scss',
    dest:'./',
    map:'./maps'
  }

};

/**
 * sass
 */
gulp.task('sass', function (done) {
  gulp.src(paths.styles.src, {
      sourcemaps: true,
      /*base: './src/'*/
    })
    .pipe(cache('sass'))
    .pipe(progeny())
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      })
    )
    //.pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(sourcemaps.write())
    //.pipe(gulp.dest( paths.styles.dest ));
    .pipe(gulp.dest(paths.styles.dest, {
      sourcemaps: './maps'
    }));
  console.log("gulp sass suscess");
  done();
});




/**
 * default
 */


gulp.task('default', gulp.series(gulp.parallel("sass")),
  function (done) {
    done();
});


/**
 * watch
 */
gulp.watch(paths.styles.src, gulp.task('sass'));
