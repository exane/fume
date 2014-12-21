var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require("gulp-sass");
var livereload = require("gulp-livereload");
var spritesmith = require('gulp.spritesmith');

gulp.task('browserify', function(){
    browserify('./resources/assets/js/main.js', {standalone: "fume"})
    .bundle().on("error", function(err){
        console.log(err);
    })
    .pipe(source('build.js').on("error", function(err){
        console.log(err);
    }))
    .pipe(gulp.dest('./public/assets/js/build/').on("error", function(err){
        console.log(err);
    }));
});

gulp.task('sass', function(){
    gulp.src('./resources/assets/scss/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
      }).on("error", function(err){
        console.log(err);
    }))
    .pipe(gulp.dest('./public/assets/css/').on("error", function(err){
        console.log(err);
    }))
    .pipe(livereload().on("error", function(err){
        console.log(err);
    }));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('./resources/assets/img/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprites.scss',
    imgPath: "../img/sprite.png",
    cssFormat: "css",
    cssOpts: {
      cssClass: function (item) {
        return '.sprite-' + item.name;
      }
    }
  }));
  spriteData.img.pipe(gulp.dest('public/assets/img/'));
  spriteData.css.pipe(gulp.dest('./resources/assets/scss/'));
});

gulp.task("watch", function(){
    gulp.watch("./resources/**/*.js", ["browserify"]);
    //gulp.watch("./src/data/*.js", ["browserify"]);
    gulp.watch('./resources/assets/scss/**/*.scss', ["sass"]);
    gulp.watch('./resources/assets/img/**/*.png', ["sprite"]);
})

gulp.task("default", ["browserify", "sass", "watch", "sprite"]);