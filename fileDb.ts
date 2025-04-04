import {promises as fs} from 'fs';

import {existsSync} from "node:fs";
import * as crypto from "node:crypto";
import {DataDb, ICategory, ILocation, Item} from "./types";


const filename = './db.json';
let data: DataDb = {
    categories: [],
    items: [],
    locations: [],
};

const fileDb = {
    async init() {
        try {
            if (!existsSync(filename)) {
                return fs.writeFile(filename, JSON.stringify({ categories: [], locations: [], items: [] }));

            } else {
                const fileContent = await fs.readFile(filename);
                data = JSON.parse(fileContent.toString()) as DataDb;
            }
        } catch (e) {
            data = { categories: [], locations: [], items: [] };
            console.error(e);
        }
    },
    async getAllCategories() {
        return data.categories;
    },
    async getAllLocations() {
        return data.locations;
    },
    async getAllItems() {
        return data.items;
    },
    async getCategoryById(param_id: string) {
        return data.categories.find((p) => p.id === param_id);
    },
    async getLocationsById(param_id: string) {
        return data.locations.find((p) => p.id === param_id);
    },
    async getItemsById(param_id: string) {
        return data.items.find((p) => p.id === param_id);
    },
    async addNewCategory(categoryToAdd: ICategory) {
        const newCategory = {id: crypto.randomUUID(), ...categoryToAdd};
        data.categories.push(newCategory)
        await this.save();
        return newCategory;
    },
    async addNewLocation(locationToAdd: ILocation) {
        const newLocation = {id: crypto.randomUUID(), ...locationToAdd}
        data.locations.push(newLocation)
        await this.save()
        return newLocation;
    },
    async addNewItem (itemToAdd: Item) {
        const newItem = {id: crypto.randomUUID(), ...itemToAdd};
        data.items.push(newItem);
        await this.save();
        return newItem;
    },
    async deleteCategory(param_id: string) {
        data.categories = data.categories.filter(category => category.id !== param_id);
        await this.save();
    },
    async deleteLocation(param_id: string) {
        data.locations = data.locations.filter((location) => location.id !== param_id);
        await this.save();
    },
    async deleteItem(param_id: string) {
        data.items = data.items.filter((item) => item.id !== param_id);
        await this.save();
    },
    async save () {
        return fs.writeFile(filename, JSON.stringify(data));
    }


};
export default fileDb;