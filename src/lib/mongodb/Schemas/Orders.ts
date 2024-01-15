import { Document, Schema, model, models } from "mongoose";

export interface IOrder extends Document {
    _id: string;
    createdAt: Date;
    stripeId: string;
    totalAmount: string;
    event: {
        _id: string;
        title: string;
    },
    buyer: {
        _id: string,
        firstName: string,
        lastName: string
    }
}

const OrderSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    stripeId: {
        type: String,
        required: true,
        unique: true,
    },
    totalAmount: {
        type: String,
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Events',
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Orders = models.Orders || model('Orders', OrderSchema)

export default Orders;