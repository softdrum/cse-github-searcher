import { shallowMount, createLocalVue, } from '@vue/test-utils';
import { BootstrapVue, BIcon } from 'bootstrap-vue';
import Vue from 'vue';
import Vuex from 'vuex';

// import testing component
import MessageBox from '@/components/MessageBox';

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(Vuex);

Vue.component('b-icon', BIcon);

describe('MessageBox', () => {
  let store;
  let state = {
    errorMessage: '',
    infoMessage: '',
  };
  it('shows error message and div.info-box is not exists', () => {
    state.errorMessage = 'Error';
    store = new Vuex.Store({
      modules: {
        message: {
          state,
        }
      }
    })
    const wrapper = shallowMount(MessageBox, { store, localVue });
    const errorBox = wrapper.find('.error-box');
    const infoBox = wrapper.find('.info-box');
    const h1 = wrapper.find('h1');
    expect(errorBox.exists()).toBe(true);
    expect(infoBox.exists()).toBe(false);
    expect(h1.exists()).toBe(true);
    expect(h1.text()).toBe(state.errorMessage);
  })
  
  it('shows info message and div.error-box is not exists', () => {
    state.errorMessage = '';
    state.infoMessage = 'Info';
    store = new Vuex.Store({
      modules: {
        message: {
          state,
        }
      }
    })
    const wrapper = shallowMount(MessageBox, { store, localVue });
    const errorBox = wrapper.find('.error-box');
    const infoBox = wrapper.find('.info-box');
    const h5 = wrapper.find('h5');
    expect(errorBox.exists()).toBe(false);
    expect(infoBox.exists()).toBe(true);
    expect(h5.exists()).toBe(true);
    expect(h5.text()).toBe(state.infoMessage);
  })

  it('shows only errorMessage even if infoMessage is not empty string', () => {
    state.errorMessage = 'Error message';
    state.infoMessage = 'Info message';
    store = new Vuex.Store({
      modules: {
        message: {
          state,
        }
      }
    })
    const wrapper = shallowMount(MessageBox, { store, localVue });
    const errorBox = wrapper.find('.error-box');
    const infoBox = wrapper.find('.info-box');
    const h1 = wrapper.find('h1');
    expect(errorBox.exists()).toBe(true);
    expect(infoBox.exists()).toBe(false);
    expect(h1.exists()).toBe(true);
    expect(h1.text()).toBe(state.errorMessage);
  })
})