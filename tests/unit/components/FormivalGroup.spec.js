import {shallowMount, mount} from "@vue/test-utils";
import FormivalGroup from "@/components/FormivalGroup";

const WrappedGroup = {
  components: { FormivalGroup },
  template: `
    <div>
      <formival-group v-bind="$attrs" v-on="$listeners" />
    </div>
  `
};

describe('formival/components/FormivalGroup', () => {

  it('creates a formival-field for each field in fieldGroup', () => {
    const wrapper = mount(WrappedGroup, {
      stubs: {
        'formival-field': {
          template: '<div class="formival-field"></div>'
        }
      },
      propsData: {
        field: {
          fieldGroup: [
            {
              key: 'test1'
            },
            {
              key: 'test2'
            }
          ]
        }
      }
    });
    expect(wrapper.findAll('.formival-field').length).toBe(2);
  });

  it('responds to input event from child field', () => {
    let emittedValue = null;
    shallowMount(FormivalGroup, {
      stubs: {
        'formival-field': {
          template: '<div class="formival-field">{{ field.key }}</div>',
          props: ['field'],
          mounted() {
            this.$emit('input', 'value');
          }
        }
      },
      context: {
        on: {
          input: v => emittedValue = v
        },
        props: {
          field: {
            fieldGroup: [
              {
                key: 'test'
              }
            ]
          }
        }
      }
    });
    expect(emittedValue).toEqual({ test: 'value' });
  });

});
