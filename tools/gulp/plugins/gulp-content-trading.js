// PLUGIN_NAME: gulp-asciidoctor
var through = require('through-gulp');
var gutil = require('gulp-util');

module.exports = function (options) {

    var options = options || {};


    // creating a stream through which each file will pass
    var stream = through(function (file, encoding, callback) {
        // do whatever necessary to process the file
        if (file.isNull()) {
            callback(null, file);
            return;
        }

        if (file.isStream()) {
            callback(new gutil.PluginError('gulp-content-trading',
                'Streaming not supported'));
            return;
        }

        if (file.isBuffer()) {

        }

        // just pipe data next, or just do nothing to process file later in flushFunction
        // never forget callback to indicate that the file has been processed.

        let contents = file.contents.toString().replace(new RegExp(/(`)/g),'\\`');
        let data = `export const article = \`${contents}\`;\n`;

        file.contents = new Buffer(data);
        file.path = gutil.replaceExtension(file.path, '.doc.ts');

        callback(null, file);

    }, function (callback) {
        // just pipe data next, just callback to indicate that the stream's over
        // this.push(something);
        callback();
    });

    // returning the file stream
    return stream;
};
