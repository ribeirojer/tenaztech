import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const useHeader = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [show, setShow] = useState(false);
	const { cartItems } = useCart();
	const { isLoggedIn } = useAuth();
	const router = useRouter();
	const [lastScrollY, setLastScrollY] = useState(0);
	const searchRef = useRef<HTMLInputElement | null>(null);

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

	const controlNavbar = () => {
		if (window.scrollY > lastScrollY) {
			setShow(true);
		} else {
			setShow(false);
		}
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		if (searchOpen) {
			setTimeout(() => {
				searchRef.current?.focus();
			}, 100);
		}
	}, [searchOpen]);

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY]);

	return {
		menuOpen,
		searchOpen,
		search,
		show,
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
