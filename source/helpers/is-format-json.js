import minimist from 'minimist';
import { OUTPUT_FORMAT_JSON } from '../constants';

export default () => {
  const { format } = minimist(process.argv.slice(2));
  return typeof format === 'string' && format && format === OUTPUT_FORMAT_JSON;
};
