import  Express , {Request, Response}  from "express";
import asyncHandler from 'express-async-handler';
import ComicModel from "../../models/data_comic/comic_model";


const ApiComic = Express.Router()

//add
ApiComic.post('/add', asyncHandler(async(req:Request, res: Response) => {
    const {title, author, image, genre, abbreviate} = req.body
    const search = await ComicModel.findOne({title})
    if(!!search){
        throw new Error("Thể loại này đã tồn tại")
    }
    const create = await ComicModel.create({title, author, image, genre, abbreviate})
    res.send(create)
}))


//get all
ApiComic.all('/all', asyncHandler(async(req:Request, res: Response) => {
    const pageSize = 12;
    const page = Number(req.query.page) || 1;
    let search: any = {};

    if(!!req.query.key_search && req.query.key_search !== "undefined"){
        // Tìm kiếm theo tên truyện hoặc tác giả
        search.$or = [
            { title: { $regex: req.query.key_search, $options: 'i' } },
            { author: { $regex: req.query.key_search, $options: 'i' } }
        ];
    }
    
    if (!!req.query.genre && req.query.genre !== "undefined") {
        // Tìm kiếm theo thể loại
        search['genre'] = { $in: [req.query.genre] };
    }

    const count = await ComicModel.countDocuments(search);
    const getAll = await ComicModel.find(search).select("-status").skip((page - 1) * pageSize).limit(pageSize);

    res.send({
        page: page,
        pageSize: Math.ceil(count/pageSize),
        comics: getAll
    });
}));

//get detail
ApiComic.get('/detail', asyncHandler(async(req:Request, res:Response) => {
    let search: any = {};
    if(!req.query.key){
        throw new Error("Bạn chưa truyện id của bộ truyện này")
    } 
    search._id = req.query.key;
    const data_detail = await ComicModel.findOne(search).populate("genre","_id title")

    res.send(data_detail);
}))


export default ApiComic
