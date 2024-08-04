import { useState, useRef, FormEvent } from "react";
import axios from "axios";
import axiosClient from "@/utils/axiosClient";

const useContactForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		message: "",
		general: "",
	});

	const [loading, setLoading] = useState(false);
	const [isDisable, setIsDisable] = useState(false);
	const [success, setSuccess] = useState(false);

	const nameRef = useRef<HTMLInputElement | null>(null);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const messageRef = useRef<HTMLTextAreaElement | null>(null);

	const closeSuccess = () => {
		setTimeout(() => {
			setSuccess(false);
		}, 5000);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setErrors((prev) => ({
			name: "",
			email: "",
			message: "",
			general: "",
		}));

		if (formData.name === "") {
			setErrors((prev) => ({ ...prev, name: "Por favor digite seu nome..." }));
			nameRef.current?.focus();
			return;
		}
		if (formData.name.length < 3 || formData.name.length > 50) {
			setErrors((prev) => ({
				...prev,
				name: "O campo Nome deve ter entre 3 e 50 caracteres.",
			}));
			nameRef.current?.focus();
			return;
		}
		if (!formData.email) {
			setErrors((prev) => ({
				...prev,
				email: "Por favor digite seu email...",
			}));
			emailRef.current?.focus();
			return;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			setErrors((prev) => ({
				...prev,
				email: "O campo Email não possui um formato válido.",
			}));
			emailRef.current?.focus();
			return;
		}

		if (!formData.message) {
			setErrors((prev) => ({
				...prev,
				message: "Por favor digite sua mensagem...",
			}));
			messageRef.current?.focus();
			return;
		}

		setLoading(true);
		setIsDisable(true);

		try {
			const response = await axiosClient.post("/support-tickets", formData);

			if (response.status !== 200 && response.status !== 201) {
				console.error("Erro no servidor:", response.data.message);
				setErrors((prev) => ({
					...prev,
					general: "Ocorreu um erro no servidor ao enviar sua mensagem",
				}));
			} else {
				setSuccess(true);
				setFormData({
					name: "",
					email: "",
					message: "",
				});
				closeSuccess();
			}
		} catch (error) {
			console.error("Erro ao salvar os dados:", error);
			setErrors((prev) => ({
				...prev,
				general: "Ocorreu um erro ao enviar sua mensagem",
			}));
		}
		setLoading(false);
		setIsDisable(false);
	};

	const handleBlur = () => {
		setErrors((prev) => ({
			...prev,
			name: "",
			email: "",
			message: "",
			general: "",
		}));
	};

	return {
		formData,
		errors,
		loading,
		isDisable,
		success,
		nameRef,
		emailRef,
		messageRef,
		setFormData,
		handleSubmit,
		handleBlur,
	};
};

export default useContactForm;
