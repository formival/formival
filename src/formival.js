import template from 'lodash.template';
import templateSettings from 'lodash.templatesettings';

templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export default class Formival {
  static fieldDefaults = {
    templateOptions: {}
  };

  constructor(options) {
    // console.log('constructor', options);
    this.types = options.types || [];
    this.wrappers = options.wrappers || [];
    this.validationMessages = Object.keys(options.validationMessages || {}).reduce((a, key) => {
      a[key] = this.compileTemplate(options.validationMessages[key]);
      return a;
    }, {});
  }

  compileTemplate(string) {
    return template(string);
  }

  resolveField(field) {
    // console.log('resolveField', field);
    if (!field.type && field.fieldGroup) {
      return {...field, component: 'formival-group'};
    }
    const fieldType = this.types.find(({name}) => name === field.type);
    if (!fieldType || !fieldType.component) {
      throw new Error(`Component for field ${field.type} is not configured`);
    }
    return {...Formival.fieldDefaults, ...fieldType, ...field};
  }

  getWrapperComponent(wrapperName) {
    // console.log('getWrapperComponent', wrapperName);
    const wrapper = this.wrappers.find(({name}) => name === wrapperName);
    if (!wrapper || !wrapper.component) {
      throw new Error(`Component for wrapper ${wrapperName} is not configured`);
    }
    return wrapper.component;
  }

  formatErrorMessage(validations, field, value) {
    let key = Object.keys(validations).find(key => !key.startsWith('$') && !validations[key]);
    if (!key) {
      if (field.type) {
        key = field.type;
      }
      if (!field.type && field.fieldGroup) {
        key = 'group';
      }
    }
    if (field && field.validationMessages && field.validationMessages[key]) {
      return this.compileTemplate(field.validationMessages[key])({key, field, value});
    }
    if (!this.validationMessages[key]) {
      return `${key}`;
    }
    return this.validationMessages[key]({key, field, value});
  }

}
