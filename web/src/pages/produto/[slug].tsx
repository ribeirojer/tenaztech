import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductImages from "@/components/product/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";
import ProductForm from "@/components/product/ProductForm";
import Tabs from "@/components/product/Tabs";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import ProductReviews from "@/components/product/ProductReviews";
import Layout from "@/components/core/Layout";

type Props = {};

const singleProduct = (props: Props) => {
	const [product, setProduct] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedTab, setSelectedTab] = useState("description");

	const tabs = [
		{ name: "Description", value: "description" },
		{ name: "Specifications", value: "specifications" },
		{ name: "Reviews", value: "reviews" },
	];

	const router = useRouter();
	const { slug } = router.query;

	useEffect(() => {
		if (slug) {
			fetchProduct(slug);
		}
	}, [slug]);

	const fetchProduct = async (productSlug: string | string[]) => {
		try {
			const response = await fetch(
				`https://product-catalog-service.deno.dev/api/products/${productSlug}`,
			);
			if (!response.ok) {
				throw new Error(`Error fetching product: ${response.statusText}`);
			}
			const data = await response.json();
			setProduct(data);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const selectTab = (value: React.SetStateAction<string>) => {
		setSelectedTab(value);
	};

	if (error) {
		return <div className="text-center py-6 text-red-500">{error}</div>;
	}

	if (!product) {
		return <div className="text-center py-6">Product not found.</div>;
	}

	return (
		<Layout>

		<div>
			<div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
				{product.images && <ProductImages images={product.images} />}
				<div className="grid gap-4 md:gap-10 items-start">
					<ProductDetails product={product} />
					<ProductForm product={product} />
				</div>
			</div>
			<div className="border-t py-6 px-4 md:px-6 max-w-6xl mx-auto">
				<Tabs tabs={tabs} selectedTab={selectedTab} selectTab={selectTab} />
				<div className="mt-6">
					{selectedTab === "description" && (
						<div key="description">
							<h2 className="font-bold text-2xl">Product Description</h2>
							<div className="grid gap-4 mt-4 text-gray-500">
								<p>{product.description}</p>
							</div>
						</div>
					)}
					{selectedTab === "specifications" && (
						<ProductSpecifications key="specifications" product={product} />
					)}
					{selectedTab === "reviews" && (
						<ProductReviews key="reviews" rating={5} reviews={[]} />
					)}
				</div>
			</div>
		</div>
		</Layout>

	);
};

export default singleProduct;