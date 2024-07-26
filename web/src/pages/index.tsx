import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Layout from "@/components/core/Layout";
import WhyShopWithUs from "@/components/WhyShopWithUs";
import Newsletter from "@/components/Newsletter";

const productService = process.env.SERVER_API_URL + "/api/products";

export const getStaticProps = async () => {
	const res = await fetch(productService);
	const products = await res.json();
	return { props: { products } };
};

export default function Home({ products }: any) {
	return (
		<Layout>
			<h1 className="text-center max-w-4xl mx-auto text-2xl py-4 px-2 md:px-0 font-extrabold sm:text-4xl md:text-6xl">
				Potencialize seu dia a dia com o melhor da tecnologia!
			</h1>
			<section className="container mx-auto px-4 md:px-0 flex flex-col-reverse md:grid gap-6 md:grid-cols-2">
				<div className="bg-[url('/banner2.png')] bg-contain md:bg-cover border rounded-tl-3xl rounded-b-3xl w-full h-[523px] md:h-[768px] md:col-span-2 lg:col-span-1 flex justify-start items-end">
					<Link
						href={"/produtos"}
						className="bg-midnight p-4 ml-16 mb-10 font-extrabold rounded-b-2xl rounded-tl-2xl sm:text-lg md:text-xl text-off-white"
					>
						Ver Produtos
					</Link>
				</div>
				<div className="bg-[url('/banner1.png')] bg-contain md:bg-cover border rounded-tl-3xl rounded-b-3xl w-full h-[523px] md:h-[768px] md:col-span-2 lg:col-span-1 flex justify-start items-end">
					<Link
						href={"/produtos?c=headphones"}
						className="bg-off-white p-4 ml-12 md:ml-16 mb-10 font-extrabold rounded-b-2xl rounded-tl-2xl sm:text-lg md:text-xl"
					>
						Ver Produtos
					</Link>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container space-y-12 px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								Eleve seu estilo tecnológico
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Descubra os mais recentes acessórios eletrônicos que combinam
								forma e função. Atualize sua tecnologia com nossa coleção
								selecionada.
							</p>
						</div>
					</div>
					<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{products.slice(0, 4).map((product: any) => {
							return <ProductCard key={product.id} product={product} />;
						})}
					</div>
				</div>
			</section>
			<div className="flex justify-center">
				<Link
					href={"/produtos"}
					className="bg-midnight p-4 font-extrabold rounded-b-2xl rounded-tl-2xl text-off-white"
				>
					Ver mais produtos
				</Link>
			</div>
			<WhyShopWithUs />
			<Newsletter />
		</Layout>
	);
}
