import Layout from "@/components/core/Layout";
import React from "react";

type Props = {};

const blog = (props: Props) => {
	const blogItems = [
		{
			image:
				"https://cdn.tailgrids.com/2.0/image/application/images/blogs/blog-01/image-01.jpg",
			title: "Meet AutoManage, the best AI management tools",
			details:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
			buttonText: "View Details",
			buttonLink: "#",
			date: "Dec 22, 2023",
		},
		{
			image:
				"https://cdn.tailgrids.com/2.0/image/application/images/blogs/blog-01/image-02.jpg",
			title: "How to earn more money as a wellness coach",
			details:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
			buttonText: "View Details",
			buttonLink: "#",
			date: "Mar 15, 2023",
		},
		{
			image:
				"https://cdn.tailgrids.com/2.0/image/application/images/blogs/blog-01/image-03.jpg",
			title: "The no-fuss guide to upselling and cross selling",
			details:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
			buttonText: "View Details",
			buttonLink: "#",
			date: "Jan 05, 2023",
		},
	];
	const posts = [
		{ id: 1, title: "Postagem 1", content: "Conteúdo da postagem 1" },
		{ id: 2, title: "Postagem 2", content: "Conteúdo da postagem 2" },
		// Adicione mais postagens conforme necessário
	];
	return (
		<Layout>
			<div>
				<h1>Blog</h1>
				{posts.map((post) => {
					return (
						<div key={post.id}>
							<h2>{post.title}</h2>
							<p>{post.content}</p>
						</div>
					);
				})}
				<section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20 bg-white dark:bg-dark">
					<div className="container mx-auto">
						<div className="flex flex-wrap justify-center -mx-4">
							<div className="w-full px-4">
								<div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
									<span className="block mb-2 text-lg font-semibold text-primary">
										{" "}
										Our Blogs{" "}
									</span>
									<h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px] dark:text-white">
										Our Recent News
									</h2>
									<p className="text-base text-body-color dark:text-dark-6">
										There are many variations of passages of Lorem Ipsum
										available but the majority have suffered alteration in some
										form.
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-wrap -mx-4">
							{blogItems.map((item) => {
								return (
									<div className="w-full px-4 md:w-1/2 lg:w-1/3">
										<div className="w-full mb-10">
											<div className="mb-8 overflow-hidden rounded">
												<img src="item.image" alt="image" className="w-full" />
											</div>
											<div>
												<span className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary">
													{item.date}
												</span>
												<h3>
													<a
														href="item.buttonLink"
														className="inline-block mb-4 text-xl font-semibold text-dark dark:text-white hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
													>
														{item.title}
													</a>
												</h3>
												<p className="text-base text-body-color dark:text-dark-6">
													{item.details}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default blog;
