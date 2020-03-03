import FormivalForm from "@/components/FormivalForm";
import {shallowMount} from "@vue/test-utils";

describe('formival/components/FormivalForm', () => {

  it('creates a formival-group', () => {
    const wrapper = shallowMount(FormivalForm, {
      stubs: {
        'formival-group': true
      }
    });
    expect(wrapper.contains('formival-group-stub')).toBe(true);
  });

  it('passes passes the value prop to the group', () => {
    const value = {test: 'testing'};
    const wrapper = shallowMount(FormivalForm, {
      stubs: {
        'formival-group': true
      },
      propsData: {value}
    });
    expect(wrapper.find('formival-group-stub').vm.value).toBe(value);
  });

  it('responds to the input event from the group', () => {
    const wrapper = shallowMount(FormivalForm, {
      stubs: {
        FormivalGroup: {
          template: '<div></div>',
          mounted() {
            this.$emit('input', 'test');
          }
        }
      }
    });
    expect(wrapper.emitted().input[0]).toEqual(['test']);
  });

});
