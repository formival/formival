import Formival from "@/";
import {createLocalVue, mount} from "@vue/test-utils";

describe('formival/install.js', () => {
  test('adds the uniqueId getter to Vue', () => {
    const localVue = createLocalVue();
    localVue.use(Formival);
    const node = new localVue();
    expect(typeof node.uniqueId).toBe('number');
  });

  test('throws if unique Id is not available', () => {
    const localVue = createLocalVue();
    localVue.use(Formival);
    const node = new localVue();
    delete(node._uid);
    expect(() => node.uniqueId).toThrow();
  });

  test('adds the focus directive to Vue', () => {
    const localVue = createLocalVue();
    localVue.use(Formival);
    const testComponent = {
      template: `<input v-focus="true" />`
    };
    const wrapper = mount(testComponent, {
      localVue,
      attachToDocument: true
    });
    const input = wrapper.find('input').element;
    expect(input).toBe(document.activeElement);
    wrapper.destroy();
  });

  test('makes the Formival object available on Vue object', () => {
    const localVue = createLocalVue();
    localVue.use(Formival);
    const formival = new Formival({});
    const node = new localVue({ formival });
    expect(node.$formival).toBe(formival);
  });

  test('makes the Formival object available on node from parent', () => {
    const localVue = createLocalVue();
    localVue.use(Formival);
    const formival = new Formival({});
    const testComponentA = {
      template: `<testComponentB>Test DIV</testComponentB>`
    };
    const testComponentB = {
      render: h => h('div')
    };
    const wrapper = mount(testComponentA, {
      components: {
        testComponentB
      },
      localVue, formival
    });
    expect(wrapper.find(testComponentB).vm.$formival).toBe(formival);
  });

});
