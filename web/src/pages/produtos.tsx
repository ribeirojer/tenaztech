import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import ProductCard, { IProduct } from "../components/ProductCard";
import useMediaQuery from "@/hooks/useMediaQuery";
import ProductSidebar from "@/components/ProductSidebar";
import Layout from "@/components/core/Layout";
import { fetchProducts, fetchBestSellers } from "@/services/productService"; // API calls moved to a service file
import { useDebounce } from "@/hooks/useDebounce";

type Props = {};

const Produtos = (props: Props) => {
	const [categories, setCategories] = useState<any[]>([]);
	const [products, setProducts] = useState<any[]>([]);
	const [bestSellers, setBestSellers] = useState<any[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedPriceFilter, setSelectedPriceFilter] = useState<string | null>(
		null,
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [isShowSideBar, setIsShowSideBar] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 10;

	const isLargeScreen = useMediaQuery("(min-width: 768px)");
	const router = useRouter();
	const { query } = router;

	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	useEffect(() => {
		const category = query.c || "";
		const searchTerm = query.p || "";
		setSelectedCategory(category as string);
		setSearchTerm(searchTerm as string);
		loadProducts();
		loadBestSellers();
	}, [query]);

	useEffect(() => {
		setIsShowSideBar(isLargeScreen);
	}, [isLargeScreen]);

	const loadProducts = useCallback(async () => {
		setLoading(true);
		try {
			const productsData: IProduct[] = await fetchProducts();
			setProducts(productsData);
			const uniqueCategories: string[] = [
				...productsData.map((product) => product.category || ""),
			];
			setCategories(uniqueCategories);
		} catch (error) {
			setError("Erro ao carregar produtos.");
		} finally {
			setLoading(false);
		}
	}, []);

	const loadBestSellers = useCallback(async () => {
		setLoading(true);
		try {
			const bestSellersData = await fetchBestSellers();
			setBestSellers(bestSellersData);
		} catch (error) {
			setError("Erro ao carregar best sellers.");
		} finally {
			setLoading(false);
		}
	}, []);

	const selectCategory = useCallback((category: string) => {
		setSelectedCategory(category);
	}, []);

	const applyPriceFilter = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			setSelectedPriceFilter(event.target.value);
		},
		[],
	);

	const applySearchFilter = useCallback((searchTerm: string) => {
		setSearchTerm(searchTerm);
	}, []);

	const toggleSideBar = useCallback(() => {
		setIsShowSideBar(!isShowSideBar);
	}, [isShowSideBar]);

	const displayedProducts = useMemo(() => {
		return products.filter(
			(product: { category: any; price: number; name: string }) => {
				return (
					(!selectedCategory || product.category === selectedCategory) &&
					(!selectedPriceFilter ||
						(product.price >= parseFloat(selectedPriceFilter.split("-")[0]) &&
							product.price <=
								parseFloat(selectedPriceFilter.split("-")[1]))) &&
					(!debouncedSearchTerm ||
						product.name
							.toLowerCase()
							.includes(debouncedSearchTerm.toLowerCase()))
				);
			},
		);
	}, [products, selectedCategory, selectedPriceFilter, debouncedSearchTerm]);

	const paginatedProducts = useMemo(() => {
		return displayedProducts.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage,
		);
	}, [displayedProducts, currentPage]);

	const totalPages = useMemo(() => {
		return Math.ceil(displayedProducts.length / itemsPerPage);
	}, [displayedProducts]);

	const prevPage = useCallback(() => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	}, [currentPage]);

	const nextPage = useCallback(() => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	}, [currentPage, totalPages]);

	return (
		<Layout>
			<div className="flex flex-col md:flex-row">
				{(isShowSideBar || isLargeScreen) && (
					<ProductSidebar
						categories={categories}
						selectCategory={selectCategory as any}
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
					{debouncedSearchTerm && (
						<div className="text-gray-700 mb-4">
							Resultados para:{" "}
							<span className="font-semibold">{debouncedSearchTerm}</span>
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
									Nenhum produto encontrado para "{debouncedSearchTerm}".
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
			</div>
		</Layout>
	);
};

export default Produtos;
