export default {
  name: "FormivalGroup",
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    field: {
      type: Object,
      required: true
    },
    validation: {
      type: Object
    }
  },
  render(createElement) {
    const fieldElements = this.field.fieldGroup
      .map(field => createElement('formival-field', {
        props: {
          field,
          value: field.key ? this.value[field.key] : this.value,
          validation: this.validation
            ? (field.key ? this.validation[field.key] : this.validation)
            : undefined
        },
        on: {
          input: v => {
            this.$emit('input', field.key ? {...this.value, [field.key]: v} : {...this.value, ...v});
          }
        }
      }));
    return createElement('div', {}, fieldElements);
  }
};
