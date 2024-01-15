import { Schema, model, models } from "mongoose";

export interface ICategory extends Document {
    _id: string
    name: string
}

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
})

const Categories = models.Categories || model('Categories', CategorySchema)

export default Categories 