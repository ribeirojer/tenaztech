import axiosClient from "@/utils/axiosClient";
import React, { useRef, useState } from "react";
import Input from "./core/Input";

type Props = {};

const Newsletter = (props: Props) => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState({
		email: "",
		emailRegex: "",
		general: "",
	});
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const emailRef = useRef<HTMLInputElement | null>(null);

	const closeSuccess = () => {
		setTimeout(() => {
			setSuccess("");
		}, 5000);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email) {
			setError({ ...error, email: "Por favor digite seu email." });
			emailRef.current?.focus();
			return;
		}
		if (!/^\S+@\S+\.\S+$/.test(email)) {
			setError({
				...error,
				email: "",
				emailRegex: "Formato de email inválido.",
			});
			emailRef.current?.focus();
			return;
		}

		setLoading(true);
		axiosClient
			.post("/newsletter", { email })
			.then((response) => {
				setLoading(false);
				setSuccess("Inscrição realizada com sucesso!");
				setEmail("");
				setError({ email: "", emailRegex: "", general: "" });
				closeSuccess();
			})
			.catch((error) => {
				setLoading(false);
				setSuccess("");
				setError({
					...error,
					general: "Ocorreu um erro ao realizar a inscrição.",
				});
			});
	};

	return (
		<section className="bg-sandstorm bg-[url('/grafico_apoio_amarelo.png')] py-12 md:py-16 bg-fixed bg-cover bg-no-repeat">
			<div className="container mx-auto max-w-2xl px-4 md:px-6">
				<div className="space-y-6 text-center">
					<h2 className="text-2xl font-bold md:text-3xl">
						Mantenha-se atualizado com nossas últimas notícias e ofertas
					</h2>
					<p className="text-muted-foreground">
						Assine nossa newsletter e seja o primeiro a saber sobre nossos novos
						produtos, ofertas exclusivas e muito mais.
					</p>
					<form
						className="flex flex-col items-center gap-4"
						onSubmit={handleSubmit}
					>
						<div className="w-full flex flex-col items-center">
							<Input
								type="email"
								placeholder="Digite seu email"
								className="w-full px-4 py-2 border rounded-tl-lg rounded-b-lg focus:outline-none focus:ring-2 focus:ring-midnight"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								ref={emailRef} name={"newsletter-input"}						/>
							{error.email && (
								<span className="text-pink-pulse mt-2">{error.email}</span>
							)}
							{error.emailRegex && (
								<span className="text-pink-pulse mt-2">{error.emailRegex}</span>
							)}
						</div>
						<button
							type="submit"
							className="px-6 py-3 font-extrabold mt-2 text-lg bg-midnight text-off-white rounded-b-lg rounded-tl-lg hover:bg-opacity-95 "
							disabled={loading}
						>
							{loading ? <LoadingSpinner /> : "Assinar"}
						</button>
						{error.general && (
							<span className="text-pink-pulse mt-2 text-center">
								{error.general}
							</span>
						)}
						{success && (
							<span className="text-electric-blue text-center pt-2">
								{success}
							</span>
						)}
					</form>
				</div>
			</div>
		</section>
	);
};

const LoadingSpinner = () => (
	<div className="w-5 h-5 border-2 border-t-2 border-off-white rounded-full animate-spin"></div>
);

export default Newsletter;
