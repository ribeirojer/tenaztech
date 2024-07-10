import React from 'react'

type Props = {}

const Checkbox = (props: Props) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-purple-600 dark:text-purple-400 border-gray-300 dark:border-gray-700 rounded"
        checked={false}
      />
      <span className="text-sm text-body-color dark:text-gray-300"></span>
    </label>  )
}

export default Checkbox