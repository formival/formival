import FormivalForm from "./components/FormivalForm";
import FormivalGroup from "./components/FormivalGroup";
import FormivalField from "./components/FormivalField";
import FormivalArray from "./components/FormivalArray";
import FormivalArrayItem from "./components/FormivalArrayItem";

export function install(Vue) {
  // Unique Identifier - used to calculate unique field IDs
  // We're relying on an internal API here, so this check allows us
  // to easily patch this in the future, if Vue changes it's internals
  // and the `_uid` property is removed.
  Object.defineProperty(Vue.prototype, 'uniqueId', {
    get: function () {
      if ('_uid' in this) {
        return this._uid;
      }
      throw new Error('Required _uid property does not exist');
    }
  });

  // A directive that can be used on an input to automatically give it focus
  Vue.directive('focus', {
    inserted: (el, { value }) => {
      if (value) {
        el.focus();
      }
    }
  });

  // Make the Formival object available on all elements via `this.$formival`
  Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      if (options.formival) {
        this.$formival = options.formival;
      } else if (options.parent && options.parent.$formival) {
        this.$formival = options.parent.$formival;
      }
    }
  });

  // Install the Formival components
  Vue.component('FormivalForm', FormivalForm);
  Vue.component('FormivalGroup', FormivalGroup);
  Vue.component('FormivalField', FormivalField);
  Vue.component('FormivalArray', FormivalArray);
  Vue.component('FormivalArrayItem', FormivalArrayItem);
}
