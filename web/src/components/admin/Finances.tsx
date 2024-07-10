import React from 'react'

type Props = {}

const Finances = (props: Props) => {
  return (

<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
  <div className="flex items-center gap-4">
    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900 focus:outline-none">
      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      <span className="sr-only">Back</span>
    </button>
    <h1 className="font-semibold text-lg md:text-xl">Finances</h1>
    <div className="ml-auto flex items-center gap-2">
      <div className="relative">
        <button className="w-[280px] justify-start text-left font-normal border border-gray-300 rounded-md px-3 py-1 flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
          <span>June 01, 2023 - June 30, 2023</span>
        </button>
        <div className="absolute top-12 right-0 z-10 hidden">
        </div>
      </div>
    </div>
  </div>
  <div className="grid gap-6">
    <div className="grid md:grid-cols-3 gap-6">
      <div className="border border-gray-200 rounded-lg p-4">
        <h2 className="font-semibold text-lg text-gray-700">Net Sales</h2>
        <p className="text-2xl font-bold text-gray-900">$2389.00</p>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <h2 className="font-semibold text-lg text-gray-700">Gross Profit</h2>
        <p className="text-2xl font-bold text-gray-900">$1454.00</p>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <h2 className="font-semibold text-lg text-gray-700">Gross Margin</h2>
        <p className="text-2xl font-bold text-gray-900">$986.00</p>
      </div>
    </div>
    <h2 className="font-semibold text-lg md:text-xl">Reports</h2>
    <div className="border border-gray-200 shadow-sm rounded-lg">
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2 px-3 text-left">Start Date</th>
            <th className="py-2 px-3 text-left">End Date</th>
            <th className="py-2 px-3 text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-3">Jun 01, 2023</td>
            <td className="py-2 px-3">Jun 30, 2023</td>
            <td className="py-2 px-3 text-right">
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900 focus:outline-none">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span className="sr-only">Download</span>
              </button>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-3">May 01, 2023</td>
            <td className="py-2 px-3">May 32, 2023</td>
            <td className="py-2 px-3 text-right">
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900 focus:outline-none">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span className="sr-only">Download</span>
              </button>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-3">Apr 01, 2023</td>
            <td className="py-2 px-3">Apr 30, 2023</td>
            <td className="py-2 px-3 text-right">
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900 focus:outline-none">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span className="sr-only">Download</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</main>  )
}

export default Finances