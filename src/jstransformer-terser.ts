import { readFile } from 'fs';
import { minify, MinifyOptions } from 'terser';

export const name = 'terser';
export const outputFormat = 'js';
export const inputFormats = ['js'];

export interface TransformerOutput {
  body: string;
  dependencies: never[];
}

export function renderAsync(
  input: string,
  options?: MinifyOptions,
  callback?: (err: Error | null, result?: TransformerOutput) => void
): void | Promise<TransformerOutput> {
  options = {
    mangle: true,
    sourceMap: false,
    ...(options || {})
  };
  const transform = async (): Promise<TransformerOutput> =>
    minify(input, options).then(output => ({ body: output.code as string, dependencies: [] }));
  if (typeof callback === 'function') {
    transform()
      .then(output => callback(null, output))
      .catch(err => callback(err));
  } else {
    return transform();
  }
}

export function renderFileAsync(
  filename: string,
  options?: MinifyOptions,
  callback?: (err: Error | null, result?: TransformerOutput) => void
): void | Promise<TransformerOutput> {
  const read = async (): Promise<string> =>
    new Promise((resolve, reject) =>
      readFile(filename, (err, contents) => {
        if (err) {
          reject(err);
        } else {
          resolve(contents.toString());
        }
      })
    );
  if (typeof callback === 'function') {
    read()
      .then(output => renderAsync(output, options, callback) as void)
      .catch(err => callback(err));
  } else {
    return read().then(async output => renderAsync(output, options) as Promise<TransformerOutput>);
  }
}

export function can(ability: string): boolean {
  switch (ability) {
    case 'renderAsync':
    case 'renderFileAsync':
      return true;
    default:
      return false;
  }
}
