# Formival

[![npm](https://img.shields.io/npm/v/formival)](https://www.npmjs.com/package/formival) 
[![tests](https://api.travis-ci.org/formival/formival.svg?branch=master)](https://travis-ci.org/formival/formival)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

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
<script src="https://unpkg.com/{{ name }}"></script>
```

## Development

### Launch tests

```bash
npm run dev
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```

## License

[MIT](http://opensource.org/licenses/MIT)
