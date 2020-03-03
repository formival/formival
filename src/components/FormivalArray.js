export default {
  name: "FormivalArray",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    field: {
      required: true
    },
    validation: {
      type: Object,
      default: () => undefined
    }
  },
  methods: {
    addItem() {
      this.$emit('input', [...this.value || [], undefined]);
    },
    removeItem(index) {
      this.$emit('input', [
        ...this.value.slice(0, index),
        ...this.value.slice(index + 1)
      ]);
    },
    updateValue(index, v) {
      this.value.splice(index, 1, v);
    }
  },
  render(createElement) {
    return createElement('div', {}, [
      ...this.value.map((fieldValue, index) => {
        const validation = this.validation ? this.validation.$each[`${index}`] : undefined;
        return this.$scopedSlots.field({
          removeItem: () => this.removeItem(index),
          item: createElement('formival-field', {
            props: {
              value: fieldValue,
              field: this.field.field,
              validation
            },
            on: {
              input: value => this.updateValue(index, value)
            }
          })
        });
      }),
      ...this.$scopedSlots.default({
        addItem: () => this.addItem()
      })
    ]);
  }
};
