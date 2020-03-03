import {shallowMount} from "@vue/test-utils";
import FormivalArray from "@/components/FormivalArray";

describe('formival/components/FormivalArray', () => {

  it('uses the default value', () => {
    const wrapper = shallowMount(FormivalArray, {
      scopedSlots: {
        field: '<div class="formival-field"></div>',
        default: '<div></div>'
      },
      propsData: {
        field: {}
      }
    });
    expect(wrapper.findAll('.formival-field').length).toBe(0);
  });

  it('uses the value prop', () => {
    const wrapper = shallowMount(FormivalArray, {
      scopedSlots: {
        field: '<div class="formival-field"></div>',
        default: '<div></div>'
      },
      propsData: {
        value: [1,2,3],
        field: {}
      }
    });
    expect(wrapper.findAll('.formival-field').length).toBe(3);
  });

  it('creates a formival field for each item in the value array', () => {
    const wrapper = shallowMount(FormivalArray, {
      stubs: {
        'formival-field': true
      },
      scopedSlots: {
        field: ({item}) => item,
        default: '<div></div>'
      },
      propsData: {
        value: ['one', 'two'],
        field: {}
      }
    });
    expect(wrapper.findAll('formival-field-stub').length).toBe(2);
  });

  it('responds to input event from child field item', () => {
    const value = ['one'];
    const wrapper = shallowMount(FormivalArray, {
      stubs: {
        'formival-field': {
          template: '<div>Field</div>',
          mounted() {
            this.$emit('input', 'value');
          }
        }
      },
      scopedSlots: {
        field: ({item}) => item,
        default: '<div></div>'
      },
      propsData: {
        value,
        field: {}
      }
    });
    expect(wrapper.isVisible()).toBe(true);
    expect(value).toEqual(['value']);
  });

  it('adds an element to the value array when button is clicked', () => {
    const value = [];
    const wrapper = shallowMount(FormivalArray, {
      scopedSlots: {
        field: ({ item }) => item,
        default: '<button class="add-button" @click="props.addItem">ADD</button>'
      },
      propsData: {
        value,
        field: {}
      }
    });
    wrapper.find('.add-button').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([[undefined]]);
  });

  it('removes the correct element from the value array', () => {
    const value = [1, 2, 3];
    const wrapper = shallowMount(FormivalArray, {
      scopedSlots: {
        field: '<button class="remove-button" @click="props.removeItem">REMOVE</button>',
        default: '<div></div>'
      },
      propsData: {
        value,
        field: {}
      }
    });
    wrapper.findAll('.remove-button').at(0).trigger('click');
    wrapper.findAll('.remove-button').at(1).trigger('click');
    wrapper.findAll('.remove-button').at(2).trigger('click');
    expect(wrapper.emitted().input[0][0]).toStrictEqual([2,3]);
    expect(wrapper.emitted().input[1][0]).toStrictEqual([1,3]);
    expect(wrapper.emitted().input[2][0]).toStrictEqual([1,2]);
  });

});
