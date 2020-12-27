import { MinifyOptions } from 'terser';

const knownMinifyOptions = [
  'compress',
  'ecma',
  'ie8',
  'keep_classnames',
  'keep_fnames',
  'mangle',
  'module',
  'nameCache',
  'format',
  'output',
  'parse',
  'safari10',
  'sourceMap',
  'toplevel'
];

export function parseMinifyOptions(options?: MinifyOptions): MinifyOptions {
  return Object.entries(options || {}).reduce(
    (opts, [key, value]) => ({
      ...opts,
      ...(knownMinifyOptions.includes(key) ? { [key]: value } : {})
    }),
    { mangle: true, sourceMap: false }
  );
}
