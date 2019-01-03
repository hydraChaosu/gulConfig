import gulp from "gulp";
import del from "del";
import sass from "gulp-sass";
import clean from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import babel from "gulp-babel";

//pamietaj aby dodadc babela do development modules/plugins

gulp.task("static", () => {
  //** jeden lub wiecej katalogow pomiedzy
  // * obojetnie jaka nazwa pliku, lub typu lub nazwa folderu
  //src pobiera sciezka
  //dest cel zrobienia pliku
  //pipe laczy polecenia
  gulp.src("./src/**/*.html").pipe(gulp.dest("./dist"));
  gulp.src("./src/img/*.*").pipe(gulp.dest("./dist/img"));
});

//uzywa plugina del i usuwa wszyskto to co sie nie zgadza z aktualnym stanem
gulp.task("clean", () => {
  return del("./dist");
});

//najpierw odpala task clean
//potem start
gulp.task("build", ["clean"], () => {
  gulp.start(["static", "sass", "js"]);
});

//najpier odpala build
gulp.task("default", ["build"]);

// gulp.task("default", () => {
//   console.log("sadasds");
// });

//uzywa gulp-sass,gulp-clean-css, gulpautoprefixer
//compilacja sass, minifikacja css,dodanie prefixow
gulp.task("sass", () => {
  gulp
    .src("./src/sass/app.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(clean())
    .pipe(gulp.dest("./dist/sass"));
});

//gulp-concat, gulp-babel, gulp-uglify
//laczenie plikow
//babelowanie
//minifikacja
gulp.task("js", () => {
  //other js zaladuje sie przed app js

  gulp
    .src(["./src/js/other.js", "./src/js/app.js", "./src/js/*.js"])
    .pipe(
      babel({
        presets: "env"
      })
    )
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("watch", ["default"], () => {
  gulp.watch("src/sass/app.scss", ["sass"]);
  gulp.watch("src/js/**//*.js", ["js"]);
  gulp.watch("src/**/*.html", ["static"]);
});
