import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

function Hero() {

    const{setSearchFilter,setIsSearched}=useContext(AppContext)

    const titleRef=useRef(null)
    const locationRef=useRef(null)

    const onSearch=()=>{
        setSearchFilter({
            title : titleRef.current.value,
            location : locationRef.current.value
        })
        setIsSearched(true)
        console.log({
            title : titleRef.current.value,
            location : locationRef.current.value
        })
    }



  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
        <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 px-8 rounded-lg text-center'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
            <p className='mb-8 max-w-xl mx-auto text-sm font-light'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
            
            <div className='max-w-4xl mx-auto bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2 items-center'>
                <div className='flex items-center bg-gray-50 rounded px-3 py-2 flex-1 w-full'>
                    <img className='h-4 sm:h-5 w-4 mr-2' src={assets.search_icon} alt="search"  />
                    <input 
                        type="text"
                        placeholder='Search for jobs'
                        className='max-sm:text-xs outline-none bg-transparent flex-1 text-gray-700' 
                        ref={titleRef}
                    />
                </div>
                
                <div className='flex items-center bg-gray-50 rounded px-3 py-2 flex-1 w-full'>
                    <img className='h-4 sm:h-5 w-4 mr-2' src={assets.location_icon} alt="location"  />
                    <input 
                        type="text"
                        placeholder='Location'
                        className='max-sm:text-xs outline-none bg-transparent flex-1 text-gray-700' 
                        ref={locationRef}
                    />
                </div>
                
                <button onClick={onSearch} className='bg-blue-600 text-white px-8 py-2 rounded font-medium transition-colors w-full md:w-auto'>
                    Search
                </button>
            </div>
        </div>

        <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
            <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
                <p className='font-medium '>Trust by</p>
                <img className='h-6' src={assets.microsoft_logo} alt="" />
                <img className='h-6' src={assets.walmart_logo} alt="" />
                <img className='h-6' src={assets.accenture_logo} alt="" />
                <img className='h-6' src={assets.samsung_logo} alt="" />
                <img className='h-6' src={assets.amazon_logo} alt="" />
                <img className='h-6' src={assets.adobe_logo} alt="" />
            </div>

        </div>
    </div>
  )
}

export default Hero