import { render as renderFn } from './render';
import { renderAsync as renderAsyncFn } from './render-async';
import { renderFile as renderFileFn } from './render-file';
import { renderFileAsync as renderFileAsyncFn } from './render-file-async';

export const name = 'terser';
export const outputFormat = 'js';
export const inputFormats = ['js'];

export const render = renderFn;
export const renderAsync = renderAsyncFn;
export const renderFile = renderFileFn;
export const renderFileAsync = renderFileAsyncFn;

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
