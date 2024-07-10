import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Bricolage_Grotesque } from "next/font/google";
const bricolage_Grotesque = Bricolage_Grotesque({ subsets: ["latin"] });

type Props = {
	children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleStart = () => setLoading(true);
		const handleComplete = () => setLoading(false);

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, [router]);

	return (
		<div
			className={`layout ${loading ? "loading" : ""} ${bricolage_Grotesque.className}`}
		>
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
