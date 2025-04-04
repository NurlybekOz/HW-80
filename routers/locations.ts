import express from "express";
import fileDb from "../fileDb";
import {ILocation} from "../types";

const locationsRouter = express.Router();

locationsRouter.get('/', async (req, res) => {
    const locations = await fileDb.getAllLocations();
    const definedValues = locations.map(location => ({
        id: location.id,
        name: location.name
    }));
    res.send(definedValues)
})

locationsRouter.get('/:id', async (req, res) => {
    const location = await fileDb.getLocationsById(req.params.id);
    res.send(location)
})
locationsRouter.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({error: "location name is required"});
        return;
    }
    const newLocation: ILocation = {
        name: req.body.name,
        description: req.body.description,
    }
    const savedLocation = await fileDb.addNewLocation(newLocation);
    res.send(savedLocation);
})
locationsRouter.delete('/:id', async (req, res) => {
    const locationId = req.params.id;

    const items = await fileDb.getAllItems();
    const itemsWithLocations = items.filter(item => item.location_id === locationId);
    if (itemsWithLocations.length > 0) {
        res.status(400).send({error: "Cant delete this location, its used in items"});
        return;
    }
    await fileDb.deleteLocation(locationId);
    res.send('locationId was successfully deleted.');
})

export default locationsRouter