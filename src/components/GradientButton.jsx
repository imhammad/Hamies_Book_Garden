import React from 'react'
import { Button } from "flowbite-react";


const GradientButton = () => {
  return (
    <div className="flex items-center justify-center bg-black">
      <Button className="mt-10 mb-10 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800 px-8 py-4 text-xl">
        Fantasy Collection
      </Button>
     </div>
  )
}

export default GradientButton
