export default {
  name: "FormivalForm",
  functional: true,
  render(createElement, { props, listeners }) {
    return createElement('formival-group', {
      on: {
        input: v => {
          listeners.input(v);
        }
      },
      props: {
        value: props.value,
        field: {
          fieldGroup: props.fields
        },
        validation: props.validation
      }
    });
  }
};
