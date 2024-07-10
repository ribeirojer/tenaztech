import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/core/Layout";

type Props = {};

const blogSingle = (props: Props) => {
	const route = useRouter();
	let post = {
		title: "",
		content: "",
		date: "",
	};

	const fetchPost = async () => {
		const slug = route.query.slug as string;
		try {
			const response = await axios.get(`/api/blog/${slug}`);
			post = response.data;
		} catch (error) {
			console.error("Erro ao buscar post do blog:", error);
		}
	};
	function formatDate(date: string) {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return new Date(date).toLocaleDateString(undefined, options);
	}
	return (
		<Layout>

		<div className="blog-post-view">
			<h1 className="text-3xl font-bold mb-4">{post.title}</h1>
			<p className="text-gray-600 mb-4">Publicado em {formatDate(post.date)}</p>
			<div v-html="post.content" className="prose"></div>
		</div>
		</Layout>
	);
};

export default blogSingle;
