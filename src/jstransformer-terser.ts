import deasync from 'deasync';
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

export function render(input: string, options?: MinifyOptions): TransformerOutput {
  return deasync(renderAsync)(input, options);
}

export function renderFileAsync(
  input: string,
  options?: MinifyOptions,
  callback?: (err: Error | null, result?: TransformerOutput) => void
): void | Promise<TransformerOutput> {
  return renderAsync(input, options, callback);
}

export function renderFile(input: string, options?: MinifyOptions): TransformerOutput {
  return deasync(renderFileAsync)(input, options);
}

export function can(ability: string): boolean {
  switch (ability) {
    case 'render':
    case 'renderAsync':
    case 'renderFile':
    case 'renderFileAsync':
      return true;
    default:
      return false;
  }
}
