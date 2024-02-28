import React from 'react'
import moment from 'moment/moment';
import { MdDelete } from "react-icons/md";
import { DeleteTodoApi, MarkTodoApi } from '../service/ApiCall';
import { FaCheckSquare } from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { setRefresh } from '../redux/slices/IsLoggedIn';



const OneItem = ({ item, index }) => {

    const dispatch = useDispatch();

    async function handleClick() {
        const res = await MarkTodoApi({
            todo_id: item._id,
        })
        if (res.data.status === 200) {
            toast.success(res.data.message);
            dispatch(setRefresh(new Date()));

        } else {
            toast.success("Something Wend Wrong");
        }
    }

    async function handleDelete() {
        const res = await DeleteTodoApi({
            todo_id: item._id,
        })
        if (res.data.status === 200) {
            toast.success(res.data.message);
            dispatch(setRefresh(new Date()));

        } else {
            toast.success("Something Wend Wrong");
        }
    }


    return (
        <>
            <div className='py-2 max-w-[700px]'>
                <div key={index} className='relative text-richblack-25 bg-richblack-800 rounded-xl border border-gray-500  py-4 px-4 '>
                    <div className='flex justify-between gap-3 items-center'>
                        <p className='py-2'>{item.desc}</p>
                        <div className='flex gap-4 items-center'>
                            <button onClick={handleClick}>  {
                                item.isCompleted ? <FaCheckSquare size={18} /> : <ImCheckboxUnchecked size={18} />
                            }</button>
                            <button onClick={handleDelete}><MdDelete className='hover:text-red-500' size={23} /></button>

                        </div>
                    </div>
                    <span className='text-[0.7rem] text-richblack-100 absolute bottom-1 right-2 block float-end pt-2 '>{moment(item.createdAt).fromNow()}</span>
                </div>
            </div>

        </>

    )
}

export default OneItem
