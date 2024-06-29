'use client'
import {HeartCrack} from 'lucide-react'

const Error = () => {
  return (
    <div className='flex h-screen w-screen overflow-hidden justify-center items-center flex-col'>
        <HeartCrack className='text-red-700' size={50} />
        <h1 className='text-red-400'>Oops! Something went wrong.</h1>
        <p>Please try again later..</p>
    </div>
  )
}

export default Error