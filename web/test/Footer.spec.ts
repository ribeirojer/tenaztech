import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Footer from '../src/components/Footer.vue';
import { beforeEach, describe, it, expect } from "vitest"

describe('Footer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Footer, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
  });

  it('renders footer component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct footer sections and titles', () => {
    const sectionTitles = wrapper.findAll('.footer-title').wrappers.map(w => w.text());
    const expectedTitles = ['Sobre Nós', 'Categorias', 'Informações', 'Serviço'];
    expect(sectionTitles).toEqual(expectedTitles);
  });

  it('renders correct links in Sobre Nós section', () => {
    const links = wrapper.findAll('.footer-links').at(0).findAll('li').wrappers.map(w => w.text());
    const expectedLinks = ['Sobre Nós', 'Contate-Nos', 'Política de Privacidade', 'Pedidos e Devoluções'];
    expect(links).toEqual(expectedLinks);
  });

  it('renders correct links in Categorias section', () => {
    const links = wrapper.findAll('.footer-links').at(1).findAll('li').wrappers.map(w => w.text());
    const expectedLinks = ['Ofertas', 'Laptops', 'Smartphones', 'Câmeras'];
    expect(links).toEqual(expectedLinks);
  });

  it('renders correct links in Informações section', () => {
    const links = wrapper.findAll('.footer-links').at(2).findAll('li').wrappers.map(w => w.text());
    const expectedLinks = ['Termos de Serviço', 'Minha Conta', 'Ver Carrinho', 'Lista de Desejos'];
    expect(links).toEqual(expectedLinks);
  });

  it('renders correct links in Serviço section', () => {
    const links = wrapper.findAll('.footer-links').at(3).findAll('li').wrappers.map(w => w.text());
    const expectedLinks = ['Rastrear Meu Pedido', 'Ajuda'];
    expect(links).toEqual(expectedLinks);
  });

  it('renders correct social media links', () => {
    const socialLinks = wrapper.findAll('.social-links li a').wrappers.map(w => w.attributes('href'));
    const expectedLinks = [
      'https://www.facebook.com/TenazTech',
      'https://twitter.com/TenazTech',
      'https://www.instagram.com/TenazTech',
      'https://www.linkedin.com/company/tenaztech'
    ];
    expect(socialLinks).toEqual(expectedLinks);
  });

  it('renders copyright text correctly', () => {
    const copyrightText = wrapper.find('.text-center.mt-8 p').text();
    expect(copyrightText).toBe('© 2024 TenazTech. Todos os direitos reservados.');
  });
});
