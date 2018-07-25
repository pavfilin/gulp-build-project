var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    run = require('run-sequence'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require("css-mqpacker"),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    minify = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');

var path = {

    src: {
      html: 'app/*.html',
      style: 'app/sass/style.scss',
      fonts: 'app/fonts/**/*.{ttf,woff,woff2}',
      scripts: 'app/js/**/script.js',
      img: 'app/img/**/*.{gif,png,jpg}',
      svg: 'app/svg/**/*.svg'
    },

    dest: {
      html: './public',
      style: './public/css/',
      fonts: './public/fonts/',
      scripts: './public/js/',
      img: './public/img/',
      svg: './public/svg/'

    },

    watch: {
      html: 'app/*.html',
      style: 'app/sass/**/*.scss',
      fonts: 'app/fonts/**/*.{ttf,woff,woff2}',
      scripts: 'app/js/**/*.js',
      img: 'app/img/**/*.{gif,png,jpg}',
      svg: 'app/svg/**/*.svg'
    },

    server: './public',
    clean: 'public'
};

gulp.task('public', function(fn) {
  run(
    'clean',
    'html',
    'style',
    'fonts',
    'script',
    'images',
    'svg',
    fn
  );
});

gulp.task('clean', function () {
	return del(path.clean);
});

gulp.task('html', function () {
  return gulp.src(path.src.html)
  .pipe(gulp.dest(path.dest.html));
});

gulp.task('fonts', function() {
  return gulp.src(path.src.fonts)
  .pipe(gulp.dest(path.dest.fonts))
});

gulp.task('style', function () {
  return gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
    	autoprefixer({browsers: [
    		"last 1 versions",
    		"last 2 Chrome versions",
    		"last 2 Firefox versions",
    		"last 2 Opera versions",
    		"last 2 Edge versions"
    	]}),
      mqpacker({sort: true})
    ]))
    .pipe(gulp.dest(path.dest.style))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(path.dest.style))
    .pipe(browserSync.stream());
});

gulp.task('script', function () {
  return gulp.src(path.src.scripts)
    .pipe(gulp.dest(path.dest.scripts))
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest(path.dest.scripts))
    .pipe(browserSync.stream());
});

gulp.task('images', function () {
	return gulp.src(path.src.img)
  .pipe(imagemin([
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 3})
  ]))
	.pipe(gulp.dest(path.dest.img));
});

gulp.task('svg', function () {
  return gulp.src(path.src.svg)
  .pipe(gulp.dest(path.dest.svg))
  .pipe(svgmin())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('symbols.svg'))
  .pipe(gulp.dest(path.dest.svg));
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: path.server
    }
  });

  gulp.watch(path.watch.html, ['html']).on('change', browserSync.reload);
  gulp.watch(path.watch.style, ['style']);
  gulp.watch(path.watch.fonts, ['fonts']);
  gulp.watch(path.watch.scripts, ['script']).on('change', browserSync.reload);
  gulp.watch(path.watch.img, ['images']).on('change', browserSync.reload);
  gulp.watch(path.watch.svg, ['svg']).on('change', browserSync.reload);
});
