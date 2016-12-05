//Researched Gulp (used grunt previously.  What's the difference?)
//https://travismaynard.com/writing/getting-started-with-gulp
//Integrating psi with gulp task list info came from the excellent
//resource at http://una.im/gulp-local-psi/
//2015-12-06 - could not get the psi integration to work

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// BrowserSync: https://browsersync.io/docs/gulp
// use default task to launch Browsersync and watch JS files
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("*.js").on("change", reload);
    gulp.watch("*.html").on("change", reload);
    gulp.watch("*.css").on("change", reload);
});

gulp.task('default', ['serve']);

// // Lint Task
// gulp.task('lint', function() {
//     return gulp.src('*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// // Concatenate & Minify JS
// gulp.task('scripts', function() {
//   return gulp.src('js/libs/*.js')
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('js/libs/dist/'));
// });

// gulp.task('compress', function() {
//   return gulp.src('js/libs/dist/*.js')
//     .pipe(uglify().on('error', gutil.log))
//     .pipe(gulp.dest('js/'));
// });

// // Concatenate and Minify CSS
// gulp.task('css-concat', function() {
//   return gulp.src('css/libs/*.css')
//     .pipe(concat('style-min.css'))
//     .pipe(gulp.dest('css/libs/dist/'));
// });

// gulp.task('minify-css', function() {
//     return gulp.src('css/libs/dist/*.css')
//         .pipe(minifyCss({compatibility: 'ie8'}))
//         .pipe(gulp.dest('css'));
// });

//Optimize gif, png, jpg images (note that it's not in the task list so
//it doesn't run every time)
//command is "gulp image"
// gulp.task('image', function () {
//     gulp.src('images_src/resized/*')
//        .pipe(image())
//        .pipe(gulp.dest('images/'));
// });


//Resize images.  command is "gulp imageResize"
// gulp.task('imageResize', function () {
//     gulp.src('fixtures/pizzeria.jpg')
//         .pipe(imageResize({
//           width : 100,
//           upscale : false
//         }))
//         .pipe(gulp.dest('img'));
// });

// Watch Files For Changes
// gulp.task('watch', function() {
//     gulp.watch('js/libs/*.js', ['lint', 'scripts', 'compress', 'css-concat', 'minify-css']);
//     gulp.watch('css/libs/*.css', ['css-concat', 'minify-css']);
// });

// Default Task
// gulp.task('default', ['lint', 'css', 'scripts', 'compress', 'css-concat', 'minify-css', 'watch']);



