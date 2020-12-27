import { join } from 'path';

import {
  can,
  inputFormats,
  name,
  outputFormat,
  render,
  renderAsync,
  renderFile,
  renderFileAsync
} from '../src/jstransformer-terser';
import { parseMinifyOptions } from '../src/parse-minify-options';
import { TransformerOutput } from '../src/transformer-output.interface';

const codeFile = join(__dirname, 'code.js');
const code = 'function add(first, second) { return first + second; }';
const codeMangled = 'function add(n,d){return n+d}';
const codeUnmangled = 'function add(first,second){return first+second}';

test('name should be "terser"', () => {
  expect(name).toBe('terser');
});

test('inputFormats should be "[\'js\']"', () => {
  expect(inputFormats).toEqual(['js']);
});

test('outputFormat should be "\'js\'"', () => {
  expect(outputFormat).toBe('js');
});

test('can() should return true for abilities', () => {
  expect(can('render')).toBe(true);
  expect(can('renderAsync')).toBe(true);
  expect(can('renderFile')).toBe(true);
  expect(can('renderFileAsync')).toBe(true);
  expect(can('compile')).toBe(false);
  expect(can('compileAsync')).toBe(false);
  expect(can('compileFile')).toBe(false);
  expect(can('compileFileAsync')).toBe(false);
});

test('renderAsync() should render using promise', done => {
  (renderAsync(code) as Promise<TransformerOutput>).then((result: TransformerOutput) => {
    expect(result.body).toBe(codeMangled);
    expect(result.dependencies).toEqual([]);
    done();
  });
});

test('renderAsync() should render using promise and custom options', done => {
  (renderAsync(code, { mangle: false }) as Promise<TransformerOutput>).then((result: TransformerOutput) => {
    expect(result.body).toBe(codeUnmangled);
    expect(result.dependencies).toEqual([]);
    done();
  });
});

test('renderAsync() should error using promise and invalid code', done => {
  (renderAsync('return') as Promise<TransformerOutput>).catch(err => {
    expect(err).toBeDefined();
    done();
  });
});

test('renderAsync() should render using callback', done => {
  renderAsync(code, {}, (err, result) => {
    expect((result as TransformerOutput).body).toBe(codeMangled);
    expect((result as TransformerOutput).dependencies).toEqual([]);
    done();
  });
});

test('renderAsync() should error using callback and invalid code', done => {
  renderAsync('return', {}, (err, result) => {
    expect(err).toBeDefined();
    expect(result).toBeUndefined();
    done();
  });
});

test('renderFileAsync() should render using promise', done => {
  (renderFileAsync(codeFile) as Promise<TransformerOutput>).then((result: TransformerOutput) => {
    expect(result.body).toBe(codeMangled);
    expect(result.dependencies).toEqual([]);
    done();
  });
});

test('renderFileAsync() should error using promise and invalid filename', done => {
  (renderFileAsync('XXX') as Promise<TransformerOutput>).catch(err => {
    expect(err).toBeDefined();
    done();
  });
});

test('renderFileAsync() should render using callback', done => {
  renderFileAsync(codeFile, {}, (err, result) => {
    expect((result as TransformerOutput).body).toBe(codeMangled);
    expect((result as TransformerOutput).dependencies).toEqual([]);
    done();
  });
});

test('renderFileAsync() should error using callback and invalid filename', done => {
  renderFileAsync('XXX', {}, (err, result) => {
    expect(err).toBeDefined();
    expect(result).toBeUndefined();
    done();
  });
});

test('render() should render', () => {
  const result = render(code);
  expect(result.body).toBe(codeMangled);
});

test('render() should render using custom options', () => {
  const result = render(code, { mangle: false });
  expect(result.body).toBe(codeUnmangled);
});

test('render() should error using invalid code', () => {
  try {
    expect((() => render('return'))()).toThrow();
  } catch (err) {
    return;
  }
});

test('renderFile() should render', () => {
  const result = renderFile(codeFile);
  expect(result.body).toBe(codeMangled);
});

test('renderFile() should error using invalid filename', () => {
  try {
    expect((() => renderFile('XXX'))()).toThrow();
  } catch (err) {
    return;
  }
});

test('parseMinifyOptions() should remove unknown options', () => {
  const options = parseMinifyOptions({ foo: 'bar' } as any) as any;
  expect(options.foo).toBeUndefined();
});
