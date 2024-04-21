<template>
		  <SectionTitle :title="'New Products'" :items="['Laptops', 'Smartphones', 'Cameras', 'Accessories']" />
  		  <ProductsTabSlick
			tabId="tab1"
			navId="slick-nav-1"
			:products="products"
			:active="true"
		  />
  </template>
  
  <script>
export default {
	data() {
		return {
			products: [
				{
					imageUrl: "/img/product01.png",
					category: "Category",
					name: "Product Name 1",
					price: 980.0,
					oldPrice: 990.0,
					discount: 30,
					isNew: true,
					rating: 5,
				},
				{
					imageUrl: "/img/product02.png",
					category: "Category",
					name: "Product Name 2",
					price: 980.0,
					isNew: true,
					rating: 4,
				},
				{
					imageUrl: "/img/product03.png",
					category: "Category",
					name: "Product Name 3",
					price: 980.0,
					oldPrice: 990.0,
					discount: 30,
				},
				{
					imageUrl: "/img/product04.png",
					category: "Category",
					name: "Product Name 4",
					price: 980.0,
					rating: 5,
				},
				{
					imageUrl: "/img/product05.png",
					category: "Category",
					name: "Product Name 5",
					price: 980.0,
					rating: 5,
				},
			],
		};
	},
};
</script>
  