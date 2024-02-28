import { User } from "../models/user.models.js"
import { statusCode } from "../utils/constants.js";
import jsonGenerate from "../utils/helpers.js";

const GetTodosController = async (req, res) => {
    try {
        const list = await User.findById({ _id: req.userId })
            .select("-password")
            .populate("todos")
            .exec();

        return res.json(jsonGenerate(statusCode.SUCCESS, "All todo list", list));
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCCESSABLE_ENTRY, "Somethig wend wrong", error));
    }
}

export default GetTodosController;