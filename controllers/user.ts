import { NextFunction, Response, Request } from "express";
import User from "../models/user";




const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, username, surname, password, age, status } = req.body
        const checkUser = await User.findOne({ username }).lean();
        const url = req.protocol + '://' + req.get('host')

        if (checkUser) {
            res.status(405).json({ message: "Bu username oldin ishlatilgan" })
            next()
        } else {
            if (username?.length > 15) {
                res.status(405).json({ message: "username 15 ta simpledan ko'p bo'lmaslik kerak" })
            } else if (username?.length <= 2) {
                res.status(405).json({ message: "username 2 ta simpledan kam bo'lmaslik kerak" })
            } else {
                const newUser = await User.create({
                    name,
                    username,
                    password,
                    age,
                    avatar: url + '/public/' + req?.file?.filename,
                    surname,
                    status
                })
                await newUser.save();
                res.status(200).json(newUser)
                next()
            }
        }
    } catch (error: any) {
        console.log(error?.message);
        res.status(500).json({ message: "server  error  500" })
        next(error)
    }
}

// all user
const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getUsers = await User.find()
        res.status(200).json(getUsers)
        next()
    } catch (error: any) {
        console.log(error?.message);
        res.status(500).json({ message: "server  error  500" })
        next(error)
    }
}
// by id user
const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id = req.params.id

        const findUser = await User.findById(_id)
        if (findUser) {
            res.status(201).json(findUser)
            next()
        } else {
            res.status(404).json({ message: "Bu id ga ega user topilmadi!" })
            next()
        }
    } catch (error: any) {
        console.log(error?.message);
        res.status(500).json({ message: "server  error  500" })
        next(error)
    }
}

// delete user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id = req.params.id;
        if (_id) {
            await User.findByIdAndDelete(_id)
            res.status(201).json({ message: "user o'chirildi" })
        } else {
            res.status(404).json({ message: "Bunday user topilmadi" })
        }
        next()
    } catch (error: any) {
        console.log(error?.message);
        res.status(500).json({ message: "server  error  500" })
        next()
    }
}

// update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id = req.params.id;
        const { name, username, surname, password, age, status, avatar } = req.body
        if (_id) {
            const updateUser = await User.findByIdAndUpdate(_id, {
                name,
                username,
                avatar,
                age,
                surname,
                password,
                status
            })
            res.status(201).json(updateUser)
        } else {
            res.status(405).json('Bunday user topilmadi!')
        }
    } catch (error: any) {
        console.log(error?.message);
        res.status(500).json({ message: "server  error  500" })
        next(error)

    }
}
export = { createUser, getAllUser, getById, deleteUser, updateUser }