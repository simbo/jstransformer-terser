import { readFile as read } from 'fs';
import { MinifyOptions } from 'terser';

import { renderAsync } from './render-async';
import { TransformerOutput } from './transformer-output.interface';

async function readFile(filename: string): Promise<string> {
  return new Promise((resolve, reject) =>
    read(filename, (err, contents) => {
      if (err) {
        reject(err);
      } else {
        resolve(contents.toString());
      }
    })
  );
}

export async function renderFileAsync(
  filename: string,
  options?: MinifyOptions,
  callback?: (err: Error | null, result?: TransformerOutput) => void
): Promise<TransformerOutput | void> {
  if (typeof callback === 'function') {
    return readFile(filename)
      .then(async output => renderAsync(output, options, callback))
      .catch(err => callback(err));
  } else {
    return readFile(filename).then(async output => renderAsync(output, options));
  }
}
