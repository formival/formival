export default {
  name: "FormivalGroup",
  functional: true,
  render(createElement, { props, listeners }) {
    return props.field.fieldGroup
      .map(field => createElement('formival-field', {
        props: {
          field,
          value: field.key ? (props.value || {})[field.key] : props.value,
          validation: props.validation
            ? (field.key ? props.validation[field.key] : props.validation)
            : undefined
        },
        on: {
          input: v => {
            console.log('v', v);
            listeners.input(field.key ? {...props.value, [field.key]: v} : {...props.value, ...v});
          }
        }
      }));
  }
};
