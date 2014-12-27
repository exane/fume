var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require("gulp-sass");
var livereload = require("gulp-livereload");
var spritesmith = require('gulp.spritesmith');
var fs = require("fs");

gulp.task("setup config", function(){
    fs.exists(__dirname + "/config/config.ini", function(exists){
        if(exists){
            //console.log("Config.ini already exists.");
            return;
        }

        console.log("Config.ini doesnt exists. Copy new one from example.");
        fs.readFile(__dirname + "/resources/config.example.ini", function(err, data){
            if(err) throw err;
            fs.writeFile(__dirname + "/config/config.ini", data, function(err){
                if(err) throw err;
                console.log("Config.ini successfully created.");
            })
        })
    })
})

gulp.task('browserify', function(){
    browserify('./resources/assets/js/main.js', {standalone: "fume", transform: "brfs"})
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

gulp.task('sprite', function(){
    var spriteData = gulp.src('./resources/assets/img/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprites.scss',
        imgPath: "../img/sprite.png",
        cssFormat: "css",
        cssOpts: {
            cssClass: function(item){
                return '.sprite-' + item.name;
            }
        }
    }));
    spriteData.img.pipe(gulp.dest('public/assets/img/'));
    spriteData.css.pipe(gulp.dest('./resources/assets/scss/'));
});

gulp.task('sprite memes', function(){
    var spriteData = gulp.src('./resources/assets/img/meme/*.png').pipe(spritesmith({
        imgName: 'meme.png',
        cssName: '_memes.scss',
        imgPath: "../img/meme.png",
        cssFormat: "css",
        cssOpts: {
            cssClass: function(item){
                return '.meme-' + item.name;
            }
        }
    }));
    spriteData.img.pipe(gulp.dest('public/assets/img/'));
    spriteData.css.pipe(gulp.dest('./resources/assets/scss/'));
});

gulp.task("copyStaticImages", function(){
    gulp.src("./resources/assets/img/static/*.*")
    .pipe(gulp.dest("./public/assets/img/"));
})

gulp.task("copySound", function(){
    gulp.src("./resources/assets/sound/*.wav")
    .pipe(gulp.dest("./public/assets/sound/"));
})

gulp.task("watch", function(){
    gulp.watch("./resources/**/*.js", ["browserify"]);
    gulp.watch('./resources/assets/scss/**/*.scss', ["sass"]);
    gulp.watch('./resources/assets/img/*.png', ["sprite"]);
    gulp.watch('./resources/assets/img/meme/*.png', ["sprite memes"]);
    gulp.watch('./resources/assets/img/static/*.*', ["copyStaticImges"]);
})

gulp.task("default", ["copySound", "copyStaticImages", "browserify", "sass", "watch", "sprite", "sprite memes", "setup config"]);