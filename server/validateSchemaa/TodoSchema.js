import { check } from "express-validator";

 const TodoSchema = [
    check('desc','Todo is required').exists(),
]

export default TodoSchema;