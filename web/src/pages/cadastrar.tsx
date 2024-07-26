import React, { useRef } from "react";
import { useContext, useState } from "react";
import { emailRegex, passwordRegex } from "../utils/constants";
//import { UserContext } from "./_app";
import Input from "@/components/core/Input";
import Button from "@/components/core/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "@/components/core/Loading";
import axiosClient from "@/utils/axiosClient";
import Layout from "@/components/core/Layout";

type Props = {};

const cadastrar = (props: Props) => {
	//const { saveUserToContext } = useContext(UserContext);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const nameRef = useRef<HTMLInputElement | null>(null);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const [errorData, setErrorData] = useState({
		name: "",
		email: "",
		emailRegex: "",
		password: "",
		passwordStrong: "",
		confirmPassword: "",
		confirmPasswordMatch: "",
		terms: "",
		general: "",
	});

	const handleSubmit = (event: any) => {
		event.preventDefault();
		setErrorData((prev) => ({
			name: "",
			email: "",
			emailRegex: "",
			password: "",
			passwordStrong: "",
			confirmPassword: "",
			confirmPasswordMatch: "",
			terms: "",
			general: "",
		}));

		if (!formData.name) {
			setErrorData((prev) => ({ ...prev, name: "" }));
			nameRef.current?.focus();
			return;
		}
		if (!formData.email) {
			setErrorData((prev) => ({ ...prev, email: "" }));
			emailRef.current?.focus();
			return;
		}
		if (!emailRegex.test(formData.email)) {
			setErrorData((prev) => ({ ...prev, emailRegex: "" }));
			emailRef.current?.focus();
			return;
		}
		if (!formData.password) {
			setErrorData((prev) => ({ ...prev, password: "" }));
			passwordRef.current?.focus();
			return;
		}
		if (!passwordRegex.test(formData.password)) {
			setErrorData((prev) => ({ ...prev, passwordStrong: "" }));
			passwordRef.current?.focus();
			return;
		}
		setIsLoading(true);
		axiosClient
			.post("/auth/register", formData)
			.then((data) => {
				//saveUserToContext(data);
				setIsLoading(false);
				router.push("/");
			})
			.catch((error) => {
				setIsLoading(false);
				setErrorData((prev) => ({
					...prev,
					general: "",
				}));
				console.log(error);
			});
	};

	return (
		<Layout>
			<main className="container px-4 my-8 md:my-16 mx-auto">
				<h1 className="text-center text-4xl font-bold">Cadastrar</h1>
				<p className="text-center text-gray-500 my-4">
					Preencha os dados abaixo para se cadastrar
				</p>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col px-4 pb-4 gap-4 border border-pink-300 rounded-lg max-w-md mx-auto"
				>
					<Input
						id="last-name"
						type="text"
						label="Último nome"
						error={errorData.name}
						placeholder="Último nome"
						value={formData.name}
						onChange={(e: any) => {
							setFormData({ ...formData, name: e.target.value });
						}}
						inputRef={nameRef}
						className={""}
					/>
					<Input
						id="email"
						error={errorData.email}
						type="email"
						label="E-mail"
						placeholder="E-mail"
						value={formData.email}
						onChange={(e: any) => {
							setFormData({ ...formData, email: e.target.value });
						}}
						inputRef={emailRef}
						className={""}
					/>
					{errorData.emailRegex && (
						<p className="text-red-500 mt-1">E-mail inválido</p>
					)}
					<Input
						id="password"
						error={errorData.password}
						label="Senha"
						placeholder="Digite sua senha"
						type="password"
						value={formData.password}
						onChange={(e: any) => {
							setFormData({ ...formData, password: e.target.value });
						}}
						inputRef={passwordRef}
						className={""}
					/>
					{errorData.passwordStrong && (
						<p className="text-red-500 mt-1">
							A senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1
							letra minúscula e 1 número
						</p>
					)}
					<Button type="submit" className={""}>
						Cadastrar
					</Button>
					{errorData.general && (
						<p className="text-red-500 mt-1 text-center my-4">
							Erro ao cadastrar. Tente novamente mais tarde.
						</p>
					)}
				</form>
				<p className="text-center text-gray-500 my-8">
					Já tem uma conta?{" "}
					<Link
						href="/entrar"
						passHref
						className="text-pink-500 underline hover:text-pink-700"
					>
						Entrar
					</Link>
				</p>
			</main>
			{isLoading && <Loading></Loading>}
		</Layout>
	);
};

export default cadastrar;
