import express, { Express, Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import WorkModel from "../../models/data_note/WorkModel";
import { typeWork, typeTask } from "../../types";
import CategoryModel from "../../models/data_note/CategoryModel";
const WorkRoute = express.Router();

//Get all
WorkRoute.get("/all", asyncHandler(async(req: Request, res:Response) => {
    const {key} = req.query;
    const filter = await WorkModel.find({idCategory: key}).sort({_id:1})
    res.send(filter)
}))

//create
WorkRoute.post("/create", asyncHandler(async(req:Request, res: Response) => {
    const {idCategory, title} = req.body;
    if(!idCategory || !title){
        res.status(400);
        throw new Error('Vui lòng điền đầy đủ thông tin!')
    }
    const checkCategory = await CategoryModel.findOne({_id: idCategory})
    if(!checkCategory){
        res.status(400);
        throw new Error('Không thể tạo được vì không xác định được Category');
    }
    if(checkCategory.complete){
        res.status(400);
        throw new Error('Danh mục này đã hoàn thành không thể tạo')
    }
    const newWork = await WorkModel.create({
        title,
        idCategory,
    })
    if(!!newWork){
        res.send(newWork)
    }
}))

// Cập nhật
WorkRoute.post("/update/:id", asyncHandler(async(req:Request, res: Response) => {
    const {title} = req.body;
    if(!title){
        throw new Error('Vui lòng điền đầy đủ thông tin!')
    }
    const filter:any = await WorkModel.findOne({_id:req.params.id})
    if(!filter){
        throw new Error('Task này không tồn tại')
    }
    filter.title = title;
    const update = await filter.save()
    res.send(update)
}))

// Delete
WorkRoute.post("/delete/:id", asyncHandler(async(req:Request, res: Response) => {
    const detele = await WorkModel.deleteOne({_id: req.params.id})
    if(!detele){
        throw new Error('Task này không tồn tại!')
    }
    res.send({success:true, text:"Đã xóa thành công!"})
}))

// Thêm TaskChild
WorkRoute.post("/create/task/:id", asyncHandler(async(req:Request, res: Response) => {
    const {content} = req.body;
    const filter = await WorkModel.findOne({_id: req.params.id})
    if(!filter){
        throw new Error('Task này không tồn tại!') 
    }
    filter.tasks.push({content})
    const save = await filter.save()
    res.send(save)
}))

// Thay đổi taskChild
WorkRoute.post("/update/task/:id", asyncHandler(async(req:Request, res: Response) => {
    const {content, idTaskChild} = req.body;
    const filter = await WorkModel.findOne({_id: req.params.id})
    if(!filter){
        throw new Error('Task này không tồn tại!') 
    }
    const search = filter.tasks.find((taskChild) => taskChild._id == idTaskChild)
    if(!search){
        throw new Error('TaskChild này không tồn tại!') 
    }
    search.content = content;
    const save = await filter.save()
    res.send(save)
}))

// Thay đổi trạng thái taskChild
WorkRoute.post("/toggle/task/:id", asyncHandler(async(req:Request, res: Response) => {
    const {idTaskChild} = req.body;
    const filter = await WorkModel.findOne({_id: req.params.id})
    if(!filter){
        throw new Error('Task này không tồn tại!') 
    }
    const search = filter.tasks.find((taskChild) => taskChild._id == idTaskChild)
    if(!search){
        throw new Error('TaskChild này không tồn tại!') 
    }
    search.isComplete = !search.isComplete;
    const save = await filter.save()
    res.send(save)
}))

// Hoàn thành all tasks
WorkRoute.post("/complete/allTask/:id", asyncHandler(async(req:Request, res: Response) => {
    const filter = await WorkModel.findOne({_id: req.params.id})
    if(!filter){
        throw new Error('Task này không tồn tại!') 
    }
    filter.tasks.forEach((value) => {
        value.isComplete = true;
    })
    const save = await filter.save()
    res.send(save)
}))

// delete task child
WorkRoute.post("/delete/task/:id", asyncHandler(async(req:Request, res: Response) => {
    const {idTaskChild} = req.body
    const search = await WorkModel.findOne({_id: req.params.id})
    if(!search){
        throw new Error('Task này không tồn tại!') 
    }
    for(let i = 0; i < search.tasks.length; i++){
        if(search.tasks[i]._id == idTaskChild){
            search.tasks.splice(i,1);
            break;
        }
    }
    const save = await search.save();
    res.send(save)
}))

export default WorkRoute;