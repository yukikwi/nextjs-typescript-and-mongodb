import mongoose, { Document, model, Model, Schema } from "mongoose"

export interface IUser extends Document {
    name: string,
}

const UserSchema: Schema = new Schema({
    name: {
        type: String
    }
})


export const User: Model<IUser> = mongoose.models.User || model("User", UserSchema)