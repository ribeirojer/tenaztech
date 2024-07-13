import axios from "axios";
import React from "react";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import CalendarClockIcon from "../icons/CalendarClockIcon";

type Props = {};

const Analytics = (props: Props) => {
	let analyticsData = {
		totalSales: "",
		sessions: "",
		returningCustomers: "",
		visitors: "",
		pageViews: "",
		topReferrers: [] as any,
	};

	const fetchAnalyticsData = async () => {
		try {
			const response = await axios.get("https://api.example.com/analytics");
			analyticsData = response.data;
		} catch (error) {
			console.error("Error fetching analytics data:", Error);
		}
	};
	return (
		<div>
			<div className="flex items-center gap-4">
				<button className="px-2 py-1 bg-transparent border border-gray-400 rounded-full">
					<ArrowLeftIcon className="h-4 w-4" />
					<span className="sr-only">Back</span>
				</button>
				<h1 className="font-semibold text-lg md:text-xl">Analytics</h1>
				<div className="ml-auto flex items-center gap-2">
					<button className="hidden sm:flex px-4 py-2 bg-transparent border border-gray-400 rounded-md">
						Today
					</button>
					<button className="hidden md:flex px-4 py-2 bg-transparent border border-gray-400 rounded-md">
						This Month
					</button>
					<div className="relative">
						<button className="w-[280px] justify-start text-left font-normal px-4 py-2 bg-transparent border border-gray-400 rounded-md">
							<CalendarClockIcon className="mr-2 h-4 w-4" />
							June 01, 2023 - June 30, 2023
						</button>
						<div className="absolute right-0 mt-2 w-auto p-0 border bg-white rounded shadow-lg">
							{/*<calendar initial-focus mode="range" number-of-months="2"></calendar>*/}
						</div>
					</div>
				</div>
			</div>
			<div className="grid gap-6 mt-4">
				{/*<div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4 flex flex-col">
          <div>
            <p className="text-gray-600">Total Sales</p>
            <h3 class="text-lg font-semibold">{{ Analytics.totalSales }}</h3>
          </div>
          <div>
            <stackedbar-chart class="aspect-[4/3]" />
          </div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div>
            <p className="text-gray-600">Sessions</p>
            <h3 class="text-lg font-semibold">{{ analyticsData.sessions }}</h3>
          </div>
          <div>
            <dot-chart class="aspect-[4/3]" />
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col">
          <div>
            <p className="text-gray-600">Returning Customers</p>
            <h3 class="text-lg font-semibold">{{ analyticsData.returningCustomers }}%</h3>
          </div>
          <div>
            <groupedbar-chart class="aspect-[4/3]" />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4 flex flex-col">
          <div>
            <p className="text-gray-600">Visitors</p>
            <h3 class="text-lg font-semibold">{{ analyticsData.visitors }}</h3>
          </div>
          <div>
            <line-chart class="aspect-[4/3]" />
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col">
          <div>
            <p className="text-gray-600">Page Views</p>
            <h3 class="text-lg font-semibold">{{ analyticsData.pageViews }}</h3>
          </div>
          <div>
            <labelledpie-chart class="aspect-[4/3]" />
          </div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div>
            <p className="text-gray-600">Top Referrers</p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center" v-for="referrer in analyticsData.topReferrers" :key="referrer.source">
              <div>{{ referrer.source }}</div>
              <div class="font-semibold ml-auto">{{ referrer.visits }}</div>
            </div>
          </div>
        </div>*/}
			</div>
		</div>
	);
};

export default Analytics;
