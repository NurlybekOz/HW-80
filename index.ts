import express from "express";
import cors from "cors";
import CategoriesRouter from "./routers/categories";
import ItemsRouter from "./routers/items";
import locationsRouter from "./routers/locations";
import fileDb from "./fileDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use('/categories', CategoriesRouter);
app.use('/items', ItemsRouter);
app.use('/locations', locationsRouter);


const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })
}
run().catch(console.error);