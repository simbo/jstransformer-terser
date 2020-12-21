import * as transformer from '../src/jstransformer-terser';

const codeFile = './code.js';
const code = 'function add(first, second) { return first + second; }';
const codeMangled = 'function add(first, second) { return first + second; }';

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
  expect(transformer.can('render')).toBe(true);
  expect(transformer.can('renderAsync')).toBe(true);
  expect(transformer.can('renderFile')).toBe(true);
  expect(transformer.can('renderFileAsync')).toBe(true);
  expect(transformer.can('compile')).toBe(false);
  expect(transformer.can('foo')).toBe(false);
});

test('render() should render', () => {
  const result = transformer.render(code);
  expect(result.body).toBe(codeMangled);
  expect(result.dependencies).toEqual([]);
});

test('renderAsync() should render', done => {
  (transformer.renderAsync(code) as Promise<transformer.TransformerOutput>).then(result => {
    expect(result.body).toBe(codeMangled);
    expect(result.dependencies).toEqual([]);
    done();
  });
});

test('renderFile() should render', () => {
  const result = transformer.renderFile(codeFile);
  expect(result.body).toBe(codeMangled);
  expect(result.dependencies).toEqual([]);
});

test('renderFileAsync() should render', done => {
  (transformer.renderFileAsync(codeFile) as Promise<transformer.TransformerOutput>).then(result => {
    expect(result.body).toBe(codeMangled);
    expect(result.dependencies).toEqual([]);
    done();
  });
});
