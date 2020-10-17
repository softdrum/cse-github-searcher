import { shallowMount, createLocalVue, } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import "babel-polyfill";
import { BootstrapVue, BFormInput, BButton, BFormSelect, BIcon } from 'bootstrap-vue';

// import testing component
import SearchBar from '@/components/search/TheSearchBar';

const localVue = createLocalVue();

// adding bootstrap-vue and vue-router to local vue instance
localVue.use(BootstrapVue);
localVue.use(VueRouter);

Vue.component('b-form-input', BFormInput);
Vue.component('b-icon', BIcon);
Vue.component('b-button', BButton);
Vue.component('b-form-select', BFormSelect);

// define test props data
const testPropsData = {
  value: {
    input: '',
    selectValue: '',
  },
  sortOptions: [
    {
      value: 'desc',
      text: 'Desc',
      selected: true
    }, 
    {
      value: 'asc',
      text: 'Asc',
    }
  ],
  loading: false
}

describe('SearchBar', () => {
  // mount component with test props
  // and stubbed router-link
  const wrapper = shallowMount(SearchBar, {
    propsData: testPropsData,
  });

  it('has b-form-input', () => {
    const input = wrapper.findComponent({name: 'BFormInput'});
    expect(input.exists()).toBe(true);
  });

  it('has search button', () => {
    const searchButton = wrapper.find('.search-button');
    expect(searchButton.exists()).toBe(true);
  });

  it('form select exists when prop sortOption is not empty array', () => {
    const formSelect = wrapper.findComponent({name: 'BFormSelect'});
    expect(formSelect.exists()).toBe(true);
  });

  it('form select does not exists when prop sortOption is empty array', async () => {
    const formSelect = wrapper.findComponent({name: 'BFormSelect'});
    await wrapper.setProps({sortOptions: []});
    expect(formSelect.exists()).toBe(false);
  });

  it('changes prop :value on b-form-input change', async () => {
    // set computed property that is bounded to b-form-input via v-model
    // because jest can not catch any b-form-input events
    wrapper.vm.searchQuery.input = 'test';
    // wait for input event
    wrapper.vm.$nextTick();
    // check prop value
    expect(wrapper.props().value.input).toBe('test');
  })
})