import express from "express";
import fileDb from "../fileDb";
import {ICategory} from "../types";

const CategoriesRouter = express.Router();

CategoriesRouter.get('/', async (req, res) => {
    const categories = await fileDb.getAllCategories()
    const definedValues = categories.map(category => ({
        id: category.id,
        name: category.name,
    }))
    res.send(definedValues)
})

CategoriesRouter.get('/:id', async (req, res) => {
    const category = await fileDb.getCategoryById(req.params.id);
    res.send(category);
})
CategoriesRouter.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({error: "category name is required"});
        return;
    }

    const newCategory: ICategory = {
        name: req.body.name,
        description: req.body.description
    }
    const savedNewCategory = await fileDb.addNewCategory(newCategory);
    res.send(savedNewCategory);
})
CategoriesRouter.delete('/:id', async (req, res) => {
    const category_id = req.params.id;
    const items = await fileDb.getAllItems();
    const itemsWithCategory = items.filter(item => item.category_id === category_id);
    if (itemsWithCategory.length > 0) {
        res.status(400).send({error: "Cant delete this category, its used in items"});
        return;
    }
    await fileDb.deleteCategory(category_id);
    res.send('category_id was successfully deleted.');
})

export default CategoriesRouter