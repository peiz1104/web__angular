// 'use strict';

const path = require('path');
const gulp = require('gulp');
const clean = require('gulp-clean');
const htmlBeautify = require('gulp-html-beautify');
const watch = require('gulp-watch');
const asciidoctor = require('../plugins/gulp-asciidoctor');
const contentTrading = require('../plugins/gulp-content-trading');

const PROJECT_ROOT = path.join(__dirname, '../../../');
const SOURCE_ROOT = path.join(PROJECT_ROOT, 'src');
const DIST_ROOT = path.join(PROJECT_ROOT, 'dist');

const adocGlobs = path.join(SOURCE_ROOT, 'adoc/**/*.adoc');

const showcaseHome = path.join(SOURCE_ROOT, 'app/showcase');
const showcaseAdocGlobs = path.join(showcaseHome, '**/*.adoc');
const showcaseDocTradingGlobs = path.join(showcaseHome, '**/*.doc.ts');

gulp.task('reference');

gulp.task('showcase:doc', (done) => {
    console.log(showcaseAdocGlobs);
    gulp.src(showcaseAdocGlobs)
        .pipe(asciidoctor({
            header_footer: false,
            safe: 'secure', // unsafe, safe, server or secure
            doctype: 'article', // book, inline, article
            // header_footer: false, // true or false
            // attributes: ['showtitle']
        }))
        .pipe(htmlBeautify({
            indent_size: 4,
            indent_char: ' ',
            // 这里是关键，可以让一个标签独占一行
            unformatted: true,
            // 默认情况下，body | head 标签前会有一行空格
            extra_liners: []
        }))
        .pipe(contentTrading())
        .pipe(gulp.dest(showcaseHome));

    if(done instanceof Function){
        done();
    }
});

gulp.task('showcase:docClean', (done) => {
    gulp.src(showcaseDocTradingGlobs, {read: false})
        .pipe(clean(null));
    
    if(done instanceof Function){
        done();
    }
});



gulp.task('showcase:watch', ['showcase:doc'], () => {
    // gulp.watch(showcaseAdocGlobs, ['showcase:doc']);
    watch(showcaseAdocGlobs, () => {
        gulp.run('showcase:doc');
    });
});
