import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import ClockIcon from "@/components/icons/ClockIcon";
import TruckIcon from "@/components/icons/TruckIcon";
import ShieldCheckIcon from "@/components/icons/ShieldCheckIcon";
import Layout from "@/components/core/Layout";
import Button from "@/components/core/Button";

const productService = process.env.PRODUCT_SERVICE_API_URL + "/api/products";

export const getStaticProps = async () => {
	const res = await fetch(productService);
	const products = await res.json();
	return { props: { products } };
};

export default function Home({ products }: any) {
	return (
		<Layout>
			<h1 className="text-center max-w-4xl mx-auto text-3xl py-4 px-4 md:py-8 md:px-0 font-extrabold sm:text-5xl md:text-6xl">
				Potencialize seu dia a dia com o melhor da tecnologia!
			</h1>
			<section className="container mx-auto px-4 md:px-0 grid gap-6 md:grid-cols-2">
				<div className="flex flex-col gap-6">
					<div className="bg-electric-blue border rounded-tl-3xl rounded-b-3xl w-full">
						<img
							src="/placeholder.svg"
							alt="Coats to Man"
							className="w-full h-48 object-cover sm:h-56 md:h-64"
						/>
						<h3 className="mt-4 text-lg font-semibold sm:text-xl md:text-2xl">
							Sale of the month
						</h3>
						<p className="mt-1 sm:text-lg md:text-xl">Coats to Man</p>
						<Link
							href="#"
							className="mt-2 text-blue-500 sm:text-lg md:text-xl"
							prefetch={false}
						>
							Shop Now
						</Link>
					</div>
					<div className="flex gap-6">
						<div className="bg-midnight border rounded-tl-3xl rounded-b-3xl  w-full">
							<img
								src="/placeholder.svg"
								alt="Cotton T-shirt"
								className="w-full h-48 object-cover sm:h-56 md:h-64"
							/>
							<h3 className="mt-4 text-lg font-semibold sm:text-xl md:text-2xl">
								Sale of the week
							</h3>
							<p className="mt-1 sm:text-lg md:text-xl">Cotton T-shirt</p>
							<Link
								href="#"
								className="mt-2 text-blue-500 sm:text-lg md:text-xl"
								prefetch={false}
							>
								Shop Now
							</Link>
						</div>
						<div className="bg-pink-pulse border rounded-tl-3xl rounded-b-3xl  w-full">
							<img
								src="/placeholder.svg"
								alt="Cotton T-shirt"
								className="w-full h-48 object-cover sm:h-56 md:h-64"
							/>
							<h3 className="mt-4 text-lg font-semibold sm:text-xl md:text-2xl">
								Sale of the year
							</h3>
							<p className="mt-1 sm:text-lg md:text-xl">Cotton T-shirt</p>
							<Link
								href="#"
								className="mt-2 text-blue-500 sm:text-lg md:text-xl"
								prefetch={false}
							>
								Shop Now
							</Link>
						</div>
					</div>
				</div>
				<div className="bg-sandstorm border rounded-tl-3xl rounded-b-3xl  w-full md:col-span-2 lg:col-span-1">
					<img
						src="/placeholder.svg"
						alt="Discount Cloth"
						className="w-full h-48 object-cover sm:h-56 md:h-64"
					/>
					<h3 className="mt-4 text-lg font-semibold sm:text-xl md:text-2xl">
						Explore Last Year Discount Cloth
					</h3>
					<p className="mt-1 sm:text-lg md:text-xl">Offer ending soon...</p>
					<Button className="mt-4 sm:text-lg md:text-xl">Get Now</Button>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
								Elevate Your Tech Style
							</h1>
							<p className="max-w-[600px] text-muted-foreground md:text-xl">
								Discover the latest electronic accessories that blend form and
								function. Upgrade your tech with our curated collection.
							</p>
						</div>
						<div>
							<Link
								href="#"
								className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
								prefetch={false}
							>
								Shop Now
							</Link>
						</div>
					</div>
					<img
						src="/placeholder.svg"
						width="550"
						height="550"
						alt="Hero"
						className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
					/>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container space-y-12 px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								Featured Products
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Discover our curated selection of the latest and greatest
								electronic accessories.
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
			<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
				<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
					<div className="space-y-3">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Why Shop with Us?
						</h2>
						<p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Discover the benefits of shopping with our electronic accessories
							store.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
						<div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-6 shadow-sm transition-all hover:shadow-lg">
							<TruckIcon className="h-8 w-8 text-primary" />
							<h3 className="text-xl font-bold">Free Shipping</h3>
							<p className="text-muted-foreground">
								Enjoy free shipping on all orders over $50.
							</p>
						</div>
						<div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-6 shadow-sm transition-all hover:shadow-lg">
							<ShieldCheckIcon className="h-8 w-8 text-primary" />
							<h3 className="text-xl font-bold">Satisfaction Guarantee</h3>
							<p className="text-muted-foreground">
								If you're not satisfied, we'll refund your purchase.
							</p>
						</div>
						<div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-6 shadow-sm transition-all hover:shadow-lg">
							<ClockIcon className="h-8 w-8 text-primary" />
							<h3 className="text-xl font-bold">Fast Delivery</h3>
							<p className="text-muted-foreground">
								Your order will be shipped within 1-2 business days.
							</p>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
