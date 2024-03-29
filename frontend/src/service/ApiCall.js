import axios from "axios";

const SignupApi = async (data)=>{
    return await axios.post('https://todo-app-lilac-tau.vercel.app/api/register' , data,{ withCredentials: true });
}
const LoginApi = async (data)=>{
    return await axios.post('https://todo-app-lilac-tau.vercel.app/api/login' , data,{ withCredentials: true });
}

const CreateTodoApi = async (data)=>{
    let token = getToken();
    return await axios.post('https://todo-app-lilac-tau.vercel.app/api/createTodo' , data,{ 
        withCredentials: true ,
        headers:{
            auth:token
        }
    });
}

const GetTodoApi = async (data)=>{
    let token = getToken();
    return await axios.get('https://todo-app-lilac-tau.vercel.app/api/getTodo' ,{ 
        withCredentials: true ,
        headers:{
            auth:token
        }
    });
}

const MarkTodoApi = async (data)=>{
    let token = getToken();
    return await axios.post('https://todo-app-lilac-tau.vercel.app/api/markTodo' ,data ,{ 
        withCredentials: true ,
        headers:{
            auth:token
        }
    });
}

const DeleteTodoApi = async (data)=>{
    let token = getToken();
    return await axios.post('https://todo-app-lilac-tau.vercel.app/api/deleteTodo' ,data ,{ 
        withCredentials: true ,
        headers:{
            auth:token
        }
    });
}

export function getToken(){
    let user = localStorage.getItem("user");
    if(!user) return
    const userObj = JSON.parse(user);
    return userObj.token;
}


export {SignupApi,LoginApi,CreateTodoApi,GetTodoApi,MarkTodoApi,DeleteTodoApi}