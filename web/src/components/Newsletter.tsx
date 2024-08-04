import axiosClient from "@/utils/axiosClient";
import React, { useRef, useState } from "react";
import Input from "./core/Input";
import Button from "./core/Button";

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
						className="flex flex-col md:flex-row md:items-start gap-4"
						onSubmit={handleSubmit}
					>
							<Input
								type="email"
								placeholder="Digite seu email"
								className="w-full px-4 py-2 border rounded-tl-lg rounded-b-lg focus:outline-none focus:ring-2 focus:ring-midnight"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								ref={emailRef}
								name={"newsletter-input"}
								error={error.email || error.emailRegex || error.general}
							/>
						<Button
							type="submit"
							disabled={loading}
							className="md:w-1/2"
						>
							{loading ? <LoadingSpinner /> : "Assinar"}
						</Button>
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
