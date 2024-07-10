import React from "react";
import Customers from "../components/admin/Customers";
import Finances from "../components/admin/Finances";
import Layout from "@/components/core/Layout";
import Analytics from "@/components/admin/Analytics";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import Home from "@/components/admin/Home";
import OrderTable from "@/components/admin/OrderTable";
import Products from "@/components/admin/Products";

type Props = {};

const administrador = (props: Props) => {
	return (
		<Layout>
			<div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
				<Sidebar onNavigate="currentView = $event" />
				<div className="flex flex-col">
					<Header />
					<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
						<Home v-if="currentView === 'home'" />
						<OrderTable v-if="currentView === 'orders'" />
						<Products v-if="currentView === 'products'" />
						<Customers v-if="currentView === 'customers'" />
						<Finances v-if="currentView === 'finances'" />
						<Analytics v-if="currentView === 'analytics'" />
					</main>
				</div>
			</div>
		</Layout>
	);
};

export default administrador;
