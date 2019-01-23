# Changelog for Open Measurement SDK JavaScript clients

## 1.2.11 - 2019-01-23
### Fixed
- Start IntersectionObserver after creative has non-zero area

## 1.2.10 - 2019-01-11
### Fixed
- VerificationClient crashes on creation inside cross-domain iframe on iOS 9

## 1.2.9 - 2018-12-10
### Fixed
- Fix crash related to resolveTopWindowContext on IE11.

## 1.2.8 - 2018-12-05
- Update version to match JS Service, Android, and iOS SDKs; no changes from 1.2.7.

## 1.2.7 - 2018-11-27
### Fixed
- Allow elementBounds to be passed for non-IFrame cases
- OmidSessionClient to include 'default' version key

## 1.2.6 - 2018-11-01
### Fixed
- Added logic to support older Chromium versions
- 'const' changed to 'var' in verification client for IE<11

## 1.2.5 - 2018-10-10
- Update version to match JS Service, Android, and iOS SDKs; no changes from 1.2.4.

## 1.2.4 - 2018-08-29
### Fixed
- Make sure cached loaded event has session ID when republishing

## 1.2.3 - 2018-07-17
### Fixed
- Fix JS Clients audit errors by upgrading Gulp and Karma
- Set the adView from the creative measurement, if it's available

## 1.2.2 - 2018-08-02
### Changed
- Update LICENSE

## 1.2.1 - 2018-07-18
- Update version to match JS Service, Android, and iOS SDKs; no changes from 1.2.0.

## 1.2.0 - 2018-07-03
### Fixed
- Use direct communication instead of post message when verification script is in a friendly iframe.
- Fix validation script to fire the default measurement URL in presence of verification parameters.

### Changed
- Change default vendor name from 'dummyVendor' to 'iabtechlab.com-omid' in validation verification script.
- Change default log server domain name from 'localhost' to 'iabtechlab.com' in validation verification script.

### Removed
- Remove restriction that impression event must be sent before other events can be sent.

## 1.1.4 - 2018-06-20
### Fixed
- Purge stale version files before regenerating files in npm prebuild.

### Added
- Add support for using window.omid3p in VerificationClient.

## 1.1.3 - 2018-05-29
### Changed
- Make OM SDK JS client code available in public GitHub repository.
- Add build files, README, and CHANGELOG to OM SDK JS client repository.

## 1.1.2 - 2018-05-08
### Fixed
- Dispatch device volume change video events for HTML video ad formats.
- Fix validation verification script to no longer register multiple observers for video events.

## 1.1.1 - 2018-04-24
### Added
- Include validation-verification script in OM SDK JS distribution ZIP.
- Add new properties to session context for compatibility with OMID for Web.

## 1.1.0 - 2018-03-29

First General Availability release of OM SDK JavaScript.
