import { useRouter } from "next/router";
import { formatCurrency } from "../utils/formatCurrency";
import StarIcon from "./icons/StarIcon";

export interface IProduct {
	category?: string;
	name: string;
	images: string[];
	price: number;
	rating: number;
	slug: string;
}

interface ProductProps {
	product: IProduct;
}

const ProductCard = ({ product }: ProductProps) => {
	const router = useRouter();

	const handleProductClick = () => {
		router.push(`/produto/${product.slug}`);
	};

	const starClass = (index: number, rating: number) => {
		return index <= rating ? "fill-yellow-500" : "fill-gray-300";
	};

	return (
		<div
			className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow transition-all hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50"
			role="button"
			tabIndex={0}
			aria-label="View product details"
			onClick={handleProductClick}
		>
			<div className="aspect-[4/3] overflow-hidden border-b border-gray-200 dark:border-gray-800 ">
				<img
					alt={product.name}
					src={product.images[0]}
					className="h-full w-full object-contain transition-all group-hover:scale-105 rounded-t-lg"
					width="400"
					height="300"
				/>
			</div>
			<div className="p-4">
				<div className="flex flex-col items-center justify-between">
					<h3 className="font-semibold text-center text-base md:text-base text-gray-800 hover:text-gray-600 dark:text-gray-200">
						{product.name}
					</h3>
					{/*<div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, n) => (
              <StarIcon key={n} className={starClass(n + 1, product.rating)} />
            ))}
            </div>*/}
				</div>
				<div className="mt-4 flex items-center justify-between">
					<span className="text-2xl font-bold text-gray-600 dark:text-gray-200">
						{formatCurrency(product.price)}
					</span>
					<button
						className="flex items-center border border-black text-white bg-gray-100 pr-2 pl-3 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950"
						aria-label="Add to cart"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							className="mr-2 fill-black text-white"
						>
							<circle cx="10.5" cy="19.5" r="1.5"></circle>
							<circle cx="17.5" cy="19.5" r="1.5"></circle>
							<path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path>
							<path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
