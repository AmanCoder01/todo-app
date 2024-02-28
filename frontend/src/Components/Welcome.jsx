import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return (
        <div className='flex flex-col gap-5 items-center h-[90vh] w-[90wh] justify-center'>
            <h1 className="text-center text-3xl font-bold text-richblack-5">
                Welcome to the ToDo App!
            </h1>

            <Link to="/signup">
                <button className="bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-richblack-700 font-bold py-[7px] px-5 rounded-lg"
                >Signup</button></Link>
        </div>
    )
}

export default Welcome
