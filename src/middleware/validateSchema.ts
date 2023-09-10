import joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IAuthors } from '../models/author'
import {IBook} from '../models/books'


export const validateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            console.log(error);
            return res.send(422).json({ error });
            
        }
    };
};

export const schemas = {
    author: {
        create: joi.object<IAuthors>({
            name: joi.string().required()
        }),
        update: joi.object<IAuthors>({
            name: joi.string().required()
        }),
    },
    book: {
        create: joi.object<IBook>({
            author: joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: joi.string().required()
        }),
        update: joi.object<IBook>({
            author: joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: joi.string().required()
        }),
    }
}
