import Link from "next/link";
import React, { useRef, useState } from "react";
import Input from "./core/Input";
import Button from "./core/Button";
import { useRouter } from "next/router";

type Props = {
	isMenuOpen: boolean;
	setIsMenuOpen: any;
	isLoggedIn: boolean;
	cartItems: any[];
};

const MenuMobileItens = (props: Props) => {
	const { isMenuOpen, setIsMenuOpen, isLoggedIn, cartItems } = props;
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const searchTermRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");

	function handleSubmit(
		event:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) {
		event.preventDefault();
		if (searchTerm) {
			router.push(`/produtos?search=${searchTerm}`);
		} else {
			searchTermRef.current?.focus();
		}
	}
	return (
		<nav className="menu-itens">
			<ul>
				<li onClick={() => setIsMenuOpen(!isMenuOpen)}>
					<Link
						href="/"
						passHref
						className={router.pathname === "/" ? "font-bold" : "font-light"}
					>
						Início
					</Link>
				</li>
				<li onClick={() => setIsMenuOpen(!isMenuOpen)}>
					<Link
						href="/loja"
						passHref
						className={router.pathname === "/loja" ? "font-bold" : "font-light"}
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
								router.pathname === "/confirmacao" ? "font-bold" : "font-light"
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
							router.pathname === "/carrinho" ? "font-bold" : "font-light"
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
								router.pathname === "/usuario" ? "font-bold" : "font-light"
							}
						>
							<span className="text-pink-500">Meus dados</span>
						</Link>
					) : (
						<Link
							href="/entrar"
							passHref
							className={
								router.pathname === "/entrar" ? "font-bold" : "font-light"
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
							router.pathname === "/contato" ? "font-bold" : "font-light"
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
					<form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4">
						<div className="relative flex items-center">
							<Input
								id={"searchTerm"}
								type="text"
								inputRef={searchTermRef}
								placeholder="Pesquisar produtos"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className={""}
							/>
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
						<Button type="submit" className={""}>
							Pesquisar
						</Button>
					</form>
				)}
			</ul>
		</nav>
	);
};

export default MenuMobileItens;
