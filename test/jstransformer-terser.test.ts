import { join } from 'path';

import * as transformer from '../src/jstransformer-terser';

const codeFile = join(__dirname, 'code.js');
const code = 'function add(first, second) { return first + second; }';
const codeMangled = 'function add(n,d){return n+d}';
const codeUnmangled = 'function add(first,second){return first+second}';

test('name should be "terser"', () => {
  expect(transformer.name).toBe('terser');
});

test('inputFormats should be "[\'js\']"', () => {
  expect(transformer.inputFormats).toEqual(['js']);
});

test('outputFormat should be "\'js\'"', () => {
  expect(transformer.outputFormat).toBe('js');
});

test('can() should return true for abilities', () => {
  expect(transformer.can('render')).toBe(false);
  expect(transformer.can('renderAsync')).toBe(true);
  expect(transformer.can('renderFile')).toBe(false);
  expect(transformer.can('renderFileAsync')).toBe(true);
  expect(transformer.can('compile')).toBe(false);
  expect(transformer.can('compileAsync')).toBe(false);
  expect(transformer.can('compileFile')).toBe(false);
  expect(transformer.can('compileFileAsync')).toBe(false);
});

test('renderAsync() should render using promise', done => {
  (transformer.renderAsync(code) as Promise<transformer.TransformerOutput>).then(result => {
    expect(result.body).toBe(codeMangled);
    expect(result.dependencies).toEqual([]);
    done();
  });
});

test('renderAsync() should render using promise and custom options', done => {
  (transformer.renderAsync(code, { mangle: false }) as Promise<transformer.TransformerOutput>).then(result => {
    expect(result.body).toBe(codeUnmangled);
    expect(result.dependencies).toEqual([]);
    done();
  });
});

test('renderAsync() should render using callback', done => {
  transformer.renderAsync(code, {}, (err, result) => {
    expect((result as transformer.TransformerOutput).body).toBe(codeMangled);
    expect((result as transformer.TransformerOutput).dependencies).toEqual([]);
    done();
  });
});

test('renderAsync() should error using callback', done => {
  transformer.renderAsync('...', {}, (err, result) => {
    expect(err).toBeDefined();
    expect(result).toBeUndefined();
    done();
  });
});

test('renderFileAsync() should render using promise', done => {
  (transformer.renderFileAsync(codeFile) as Promise<transformer.TransformerOutput>).then(result => {
    expect(result.body).toBe(codeMangled);
    expect(result.dependencies).toEqual([]);
    done();
  });
});

test('renderFileAsync() should render using callback', done => {
  transformer.renderFileAsync(codeFile, {}, (err, result) => {
    expect((result as transformer.TransformerOutput).body).toBe(codeMangled);
    expect((result as transformer.TransformerOutput).dependencies).toEqual([]);
    done();
  });
});

test('renderFileAsync() should error using callback', done => {
  transformer.renderFileAsync('...', {}, (err, result) => {
    expect(err).toBeDefined();
    expect(result).toBeUndefined();
    done();
  });
});
