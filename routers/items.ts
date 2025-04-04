import express from "express";
import fileDb from "../fileDb";
import {Item} from "../types";
import {imagesUpload} from "../multer";
const ItemsRouter = express.Router();

ItemsRouter.get('/', async (req, res) => {
    const items = await fileDb.getAllItems()
    const definedValues = items.map(item => ({
        id: item.id,
        category_id: item.category_id,
        location_id: item.location_id,
        name: item.name
    }));
    res.send(definedValues)
})

ItemsRouter.get('/:id', async (req, res) => {
    const item = await fileDb.getItemsById(req.params.id);
    res.send(item)
})
ItemsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.category_id || !req.body.location_id) {
        res.status(400).send({error: "item name, category_id, location_id is required"});
        return;
    }
    const newItem: Item = {

        category_id: req.body.category_id,
        location_id: req.body.location_id,
        name: req.body.name,
        description: req.body.description,
        image: req.file ? 'images/' + req.file.filename : null,
        date: req.body.date,

    }
    const savedNewItem = await fileDb.addNewItem(newItem);
    res.send(savedNewItem)
})
ItemsRouter.delete('/:id', async (req, res) => {
    const item = await fileDb.deleteItem(req.params.id);
    res.send(item)
})
export default ItemsRouter