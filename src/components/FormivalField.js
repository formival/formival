export default {
  name: "FormivalField",
  props: {
    value: {},
    field: {
      type: Object,
      required: true
    },
    validation: {
      type: Object
    }
  },
  computed: {
    validationStatus() {
      return {
        validation: this.validation,
        hasError: this.validation && this.validation.$error,
        errorMessage: this.validation &&
          this.$formival.formatErrorMessage(this.validation, this.field, this.value)
      };
    }
  },
  render(createElement) {
    const field = this.$formival.resolveField(this.field);
    const innerElement = createElement(field.component, {
      on: {
        input: v => {
          this.$emit('input', v);
        },
        touched: () => {
          this.validation && this.validation.$touch();
        },
        reset: () => {
          this.validation && this.validation.$reset();
        }
      },
      props: {
        field,
        id: `field-${this.uniqueId}`,
        value: this.value,
        ...this.validationStatus
      }
    });

    return (field.wrappers || []).reduce((child, wrapperName) => {
      return createElement(
        this.$formival.getWrapperComponent(wrapperName), {
          props: {
            field,
            id: `field-${this.uniqueId}`,
            ...this.validationStatus
          }
        }, [child]
      );
    }, innerElement);
  }
};
