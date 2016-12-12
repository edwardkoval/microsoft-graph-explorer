const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');

const paths = {
  scripts: [
      "bower_components/hello/dist/hello.all.js",
      "bower_components/hello/dist/hello.js",
      "scripts/api-explorer-init.js",
      "scripts/api-explorer-helpers.js",
      "scripts/api-explorer-app.js",
      "scripts/api-explorer-svc.js",
      "scripts/loc_strings.js",
      "scripts/**/*.js"
    ],
    stylesheets: [
      "bower_components/components-font-awesome/css/font-awesome.min.css",
      "bower_components/angular-material/angular-material.min.css",
      "styles/api-explorer.css"
    ]
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('minscripts', ['scripts'], function() {
  return gulp.src(paths.scripts)
    .pipe(concat('all.js'))
    // .pipe(minify({
    //     ext:{
    //         src:'.js',
    //         min:'.min.js'
    //     }}))
    .pipe(gulp.dest('build/min'));
});

gulp.task('fonts', ['clean'], function() {
  return gulp.src(['./bower_components/components-font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}'])
    .pipe(gulp.dest('fonts/'));
});

gulp.task('stylesheets', ['clean'], function() {
  return gulp.src(paths.stylesheets)
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts', 'minscripts', 'stylesheets']);
  gulp.watch(paths.stylesheets, ['scripts', 'stylesheets']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'stylesheets', 'fonts', 'minscripts']);