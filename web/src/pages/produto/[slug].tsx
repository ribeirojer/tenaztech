import React from "react";
import Layout from "@/components/core/Layout";
import ProductImages from "@/components/product/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";
import Breadcrumb from "@/components/Breadcrumb";
import ProductThumbnails from "@/components/product/ProductThumbnails";
import ProductTab from "@/components/product/ProductTab";
import RelatedProducts from "@/components/product/RelatedProducts";

type Props = {
	product: any;
	error: string | null;
};

const singleProduct = ({ product, error }: Props) => {
	const breadcrumbItems = [
		{ text: "Home", href: "/" },
		{ text: product.category, href: `/produtos?categoria=${product.category}` },
		{ text: product?.name, href: `/produto/${product?.slug}` },
	];

	if (error) {
		return <div className="text-center py-6 text-pink-pulse">{error}</div>;
	}

	if (!product) {
		return <div className="text-center py-6">Produto não encontrado.</div>;
	}

	return (
		<Layout>
			{/*<Breadcrumb items={breadcrumbItems} />*/}
			<div className="container mx-auto p-4">
				<div className="flex flex-wrap">
					<div className="w-full lg:w-1/2">
						<ProductImages images={product.images} />
						<ProductThumbnails thumbnails={product.images} />
					</div>
					<div className="w-full lg:w-1/2">
						<ProductDetails product={product} />
					</div>
				</div>
				<ProductTab />
				<RelatedProducts />
			</div>
		</Layout>
	);
};

export async function getStaticPaths() {
	const response = await fetch(process.env.SERVER_API_URL + "/products");
	const products = await response.json();

	const paths = products.map((product: { slug: string }) => ({
		params: { slug: product.slug },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	try {
		const response = await fetch(
			process.env.SERVER_API_URL + `/products/${params.slug}`,
		);

		if (!response.ok) {
			throw new Error(`Error fetching product: ${response.statusText}`);
		}

		const product = await response.json();

		return {
			props: { product, error: null },
		};
	} catch (err) {
		return {
			props: { product: null, error: err },
		};
	}
}

export default singleProduct;
