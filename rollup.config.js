/* eslint-env node */

process.env.NODE_ENV = 'production';

const vue = require('rollup-plugin-vue');
const {babel} = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const {merge, isObject, castArray} = require('lodash');
const {resolve, relative, dirname} = require('path');

module.exports = [
    './modules/mymodule/rollup.config.js'
].reduce((carry, config) => {

    if (isObject(config)) {
        return [...carry, config];
    }

    for (const $config of castArray(require(config))) {

        const path = dirname(config);
        const {input, output} = $config;

        merge($config, {

            input: resolvePath(path, input),

            output: {
                ...output, file: resolvePath(path, output.file)
            }

        });

        carry.push($config);

    }

    return carry;

}, []).map(config => merge({

    plugins: [

        nodeResolve({
            browser: true
        }),

        commonjs(),

        vue(),

        json(),

        babel({
            plugins: ['lodash'],
            extensions: ['.js', '.vue'],
            babelHelpers: 'bundled'
        }),

        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })

    ]

}, config));

function resolvePath(...paths) {
    return relative(__dirname, resolve(__dirname, ...paths));
}
