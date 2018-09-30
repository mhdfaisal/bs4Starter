const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

/*---- browserSync always requires internet to render web pages --*/

// Compiling Sass

gulp.task('sass', function(){
    gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

//Moving js files

gulp.task('js', function(){
    gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/tether/dist/js/tether.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

// Moving fonts to the src folder

gulp.task('fonts', function(){
    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/fonts'));
});

//Moving font-awesome css to the CSS folder

gulp.task('fa', function(){
    gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('src/css'));
});

// Serve and watch SaSS ('The serve task will run only after the sass task has completed') -> (Task dependency)

gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server:'./src'
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve', 'js', 'fonts', 'fa']);