import React from "react";

const TabNav = ({ tabs, activeTab, setActiveTab }: any) => {
	return (
		<ul className="tab-nav flex space-x-4 border-b border-gray-300 pb-2">
			{tabs.map(
				(
					tab: {
						title:
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
					index: any,
				) => (
					<li
						key={index}
						className={`${activeTab === index ? "active text-blue-600" : ""}`}
					>
						<a
							href={`#tab${index + 1}`}
							className="hover:underline"
							onClick={(e) => {
								e.preventDefault();
								setActiveTab(index);
							}}
						>
							{tab.title}
						</a>
					</li>
				),
			)}
		</ul>
	);
};

export default TabNav;
