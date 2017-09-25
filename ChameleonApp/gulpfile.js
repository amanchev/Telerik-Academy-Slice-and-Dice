/* eslint-disable no-console */

const gulp = require('gulp');
const istanbul = require('gulp-istanbul');


gulp.task('server:start', () => {
    return require('./server');
});

const config = {
    connectionString: 'mongodb://localhost/chameleon-db',
    port: 3002,
};

const { MongoClient } = require('mongodb');
