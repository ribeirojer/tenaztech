import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ProductCard, { IProduct } from "../components/ProductCard";
import useMediaQuery from "@/hooks/useMediaQuery";
import ProductSidebar from "@/components/ProductSidebar";
import Layout from "@/components/core/Layout";

type Props = {};

const produtos = (props: Props) => {
	const [categories, setCategories] = useState<any>([]);
	const [products, setProducts] = useState<any>([]);
	const [bestSellers, setBestSellers] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState<any>(null);
	const [selectedPriceFilter, setSelectedPriceFilter] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [isShowSideBar, setIsShowSideBar] = useState(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [error, setError] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const isLargeScreen = useMediaQuery("(min-width: 768px)");
	const router = useRouter();
	const { query } = router;

	useEffect(() => {
		const category = query.c || "";
		const searchTerm = query.p || "";
		setSelectedCategory(category);
		setSearchTerm(searchTerm as string);
		fetchProducts();
		fetchBestSellers();
	}, [query]);

	useEffect(() => {
		setIsShowSideBar(isLargeScreen);
	}, [isLargeScreen]);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_API_URL}/api/products`,
			);
			setProducts(response.data);
			setCategories([
				...response.data.map((product: { category: any }) => product.category),
			]);
		} catch (error) {
			setError("Erro ao carregar produtos.");
		} finally {
			setLoading(false);
		}
	};

	const fetchBestSellers = async () => {
		setLoading(true);
		try {
			// const response = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_API_URL}/api/best-sellers`);
			setBestSellers([]); // response.data;
		} catch (error) {
			setError("Erro ao carregar best sellers.");
		} finally {
			setLoading(false);
		}
	};

	const selectCategory = (category: React.SetStateAction<string>) => {
		setSelectedCategory(category);
	};

	const applyPriceFilter = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setSelectedPriceFilter(event.target.value);
	};

	const applySearchFilter = (searchTerm: React.SetStateAction<string>) => {
		setSearchTerm(searchTerm);
	};

	const toggleSideBar = () => {
		setIsShowSideBar(!isShowSideBar);
	};

	const displayedProducts = products.filter(
		(product: { category: any; price: number; name: string }) => {
			return (
				(!selectedCategory || product.category === selectedCategory) &&
				(!selectedPriceFilter ||
					(product.price >= parseFloat(selectedPriceFilter.split("-")[0]) &&
						product.price <= parseFloat(selectedPriceFilter.split("-")[1]))) &&
				(!searchTerm ||
					product.name.toLowerCase().includes(searchTerm.toLowerCase()))
			);
		},
	);

	const paginatedProducts = displayedProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);

	const prevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const nextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	return (		<Layout>

		<div className="flex flex-col md:flex-row">
			{(isShowSideBar || isLargeScreen) && (
				<ProductSidebar
					categories={categories}
					selectCategory={selectCategory}
					applyPriceFilter={applyPriceFilter}
				/>
			)}
			<div className="w-full md:w-3/4 p-4">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl font-semibold">Produtos</h1>
					{!isLargeScreen && (
						<button onClick={toggleSideBar}>
							{isShowSideBar ? "Ocultar filtros" : "Mostrar filtros"}
						</button>
					)}
				</div>
				{searchTerm && (
					<div className="text-gray-700 mb-4">
						Resultados para: <span className="font-semibold">{searchTerm}</span>
					</div>
				)}
				{loading ? (
					<div className="text-gray-600">Carregando...</div>
				) : error ? (
					<div className="text-red-600">{error}</div>
				) : (
					<>
						{displayedProducts.length === 0 ? (
							<div className="text-gray-700">
								Nenhum produto encontrado para "{searchTerm}".
							</div>
						) : (
							<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								{paginatedProducts.map((product: IProduct) => (
									<ProductCard key={product.name} product={product} />
								))}
							</div>
						)}
					</>
				)}
				<div className="flex justify-center mt-4">
					<button
						onClick={prevPage}
						disabled={currentPage === 1}
						className="mx-2 px-4 py-2 bg-gray-300 rounded"
					>
						Anterior
					</button>
					<span>
						Página {currentPage} de {totalPages}
					</span>
					<button
						onClick={nextPage}
						disabled={currentPage === totalPages}
						className="mx-2 px-4 py-2 bg-gray-300 rounded"
					>
						Próxima
					</button>
				</div>
			</div>
		</div></Layout>
	);
};

export default produtos;
