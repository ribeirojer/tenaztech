import React from "react";
import Link from "next/link";
import ClockIcon from "./icons/ClockIcon";
import ShieldCheckIcon from "./icons/ShieldCheckIcon";
import TruckIcon from "./icons/TruckIcon";
import CouponIcon from "./icons/CouponIcon"; // Adicione um ícone apropriado para cupons

type Props = {};

const WhyShopWithUs = (props: Props) => {
	return (
		<section className="w-full py-12 md:py-24 bg-muted">
			<div className="container mx-auto grid items-center justify-center gap-8 px-4 text-center md:px-6">
				<div className="space-y-4">
					<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
						Por que comprar conosco?
					</h2>
					<p className="mx-auto max-w-[600px] text-base md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
						Descubra os benefícios de comprar em nossa loja de acessórios eletrônicos.
					</p>
				</div>
				<div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-4">
					<Link href="/termos-e-condicoes#frete-gratis" className="cursor-pointer bg-glow-tech bg-opacity-50 flex flex-col items-center justify-center space-y-4 rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
							<TruckIcon className="h-10 w-10 text-primary" />
							<h3 className="text-lg font-bold text-secondary">Frete Grátis</h3>
							<p className="text-sm">Aproveite frete grátis em todos os pedidos acima de R$ 100.</p>
						
					</Link>
					<Link href="/termos-e-condicoes#garantia" className="cursor-pointer bg-sandstorm bg-opacity-50 flex flex-col items-center justify-center space-y-4 rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
							<ShieldCheckIcon className="h-10 w-10 text-primary" />
							<h3 className="text-lg font-bold text-secondary">Garantia de Satisfação</h3>
							<p className="text-sm">Se você não estiver satisfeito, devolvemos o seu dinheiro.</p>
						
					</Link>
					<Link href="/termos-e-condicoes#entrega-rapida" className="cursor-pointer bg-electric-blue bg-opacity-50 flex flex-col items-center justify-center space-y-4 rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
							<ClockIcon className="h-10 w-10 text-primary" />
							<h3 className="text-lg font-bold text-secondary">Entrega Rápida</h3>
							<p className="text-sm">Seu pedido será enviado em 1-2 dias úteis.</p>
						
					</Link>
					<Link href="/termos-e-condicoes#cupons" className="cursor-pointer bg-pink-pulse bg-opacity-50 flex flex-col items-center justify-center space-y-4 rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
							<CouponIcon className="h-10 w-10 text-primary" />
							<h3 className="text-lg font-bold text-secondary">Cupons Cumulativos</h3>
							<p className="text-sm">Use múltiplos cupons para economizar ainda mais.</p>
						
					</Link>
				</div>
			</div>
		</section>
	);
};

export default WhyShopWithUs;
