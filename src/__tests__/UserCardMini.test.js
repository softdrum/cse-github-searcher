import { shallowMount, createLocalVue, } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, BAvatar } from 'bootstrap-vue';
import BaseCard from '@/components/cards/BaseCard';

// import testing component
import UserCardMini from '@/components/cards/UserCardMini';

const localVue = createLocalVue();

// adding bootstrap-vue and vue-router to local vue instance
localVue.use(BootstrapVue);
localVue.use(VueRouter);

// register global components
Vue.component('base-card', BaseCard);
Vue.component('b-avatar', BAvatar);

// define test props data
const testPropsData = {
  login: 'TestaUser',
  id: 1,
  avatarURL: '',
}

describe('UserCardMini', () => {
  // mount component with test props
  // and stubbed router-link
  const wrapper = shallowMount(UserCardMini, {
    propsData: testPropsData,
    stubs: ['router-link']
  });

  it('has user login name span with', () => {
    const span = wrapper.find('span');
    expect(span.exists()).toBe(true);
  })
  it('user login is displayed correctly', () => {
    const span = wrapper.find('span');
    expect(span.text()).toBe(testPropsData.login);
  })

  it('has user id small', () => {
    const small = wrapper.find('small');
    expect(small.exists()).toBe(true);
  })
  it('user id is displayed correctly', () => {
    const small = wrapper.find('small');
    expect(parseInt(small.text())).toBe(testPropsData.id);
  })

  it('has router-link with correct :to property', () => {
    const routerLink = wrapper.find('.user-link');
    expect(routerLink.exists()).toBe(true);
    expect((routerLink.attributes()).to).toBe(`/user/${testPropsData.login}`);
  })
})