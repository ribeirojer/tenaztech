import SearchIcon from "./icons/SearchIcon";
import Link from "next/link";
import Input from "./core/Input";
import LogoHorizontal from "./icons/LogoHorizontal";
import UserIcon from "./icons/UserIcon";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import MenuIcon from "./icons/MenuIcon";
import useHeader from "../hooks/useHeader";
import React, { useState } from "react";
import MenuMobileItens from "./MenuMobileItens";
import TopHeader from "./TopHeader";
import SearchMobile from "./SearchMobile";

type Props = {};

const Header = (props: Props) => {
	const {
		isFixed,
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
	} = useHeader();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header id="header">
			<TopHeader isFixed={isFixed} />
			<div
				className={`${
					isFixed ? "" : "md:static"
				} fixed top-0 left-0 w-full z-40 bg-midnight shadow transition-all`}
			>
				<div className="container mx-auto px-4 pr-24 md:px-0 flex flex-row items-center justify-between">
					<div className="md:w-1/3 flex justify-start h-20">
						<Link href="/" className="flex items-center gap-2" prefetch={false}>
							<LogoHorizontal
								className="w-44 md:w-64 fill-glow-tech"
								aria-label="Logo"
							/>
						</Link>
					</div>
					<SearchMobile />
					<div className="flex justify-center items-center md:w-2/3">
						<div className="checkbox-wrapper">
							<input
								type="checkbox"
								id="toggle"
								checked={isMenuOpen}
								onChange={() => setIsMenuOpen(!isMenuOpen)}
							/>
							<label htmlFor="toggle" className="checkbox">
								<div className="trace w-[40px] h-1 bg-glow-tech absolute rounded ease-in-out duration-500"></div>
								<div className="trace w-[40px] h-1 bg-glow-tech absolute rounded ease-in-out duration-500"></div>
								<div className="trace w-[40px] h-1 bg-glow-tech absolute rounded ease-in-out duration-500"></div>
							</label>
							<div className="menu"></div>
							<MenuMobileItens
								isMenuOpen={isMenuOpen}
								setIsMenuOpen={setIsMenuOpen}
								isLoggedIn={isLoggedIn}
								cartItems={cartItems}
							></MenuMobileItens>
						</div>
						<div className="hidden md:block w-full py-4 px-6 md:py-6 md:px-8 lg:py-8 lg:px-10">
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
									{searchOpen && (
								<form onSubmit={handleSearchSubmit} className="">
									<Input
										value={search}
										onChange={handleSearchChange}
										onBlur={handleSearchBlur}
										type="text"
										ref={searchRef}
										placeholder="Pesquisar"
										className=""
										aria-label="Campo de pesquisa"
										name={""}
									/>
								</form>
							)}<button onClick={handleSearch} aria-label="Abrir pesquisa">
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
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
