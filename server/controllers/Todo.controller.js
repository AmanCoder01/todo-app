import { validationResult } from "express-validator";
import jsonGenerate from "../utils/helpers.js";
import { statusCode } from "../utils/constants.js";
import { Todo } from "../models/todo.models.js";
import { User } from "../models/user.models.js";


const createTodoController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "Todo is required", errors.mapped()));
    }

    try {
        const { desc } = req.body;
        const result =await Todo.create({
            userId: req.userId,
            desc
        })

        if (result) {
            const user = await User.findOneAndUpdate({ _id: req.userId }, {
                $push: { todos: result }
            })


            return res.json(jsonGenerate(statusCode.SUCCESS, `Todo created successfully`, result));
        }

    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCCESSABLE_ENTRY, "Something wend Wrong",))
    }
}

export default createTodoController;