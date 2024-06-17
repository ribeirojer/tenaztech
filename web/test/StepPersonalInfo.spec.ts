import { shallowMount } from '@vue/test-utils';
import PersonalInfoForm from '../src/components/checkout/StepPersonalInfo.vue';
import { beforeEach, describe, it, expect } from "vitest"

describe('PersonalInfoForm', () => {
  let wrapper;
  const personalInfo = {
    name: '',
    email: '',
    tel: '',
    createAccount: false,
    password: ''
  };

  beforeEach(() => {
    wrapper = shallowMount(PersonalInfoForm, {
      propsData: {
        personalInfo
      }
    });
  });

  it('renders the form with all fields', () => {
    expect(wrapper.find('h3').text()).toBe('Informações Pessoais');
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="tel"]').exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
  });

  it('validates fields and displays error messages', async () => {
    await wrapper.setData({ personalInfo: { name: '', email: 'invalid-email', tel: '123', createAccount: true, password: 'weak' } });

    wrapper.vm.nextStep();

    await wrapper.vm.$nextTick();

    expect(wrapper.find('p.text-red-500').exists()).toBe(true);
    expect(wrapper.vm.errors.name).toBe('O campo Nome é obrigatório.');
    expect(wrapper.vm.errors.email).toBe('Por favor, insira um endereço de e-mail válido.');
    expect(wrapper.vm.errors.tel).toBe('O campo Telefone deve ter entre 10 e 14 dígitos.');
    expect(wrapper.vm.errors.password).toBe('A senha é fraca. Deve conter pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
  });

  it('does not show password field when createAccount is false', async () => {
    await wrapper.setData({ personalInfo: { createAccount: false } });
    expect(wrapper.find('input[type="password"]').exists()).toBe(false);
  });

  it('shows password field when createAccount is true', async () => {
    await wrapper.setData({ personalInfo: { createAccount: true } });
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('emits next-step event with valid data', async () => {
    await wrapper.setData({
      personalInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        tel: '1234567890',
        createAccount: false
      },
      errors: {}
    });

    wrapper.vm.nextStep();

    expect(wrapper.emitted('next-step')).toBeTruthy();
    expect(wrapper.emitted('next-step')[0]).toEqual([wrapper.vm.personalInfo]);
  });

  it('focuses on the first invalid field when there are errors', async () => {
    await wrapper.setData({ personalInfo: { name: '', email: '', tel: '', createAccount: true, password: '' } });

    wrapper.vm.nextStep();

    expect(wrapper.vm.errors.name).toBe('O campo Nome é obrigatório.');
    expect(wrapper.vm.$refs.nameInput).toBe(document.activeElement);
  });
});
