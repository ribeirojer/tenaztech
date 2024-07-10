import axios from 'axios'
import React, { useEffect } from 'react'

type Props = {}

const Home = (props: Props) => {
  let stats = {
    totalOrders: 100,
    totalRevenue: 5000,
    newCustomers: 10,
    returnCustomers: 5
  }
  const data = [
    { name: 'January', value: 1000 },
    { name: 'February', value: 2000 },
    { name: 'March', value: 1500 },
    { name: 'April', value: 2500 },
    { name: 'May', value: 3000 },
    { name: 'June', value: 3500 },
    { name: 'July', value: 4000 },
    { name: 'August', value: 4500 },
    { name: 'September', value: 5000 },
    { name: 'October', value: 5500 },
    { name: 'November', value: 6000 },
    { name: 'December', value: 6500 }
  ]
  let orders = [

    { id: 1, customer: 'John Doe', date: '2023-05-01', total: 100, channel: "", status: "" },
    { id: 2, customer: 'Jane Smith', date: '2023-05-03', total: 200, channel: "", status: "" },
    { id: 3, customer: 'Bob Johnson', date: '2023-05-05', total: 150, channel: "", status: "" },
    { id: 4, customer: 'Alice Williams', date: '2023-05-07', total: 250, channel: "", status: "" },
    { id: 5, customer: 'John Doe', date: '2023-05-09', total: 300, channel: "", status: "" }
  ]
  let dropdownVisible: number  | null = null;
  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get("https://api.example.com/stats");
      stats = response.data;
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }
  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://api.example.com/orders");
      orders = response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  const toggleDropdown = (orderId: number) => {
    if (dropdownVisible === orderId) {
      dropdownVisible = null;
    } else {
      dropdownVisible = orderId;
    }
  }
  return (

    <div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="card border rounded-lg shadow-md p-4 bg-white">
        <div className="card-header">
          <div className="card-title text-lg font-semibold">Total Orders</div>
          <div className="card-description text-gray-600">The total number of orders placed on your store.</div>
        </div>
        <div className="card-content mt-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold">{ stats.totalOrders }</span>
            <svg className="h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12m-6-6v12"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="card border rounded-lg shadow-md p-4 bg-white">
        <div className="card-header">
          <div className="card-title text-lg font-semibold">Total Revenue</div>
          <div className="card-description text-gray-600">The total amount of revenue generated from your store.</div>
        </div>
        <div className="card-content mt-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold">{ stats.totalRevenue }</span>
            <svg className="h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12m-6-6v12"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="card border rounded-lg shadow-md p-4 bg-white">
        <div className="card-header">
          <div className="card-title text-lg font-semibold">New Customers</div>
          <div className="card-description text-gray-600">The number of new customers that have signed up on your store.</div>
        </div>
        <div className="card-content mt-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold">{ stats.newCustomers }</span>
            <svg className="h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12m-6-6v12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div className="border shadow-sm rounded-lg p-2 mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th className="min-w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
         {orders.map((order) => ( <tr key={order.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ order.id }</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ order.customer }</td>
            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ order.channel }</td>
            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ order.date }</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{ order.total }</td>
            <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ order.status }</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
              <div className="relative inline-block text-left">
                <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" onClick={()=>toggleDropdown(order.id)}>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12m-6-6v12" />
                  </svg>
                  <span className="sr-only">Actions</span>
                </button>
                <div v-if="dropdownVisible === order.id" className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">View order</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Customer details</a>
                  </div>
                </div>
              </div>
            </td>
          </tr>))}
        </tbody>
      </table>
    </div>
  </div>  )
}

export default Home
