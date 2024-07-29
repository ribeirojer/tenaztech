import React from "react";
import Input from "@/components/core/Input";
import Button from "@/components/core/Button";
import Loading from "@/components/core/Loading";
import Layout from "@/components/core/Layout";
import useRegister from "../hooks/useRegister";

type Props = {};

const Cadastrar = (props: Props) => {
	const {
		formData,
		errorData,
		isLoading,
		nameRef,
		emailRef,
		passwordRef,
		handleChange,
		handleSubmit,
	} = useRegister();

	return (
		<Layout>
			<div className="container">
				<div className="-mx-4 flex flex-wrap">
					<div className="w-full px-4">
						<div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
							<h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
								Crie sua conta
							</h3>
							<p className="mb-11 text-center text-base font-medium text-body-color">
								É totalmente gratuito e super fácil
							</p>
							<button className="border-stroke dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
								<span className="mr-3">G</span>Entrar com Google
							</button>
							<button className="border-stroke dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
								<span className="mr-3">GH</span>Entrar com Github
							</button>
							<div className="mb-8 flex items-center justify-center">
								<span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
								<p className="w-full px-5 text-center text-base font-medium text-body-color">
									Ou, registre-se com seu e-mail
								</p>
								<span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
							</div>
							<form onSubmit={handleSubmit}>
								<div className="mb-8">
									<label
										htmlFor="name"
										className="mb-3 block text-sm text-dark dark:text-white"
									>
										{" "}
										Nome Completo{" "}
									</label>
									<Input
										placeholder="Digite seu nome completo"
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										ref={nameRef}
										error={errorData.name}
									/>
								</div>
								<div className="mb-8">
									<label
										htmlFor="email"
										className="mb-3 block text-sm text-dark dark:text-white"
									>
										{" "}
										E-mail{" "}
									</label>
									<Input
										placeholder="Digite seu e-mail"
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										ref={emailRef}
										error={errorData.email || errorData.emailRegex}
									/>
								</div>
								<div className="mb-8">
									<label
										htmlFor="password"
										className="mb-3 block text-sm text-dark dark:text-white"
									>
										{" "}
										Senha{" "}
									</label>
									<Input
										placeholder="Digite sua senha"
										type="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										ref={passwordRef}
										error={errorData.password || errorData.passwordStrong}
									/>
								</div>
								<div className="mb-8 flex">
									<label
										htmlFor="termsAccepted"
										className="flex cursor-pointer select-none text-sm font-medium text-body-color"
									>
										<div className="relative">
											<input
												id="termsAccepted"
												className="sr-only"
												type="checkbox"
												name="termsAccepted"
												checked={formData.termsAccepted}
												onChange={handleChange}
											/>
											<div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
												<span
													className={
														formData.termsAccepted ? "opacity-100" : "opacity-0"
													}
												>
													✔️
												</span>
											</div>
										</div>
										<span>
											Ao criar uma conta, você concorda com os
											<a href="#0" className="text-primary hover:underline">
												{" "}
												Termos e Condições{" "}
											</a>
											, e com a nossa
											<a href="#0" className="text-primary hover:underline">
												{" "}
												Política de Privacidade{" "}
											</a>
										</span>
									</label>
									{errorData.terms && (
										<p className="text-red-500 text-sm mt-2">
											{errorData.terms}
										</p>
									)}
								</div>
								<div className="mb-6">
									<Button type="submit" isLoading={isLoading}>
										Registrar-se
									</Button>
								</div>
							</form>
							{errorData.general && (
								<p className="text-red-500 text-center mt-4">
									{errorData.general}
								</p>
							)}
							<p className="text-center text-base font-medium text-body-color">
								Já possui uma conta?
								<a className="text-primary hover:underline" href="/signin">
									Entrar
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			{isLoading && <Loading />}
		</Layout>
	);
};

export default Cadastrar;
