# Formival

[![npm](https://img.shields.io/npm/v/formival.svg)](https://www.npmjs.com/package/formival) 
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
