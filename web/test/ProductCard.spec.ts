import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import ProductCard from '../src/components/ProductCard.vue';
import StarIcon from '../src/components/icons/StarIcon.vue';
import { beforeEach, describe, it, expect } from "vitest"

describe('ProductCard', () => {
  let wrapper;
  const product = {
    name: 'Produto Teste',
    images: ['https://via.placeholder.com/400x300'],
    price: 199.99,
    rating: 4,
    slug: 'produto-teste'
  };

  beforeEach(() => {
    wrapper = shallowMount(ProductCard, {
      props: { product },
      stubs: {
        RouterLink: RouterLinkStub,
        StarIcon: StarIcon
      }
    });
  });

  it('renders product card component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders product name', () => {
    const productName = wrapper.find('h3').text();
    expect(productName).toBe(product.name);
  });

  it('renders product image with correct src and alt attributes', () => {
    const productImage = wrapper.find('img');
    expect(productImage.attributes('src')).toBe(product.images[0]);
    expect(productImage.attributes('alt')).toBe(product.name);
  });

  it('renders product price in correct format', () => {
    const productPrice = wrapper.find('.text-2xl').text();
    expect(productPrice).toBe(new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(product.price));
  });

  it('renders star icons according to product rating', () => {
    const filledStars = wrapper.findAll('.fill-yellow-500').length;
    const emptyStars = wrapper.findAll('.fill-gray-300').length;
    expect(filledStars).toBe(product.rating);
    expect(emptyStars).toBe(5 - product.rating);
  });

  it('renders links to product details with correct slug', () => {
    const links = wrapper.findAllComponents(RouterLinkStub).wrappers;
    links.forEach(link => {
      expect(link.props('to')).toBe(`/produto/${product.slug}`);
    });
  });

  it('renders add to cart button', () => {
    const addButton = wrapper.find('button[aria-label="Add to cart"]');
    expect(addButton.exists()).toBe(true);
  });
});
