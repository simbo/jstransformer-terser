import { MinifyOptions } from 'terser';

import { transform } from './transform';
import { TransformerOutput } from './transformer-output.interface';

export async function renderAsync(
  input: string,
  options?: MinifyOptions,
  callback?: (err: Error | null, result?: TransformerOutput) => void
): Promise<TransformerOutput | void> {
  if (typeof callback === 'function') {
    return transform(input, options)
      .then(output => callback(null, output))
      .catch(err => callback(err));
  } else {
    return transform(input, options);
  }
}
