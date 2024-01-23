import Express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler';
import CategoryComicModel from '../../models/data_comic/category_comic_model';

const ApiCategoryComic = Express.Router()

ApiCategoryComic.post('/add',asyncHandler(async(req:Request, res:Response) => {
    const {title} = req.body

    const search = await CategoryComicModel.findOne({title})
    if(!!search){
        throw new Error("Thể loại này đã tồn tại")
    }
    const create = await CategoryComicModel.create({title})
    res.send(create)
}))

ApiCategoryComic.get('/all', asyncHandler(async(req:Request, res:Response) => {
    const getAll = await CategoryComicModel.find({})
    res.send(getAll)
}))

ApiCategoryComic.put('/update', asyncHandler(async(req:Request, res:Response) => {
    const {_id, title} = req.body
    const update = await CategoryComicModel.findOneAndUpdate({_id},{title})
    if(!!update){
        update.title = title
        res.send(update)
    }else{
        res.status(401);
        throw new Error('Thể loại này không tồn tại')
    }
}))



export default ApiCategoryComic