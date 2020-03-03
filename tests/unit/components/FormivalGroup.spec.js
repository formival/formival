import {shallowMount} from "@vue/test-utils";
import FormivalGroup from "@/components/FormivalGroup";

describe('formival/components/FormivalGroup', () => {

  it('creates a formival-field for each field in fieldGroup', () => {
    const wrapper = shallowMount(FormivalGroup, {
      stubs: {
        FormivalField: {
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
    const wrapper = shallowMount(FormivalGroup, {
      stubs: {
        FormivalField: {
          template: '<div></div>',
          mounted() {
            this.$emit('input', 'value');
          }
        }
      },
      propsData: {
        field: {
          fieldGroup: [
            {
              key: 'test'
            }
          ]
        }
      }
    });
    expect(wrapper.emitted().input[0]).toEqual([{ test: 'value' }]);
  });

});
