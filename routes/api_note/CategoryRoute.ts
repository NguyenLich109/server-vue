import express, { Express, Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import CategoryModel from "../../models/data_note/CategoryModel";
import WorkModel from "../../models/data_note/WorkModel";
const CategoryRoute = express.Router();

//get all
CategoryRoute.get("/all", asyncHandler(async(req: Request, res:Response) => {
    const getAll = await CategoryModel.find({}).sort({ _id:-1})
    if(!getAll){
        throw new Error("Lỗi không gọi được dữ liệu!")
    }
    res.send(getAll)
}))

//Create
CategoryRoute.post("/create", asyncHandler(async(req:Request, res: Response) => {
    const {url, title} = req.body;
    if(!url || !title){
        throw new Error('Vui lòng điền đầy đủ thông tin!')
    }
    const newCategory = await CategoryModel.create({
        title,
        url,
    })
    if(!!newCategory){
        res.send(newCategory)
    }
}))

//Delete
CategoryRoute.post("/delete/:id", asyncHandler(async(req: Request, res: Response) => {
    const detele = await CategoryModel.deleteOne({_id: req.params.id})
    const deleteManyWork = await WorkModel.deleteMany({idCategory: req.params.id})
    if(!detele){
        throw new Error('Không tìm thấy danh mục này!')
    }
    res.send({success:true, text:"Đã xóa thành công!"})
}))

// Success
CategoryRoute.post("/success/:id", asyncHandler(async(req: Request, res: Response) => {
    const update = await CategoryModel.findOne({_id: req.params.id})
    if(!update){
        throw new Error('Không tìm thấy danh mục này!')
    }
    update.complete = true;
    update.save();
    res.send({success:true, text:"Đã cập nhật thành công"})
}))


export default CategoryRoute;