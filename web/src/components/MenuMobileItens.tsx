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
		<nav
			className={`fixed top-0 left-0 w-full h-screen flex justify-center items-center z-20 transition-opacity duration-400 ease-in-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
		>
			<ul className="flex flex-col list-none">
				<li onClick={() => setIsMenuOpen(!isMenuOpen)} className="my-2">
					<Link
						href="/"
						passHref
						className={`${router.pathname === "/" ? "font-bold" : "font-light"} text-2xl uppercase tracking-widest`}
					>
						Início
					</Link>
				</li>
				<li onClick={() => setIsMenuOpen(!isMenuOpen)} className="my-2">
					<Link
						href="/produtos"
						passHref
						className={`${router.pathname === "/produtos" ? "font-bold" : "font-light"} text-2xl uppercase tracking-widest`}
					>
						Loja
					</Link>
				</li>
				{cartItems.length > 0 && (
					<li onClick={() => setIsMenuOpen(!isMenuOpen)} className="my-2">
						<Link
							href="/confirmacao"
							passHref
							className={`${router.pathname === "/confirmacao" ? "font-bold" : "font-light"} text-2xl uppercase tracking-widest`}
						>
							Finalizar
						</Link>
					</li>
				)}
				<li onClick={() => setIsMenuOpen(!isMenuOpen)} className="my-2">
					<Link
						href="/carrinho"
						passHref
						className={`${router.pathname === "/carrinho" ? "font-bold" : "font-light"} text-2xl uppercase tracking-widest`}
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
				<li onClick={() => setIsMenuOpen(!isMenuOpen)} className="my-2">
					{isLoggedIn ? (
						<Link
							href="/usuario"
							passHref
							className={`${router.pathname === "/usuario" ? "font-bold" : "font-light"} text-2xl uppercase tracking-widest text-pink-500`}
						>
							Meus dados
						</Link>
					) : (
						<Link
							href="/entrar"
							passHref
							className={`${router.pathname === "/entrar" ? "font-bold" : "font-light"} text-2xl uppercase tracking-widest`}
						>
							Entrar
						</Link>
					)}
				</li>
				<li onClick={() => setIsMenuOpen(!isMenuOpen)} className="my-2">
					<Link
						href="/contato"
						passHref
						className={`${router.pathname === "/contato" ? "font-bold" : "font-light"} text-2xl uppercase tracking-widest`}
					>
						Contato
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default MenuMobileItens;
