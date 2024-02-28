import React from 'react'

const Welcome = () => {
    return (
        <div className='flex flex-col gap-5 items-center h-[100vh] w-[100wh]'>
            <h1 className="text-center text-4xl font-bold text-richblack-5">
                Welcome to the ToDo App!
            </h1>

            <button className="bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-richblack-700 font-bold py-[7px] px-5 rounded-lg"
            >Signup</button>
        </div>
    )
}

export default Welcome
