import mongoose, { Document, model, Model, Schema } from "mongoose"

export interface IPost extends Document {
    title: string,
    date: string,
    content: string,
    author: string
}

const PostSchema: Schema = new Schema({
    title: {
        type: String
    },
    date: {
        type: String
    },
    content: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


export const Post: Model<IPost> = mongoose.models.Post || model("Post", PostSchema)