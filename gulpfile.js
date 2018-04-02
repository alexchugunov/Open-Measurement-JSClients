const compilerPackage = require('google-closure-compiler');
const gulp = require('gulp');
const zip = require('gulp-zip');
const closureCompiler = compilerPackage.gulp();

const commonConfig = {
  compilation_level: 'SIMPLE',
  formatting: 'PRETTY_PRINT',
  warning_level: 'VERBOSE',
  language_in: 'ECMASCRIPT_2017',
  language_out: 'ECMASCRIPT5_STRICT',
  externs: [
    './src/externs/omid-global.js',
  ],
  output_wrapper_file: './lightweight-bootstrapper.js',
};

const UMD_BOOTSTRAPPER = './umd-bootstrapper.js';

const SESSION_CLIENT_SRC = [
  './src/session-client/**.js',
  './src/common/**.js',
];

gulp.task('build-session-client', () => {
  closureCompiler(Object.assign({}, commonConfig, {
    js: SESSION_CLIENT_SRC,
    js_output_file: 'omid-session-client-v1.js',
    output_wrapper_file: UMD_BOOTSTRAPPER,
    externs: [
      ...commonConfig.externs,
      './src/externs/omid-exports.js',
      './src/externs/omid-jasmine.js',
    ],
  }))
      .src() // needed to force the plugin to run without gulp.src
      .pipe(gulp.dest('./bin'))
});

gulp.task('package-session-client', () => {
  gulp.src(SESSION_CLIENT_SRC)
      .pipe(zip('omid-session-client-v1.zip'))
      .pipe(gulp.dest('./bin'));
});

const VERIFICATION_CLIENT_SRC = [
  './src/common/**.js',
  './src/verification-client/**.js',
];
    
gulp.task('build-verification-client', () => {
  closureCompiler(Object.assign({}, commonConfig, {
    js: VERIFICATION_CLIENT_SRC,
    js_output_file: 'omid-verification-client-v1.js',
    output_wrapper_file: UMD_BOOTSTRAPPER,
    externs: [
      ...commonConfig.externs,
      './src/externs/omid-jasmine.js',
      './src/externs/omid-exports.js',
    ],
  }))
      .src() // needed to force the plugin to run without gulp.src
      .pipe(gulp.dest('./bin'))
});

gulp.task('package-verification-client', () => {
  gulp.src(VERIFICATION_CLIENT_SRC)
      .pipe(zip('omid-verification-client-v1.zip'))
      .pipe(gulp.dest('./bin'));
});

gulp.task('build-unit-tests', () =>
    closureCompiler(Object.assign({}, commonConfig, {
      js: [
        './test/unit/**.js',
        // exclude externs in the binary test code
        '!./src/externs/*.js',
        './src/**.js',
      ],
      externs: [
        ...commonConfig.externs,
        './node_modules/google-closure-compiler/contrib/externs/jasmine-2.0.js',
        './src/externs/omid-native.js',
        './src/externs/omid-exports.js',
      ],
      js_output_file: 'Omid-Unit-Tests.js',
      create_source_map: '%outname%.map',
      dependency_mode: 'NONE',
    }))
        .src() // needed to force the plugin to run without gulp.src
        .pipe(gulp.dest('./bin')));
