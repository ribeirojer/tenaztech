import React from "react";
import Link from "next/link";

type BreadcrumbItem = {
	text: string;
	href?: string;
};

type BreadcrumbProps = {
	items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
	return (
		<nav className="pt-4 container mx-auto px-4">
			<ul className="text-sm md:text-base flex items-center">
				{items.map((item, index) => (
					<li key={index} className="flex items-center">
						{item.href ? (
							<Link href={item.href} className="text-blue-600 hover:underline">
								{item.text}
							</Link>
						) : (
							<span className="text-gray-500">{item.text}</span>
						)}
						{index < items.length - 1 && (
							<span className="mx-2 text-gray-500">/</span>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Breadcrumb;
