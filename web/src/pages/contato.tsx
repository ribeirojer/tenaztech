import React from "react";
import Layout from "@/components/core/Layout";
import Button from "@/components/core/Button";
import Loading from "@/components/core/Loading";
import useContactForm from "@/hooks/useContactForm";
import MapPinIcon from "@/components/icons/MapPinIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import Input from "@/components/core/Input";

type Props = {};

const contato = (props: Props) => {
	const {
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
	} = useContactForm();

	const data = [
		{
			id: 1,
			address: "Rua XV de Novembro, nº 000, Glória, Joinville - SC",
			email: "contato@boutiquedamoh.com",
			phone: "(47) 11111-1111",
		},
		{
			id: 2,
			address: "Rua Doutor João Colin, nº 000, Centro, Joinville - SC",
			email: "contato2@boutiquedamoh.com",
			phone: "(47) 22222-2222",
		},
	];

	return (
		<Layout>
			<h1 className="text-3xl font-bold my-8 text-center">
				Entre em contato conosco para um estilo inesquecível!
			</h1>
			<div className="container mx-auto px-4 md:px-0 flex flex-col justify-between md:flex-row">
				<div className="w-full md:w-1/2">
					<p className="mb-4">
						Você é única, e seu estilo também deve ser! Estamos aqui para tornar
						seus sonhos de moda realidade. Seja para uma ocasião especial ou
						para renovar seu guarda-roupa, nossa boutique de roupas está pronta
						para te ajudar a brilhar.
					</p>
					{data.map((item) => (
						<div key={item.id} className="flex flex-col mb-3">
							<h5 className="font-semibold mb-3">Loja {item.id}</h5>
							<p className="flex gap-2 mb-4">
								<MapPinIcon className="size-8" />
								<span>{item.address}</span>
							</p>
							<p className="flex gap-2 mb-4">
								<EmailIcon className="size-8" />
								<span>{item.email}</span>
							</p>
							<p className="flex gap-2 mb-4">
								<PhoneIcon className="size-8" />
								<span>{item.phone}</span>
							</p>
						</div>
					))}
				</div>
				<form
					className="flex flex-col mt-8 md:mt-0 gap-4 w-full md:w-2/5"
					name="sentMessage"
					id="contactForm"
					onSubmit={handleSubmit}
				>
					<Input
						id="name"
						type="text"
						placeholder="Seu nome"
						value={formData.name}
						ref={nameRef}
						error={errors.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						name={""}
					/>
					<Input
						id="email"
						type="text"
						placeholder="Seu melhor e-mail"
						value={formData.email}
						ref={emailRef}
						error={errors.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						name={""}
					/>

					<div className="flex flex-col">
						<textarea
							id="message"
							className="text-body-color border-[f0f0f0] focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none focus:ring-2 focus:ring-[#ec4899aa]"
							rows={6}
							placeholder="Digite sua mensagem aqui"
							value={formData.message}
							ref={messageRef}
							onChange={(e) =>
								setFormData({ ...formData, message: e.target.value })
							}
						></textarea>
						{errors.message && (
							<p className="text-red-500 mt-1">{errors.message}</p>
						)}
					</div>
					<Button type="submit" disabled={isDisable}>
						Enviar mensagem
					</Button>
					{errors.general && (
						<p className="text-red-500 mt-1 text-center">{errors.general}</p>
					)}
					{success && (
						<p className="text-green-500 mt-1 text-center">Mensagem enviada!</p>
					)}
				</form>
			</div>
			{loading && <Loading />}
		</Layout>
	);
};

export default contato;
