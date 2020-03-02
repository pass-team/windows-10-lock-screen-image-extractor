import yargs from 'yargs';

export default () => yargs.argv.output && typeof yargs.argv.output === 'string';
