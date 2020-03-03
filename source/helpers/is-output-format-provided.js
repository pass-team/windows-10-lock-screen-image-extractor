import yargs from 'yargs';

export default () => yargs.argv.format && typeof yargs.argv.format === 'string';
