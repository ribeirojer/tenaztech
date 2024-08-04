import React, { useState, useEffect } from "react";
import Link from "next/link";

type CarouselProps = {
	items: { imageUrl: string; linkUrl: string; linkText: string }[];
};

const Carousel = ({ items }: CarouselProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [items.length]);

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? items.length - 1 : prevIndex - 1,
		);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
	};

	return (
		<div className="block md:hidden relative w-full overflow-hidden px-4">
			<div
				className="flex transition-transform duration-500 ease-in-out gap-4"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{items.map((item, index) => (
					<div
						className={`min-w-full flex justify-start items-end h-[520px] bg-contain md:bg-cover bg-no-repeat border rounded-tl-3xl rounded-b-3xl ${currentIndex === 1 ? "pl-2 -ml-2" : ""}`}
						key={index}
						style={{ backgroundImage: `url(${item.imageUrl})` }}
					>
						<Link
							href={item.linkUrl}
							className={`bg-midnight p-4 ml-16 mb-10 font-extrabold rounded-b-2xl rounded-tl-2xl sm:text-lg md:text-xl text-off-white ${currentIndex === index ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
						>
							{item.linkText}
						</Link>
					</div>
				))}
			</div>
			<button
				onClick={goToPrevious}
				className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
			>
				&#10094;
			</button>
			<button
				onClick={goToNext}
				className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
			>
				&#10095;
			</button>
		</div>
	);
};

export default Carousel;
