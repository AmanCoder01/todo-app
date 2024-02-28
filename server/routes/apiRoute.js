import express from "express"
import RegisterController from "../controllers/Register.controller.js";
import LoginController from "../controllers/Login.controller.js";
import RegisterSchema from "../validateSchemaa/RegisterSchema.js";
import LoginSchema from "../validateSchemaa/LoginSchema.js";
import TodoSchema from "../validateSchemaa/TodoSchema.js";
import createTodoController from "../controllers/Todo.controller.js";
import GetTodosController from "../controllers/TodoList.controller.js";
import { check } from "express-validator";
import MarkTodoController from "../controllers/MarkTodo.controller.js";
import RemoveTodoController from "../controllers/RemoveTodo.controller.js";

const apiRoute=express.Router();
const protectedRoute=express.Router();

apiRoute.post('/register',RegisterSchema, RegisterController);
apiRoute.post('/login',LoginSchema, LoginController);


//protected

protectedRoute.post("/createTodo",TodoSchema,createTodoController);
protectedRoute.get("/getTodo",GetTodosController);
protectedRoute.post("/markTodo",[check("todo_id","Todo id is required").exists()], MarkTodoController);
protectedRoute.post("/deleteTodo",[check("todo_id","Todo id is required").exists()], RemoveTodoController);




export {apiRoute,protectedRoute};