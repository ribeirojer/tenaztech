import React from "react";

const TabContent = ({ tabs, activeTab }: any) => {
	return (
		<div className="tab-content">
			{tabs.map(
				(
					tab: {
						content:
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
					<div
						key={index}
						id={`tab${index + 1}`}
						className={`tab-pane fade ${activeTab === index ? "in active" : ""}`}
					>
						<div className="space-y-4">
							<p>{tab.content}</p>
						</div>
					</div>
				),
			)}
		</div>
	);
};

export default TabContent;
