import {createLocalVue, shallowMount} from "@vue/test-utils";
import FormivalArrayItem from "@/components/FormivalArrayItem";

describe('formival/components/FormivalArrayItem', () => {

  it('uses the default value', () => {
    const localVue = createLocalVue();
    const node = new localVue();
    const wrapper = shallowMount(FormivalArrayItem, {
      context: {
        props: {
          item: node.$createElement('div', {}, 'test')
        }
      }
    });
    expect(wrapper.html()).toBe('<div>test</div>');
  });
});
