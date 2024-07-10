import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<CartProvider>
				<Component {...pageProps} />
			</CartProvider>
		</AuthProvider>
	);
}
