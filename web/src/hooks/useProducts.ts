import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { fetchProducts, fetchBestSellers } from "@/services/productService";
import { useDebounce } from "@/hooks/useDebounce";
import { IProduct } from "@/components/ProductCard";

const useProducts = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [bestSellers, setBestSellers] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowSideBar, setIsShowSideBar] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const router = useRouter();
  const { query } = router;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const category = query.c || "";
    const searchTerm = query.p || "";
    setSelectedCategory(category as string);
    setSearchTerm(searchTerm as string);
    loadProducts();
    //loadBestSellers();
  }, [query]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const productsData: IProduct[] = await fetchProducts();
      setProducts(productsData);
      const categories = productsData.map((product) => product.category || "")
        .filter((category, index, self) => self.indexOf(category) === index);
      const uniqueCategories = ["Todos", ...categories];
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
      (product) => {
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

  return {
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
  };
};

export default useProducts;
