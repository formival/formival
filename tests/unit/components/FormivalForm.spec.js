import FormivalForm from '@/components/FormivalForm';
import { shallowMount } from '@vue/test-utils';

describe('formival/components/FormivalForm', () => {

  it('creates a formival-group', () => {
    const wrapper = shallowMount(FormivalForm, {
      stubs: {
        'formival-group': true
      }
    });
    expect(wrapper.contains('formival-group-stub')).toBe(true);
  });

  it('passes the value prop to the group', () => {
    const value = { test: 'testing' };
    const wrapper = shallowMount(FormivalForm, {
      stubs: {
        'formival-group': {
          props: ['value'],
          template: '<div class="formival-group-stub"></div>'
        }
      },
      context: {
        props: { value }
      }
    });
    expect(wrapper.find('.formival-group-stub').vm.value).toBe(value);
  });

  it('responds to the input event from the group', () => {
    const wrapper = shallowMount(FormivalForm, {
      context: {
        on: {
          input: v => console.log(v)
        }
      },
      stubs: {
        'formival-group': {
          template: '<div></div>',
          mounted () {
            this.$emit('input', 'test');
          }
        }
      }
    });
    expect(wrapper.emitted().input[0]).toEqual(['test']);
  });

});
