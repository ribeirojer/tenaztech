// ButtonComponent.spec.js
import { shallowMount } from '@vue/test-utils';
import Button from '../src/components/core/Button.vue';
import { describe, it, expect } from "vitest"

describe('ButtonComponent', () => {
  it('renders with default button class', () => {
    const wrapper = shallowMount(Button);
    const button = wrapper.find('button');
    expect(button.classes()).toContain('bg-blue-500');
    expect(button.classes()).toContain('hover:bg-blue-700');
    expect(button.classes()).toContain('text-white');
    expect(button.classes()).toContain('font-bold');
    expect(button.classes()).toContain('py-2');
    expect(button.classes()).toContain('px-4');
    expect(button.classes()).toContain('rounded');
  });

  it('renders with custom button class', () => {
    const customClass = 'custom-class';
    const wrapper = shallowMount(Button, {
      propsData: {
        buttonClass: customClass,
      },
    });
    const button = wrapper.find('button');
    expect(button.classes()).toContain('custom-class');
  });

  it('emits a click event when clicked', async () => {
    const wrapper = shallowMount(Button);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
});
