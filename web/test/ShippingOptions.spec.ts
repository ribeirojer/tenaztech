import { shallowMount } from '@vue/test-utils';
import ShippingOptions from '../src/components/checkout/ShippingDetails.vue';
import { beforeEach, describe, it, expect } from "vitest"

describe('ShippingOptions', () => {
  let wrapper;
  const title = 'Escolha seu frete';
  const shipping = { zipCode: '12345678' };
  const billing = { zipCode: '87654321' };
  const products = [
    { weight: 1.2, height: 10, width: 10, length: 20 },
    { weight: 2.3, height: 15, width: 15, length: 25 }
  ];

  beforeEach(() => {
    wrapper = shallowMount(ShippingOptions, {
      propsData: {
        title,
        shipping,
        billing,
        products
      }
    });
  });

  it('renders the component with correct title', () => {
    expect(wrapper.find('h3').text()).toBe(title);
  });

  it('displays loading state initially', () => {
    wrapper.setData({ loading: true });
    expect(wrapper.find('p.text-center').text()).toBe('Carregando opções de frete...');
  });

  it('displays shipping options when available', async () => {
    wrapper.setData({
      loading: false,
      shippingOptionsCorreios: {
        valorpac: 10,
        prazopac: 5,
        valorsedex: 20,
        prazosedex: 2
      },
      shippingOptionsJadlog: {
        valoreconomico: 15,
        prazoeconomico: 7,
        valorexpresso: 25,
        prazoexpresso: 3
      }
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.shipping-option').exists()).toBe(true);
    expect(wrapper.findAll('input[type="radio"]').length).toBe(4);
  });

  it('displays error message when error occurs', async () => {
    wrapper.setData({
      loading: false,
      error: 'Erro ao carregar opções de frete.'
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.error-message').text()).toBe('Erro ao carregar opções de frete.');
  });

  it('displays no options message when no shipping options are available', async () => {
    wrapper.setData({
      loading: false,
      shippingOptionsCorreios: null,
      shippingOptionsJadlog: null
    });
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('p.text-gray-600').text()).toBe('Nenhuma opção de frete disponível para o endereço fornecido.');
  });

  it('emits next-step event with selected shipping option', async () => {
    wrapper.setData({
      loading: false,
      shippingOptionsCorreios: {
        valorpac: 10,
        prazopac: 5,
        valorsedex: 20,
        prazosedex: 2
      }
    });
    await wrapper.vm.$nextTick();
    
    wrapper.find('input[type="radio"]').setChecked();
    wrapper.find('button').trigger('click');
    
    expect(wrapper.emitted('next-step')).toBeTruthy();
    expect(wrapper.emitted('next-step')[0]).toEqual([wrapper.vm.selectedShippingOption]);
  });

  it('disables button when no shipping option is selected', () => {
    expect(wrapper.find('button').attributes('disabled')).toBe('disabled');
  });

  it('calculates total weight correctly', () => {
    expect(wrapper.vm.totalWeight).toBe(3.5);
  });

  it('calculates total height correctly', () => {
    expect(wrapper.vm.totalHeight).toBe(1.5); // 15 / 10
  });

  it('calculates total width correctly', () => {
    expect(wrapper.vm.totalWidth).toBe(1.5); // 15 / 10
  });

  it('calculates total length correctly', () => {
    expect(wrapper.vm.totalLength).toBe(2.5); // 25 / 10
  });
});
