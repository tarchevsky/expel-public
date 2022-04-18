const gulp = require('gulp');
const browserSync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
// const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');

gulp.task('server', function () {
   browserSync({
      server: {
         baseDir: 'dist'
      }
   });
   gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
   return gulp.src('src/sass/**/*.+(scss|sass)')
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest('src/assets/css'))
      .pipe(gulp.dest('dist/assets/css'))
      .pipe(browserSync.stream());
});

gulp.task('watch', function () {
   gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
   gulp.watch('src/*.html').on('change', gulp.parallel('html'));
   gulp.watch('src/assets/js/**/*.js').on('change', gulp.parallel('scripts'));
   gulp.watch('src/assets/img/**/*').on('change', gulp.parallel('images'));
   gulp.watch('src/assets/icons/**/*').on('change', gulp.parallel('icons'));
});

gulp.task('html', function () {
   return gulp.src('src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
   return gulp.src(['src/assets/js/libs/swiper-bundle.min.js', 'src/assets/js/libs/tabs-product.js', 'src/assets/js/libs/app.js', 'src/assets/js/libs/swup-scipts.js'])
      .pipe(concat('script.js'))
      .pipe(gulp.dest('src/assets/js'))
      .pipe(gulp.dest('dist/assets/js'))
      .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
   return gulp.src('src/assets/fonts/**/*')
      .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('icons', function () {
   return gulp.src('src/assets/icons/**/*')
      .pipe(imagemin([
         imagemin.gifsicle({ interlaced: true }),
         imagemin.mozjpeg({ quality: 75, progressive: true }),
         imagemin.optipng({ optimizationLevel: 5 }),
         imagemin.svgo({
            plugins: [
               { removeViewBox: true },
               { cleanupIDs: false }
            ]
         })
      ]))
      .pipe(gulp.dest('dist/assets/icons'))
      .pipe(browserSync.stream());
});

gulp.task('mailer', function () {
   return gulp.src('src/mailer/**/*')
      .pipe(gulp.dest('dist/mailer'));
});

gulp.task('images', function () {
   return gulp.src('src/assets/img/**/*')
      .pipe(imagemin([
         imagemin.gifsicle({ interlaced: true }),
         imagemin.mozjpeg({ quality: 75, progressive: true }),
         imagemin.optipng({ optimizationLevel: 5 }),
         imagemin.svgo({
            plugins: [
               { removeViewBox: true },
               { cleanupIDs: false }
            ]
         })
      ]))
      .pipe(gulp.dest('dist/assets/img'))
      .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images'));