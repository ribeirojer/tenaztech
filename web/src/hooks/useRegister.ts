import { useState, useRef, useCallback } from "react";
import { emailRegex, passwordRegex } from "../utils/constants";
import axiosClient from "@/utils/axiosClient";
import { useRouter } from "next/router";

const useRegister = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		termsAccepted: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errorData, setErrorData] = useState({
		name: "",
		email: "",
		emailRegex: "",
		password: "",
		passwordStrong: "",
		terms: "",
		general: "",
	});

	const nameRef = useRef<HTMLInputElement | null>(null);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const router = useRouter();

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	}, []);

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setErrorData((prev) => ({
				...prev,
				name: "",
				email: "",
				emailRegex: "",
				password: "",
				passwordStrong: "",
				terms: "",
				general: "",
			}));

			if (!formData.name) {
				setErrorData((prev) => ({ ...prev, name: "Name is required" }));
				nameRef.current?.focus();
				return;
			}
			if (!formData.email) {
				setErrorData((prev) => ({ ...prev, email: "Email is required" }));
				emailRef.current?.focus();
				return;
			}
			if (!emailRegex.test(formData.email)) {
				setErrorData((prev) => ({
					...prev,
					emailRegex: "Invalid email format",
				}));
				emailRef.current?.focus();
				return;
			}
			if (!formData.password) {
				setErrorData((prev) => ({ ...prev, password: "Password is required" }));
				passwordRef.current?.focus();
				return;
			}
			if (!passwordRegex.test(formData.password)) {
				setErrorData((prev) => ({
					...prev,
					passwordStrong: "Password is not strong enough",
				}));
				passwordRef.current?.focus();
				return;
			}
			if (!formData.termsAccepted) {
				setErrorData((prev) => ({
					...prev,
					terms: "You must accept the terms and conditions",
				}));
				return;
			}
			setIsLoading(true);
			axiosClient
				.post("/auth/register", formData)
				.then((data) => {
					// saveUserToContext(data); // Uncomment this if needed
					setIsLoading(false);
					router.push("/");
				})
				.catch((error) => {
					setIsLoading(false);
					setErrorData((prev) => ({
						...prev,
						general: "Registration failed",
					}));
					console.error(error);
				});
		},
		[formData, router],
	);

	return {
		formData,
		errorData,
		isLoading,
		nameRef,
		emailRef,
		passwordRef,
		handleChange,
		handleSubmit,
	};
};

export default useRegister;
