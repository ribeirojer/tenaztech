import React from "react";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

type Props = {
	images: string[];
};

const ProductImages = ({ images }: Props) => {
	// Custom hook for Swiper navigation
	const SwiperNavigation = () => {
		const swiper = useSwiper();
		return (
			<div className="swiper-navigation">
				<button
					onClick={() => swiper.slidePrev()}
					className="swiper-button-prev"
				>
					Prev
				</button>
				<button
					onClick={() => swiper.slideNext()}
					className="swiper-button-next"
				>
					Next
				</button>
			</div>
		);
	};

	// Custom hook for Swiper slide
	const SwiperPagination = () => {
		const { isActive } = useSwiperSlide();
		return <div className={`swiper-pagination ${isActive ? "active" : ""}`} />;
	};

	return (
		<div className="product-images overflow-hidden">
			<Swiper
				spaceBetween={10}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				modules={[Navigation, Pagination]}
				className="mySwiper"
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<img
							src={image}
							alt={`Imagem do produto ${index}`}
							className="w-full"
						/>
						<SwiperPagination />
					</SwiperSlide>
				))}
				<SwiperNavigation />
			</Swiper>
		</div>
	);
};

export default ProductImages;
