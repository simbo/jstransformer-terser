import { minify, MinifyOptions } from 'terser';

import { TransformerOutput } from './transformer-output.interface';

export async function transform(input: string, options?: MinifyOptions): Promise<TransformerOutput> {
  options = {
    mangle: true,
    sourceMap: false,
    ...(options || {})
  };
  return minify(input, options).then(
    output => ({ body: output.code as string, dependencies: [] } as TransformerOutput)
  );
}
