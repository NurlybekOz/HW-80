export interface ICategory {
    name: string;
    description: string;
}
export interface ICategories {
    id: string;
    name: string;
    description: string;
}
export interface ILocation {
    name: string;
    description: string;
}
export interface ILocations {
    id: string;
    name: string;
    description: string;
}
export interface Items {
    id: string;
    category_id: string;
    location_id: string;
    name: string;
    description: string;
    image: string | null;
    date: string;
}
export interface Item {
    category_id: string;
    location_id: string;
    name: string;
    description: string;
    image: string | null
    date: string;
}
export interface DataDb {
    categories: ICategories[];
    locations: ILocations[];
    items: Items[];
}