/* eslint-env node */

module.exports = {

    input: 'mymodule/src/customizer/index.js',

    output: {
        file: 'mymodule/customizer.min.js',
        format: 'iife',
        globals: {
            vue: 'Vue',
            uikit: 'UIkit'
        }
    },

    external: ['vue', 'uikit']

};
