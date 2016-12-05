//Researched Gulp (used grunt previously.  What's the difference?)
//https://travismaynard.com/writing/getting-started-with-gulp
//Integrating psi with gulp task list info came from the excellent
//resource at http://una.im/gulp-local-psi/
//2015-12-06 - could not get the psi integration to work

// // Include gulp
// var gulp = require('gulp');

// // Include Our Plugins
// var browserSync = require('browser-sync').create();
// var reload = browserSync.reload;

// // BrowserSync: https://browsersync.io/docs/gulp
// // use default task to launch Browsersync and watch JS files
// gulp.task('serve', function () {

//     // Serve files from the root of this project
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });

//     // add browserSync.reload to the tasks array to make
//     // all browsers reload after tasks are complete.
//     gulp.watch("*.js").on("change", reload);
//     gulp.watch("*.html").on("change", reload);
//     gulp.watch("*.css").on("change", reload);
// });

// gulp.task('default', ['serve']);


// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('setup:server', () => { /* server set up */ });

gulp.task('watch:markup', () => { /* watch markup src */ });
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
    gulp.watch("static/js/*.js").on("change", reload);
    gulp.watch("*.html").on("change", reload);
    gulp.watch("static/css/*.css").on("change", reload);
    gulp.watch("static/img/*.svg").on("change", reload);
});

gulp.task('default', gulp.parallel('serve'))


