import Conversation from "../models/conversation.model.js"
import Message from '../models/message.modal.js'

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: recevierId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, recevierId]
            },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recevierId]
            })
        }

        const newMessage = new Message({
            senderId,
            recevierId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // This will run in parallel
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")

        if (!conversation) return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
