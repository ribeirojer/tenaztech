import React from "react";
import Input from "@/components/core/Input";
import Button from "@/components/core/Button";
import Loading from "@/components/core/Loading";
import Layout from "@/components/core/Layout";
import useLogin from "../hooks/useLogin";

type Props = {};

const Login = (props: Props) => {
	const {
		formData,
		errorData,
		isLoading,
		emailRef,
		passwordRef,
		handleChange,
		handleSubmit,
	} = useLogin();

	return (
		<Layout>
			<div className="container">
				<div className="-mx-4 flex flex-wrap">
					<div className="w-full px-4">
						<div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
							<h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
								Entrar na sua conta
							</h3>
							<p className="mb-11 text-center text-base font-medium text-body-color">
								Insira suas credenciais abaixo
							</p>
							<form onSubmit={handleSubmit}>
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
										error={errorData.password}
									/>
								</div>
								<div className="mb-8 flex items-center">
									<Input
										id="rememberMe"
										type="checkbox"
										name="rememberMe"
										checked={formData.rememberMe}
										onChange={handleChange}
										className="mr-2"
										value={""}
										placeholder={""}
									/>
									<label
										htmlFor="rememberMe"
										className="text-sm font-medium text-body-color"
									>
										{" "}
										Lembrar-me{" "}
									</label>
								</div>
								<div className="mb-6">
									<Button className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
										Entrar
									</Button>
								</div>
							</form>
							<p className="text-center text-base font-medium text-body-color">
								Não tem uma conta?
								<a className="text-primary hover:underline" href="/signup">
									Criar conta
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

export default Login;
