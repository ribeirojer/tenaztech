import React, { useRef, useState } from "react";
import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import Loading from "@/components/core/Loading";
import { passwordRegex } from "../utils/constants";
import { useRouter } from "next/router";
import axiosClient from "@/utils/axiosClient";
import Layout from "@/components/core/Layout";

type Props = {};

const AlterarSenha = (props: Props) => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({
		password: "",
		passwordStrong: "",
		confirmPassword: "",
		general: "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();
	const { token } = router.query;

	const closeSuccess = () => {
		setTimeout(() => {
			setSuccess(false);
			router.push("/entrar");
		}, 5000);
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		setErrors((prev) => ({
			password: "",
			passwordStrong: "",
			confirmPassword: "",
			general: "",
		}));

		if (!password) {
			setErrors((prev) => ({
				...prev,
				password: "Por favor digite sua nova senha...",
			}));
			passwordRef.current?.focus();
			return;
		}
		if (!passwordRegex.test(password)) {
			setErrors((prev) => ({
				...prev,
				passwordStrong: "Por favor digite uma senha forte...",
			}));
			passwordRef.current?.focus();
			return;
		}
		if (!confirmPassword) {
			setErrors((prev) => ({
				...prev,
				confirmPassword: "Por favor confirme sua nova senha...",
			}));
			confirmPasswordRef.current?.focus();
			return;
		}
		if (password !== confirmPassword) {
			setErrors((prev) => ({
				...prev,
				confirmPassword: "As senhas não são iguais...",
			}));
			confirmPasswordRef.current?.focus();
			return;
		}

		setLoading(true);

		try {
			const response = await axiosClient.post("/auth/change-password", {
				password,
				token,
			});
			if (response.status === 200) {
				setSuccess(true);
				closeSuccess();
			} else {
				setErrors((prev) => ({
					...prev,
					general: "Erro ao alterar a senha...",
				}));
			}
		} catch (error) {
			console.error("Erro ao alterar a senha:", error);
			setErrors((prev) => ({
				...prev,
				general:
					"Ocorreu um erro ao alterar a senha. Tente novamente mais tarde.",
			}));
		}
		setLoading(false);
	};

	return (
		<Layout>
			<main className="container px-4 mx-auto my-8 md:my-16">
				<h1 className="text-center text-3xl font-semibold mb-4">
					Alterar Senha
				</h1>
				<p className="text-center text-gray-600 mb-6">
					Digite sua nova senha abaixo.
				</p>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-2 max-w-md mx-auto"
				>
					<Input
						placeholder="Sua senha"
						type="password"
						id="password"
						name="password"
						ref={passwordRef}
						label="Senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={""}
					/>
					<Input
						placeholder="Confirmação da senha"
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						ref={confirmPasswordRef}
						label="Confirmação de senha"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className={""}
					/>
					<Button type="submit" className={""}>
						Enviar
					</Button>
				</form>
				{errors.password && (
					<p className="text-center text-red-500 mt-2">{errors.password}</p>
				)}
				{errors.passwordStrong && (
					<p className="text-center text-red-500 mt-2">
						{errors.passwordStrong}
					</p>
				)}
				{errors.confirmPassword && (
					<p className="text-center text-red-500 mt-2">
						{errors.confirmPassword}
					</p>
				)}
				{errors.general && (
					<p className="text-center text-red-500 mt-2">{errors.general}</p>
				)}
				{success && (
					<p className="text-center text-green-500 mt-2">
						Senha alterada com sucesso!
					</p>
				)}
			</main>
			{loading && <Loading />}
		</Layout>
	);
};

export default AlterarSenha;
