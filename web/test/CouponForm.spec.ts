import { shallowMount } from '@vue/test-utils';
import CouponForm from '../src/components/cart/CouponForm.vue';
import { beforeEach, describe, it, expect } from "vitest"

describe('CouponForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CouponForm, {
      propsData: {
        couponApplied: false,
        message: '',
        success: false
      }
    });
  });

  it('renders the component correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Formulário de Cupom');
  });

  it('disables the button when loading', async () => {
    await wrapper.setData({ loading: true });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBe('disabled');
  });

  it('enables the button when there is a coupon code and not loading', async () => {
    await wrapper.setData({ couponCode: 'TESTCODE', loading: false });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('shows loading spinner in the button when loading', async () => {
    await wrapper.setData({ loading: true });
    const spinner = wrapper.find('svg.animate-spin');
    expect(spinner.exists()).toBe(true);
  });

  it('does not show loading spinner in the button when not loading', async () => {
    await wrapper.setData({ loading: false });
    const spinner = wrapper.find('svg.animate-spin');
    expect(spinner.exists()).toBe(false);
  });

  it('emits applyCoupon event with the correct coupon code', async () => {
    const couponCode = 'TESTCODE';
    await wrapper.setData({ couponCode });
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().applyCoupon).toBeTruthy();
    expect(wrapper.emitted().applyCoupon[0]).toEqual([couponCode]);
  });

  it('displays the message correctly', async () => {
    const message = 'Cupom aplicado com sucesso!';
    await wrapper.setProps({ message, success: true });
    expect(wrapper.find('p').text()).toBe(message);
    expect(wrapper.find('p').classes()).toContain('text-green-500');
  });

  it('displays the error message correctly', async () => {
    const message = 'Cupom inválido!';
    await wrapper.setProps({ message, success: false });
    expect(wrapper.find('p').text()).toBe(message);
    expect(wrapper.find('p').classes()).toContain('text-red-500');
  });
});
