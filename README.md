### Startup LockScreen Extractor for Windows 10

#### Installation
```$javascript
yarn install
```

#### Usage
```$javascript
 get-lock-screen-image.js [options] [orientation] [name pattern]

 Example:
    node get-lock-screen-image.js
    node get-lock-screen-image.js -p=D:/images-folder portrait hash
```

#### Command Options
```$javascript
ARGUMENTS
    
    [orientation]       Filter images based on orientation:         optional        default: "all"
                        Choose:
                            'landscape'
                            'portrait'
                            'all'
    
    [name pattern]      Output filename pattern                     optional        default: "origin"
                        Choose:
                            'origin': Keep name that windows give
                            'hash': Use image hash as name
                            'date': Use current date as name

OPTIONS
    
     -p, --path         Path to save images to                      optional        default: false

COMMANDS
    
    show-settings       Show your current saving folder
    random-desktop      Randomly set a new desktop wallpaper
    help <command>      Display help for a specific command

GLOBAL OPTIONS
    
    -h, --help          Display help
    -V, --version       Display version
    --no-color          Disable colors
    --quiet             Quiet mode - only displays warn and error messages
    -v, --verbose       Verbose mode - will also output debug messages             
```
