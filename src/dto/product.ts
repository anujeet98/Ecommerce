import { Types } from "mongoose"


export interface product {
    title: string,
    description: string,
    price: number,
    image_url: string
}


export interface productResult {
    _id: Types.ObjectId
    title: string,
    description: string,
    price: number,
    image_url: string,
    date: Date,
    deleted: string,
}