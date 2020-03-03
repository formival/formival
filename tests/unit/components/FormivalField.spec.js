import {shallowMount} from "@vue/test-utils";
import FormivalField from "@/components/FormivalField";

const $formival = {
  resolveField: field => field,
  getWrapperComponent: name => name,
  formatErrorMessage: () => ''
};

describe('formival/components/FormivalField', () => {

  it('creates the inner field component', () => {
    const wrapper = shallowMount(FormivalField, {
      propsData: {
        field: {
          type: 'input',
          component: 'inner-field'
        }
      },
      stubs: {
        'inner-field': true
      },
      mocks: { $formival }
    });
    expect(wrapper.findAll('inner-field-stub').length).toBe(1);
  });

  it('adds wrapper components', () => {
    const wrapper = shallowMount(FormivalField, {
      propsData: {
        field: {
          wrappers: ['test-wrapper']
        }
      },
      stubs: {
        'test-wrapper': true
      },
      mocks: { $formival }
    });
    expect(wrapper.findAll('test-wrapper-stub').length).toBe(1);
  });

  it('responds to input event from inner field component', () => {
    const wrapper = shallowMount(FormivalField, {
      propsData: {
        field: {
          type: 'input',
          component: 'inner-field'
        }
      },
      stubs: {
        'inner-field': {
          template: '<div></div>',
          mounted() {
            this.$emit('input', 'value');
          }
        }
      },
      mocks: { $formival }
    });

    expect(wrapper.emitted().input[0]).toEqual(['value']);
  });

  it('responds to touched event from inner field component', () => {
    const mockCallback = jest.fn(() => {});
    shallowMount(FormivalField, {
      propsData: {
        field: {
          type: 'input',
          component: 'inner-field'
        },
        validation: {
          $touch: mockCallback
        }
      },
      stubs: {
        'inner-field': {
          template: '<div></div>',
          mounted() {
            this.$emit('touched');
          }
        }
      },
      mocks: { $formival }
    });
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('responds to reset event from inner field component', () => {
    const mockCallback = jest.fn(() => {});
    shallowMount(FormivalField, {
      propsData: {
        field: {
          type: 'input',
          component: 'inner-field'
        },
        validation: {
          $reset: mockCallback
        }
      },
      stubs: {
        'inner-field': {
          template: '<div></div>',
          mounted() {
            this.$emit('reset');
          }
        }
      },
      mocks: { $formival }
    });
    expect(mockCallback.mock.calls.length).toBe(1);
  });

});
