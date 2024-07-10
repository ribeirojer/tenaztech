import Layout from "@/components/core/Layout";
import React from "react";

type Props = {};

const comparacao = (props: Props) => {
	const products = [
		{
			name: "Produto A",
			features: {
				price: "$999",
				screenSize: '15"',
				resolution: "1920x1080",
				processor: "Intel Core i5",
				ram: "8GB",
			},
		},
		{
			name: "Produto B",
			features: {
				price: "$1299",
				screenSize: '14"',
				resolution: "2560x1440",
				processor: "AMD Ryzen 7",
				ram: "16GB",
			},
		},
		// Adicione mais produtos conforme necessário
	];
	const features = [
		{ name: "Preço", key: "price" },
		{ name: "Tamanho da Tela", key: "screenSize" },
		{ name: "Resolução", key: "resolution" },
		{ name: "Processador", key: "processor" },
		{ name: "RAM", key: "ram" },
		// Adicione mais características conforme necessário
	];

	return (		<Layout>

		<div className="container mx-auto">
			<h1 className="text-3xl font-bold mb-4">Comparação de Produtos</h1>
			<table className="w-full border-collapse border border-gray-200">
				<thead>
					<tr className="bg-gray-200">
						<th className="border border-gray-200 py-2 px-4">
							Características
						</th>
						{products.map((product) => {
							return (
								<th className="border border-gray-200 py-2 px-4">
									{product.name}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{features.map((feature) => {
						return (
							<tr key="index" className="border-b border-gray-200">
								<td className="border border-gray-200 py-2 px-4">
									{feature.name}
								</td>
								{products.map((product: any) => {
									return (
										<td
											v-for="(product, idx) in products"
											key="idx"
											className="border border-gray-200 py-2 px-4"
										>
											{product.features[feature.key] || "-"}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div></Layout>
	);
};

export default comparacao;
