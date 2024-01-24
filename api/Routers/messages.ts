import {Router} from 'express';
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";
import {IMessages} from "../types";
const messageRouter = Router();
messageRouter.post('/', imagesUpload.single('image'), async(req, res) => {

    if (!req.body.message) {
        res.status(404).send({"error": "Message must be present in the request"});
    }

    let newMessage = {
        message: req.body.message,
        author: req.body.author.trim().length === 0 ? 'Anonymous' : req.body.author,
        image: req.file ? req.file.filename : null,
    };

    newMessage = await fileDb.addMessageToJson(newMessage);
    res.send(newMessage);
});

messageRouter.get('/', async (req, res) => {

    let messages: IMessages[] = [];

    if (req.query.datetime) {
        const queryDate = req.query.datetime as string;
        const date = new Date(queryDate);

        if (isNaN(date.getDate())) {
            res.status(400).send({"error": "Datetime is not correct"});
        } else {
            messages = await fileDb.getByQueryDatetime(date);
        }

    } else {
        messages = await fileDb.getMessages();
        messages = messages.reverse();
    }

    res.send(messages);
});


export default messageRouter