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
	const [isFixed, setIsFixed] = useState(false);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleSearch = () => {
		setSearchOpen(!searchOpen);
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
			const scrollPosition = window.scrollY;
			if (scrollPosition > 40) {
				setIsFixed(true);
			} else {
				setIsFixed(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return {
		isFixed,
		searchOpen,
		search,
		searchRef,
		handleSearchChange,
		handleMenu,
		handleSearch,
		handleSearchSubmit,
		cartItems,
		isLoggedIn,
	};
};

export default useHeader;
