import { MinifyOptions } from 'terser';

import { transform } from './transform';
import { TransformerOutput } from './transformer-output.interface';

export default function renderAsyncProxy() {
  return async ([input, options]: [string, MinifyOptions?]): Promise<TransformerOutput> => transform(input, options);
}
