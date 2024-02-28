import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { setToken, removeToken, setRefresh } from '../redux/slices/IsLoggedIn.js';





const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.app);
    const info = localStorage.getItem('user');

    useEffect(() => {
        dispatch(setToken(info));
    }, [])


    function handleLogout() {
        localStorage.clear();
        dispatch(removeToken(""));
        navigate("/login");
        dispatch(setRefresh(new Date()));
        dispatch(setRefresh(null));
        toast.success("Logout Successfully")
    }



    return (
        <div className=' text-white bg-richblack-900 flex justify-around py-4 items-center fixed top-0 w-full  '>
            <Link to="/dashboard" className='text-2xl font-bold text-yellow-400'>
                ToDo App📝
            </Link>
            <div className='flex gap-x-12   font-semibold items-center'>
                <Link to="/dashboard" className='text-lg lg:block xs:hidden hover:text-yellow-400'>Home</Link>
                <Link to="/dashboard" className='text-lg lg:block xs:hidden  hover:text-yellow-400'>About</Link>
                <Link to="/dashboard" className='text-lg lg:block xs:hidden  hover:text-yellow-400'>Contact</Link>
                <div className='flex space-x-4 items-center'>
                    {
                        user ? (
                            <>
                                <button onClick={handleLogout} className=' py-1 px-3 rounded-md border-2 border-gray-600 hover:bg-richblack-800 transition duration-200' >Logout</button>

                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className=' py-1 px-3 rounded-md border-2 border-gray-600 hover:bg-richblack-800 transition duration-200' >Login</button>
                                </Link>
                                <Link to="/signup">
                                    <button className=' py-1 px-3 rounded-md border-2 border-gray-600 hover:bg-richblack-800 transition duration-200' >Signup</button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
