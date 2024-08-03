import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const useHeader = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [search, setSearch] = useState("");
	const { cartItems } = useCart();
	const { isLoggedIn } = useAuth();
	const router = useRouter();
	const searchRef = useRef<HTMLInputElement | null>(null);
	const [isTopHeaderVisible, setIsTopHeaderVisible] = useState(true);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleSearch = () => {
		setSearchOpen(!searchOpen);
	};

	const handleSearchBlur = () => {
		setSearchOpen(false);
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSearchOpen(false);
		router.push(
			`/produtos?q=${search
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/\s/g, "-")
				.toLowerCase()}`,
		);
	};

	useEffect(() => {
		if (searchOpen) {
			setTimeout(() => {
				searchRef.current?.focus();
			}, 100);
		}
	}, [searchOpen]);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 50) {
				// Ajuste o valor conforme necessário
				setIsTopHeaderVisible(false);
			} else {
				setIsTopHeaderVisible(true);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return {
		isTopHeaderVisible,
		searchOpen,
		search,
		searchRef,
		handleSearchChange,
		handleMenu,
		handleSearch,
		handleSearchBlur,
		handleSearchSubmit,
		cartItems,
		isLoggedIn,
	};
};

export default useHeader;
