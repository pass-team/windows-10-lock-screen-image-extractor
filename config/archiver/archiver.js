const fs = require('fs');
const archiver = require('archiver');

const filename = 'get-lock-screen';

const output = fs.createWriteStream(`${process.cwd()}/build/${filename}.zip`);
const archive = archiver('zip');

output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', (err) => {
  console.log(err);
});

archive.pipe(output);

// append files from a sub-directory and naming it `new-subdir` within the archive (see docs for more options):
archive.file(`${process.cwd()}/build/${filename}.exe`, false);
archive.finalize();
