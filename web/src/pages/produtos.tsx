import React from "react";
import ProductCard from "../components/ProductCard";
import useMediaQuery from "@/hooks/useMediaQuery";
import ProductSidebar from "@/components/ProductSidebar";
import Layout from "@/components/core/Layout";
import useProducts from "@/hooks/useProducts";

type Props = {};

const Produtos = (props: Props) => {
	const {
		categories,
		products,
		bestSellers,
		selectedCategory,
		selectedPriceFilter,
		loading,
		isShowSideBar,
		searchTerm,
		error,
		currentPage,
		itemsPerPage,
		selectCategory,
		applyPriceFilter,
		applySearchFilter,
		toggleSideBar,
		displayedProducts,
		paginatedProducts,
		totalPages,
		prevPage,
		nextPage,
	} = useProducts();

	const isLargeScreen = useMediaQuery("(min-width: 768px)");

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
					{searchTerm && (
						<div className="text-gray-700 mb-4">
							Resultados para:{" "}
							<span className="font-semibold">{searchTerm}</span>
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
									{paginatedProducts.map((product) => (
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
