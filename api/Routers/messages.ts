import {Router} from 'express';
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";
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

export default messageRouter