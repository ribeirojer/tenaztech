import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

type Props = {
	isMenuOpen: boolean;
	setIsMenuOpen: any;
	isLoggedIn: boolean;
	cartItems: any[];
};

const MenuMobileItens = (props: Props) => {
	const { isMenuOpen, setIsMenuOpen, isLoggedIn, cartItems } = props;
	const router = useRouter();

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
						href="/produtos"
						passHref
						className={
							router.pathname === "/produtos" ? "font-bold" : "font-light"
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
			</ul>
		</nav>
	);
};

export default MenuMobileItens;
