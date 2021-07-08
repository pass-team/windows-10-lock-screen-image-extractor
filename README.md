## Startup LockScreen Extractor for Windows 10
![build](https://github.com/pass-team/windows-10-lock-screen-image-extractor/workflows/build/badge.svg?branch=develop&event=push)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6f00289eb5e24a0b98de792b494c6b4f)](https://www.codacy.com/gh/pass-team/windows-10-lock-screen-image-extractor?utm_source=github.com&utm_medium=referral&utm_content=pass-team/windows-10-lock-screen-image-extractor&utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/6f00289eb5e24a0b98de792b494c6b4f)](https://www.codacy.com/gh/pass-team/windows-10-lock-screen-image-extractor?utm_source=github.com&utm_medium=referral&utm_content=pass-team/windows-10-lock-screen-image-extractor&utm_campaign=Badge_Coverage)
[![David](https://img.shields.io/david/dev/pass-team/windows-10-lock-screen-image-extractor)](https://github.com/pass-team/windows-10-lock-screen-image-extractor)
## Introduction
A tiny cli app to extract gorgeous lock screen images on Windows 10.

**Note**: Since July 8, 2021, this package's moved to [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and cannot be require()'d from 
CommonJS.
* Also move to ESM (preferred). [Here's a good start](https://blog.sindresorhus.com/hello-modules-d1010b4e777b).
* Stay on [older versions](https://github.com/pass-team/windows-10-lock-screen-image-extractor/releases) of the package until you can move to ESM.

## Installation
### As a node package
**Required**: [Nodejs](https://nodejs.org/en/)

Open terminal/cmd, run:
```javascript
npm install -g windows-10-lock-screen-image-extractor
```
### As windows binary
Download the latest version [here](https://github.com/pass-team/windows-10-lock-screen-image-extractor/releases)


## Features
* **Get lock screen images**: Get all lock screen images then save them to a designated folder.
You can choose to pick `landscape` or `portrait` images only. Or reformat images’s name  by `day`, `hash`
* **Randomize desktop wallpaper**: Randomly pick an image you saved before and set it as desktop wallpaper
* **Show image saved folder**: Recall path to saved folder in case you forget

## Usage
### 1. Get lock screen images
1. Run command: `get-lock-screen get-images`
2. Answer configuration questions
3. **Ctrl + click** on the path to open images folder in explorer (supported by all popular terminal/console except Windows's Power Shell and cmd)

**Settings**

Passing one or multiple arguments to change the command’s behavior

| Argument | Required     | Default | Description | Example |
| :------- | :----------: | :------ | :---------- | :-------|
| --path, -p | No | C:\Users\...\Pictures\W10_Spotlight\ | Save images to a designated folder | get-lock-screen get-image -p=”D:/images” |
| --orientation,<br> -o | No | all | Filter landscape, portrait images only or get all of them<br>Possible values:<br>- landscape<br>- portrait<br>- all | get-lock-screen get-image -o=landscape |
| --name-pattern,<br> -n | No | origin | Save images name in different formats<br>Possible values:<br>- **hash**: file’s hash<br>- **date**: current date<br>- **origin**: original name | get-lock-screen get-image -no=origin |

### 2. Randomize desktop wallpaper
* Run command: `get-lock-screen randomize-desktop`
* The app may remind you to get the images in advance on the first run.

### 3. Show image saved folder
Run command: `get-lock-screen show-settings`

### Global settings
Global settings can be applied to all commands

| Argument | Required     | Default | Description | Example |
| :------- | :----------: | :------ | :---------- | :-------|
| --output | No | null | Format cli logs as JSON or save them to JSON file.<br>Possible values:<br>- **json**: format as a JSON string<br>- **[filename].json**: Save log to a JSON file with [filename] | get-lock-screen get-image --output=json |
| --config | No | null | Accepts cli params in JSON format or JSON file<br>Possible values:<br>- **[JSON string]**: a JSON object that describe options<br>- **[filename].json**: a JSON file that describe options | get-lock-screen get-image --output=json |
| --verbose | No | null | Turn on debug mode to see a more detailed version of logs | get-lock-screen get-image --verbose |

## Errors Diagnosis
| Error code | Error message  | Diagnosis | Action |
| :--------: | :------------- | :-------- | :----- |
| VALIDATION_ERROR_001 | Invalid value ... for option ... | The argument you provide is in wrong format | Run `get-lock-sceen --help` to know the right syntax |
| VALIDATION_ERROR_002 | Unknown option ... | The option you provide is not supported | Run `get-lock-sceen --help` to know the viable options |
| VALIDATION_ERROR_003 | Unknown command ... | The command you provide is not supported  | Run `get-lock-sceen --help` to know the viable commands |
| RUNTIME_ERROR_001 | Error while creating images folder | The path provided is invalid or being used by other processes | Terminate that process then try again. If it still doesn't work. Raise an issue in our [Github Issue](https://github.com/pass-team/windows-10-lock-screen-image-extractor/issues) |
| RUNTIME_ERROR_002 | Error setting new desktop wallpaper! | The exe file must have been broken in the build process | Check current version of your app. Then visit our release page and download another version |
| RUNTIME_ERROR_003 | No existing images, try getting the images first | Randomize desktop feature only work if you already has an image folder that created by the app | Run `get-lock-screen get-images` to create/recreate the folder |
| RUNTIME_ERROR_004 | No user settings has been recorded yet... | User settings are saved to `.userconfig` file after getting images, this file may be lost or you are running the app for the first time | Run `get-lock-screen get-images` to create/recreate the missing file |
| EXCEPTION_001 | Can't be anything, no particular pattern | This is caused by an error that we missed during development  | Make sure you are having no syntax errors in your command or try another version<br>Then Raise an issue in our [Github Issue](https://github.com/pass-team/windows-10-lock-screen-image-extractor/issues)  |

## Support
If you have any problems running the apps, feel free to [open an issue](https://github.com/pass-team/windows-10-lock-screen-image-extractor/issues/new). We will tackle it right away.

## Contributing
### 1. Opening an issue
* Check [Issues](https://github.com/pass-team/windows-10-lock-screen-image-extractor/issues) section to avoid duplication
* Provide additional information following the template
### 2. Open pull request
**1. Fork and clone repo**
* Fork repo
* Clone forked repo to your machine

**2.  Install dependencies**

**Required**: [Node.js](https://nodejs.org/en/download/), [yarn](https://github.com/yarnpkg/yarn)
* Run `yarn install`

**3.  Update code and document**
* Update code
* Check lint errors: `yarn run lint:scripts`
* Update `README.md` about your changes

**4. Update test**
* Write new test cases for your code.
* All tests locates at folder `tests/**`
* Run tests: `yarn run test:unit`

**5. Submit pull request for review**
* Submit a PR from your forked repo to pass-team’s.
* Provide PR’s information following the template
