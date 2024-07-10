import React from "react";

type Props = {
	tabs: { name: string; value: string }[];
	selectedTab: string;
	selectTab: (tab: string) => void;
};

const Tabs = ({ tabs, selectedTab, selectTab }: Props) => {
	return (
		<div className="tabs">
			{tabs.map((tab) => (
				<button
					key={tab.value}
					className={`tab ${selectedTab === tab.value ? "active" : ""}`}
					onClick={() => selectTab(tab.value)}
				>
					{tab.name}
				</button>
			))}
		</div>
	);
};

export default Tabs;
