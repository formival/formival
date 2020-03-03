import Formival from "@/";

describe('formival/formival.js', () => {
  test('constructor sets options', () => {
    const types = [];
    const wrappers = [];
    const formival = new Formival({ types, wrappers });
    expect(formival.types).toBe(types);
    expect(formival.wrappers).toBe(wrappers);
  });

  test('resolve field is a group', () => {
    const formival = new Formival({});
    const field = formival.resolveField({
      fieldGroup: []
    });
    expect(field.component).toEqual('formival-group');
  });

  test('resolve unknown field type throws error', () => {
    const formival = new Formival({});
    expect(() => formival.resolveField({ 'type': 'input' })).toThrow();
  });

  test('resolve field', () => {
    const types = [
      {
        name: 'input',
        component: 'test'
      }
    ];
    const formival = new Formival({ types });
    expect(formival.resolveField({ type: 'input' }).component).toEqual('test');
  });

  test('resolve field applies default', () => {
    const types = [
      {
        name: 'input',
        component: 'test'
      }
    ];
    const formival = new Formival({ types });
    expect(formival.resolveField({ type: 'input' }).templateOptions).toBeDefined();
  });

  test('resolve field overrides defaults', () => {
    const templateOptions = {};
    const types = [
      {
        name: 'input',
        component: 'test'
      }
    ];
    const formival = new Formival({ types });
    expect(formival.resolveField({ type: 'input', templateOptions }).templateOptions)
      .toBe(templateOptions);
  });

  test('get unknown wrapper component throws error', () => {
    const formival = new Formival({});
    expect(() => formival.getWrapperComponent('unknown')).toThrow();
  });

  test('get wrapper component', () => {
    const wrappers = [
      {
        name: 'field-group',
        component: 'test'
      }
    ];
    const formival = new Formival({ wrappers });
    expect(formival.getWrapperComponent('field-group')).toEqual('test');
  });

  test('compiles validation message into a template function', () => {
    const formival = new Formival({
      validationMessages: {
        test: 'TEST'
      }
    });
    expect(typeof formival.validationMessages['test']).toBe('function');
  });

  test('returns validation message for error by key', () => {
    const formival = new Formival({
      validationMessages: {
        test: 'TEST'
      }
    });
    const message = formival.formatErrorMessage({ test: false });
    expect(message).toBe('TEST');
  });
  test('return key if no validation message configured', () => {
    const formival = new Formival({});
    const message = formival.formatErrorMessage({ test: false });
    expect(message).toBe('test');
  });
  test('returns validation message from field config if overridden', () => {
    const formival = new Formival({});
    const field = {
      validationMessages: {
        test: 'TEST'
      }
    };
    const message = formival.formatErrorMessage({ test: false }, field);
    expect(message).toBe('TEST');
  });
  test('uses field type as key if not found in validations', () => {
    const formival = new Formival({
      validationMessages: {
        array: 'TEST'
      }
    });
    const field = {
      type: 'array'
    };
    const message = formival.formatErrorMessage({ $error: true }, field);
    expect(message).toBe('TEST');
  });
  test('uses group as key if field type or key not found and has fieldGroup', () => {
    const formival = new Formival({
      validationMessages: {
        group: 'TEST'
      }
    });
    const field = {
      fieldGroup: []
    };
    const message = formival.formatErrorMessage({ $error: true }, field);
    expect(message).toBe('TEST');
  });

});
