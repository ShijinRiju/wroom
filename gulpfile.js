var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss  = require('gulp-postcss');
    autoprefixer = require('autoprefixer'),
    minifycss = require('gulp-minify-css'),
    streamqueue = require('streamqueue');
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    injectPartials = require('gulp-inject-partials'),
    notify = require('gulp-notify'),
    log = require('fancy-log'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    del = require('del'), gulpMinify = require('gulp-minify') ,
    htmlbeautify = require('gulp-html-beautify'),
    reload = browserSync.reload;


var paths = {
    styles: {
        src: 'scss/**/*.scss',
        dest: 'css/'
    },
    scripts: {
        src: 'lib/**/*.js',
        dest: 'js/'
    },
    html: {
        src: 'templates/**/*.html',
        dest: './'
    },
    image: {
        src: 'images/**/*',
        dest: 'images/dist'
    },
    svg: {
        src: 'images/svg/**/*.svg',
        dest: 'images/'
    }
};

gulp.task('styles', function() {
    return gulp.src(paths.styles.src)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass())
        .pipe(minifycss())
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('scripts', function() {
    return streamqueue({ objectMode: true },
            gulp.src('lib/jquery.js'),
            gulp.src('lib/popper.min.js'),
            gulp.src('lib/slick.min.js'),
            gulp.src('lib/select2.full.js'),
            gulp.src('lib/bootstrap-datepicker.js'),
            gulp.src('lib/sticky-sidebar.min.js'),
        )
        .pipe(plumber({
            // errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('ptl_render', function() {
    return gulp.src(paths.html.src)
        .pipe(plumber({
            // errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(injectPartials({
            removeTags: true
        }))
        .pipe(gulp.dest(paths.html.dest));
});

/* Reload task */
gulp.task('bs-reload', function() {
    browserSync.reload();
}); 

gulp.task('browser-sync', function() {
    browserSync.init([paths.styles.dest, paths.scripts.dest, paths.html.dest], {
        server: {
            baseDir: './'
        }
    });
});


gulp.task('watch', function() {
    gulp.watch(paths.styles.src, gulp.series('styles')),
    gulp.watch(paths.scripts.src, gulp.series('scripts')),
    gulp.watch(paths.html.src, gulp.series('ptl_render')),
    gulp.watch(paths.html.dest, gulp.series('bs-reload'))

});
gulp.task('default', gulp.series(
    gulp.parallel('watch', 'scripts', 'styles', 'ptl_render', 'browser-sync')
));

gulp.task("build",()=>{
    var prefix = "build/" ;
    console.log("CLEARING BUILD FOLDER");
    return del([ prefix ])
    .then(()=>{

        gulp.src(paths.scripts.dest+"**")
        .pipe(gulp.dest(prefix+paths.scripts.dest))
        .on('end', ()=>{
            console.log("SCRIPT COPIED! TO BUILD FOLDER");
        });        
         gulp.src(paths.styles.dest+"**")
        .pipe(minifycss())
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(prefix+paths.styles.dest))
        .on('end', ()=>{
            console.log("STYLES COPIED! TO BUILD FOLDER");
        });
         gulp.src("images/**")
        .pipe(gulp.dest(prefix+("images/")))
        .on('end', ()=>{
            console.log("IMAGES COPIED! TO BUILD FOLDER");
        });
        gulp.src(paths.svg.dest+"**")
        .pipe(gulp.dest(prefix+paths.svg.dest))
        .on('end', ()=>{
            console.log("SVG ICONS COPIED! TO BUILD FOLDER");
        });
         gulp.src("fonts/**")
        .pipe(gulp.dest(prefix+("fonts/")))
        .on('end', ()=>{
            console.log("FONTS COPIED! TO BUILD FOLDER");
        });
       return gulp.src("*.html")
        .pipe(htmlbeautify({
            indentSize:2
        }))
        .pipe(gulp.dest(prefix+("./")))
        .on('end', ()=>{
            console.log("TEMPLATED COPIED TO BUILD");
        });
    })


    
})
