// controllers/chat.controller.js
import { getChatHistory } from "../dao/message.dao.js";

export async function getChatHistoryController(req, res) {
    try {
        const { user1, user2 } = req.params;
        const { limit = 20, skip = 0 } = req.query; // default values

        const chatHistory = await getChatHistory(user1, user2, limit, skip);

        res.status(200).json({
            message: "Chat history fetched successfully",
            chatHistory
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching chat history", error });
    }
}
