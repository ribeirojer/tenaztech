import React from "react";

const Reviews = ({ reviews }: any) => {
	return (
		<div className="flex flex-wrap">
			<div className="w-full md:w-3/12">
				<div id="rating" className="space-y-4">
					<div className="rating-avg flex items-center space-x-2">
						<span className="text-2xl">4.5</span>
						<div className="rating-stars flex space-x-1 text-yellow-400">
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star-o"></i>
						</div>
					</div>
					<ul className="rating space-y-2">
						{reviews.map(
							(
								review: {
									stars: number;
									percentage: any;
									count:
										| string
										| number
										| bigint
										| boolean
										| React.ReactElement<
												any,
												string | React.JSXElementConstructor<any>
										  >
										| Iterable<React.ReactNode>
										| React.ReactPortal
										| Promise<React.AwaitedReactNode>
										| null
										| undefined;
								},
								index: React.Key | null | undefined,
							) => (
								<li key={index} className="flex items-center space-x-2">
									<div className="rating-stars flex space-x-1 text-yellow-400">
										{Array.from({ length: 5 }, (_, i) => (
											<i
												key={i}
												className={`fa fa-star${i >= review.stars ? "-o" : ""}`}
											></i>
										))}
									</div>
									<div className="rating-progress flex-1 bg-gray-200 rounded-md overflow-hidden">
										<div
											className="bg-yellow-400 h-2"
											style={{ width: `${review.percentage}%` }}
										></div>
									</div>
									<span className="sum">{review.count}</span>
								</li>
							),
						)}
					</ul>
				</div>
			</div>
			<div className="w-full md:w-9/12">
				<div id="reviews" className="space-y-4">
					<ul className="review-list space-y-4">
						{reviews.map(
							(
								review: {
									author:
										| string
										| number
										| bigint
										| boolean
										| React.ReactElement<
												any,
												string | React.JSXElementConstructor<any>
										  >
										| Iterable<React.ReactNode>
										| React.ReactPortal
										| Promise<React.AwaitedReactNode>
										| null
										| undefined;
									stars: number;
									body:
										| string
										| number
										| bigint
										| boolean
										| React.ReactElement<
												any,
												string | React.JSXElementConstructor<any>
										  >
										| Iterable<React.ReactNode>
										| React.ReactPortal
										| Promise<React.AwaitedReactNode>
										| null
										| undefined;
								},
								index: React.Key | null | undefined,
							) => (
								<li key={index} className="flex items-start space-x-4">
									<div className="flex-shrink-0">
										<div className="review-heading">
											<h5 className="text-xl">{review.author}</h5>
											<div className="review-rating flex space-x-1 text-yellow-400">
												{Array.from({ length: 5 }, (_, i) => (
													<i
														key={i}
														className={`fa fa-star${i >= review.stars ? "-o" : ""}`}
													></i>
												))}
											</div>
										</div>
										<div className="review-body">
											<p>{review.body}</p>
										</div>
									</div>
								</li>
							),
						)}
					</ul>
					<ul className="reviews-pagination space-y-4">
						<li className="inline-block">
							<a href="#" className="hover:underline text-blue-600">
								1
							</a>
						</li>
						<li className="inline-block">
							<a href="#" className="hover:underline text-blue-600">
								2
							</a>
						</li>
						<li className="inline-block">
							<a href="#" className="hover:underline text-blue-600">
								3
							</a>
						</li>
						<li className="inline-block">
							<a href="#" className="hover:underline text-blue-600">
								4
							</a>
						</li>
						<li className="inline-block">
							<a href="#" className="hover:underline text-blue-600">
								<i className="fa fa-angle-right"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="w-full">
				<div id="review-form" className="space-y-4">
					<form className="review-form space-y-4">
						<input
							className="input w-full p-2 border border-gray-300 rounded-md"
							type="text"
							placeholder="Your Name"
						/>
						<input
							className="input w-full p-2 border border-gray-300 rounded-md"
							type="email"
							placeholder="Your Email"
						/>
						<textarea
							className="input w-full p-2 border border-gray-300 rounded-md"
							placeholder="Your Review"
						></textarea>
						<div className="input-rating flex items-center space-x-2">
							<span className="block">Your Rating: </span>
							<div className="rating flex space-x-1 text-yellow-400">
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star-o"></i>
							</div>
						</div>
						<button className="primary-btn bg-blue-600 text-white px-4 py-2 rounded-md">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Reviews;
