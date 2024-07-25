import SearchIcon from "./icons/SearchIcon";
import Link from "next/link";
import Input from "./core/Input";
import LogoHorizontal from "./icons/LogoHorizontal";
import UserIcon from "./icons/UserIcon";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import MenuIcon from "./icons/MenuIcon";
import useHeader from "../hooks/useHeader";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Button from "./core/Button";

type Props = {};

const Header = (props: Props) => {
	const {
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
	} = useHeader();
	const [searchTerm, setSearchTerm] = useState("");
	const [isFixed, setIsFixed] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const searchTermRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();
  
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
  
	function handleSubmit(
	  event:
		| React.FormEvent<HTMLFormElement>
		| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
	  event.preventDefault();
	  if (searchTerm) {
		router.push(`/loja?search=${searchTerm}`);
	  } else {
		searchTermRef.current?.focus();
	  }
	}
  
  
	return (
		

<header id="header">
<div className="md:hidden h-[100px]"></div>
<div
  className={`hidden md:block bg-gray-200 ${isFixed ? "h-[140px]" : ""}`}
>
	<div className="hidden md:block text-center bg-glow-tech p-2 text-sm">
				Utilize o Cupom "EUSOUTENAZ" para obter 5% de desconto na sua primeira
				compra
			</div>
			<div className="block md:hidden text-center bg-glow-tech p-2 text-sm">
				Use o cupom "EUSOUTENAZ" e ganhe 5% off na 1ª compra.
			</div>
	
</div>
<div
  className={`${
	isFixed
	  ? "fixed top-0 left-0 w-full z-40"
	  : "fixed top-0 left-0 w-full z-40 md:static"
  }  bg-midnight shadow transition-all`}
>
  <div className="container mx-auto px-4 md:px-0 flex flex-row items-center justify-between">
	<div className="w-1/3 flex justify-start">
	<Link href="/" className="flex items-center gap-2" prefetch={false}>
						<LogoHorizontal
							className="w-44 md:w-64 fill-glow-tech"
							aria-label="Logo"
						/>
					</Link>
	</div>
	<div className="flex justify-center items-center w-2/3">
	  <div className="checkbox-wrapper">
		<input
		  type="checkbox"
		  id="toggle"
		  checked={isMenuOpen}
		  onChange={() => setIsMenuOpen(!isMenuOpen)}
		/>
		<label htmlFor="toggle" className="checkbox">
		  <div className="trace"></div>
		  <div className="trace"></div>
		  <div className="trace"></div>
		</label>
		<div className="menu"></div>
		<nav className="menu-itens">
		  <ul>
			<li onClick={() => setIsMenuOpen(!isMenuOpen)}>
			  <Link
				href="/"
				passHref
				className={
				  router.pathname === "/" ? "font-bold" : "font-light"
				}
			  >
				Início
			  </Link>
			</li>
			<li onClick={() => setIsMenuOpen(!isMenuOpen)}>
			  <Link
				href="/loja"
				passHref
				className={
				  router.pathname === "/loja" ? "font-bold" : "font-light"
				}
			  >
				Loja
			  </Link>
			</li>
			{cartItems.length > 0 && (
			  <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
				<Link
				  href="/confirmacao"
				  passHref
				  className={
					router.pathname === "/confirmacao"
					  ? "font-bold"
					  : "font-light"
				  }
				>
				  Finalizar
				</Link>
			  </li>
			)}
			{/*<li onClick={() => setIsMenuOpen(!isMenuOpen)}>
			  <Link
				href="/desejos"
				passHref
				className={
				  router.pathname === "/desejos"
					? "font-bold"
					: "font-light"
				}
			  >
				{wishlist.length ? (
				  <span className="text-pink-500">
					 Favoritos ({wishlist.length})
				  </span>
				) : (
				  <span>Favoritos</span>
				)}
			  </Link>
				</li>*/}
			<li onClick={() => setIsMenuOpen(!isMenuOpen)}>
			  <Link
				href="/carrinho"
				passHref
				className={
				  router.pathname === "/carrinho"
					? "font-bold"
					: "font-light"
				}
			  >
				{cartItems.length ? (
				  <span className="text-pink-500">
					Carrinho ({cartItems.length})
				  </span>
				) : (
				  <span>Carrinho</span>
				)}
			  </Link>
			</li>
			<li onClick={() => setIsMenuOpen(!isMenuOpen)}>
			  {isLoggedIn ? (
				<Link
				  href="/usuario"
				  passHref
				  className={
					router.pathname === "/usuario"
					  ? "font-bold"
					  : "font-light"
				  }
				>
				  <span className="text-pink-500">Meus dados</span>
				</Link>
			  ) : (
				<Link
				  href="/entrar"
				  passHref
				  className={
					router.pathname === "/entrar"
					  ? "font-bold"
					  : "font-light"
				  }
				>
				  Entrar
				</Link>
			  )}
			</li>
			<li onClick={() => setIsMenuOpen(!isMenuOpen)}>
			  <Link
				href="/contato"
				passHref
				className={
				  router.pathname === "/contato"
					? "font-bold"
					: "font-light"
				}
			  >
				Contato
			  </Link>
			</li>
			<li
			  className="my-2 text-black uppercase tracking-wide text-3xl leading-13 font-light"
			  onClick={() => {
				if (!isSearchOpen) {
				  setIsSearchOpen(true);
				  setInterval(() => {
					searchTermRef.current?.focus();
				  }, 100);
				} else {
				  setIsSearchOpen(false);
				}
			  }}
			>
			  Pesquisar
			</li>
			{isSearchOpen && (
			  <form
				onSubmit={handleSubmit}
				className="flex flex-col gap-2 my-4"
			  >
				<div className="relative flex items-center">
				  <Input
													id={"searchTerm"}
													type="text"
													inputRef={searchTermRef}
													placeholder="Pesquisar produtos"
													value={searchTerm}
													onChange={(e) => setSearchTerm(e.target.value)} className={""}				  />
				  <svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					className="absolute top-2 right-2"
				  >
					<path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
				  </svg>
				</div>
				<Button type="submit" className={""} >Pesquisar</Button>
			  </form>
			)}
		  </ul>
		</nav>
	  </div>
	  <div className="w-full py-4 px-6 md:py-6 md:px-8 lg:py-8 lg:px-10">
				<div className="container flex items-center justify-between">
					
					<div className="hidden md:block text-glow-tech font-extrabold text-xl">
						<Link href="/produtos" className="mr-4" prefetch={false}>
							Produtos
						</Link>
						<Link href="/sobre-nos" className="mr-4" prefetch={false}>
							Sobre
						</Link>
						<Link href="/contato" className="mr-4" prefetch={false}>
							Contato
						</Link>
					</div>
					<div className="flex items-center space-x-4">
						<button onClick={handleSearch} aria-label="Abrir pesquisa">
							<SearchIcon className="w-6 h-6 fill-glow-tech" />
						</button>
						<Link href="/carrinho">
							<div className="relative">
								<ShoppingCartIcon
									className="w-6 h-6 fill-glow-tech"
									aria-label="Carrinho de compras"
								/>
								{cartItems.length > 0 && (
									<span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
										{cartItems.length}
									</span>
								)}
							</div>
						</Link>
						{isLoggedIn ? (
							<Link href="/perfil">
								<UserIcon
									className="w-6 h-6 fill-glow-tech"
									aria-label="Perfil do usuário"
								/>
							</Link>
						) : (
							<Link href="/entrar">
								<UserIcon
									className="w-6 h-6 fill-glow-tech"
									aria-label="Entrar"
								/>
							</Link>
						)}
						<button
							onClick={handleMenu}
							className="md:hidden"
							aria-label="Alternar menu"
						>
							<MenuIcon className="w-8 h-8 fill-glow-tech" />
						</button>
					</div>
				</div>
				{searchOpen && (
					<form onSubmit={handleSearchSubmit} className="mt-4">
						<Input
							value={search}
							onChange={handleSearchChange}
							type="text"
							inputRef={searchRef}
							placeholder="Pesquisar"
							className="w-full md:w-96"
							aria-label="Campo de pesquisa"
						/>
					</form>
				)}
			</div>
	</div>
  </div>
</div>
</header>
	);
};

export default Header;
