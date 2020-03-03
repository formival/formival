export default {
  name: "FormivalForm",
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    fields: {
      type: Array,
      default: () => []
    },
    validation: {
      type: Object
    }
  },
  render(createElement) {
    return createElement('formival-group', {
      on: {
        input: v => {
          this.$emit('input', v);
        }
      },
      props: {
        value: this.value,
        field: {
          fieldGroup: this.fields
        },
        validation: this.validation
      }
    });
  }
};
