import { minify, MinifyOptions } from 'terser';

import { parseMinifyOptions } from './parse-minify-options';
import { TransformerOutput } from './transformer-output.interface';

export async function transform(input: string, options?: MinifyOptions): Promise<TransformerOutput> {
  options = parseMinifyOptions(options);
  return minify(input, options).then(
    output => ({ body: output.code as string, dependencies: [] } as TransformerOutput)
  );
}
