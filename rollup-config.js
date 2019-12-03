import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify';

export default {
  entry: 'dist/out-tsc/src/main-aot.js',
  dest: 'aot/dist/build.js', // output a single application bundle
  sourceMap: false,
  // sourceMap: true,
  // sourceMapFile: 'aot/dist/build.js.map',
  format: 'iife',
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
  },
  plugins: [
      nodeResolve({jsnext: true, module: true, main: true}),
      commonjs({
        //include: 'node_modules/rxjs/**',
        //include: 'node_modules/mobx/**'
        include: 'node_modules/**'
      }),
      uglify()
  ]
};