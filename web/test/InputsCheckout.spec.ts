import { shallowMount } from '@vue/test-utils';
import InputsCheckout from '../src/components/checkout/InputsCheckout.vue';
import Input from '../src/components/core/Input.vue';
import { beforeEach, vi, describe, it, expect } from "vitest"

describe('InputsCheckout', () => {
  let wrapper;

  const propsData = {
    title: 'Formulário de Teste',
    info: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      tel: '1234567890'
    },
    setInfo: vi.fn(),
    errorInfo: {
      firstName: '',
      lastName: '',
      email: '',
      tel: ''
    },
    refsInfo: {
      firstName: vi.fn(),
      lastName: vi.fn(),
      email: vi.fn(),
      tel: vi.fn()
    },
    errorEmailRegex: '',
    handleSubmitCep: vi.fn()
  };

  beforeEach(() => {
    wrapper = shallowMount(InputsCheckout, {
      propsData
    });
  });

  it('renders the title', () => {
    const title = wrapper.find('h2').text();
    expect(title).toBe(propsData.title);
  });

  it('renders the correct number of Input components', () => {
    const inputs = wrapper.findAllComponents(Input);
    expect(inputs.length).toBe(4); // Verifica se há 4 componentes Input
  });

  it('passes the correct props to the Input components', () => {
    const inputs = wrapper.findAllComponents(Input);

    // Verifica as props do primeiro Input (Primeiro nome)
    expect(inputs.at(0).props()).toMatchObject({
      id: 'first-name',
      label: 'Primeiro nome',
      type: 'text',
      placeholder: 'Primeiro nome',
      value: propsData.info.firstName,
      error: propsData.errorInfo.firstName,
      inputRef: propsData.refsInfo.firstName
    });

    // Verifica as props do segundo Input (Último nome)
    expect(inputs.at(1).props()).toMatchObject({
      id: 'last-name',
      label: 'Último nome',
      type: 'text',
      placeholder: 'Último nome',
      value: propsData.info.lastName,
      error: propsData.errorInfo.lastName,
      inputRef: propsData.refsInfo.lastName
    });

    // Verifica as props do terceiro Input (E-mail)
    expect(inputs.at(2).props()).toMatchObject({
      id: 'email',
      label: 'E-mail',
      type: 'email',
      placeholder: 'exemplo@email.com',
      value: propsData.info.email,
      error: propsData.errorInfo.email,
      inputRef: propsData.refsInfo.email
    });

    // Verifica as props do quarto Input (Número do celular)
    expect(inputs.at(3).props()).toMatchObject({
      id: 'tel',
      label: 'Número do celular',
      type: 'text',
      placeholder: '(12) 98765-4321',
      value: propsData.info.tel,
      error: propsData.errorInfo.tel,
      inputRef: propsData.refsInfo.tel
    });
  });

  it('renders email validation error message when errorEmailRegex is set', () => {
    wrapper.setProps({ errorEmailRegex: 'Digite um e-mail válido.' });
    const emailError = wrapper.find('p.text-red-500');
    expect(emailError.exists()).toBe(true);
    expect(emailError.text()).toBe('Digite um e-mail válido.');
  });
});
