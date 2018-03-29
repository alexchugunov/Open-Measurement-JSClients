# Open-Measurement-JSClients

## Overview

This repository contains the JavaScript code for the clients of Open Measurement SDK, also known as
OM SDK JS.  It is composed of two components:

* OMID JS Verification Client (`omid-session-client-v1.js`) is used by
verification scripts to communicate with OMID JS Service.  It handles situations
when the verification script runs in the same HTML document as the creative (in
the top level of the webview), or in a cross-domain iframe, or in an invisible
webview or DOM-less JavaScript execution environment for native ads.
Verification scripts include the OMID JS Verification Client source code at
build time (when the verification script is transpiled/minified).

* OMID JS Session Client (`omid-verification-client-v1.js`) is used by
integration partners to perform ad session activities in the JavaScript layer.
It functions both at the top level of the webview and in a cross-domain iframe.
Ad SDKs include its source code into ad HTML at build time.

## Folder Structure

### `src/`
Contains the source code for the built binaries. It is further broken
down into folders based on sources that comprise the binaries or common code.

### `src/session-client/`
Contains all source code files that comprise the OMID JS Session Client and go
into the `omid-session-client-v1.js` binary.

### `src/verification-client/`
Contains all source code files that comprise the OMID JS Verification Client and
go into the `omid-verification-client-v1.js` binary.

### `src/common/`
Contains all source code files that are shared across multiple binaries.

### `test/`
Contains all source code files for the unit tests. It is broken down
to sub-folders that map one to one to the sub-folders of `src/` folder.

### `bin/`
Bin folder will be ignored for code submissions (through `.gitignore`) but it
is the folder where the JavaScript binaries end up for a build. Two
binaries are generated: `omid-session-client-v1.js`, and
`omid-verification-client-v1.js`.

### `package.json`
Main npm configuration and build file.

## Developer Setup

The JavaScript tools are managed using an [NPM](https://www.npmjs.com/) project.
[Google Closure](https://developers.google.com/closure/compiler/) compiler
composes modules together and minifies the output JavaScript binary.  Builds are
automated with [Gulp](https://gulpjs.com/).  Tests are written with
[Jasmine](https://jasmine.github.io/) and executed with
[Karma](https://karma-runner.github.io/).

### Prerequisites

* [Node version 8.4.0 or later](https://nodejs.org/en/)
* [NPM version 5.3.0](https://www.npmjs.com/). Specifically use v5.3.0 cause newer ones have issues.
* [Java Runtime environment](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)

### Clone the Repository

```sh
git clone git@github.com:InteractiveAdvertisingBureau/Open-Measurement-JSClients.git
cd Open-Measurement-JSClients
```

### Install Tools

Running the following command will download and install the dependencies
locally, into `./node_modules/`.

```sh
npm install
```

After this step, the repo is ready to be built.

## Building

Running the following command builds 
`omid-session-client-v1.js`, and `omid-verification-client-v1.js` locally, in a
new `./bin/` folder. Note that running `build` will always first remove any and
all existing content in `./bin/` prior to producing the output bundles.

```sh
npm run build
```

## Consuming
Both the build `omid-session-client-v1.js` and `omid-verification-client-v1.js`
files are [UMD modules](http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/).
Therefore they can be consumed in CommonJS, closure, and generic
environments. The following examples show how the VerificationClient can
be imported. The same logic can be applied to the SessionClient.

### CommonJS
Make sure the require statement reflects the path to the
`omid-verification-client-v1.js` file. The following example works when the
`omid-verification-client-v1.js` file sits in the same directory as the example
source file.

```js
const Omid = require('./omid-verification-client-v1');
const {OmidVerificationClient} = Omid;
```

### closure
Add the OMID source files to the closure compiler. For the verification client
these are:

  - `src/common/**.js`  
  - `src/verification-client/**.js`  

For the session client these are:

  - `src/common/**.js`  
  - `src/session-client/**.js`  

And the code for the verification client (similar pattern for the session
client):

```js
const OmidVerificationClient = goog.require('omid.verificationClient.VerificationClient');
```

### Globals (generic approach)
Prior to running the example code, the `omid-verification-client-v1.js` must
have already been loaded and ran in the current context. This is what causes the
global to be exported. One way of doing this is by using a `<script\>` tag.

```html
<html>
  <head>
    <script src="./omid-verification-client-v1.js"></script>
    <script src="./your-verification-script.js"></script>
  </head>
  <body></body>
</html>
```

Another way to do this is by concatenating `omid-verification-client-v1.js`
into the top of `your-verification-script.js`.

The example of how you would access the VerificationClient API follows
(this is `your-verification-script.js`):

```js
const OmidVerificationClient =
    OmidVerificationClient && OmidVerificationClient['4.0.0'];
```

## Testing

## Run Unit Tests

To run all the unit tests:

```sh
npm run test
```

or the shorthand alias:

```sh
npm t
```

It will bring up a Chrome instance orchestrated by the Karma runner, which will
run the tests once, print the results, and exit.

#### Continuously Run Unit Tests

In order to have Karma runner loop forever, waiting for any changes in the
production code or test code, use the following command.

```sh
npm run test-watch
```

## Making Changes

### Updating the version

* Update [version.txt](https://github.com/InteractiveAdvertisingBureau/Open-Measurement-JSClients/blob/master/version.txt)

Create a new Pull Request with the above changes.

### Coding Standards

* All new code in OM SDK and OMID JS must follow the public [Google JavaScript Style
Guide](https://google.github.io/styleguide/jsguide.html).

* Use ES6 language features (such as `class`, `let`, etc.).  

* Ensure no new warnings are added. Please, run the linter

```sh
npm run lint
```

* Some of the warnings can be fixed automatically

```sh
npm run lint-fix
```

#### Linter rules

In general, all rules under "google" [eslint config ruleset](
https://github.com/google/eslint-config-google) are applied.

However, there are some exceptions:

1. Rules mentioned in issues labeled as [fix-linter-warnings](
https://github.com/InteractiveAdvertisingBureau/Open-Measurement-SDKJS/labels/fix-linter-warnings)
are temporarily converted into warnings while work to remove the offending lines of code is underway.
Once the underlying Github issue is resolved, they should be converted back to actual errors.
2. Rule [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars) is turned off, because it
gives false positives when a type is imported into an ES6 module but only used in JSDoc comments
for annotating variable types for the Google Closure compiler.

#### Linter rules for tests

Apart from the exceptions mentioned above, for test code the following exceptions also apply:

1. Rule [require-jsdoc](https://eslint.org/docs/rules/require-jsdoc) since we do not want to add
JSDoc for every test method.
2. Rule [valid-jsdoc](https://eslint.org/docs/rules/valid-jsdoc) as a consequence of the previous
exception.
3. Rule [guard-for-in](https://eslint.org/docs/rules/guard-for-in) since we fully control the test
environment so objects only have the properties we assign to them.
4. Rule [prefer-spread](https://eslint.org/docs/rules/prefer-spread) since we want to use `apply`
on purpose in certain test methods.
