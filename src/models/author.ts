import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthors {
    name: string;
}

export interface IAuthorsModel extends IAuthors, Document { }

const AuthorSchema: Schema = new Schema(
    {
        name: { type: 'string', required: true }
    },
    { versionKey: false }
);

export default mongoose.model<IAuthorsModel>('Authors', AuthorSchema);
