const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const paths = {
  styles: {
    src: './public/stylesheets/scss/**/*.scss',
    dest: './dist/css/'
  },
  scripts: {
    src: './public/scripts/js/**/*.js',
    dest: './dist/scripts/'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: "Gulp error in " + err.plugin,
          message: err.toString()
        })(err);
      }
    }))
    .pipe(concat('styles.scss'))
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(notify({ message: 'Styles task complete' }));
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: "Gulp error in " + err.plugin,
          message: err.toString()
        })(err);
      }
    }))
    .pipe(concat('script.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(notify({ message: 'Scripts task complete' }));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

exports.watch = watch;
exports.default = gulp.series(styles, scripts);