import { dirname, join } from 'path';
import syncRpc from 'sync-rpc';
import { MinifyOptions } from 'terser';

import { TransformerOutput } from './transformer-output.interface';

const renderSync = syncRpc(join(dirname(__dirname), 'dist', 'render-async-proxy.js'));

export function render(input: string, options?: MinifyOptions): TransformerOutput {
  return renderSync([input, options]);
}
