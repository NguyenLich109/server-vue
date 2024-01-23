import  Express , {Request, Response}  from "express";
import asyncHandler from 'express-async-handler';
import ChapterModel from "../../models/data_comic/chapter_comic_model";
import ComicModel from "../../models/data_comic/comic_model";

const ApiChapter = Express.Router()

ApiChapter.post('/add', asyncHandler(async(req:Request, res: Response) => {
    const {name_chapter, content_chapter, number_chapter, id_story} = req.body
    const search = await ChapterModel.findOne({id_story, number_chapter})
    const filterComic = await ComicModel.findOne({_id:id_story})
    if(!!search){
        throw new Error("Chương này đã có rồi vui lòng đổi chương khác")
    }
    const create = await ChapterModel.create({name_chapter, content_chapter, number_chapter, id_story})

    if(!!filterComic && filterComic.number_chap < number_chapter){
        await ComicModel.findOneAndUpdate({_id:id_story},{$set:{number_chap:number_chapter}})

    }
    res.send(create)
}))


//get all
ApiChapter.get('/all', asyncHandler(async(req:Request, res: Response) => {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;
    let search: any = {};

    if(!req.query.key){
        throw new Error("Bạn chưa truyện id của bộ truyện này")
    }
    
    search.id_story = req.query.key;
    const count = await ChapterModel.countDocuments(search);
    const getAll = await ChapterModel.find(search).select('-content_chapter').skip((page - 1) * pageSize).limit(pageSize).sort({number_chapter:1})

    res.send({
        page: page,
        pageSize: Math.ceil(count/pageSize),
        chapters: getAll
    });
}));

// get tập chuyện mới nhất
ApiChapter.get('/new', asyncHandler(async(req:Request, res: Response) => {
    const pageSize = 7;
    const getAll = await ChapterModel.find({}).select('-content_chapter').limit(pageSize).populate({
        path: 'id_story',
        model: 'comic',
        select: 'title image',
        populate: {
            path: 'genre',
            model: 'categoryComic',
            select: 'title'
        }
    }).sort({_id:-1});
    res.send(getAll);
}));

// get  5 tập truyện của chương
ApiChapter.get('/chapter_five', asyncHandler(async(req:Request, res: Response) => {
    const pageSize = 5;

    if(!req.query.key){
        throw new Error("Bạn chưa truyện id của bộ truyện này")
    }
    const getAll = await ChapterModel.find({id_story:req.query.key}).select('-content_chapter').limit(pageSize).sort({number_chapter:-1})
    res.send(getAll);
}));

// get detail chapter
ApiChapter.get('/detail', asyncHandler(async(req:Request, res: Response) => {
    if(!req.query.key){
        throw new Error("Bạn chưa truyện id của bộ truyện này")
    }
    const get_detail = await ChapterModel.findOne({id_story:req.query.key, number_chapter: req.query.chap}).populate('id_story','_id title image number_chap')
    res.send(get_detail);
}));

export default ApiChapter