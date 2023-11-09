import gulp from "gulp";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import webp from "gulp-webp";
import browsersync from "browser-sync";
import htmlmin from "gulp-htmlmin";
import replace from "gulp-replace";
import gulpCssnano from "gulp-cssnano";
import watch from "gulp-watch";

const SRC_FOLDER = "./src";
const HTML_FILE_PATH = "index.html";
const BUILD_FOLDER = "./build";
const JS_FILES_PATH = SRC_FOLDER + "/js/**/*.js";
const SRC_CSS = SRC_FOLDER + "/css/**/*.css";

const server = browsersync.create();

function devHTML() {
  return gulp
    .src(HTML_FILE_PATH)
    .pipe(replace(/\.jpg/g, ".webp"))
    .pipe(replace(/\.\/src\//g, "./"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(BUILD_FOLDER))
    .pipe(server.stream());
}

function devImage() {
  return gulp
    .src(SRC_FOLDER + "/img/**/*.jpg")
    .pipe(webp())
    .pipe(gulp.dest(BUILD_FOLDER + "/img"))
    .pipe(gulp.src([SRC_FOLDER + "/img/**/*", `!${SRC_FOLDER}/img/**/*.jpg`]))
    .pipe(gulp.dest(BUILD_FOLDER + "/img"))
    .pipe(server.stream());
}

async function devCSS() {
  return gulp
    .src(SRC_CSS)
    .pipe(postcss([tailwindcss, autoprefixer]))
    .pipe(gulpCssnano({ preset: "default" }))
    .pipe(gulp.dest(BUILD_FOLDER + "/css"))
    .pipe(server.stream());
}

async function devJs() {
  return gulp
    .src(JS_FILES_PATH)
    .pipe(uglify())
    .pipe(concat("main.js"))
    .pipe(gulp.dest(BUILD_FOLDER + "/js"))
    .pipe(server.stream());
}

gulp.task("browser-sync", function () {
  server.init({
    server: {
      baseDir: "./build",
      index: "index.html",
    },
  });
});

gulp.task("change", function () {
  gulp.watch(HTML_FILE_PATH, devHTML);
  gulp.watch(SRC_FOLDER + "/img/**/*.jpg", devImage);
  gulp.watch(JS_FILES_PATH, devJs);
});

gulp.task("default", gulp.parallel(devHTML, devImage, devJs, devCSS));
gulp.task("watch", gulp.parallel("change", "browser-sync"));
