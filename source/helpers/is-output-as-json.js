import yargs from 'yargs';

export default () => (yargs.argv.format || yargs.argv.f);
