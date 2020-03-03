# Formival

[![npm](https://badgen.net/npm/v/formival)](https://www.npmjs.com/package/formival) 
[![size](https://badgen.net/bundlephobia/minzip/formival)](https://bundlephobia.com/result?p=formival)
[![tests](https://badgen.net/travis/formival/formival)](https://travis-ci.org/formival/formival)
[![coverage](https://badgen.net/codecov/c/gh/formival/formival)](https://codecov.io/gh/formival/formival)
[![analysis](https://img.shields.io/scrutinizer/quality/g/formival/formival?style=flat-square)](https://scrutinizer-ci.com/g/formival/formival/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/00481f2073ed4f77a1653bd397201b49)](https://app.codacy.com/gh/formival/formival)
[![vue2](https://badgen.net/badge/Vue/2.x/green)](https://vuejs.org/)
[![license](https://badgen.net/badge/license/MIT/blue)](http://opensource.org/licenses/MIT)

Automatic form generation for Vue. 
Inspired by Formly, but as idiomatic Vue. 
Making use of the awesome Vuelidate library, rather than re-inventing a new validation solution.

## Installation

```bash
npm install --save formival
```

## Usage

### Bundler (Webpack, Vue CLI, Rollup)

```js
import Vue from 'vue';
import Formival from 'formival';
Vue.use(Formival);
const formival = new Formival({
  // options
});
new Vue({
  formival,
  render: h => h(App),
}).$mount('#app');
```

As options when creating the `Formival` instance, you need to provide
input types, wrappers, and validation messages:

```js
const types = [
  {
    name: 'input',
    component: SimpleInput,
    wrappers: ['field-wrapper']
  }
];

const wrappers = [
  {
    name: 'field-wrapper',
    component: FieldWrapper
  }
];

const validationMessages = {
  required: "{{field.templateOptions.label}} is required",
  email: "{{value}} is not a valid email address"
};

const formival = new Formival({
  types,
  wrappers,
  validationMessages
});
```

Then you can make use of the `formival-form` component to
embed a form anywhere:

```html
<form @submit.prevent="onSubmit" novalidate autocomplete="off">
  <formival-form v-model="model" :validation="$v.model" :fields="fields"/>
  <button type="submit">Submit</button>
</form>
``` 

See the Docs (TBC) and [Examples](https://github.com/formival/formival-examples) repo
for more details on usage.

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<script src="formival/dist/formival.js"></script>

<!-- From CDN -->
<script src="https://unpkg.com/formival@0.1.3"></script>
```

## License

[MIT](http://opensource.org/licenses/MIT)
