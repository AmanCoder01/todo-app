import { validationResult } from "express-validator";
import jsonGenerate from "../utils/helpers.js";
import { statusCode } from "../utils/constants.js";
import { Todo } from "../models/todo.models.js";
import { User} from "../models/user.models.js";

const RemoveTodoController = async (req, res) => {
    const error = validationResult(req);
  
    if (!error.isEmpty()) {
      return res.json(
        jsonGenerate(
          statusCode.VALIDATION_ERROR,
          "todo id is required",
          error.mapped()
        )
      );
    }
  
    try {
      const result = await Todo.findOneAndDelete({
        userId: req.userId,
        _id: req.body.todo_id,
      });
  
      if (result) {
        const user = await User.findOneAndUpdate(
          { _id: req.userId },
          { $pull: { todos: req.body.todo_id } }
        );
  
        return res.json(jsonGenerate(statusCode.SUCCESS, "Todo deleted", null));
      }
    } catch (error) {
      return res.json(
        jsonGenerate(statusCode.UNPROCCESSABLE_ENTRY, "Could not delete", null)
      );
    }
  };

  export default RemoveTodoController;