import { readFileSync } from 'fs';
import { MinifyOptions } from 'terser';

import { render } from './render';
import { TransformerOutput } from './transformer-output.interface';

function readFile(filename: string): string {
  const contents = readFileSync(filename);
  return contents.toString();
}

export function renderFile(filename: string, options?: MinifyOptions): TransformerOutput {
  const input = readFile(filename);
  return render(input, options);
}
