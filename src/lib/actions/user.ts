import { revalidatePath } from "next/cache"
import { CreateUserParams, UpdateUserParams } from "../../types"
import { MongooseConnection } from "../mongodb"
import Users from "../mongodb/Schemas/Users"
import { handleError } from "../utils"
import Events from "../mongodb/Schemas/Events"
import Orders from "../mongodb/Schemas/Orders"

`use server`

export const createUser = async (user: CreateUserParams) => {
    try {
        await MongooseConnection();

        const newUser = await Users.create(user);

        try {
            newUser.save();
        } catch (error) {
            handleError(error)
        }

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error)
    }
}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
    try {
        await MongooseConnection();

        const updatedUser = await Users.findOneAndUpdate({ clerkId }, user, {
            new: true,
        })

        try {
            updatedUser.save();
        } catch (error) {
            handleError(error);
        }

        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        handleError(error)
    }
}

export const deleteUser = async (clerkId?: string) => {
    try {
        await MongooseConnection();

        let userToDelete = Users.findOne({clerkId});

        let userToDeleteObject = JSON.parse(JSON.stringify(userToDelete))

        if(!userToDeleteObject) {
            throw new Error(`User not found`);
            // handleError(`User not found`)
        }

        // Unlink relationships
        await Promise.all([
            Events.updateMany({
                _id: {$in: userToDeleteObject.events},
            }, {
                $pull: {
                    organizer: userToDeleteObject._id
                }
            }),
            Orders.updateMany({
                _id: {$in: userToDeleteObject.orders},
            }, {
                $unset: {
                    buyer: 1
                }
            }),
        ])

        const deletedUser = await Users.findOneAndDelete({clerkId});
        revalidatePath('/')

        try {
            deletedUser.save()
        } catch (error) {
            handleError(error);
        }

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error)
    }
}