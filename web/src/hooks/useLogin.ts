import { useRouter } from "next/router";
import { useRef, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { emailRegex } from "@/utils/constants";

const useLogin = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});
	const [errorData, setErrorData] = useState({
		email: "",
		emailRegex: "",
		password: "",
		general: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorData({
			email: "",
			emailRegex: "",
			password: "",
			general: "",
		});

		if (!formData.email) {
			setErrorData((prev) => ({ ...prev, email: "O e-mail é obrigatório" }));
			emailRef.current?.focus();
			return;
		}
		if (!emailRegex.test(formData.email)) {
			setErrorData((prev) => ({ ...prev, emailRegex: "E-mail inválido" }));
			emailRef.current?.focus();
			return;
		}
		if (!formData.password) {
			setErrorData((prev) => ({ ...prev, password: "A senha é obrigatória" }));
			passwordRef.current?.focus();
			return;
		}

		setIsLoading(true);

		try {
			await axiosClient.post("/auth/login", formData);
			router.push("/");
		} catch (error) {
			setErrorData((prev) => ({
				...prev,
				general: "Ocorreu um erro ao fazer login",
			}));
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formData,
		errorData,
		isLoading,
		emailRef,
		passwordRef,
		handleChange,
		handleSubmit,
	};
};

export default useLogin;
