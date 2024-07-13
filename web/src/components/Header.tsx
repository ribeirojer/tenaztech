import React from "react";
import SearchIcon from "./icons/SearchIcon";
import Link from "next/link";
import Input from "./core/Input";
import LogoHorizontal from "./icons/LogoHorizontal";
import UserIcon from "./icons/UserIcon";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import MenuIcon from "./icons/MenuIcon";
import useHeader from "../hooks/useHeader";

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

	return (
		<header
			className={`transition-transform ${show ? "translate-y-full" : "translate-y-0"}`}
		>
			<div className="hidden md:block text-center bg-glow-tech p-2 text-sm">
				Utilize o Cupom "EUSOUTENAZ" para obter 5% de desconto na sua primeira
				compra
			</div>
			<div className="block md:hidden text-center bg-glow-tech p-2 text-sm">
				Use o cupom "EUSOUTENAZ" e ganhe 5% off na 1ª compra.
			</div>
			<div className="w-full bg-midnight py-4 px-6 md:py-6 md:px-8 lg:py-8 lg:px-10">
				<div className="container flex items-center justify-between">
					<Link href="/" className="flex items-center gap-2" prefetch={false}>
						<LogoHorizontal
							className="w-44 md:w-64 fill-glow-tech"
							aria-label="Logo"
						/>
					</Link>
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
				{menuOpen && (
					<div
						onClick={handleMenu}
						className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center bg-vibrant-blossom w-full h-full"
					>
						<Link
							href="/produtos"
							className="block text-2xl my-2 font-extrabold hover:underline"
							prefetch={false}
						>
							Produtos
						</Link>
						<Link
							href="/sobre-nos"
							className="block text-2xl my-2 font-extrabold hover:underline"
							prefetch={false}
						>
							Sobre
						</Link>
						<Link
							href="/contato"
							className="block text-2xl my-2 font-extrabold hover:underline"
							prefetch={false}
						>
							Contato
						</Link>
						<Link
							href="/entrar"
							className="block text-2xl my-2 font-extrabold hover:underline"
						>
							Entrar
						</Link>
						<Link
							href="/cadastrar"
							className="block text-2xl my-2 font-extrabold hover:underline"
						>
							Cadastrar
						</Link>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
