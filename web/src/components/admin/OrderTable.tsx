import React, { useState } from 'react'

type Props = {}

const OrderTable = (props: Props) => {
	const orders = [
		{
			id: "#3210",
			customer: "Olivia Martin",
			channel: "Online Store",
			date: "February 20, 2022",
			total: "$42.25",
			status: "Shipped",
		},
		{
			id: "#3209",
			customer: "Ava Johnson",
			channel: "Shop",
			date: "January 5, 2022",
			total: "$74.99",
			status: "Paid",
		},
		// Add more orders as needed
	];

	const dropdownState = useState<{ [key: string]: boolean }>({});

	const toggleDropdown = (orderId: string) => {
		//dropdownState.values[orderId] = !dropdownState.values[orderId];
	};

	const isDropdownOpen = (orderId: string) => {
		//return dropdownState.value[orderId] || false;
	};
  return (

	<div className="border shadow-sm rounded-lg p-2">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
          <th scope="col" className="min-w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
          <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
          <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
          <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order)=>{
		return (<tr key={order.id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ order.id }</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ order.customer }</td>
          <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ order.channel }</td>
          <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ order.date }</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{ order.total }</td>
          <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ order.status }</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-right relative">
            <button onClick={()=>toggleDropdown(order.id)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              {/*<MoveHorizontalIcon class="w-4 h-4" />*/}
              <span className="sr-only">Actions</span>
            </button>
            <div v-if="isDropdownOpen(order.id)" className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">View order</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Customer details</a>
            </div>
          </td>
        </tr>)})}
      </tbody>
    </table>
  </div>  )
}

export default OrderTable
