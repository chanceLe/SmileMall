const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertAllGoodsInfo',async(ctx)=>{
	fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
		data = JSON.parse(data);
		let saveCount = 0;
		
		const Goods = mongoose.model('goods');
		data.map((value,index)=>{
			console.log(value);
			let newGoods = new Goods(value);
			newGoods.save().then(()=>{
				saveCount++
				console.log('成功'+saveCount)
			}).catch(err=>{
				console.log(err)
			})
		})
	})
	ctx.body = "数据开始导入..."
});

router.get('/insertAllCategory',async(ctx)=>{
	fs.readFile('./data_json/category.json','utf8',(err,data)=>{
		data = JSON.parse(data);
		let saveCount = 0;
		const Category = mongoose.model('Category');
		data.RECORDS.map((value,index)=>{
			let newCategory = new Category(value);
			newCategory.save().then(()=>{
				saveCount++;
				console.log('插入成功'+saveCount)
			}).catch(err=>{
				console.log('插入失败',err)
			})
		})
	})
	ctx.body= '数据开始导入...'
})
//插入商品子类
router.get('/insertAllSubGoods',async(ctx)=>{
	
	fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
		data = JSON.parse(data);
		let saveCount = 0;
		const Category_sub = mongoose.model('Category_sub')
		data.RECORDS.map((value,index)=>{
			let newCategory_sub = new Category_sub(value);
			newCategory_sub.save().then(()=>{
				saveCount++;
				console.log("插入成功",saveCount)
			}).catch(err=>{
				console.log('插入失败',err)
			})
			
		})
	})
	ctx.body = "开始插入...."
})

//获取商品详情信息的接口

router.post('/getDetailGoodsInfo',async(ctx)=>{
	try{
	let goodsId = ctx.request.body.goodsId;
	const Goods = mongoose.model('goods');
	
	//promise 写法
// 	await Goods.findOne({ID:goodsId}).exec().then(async(result)=>{
// 		ctx.body = {code:200,data:result,message:'ok'}
// 	}).catch(error=>{
// 		console.log(error)
// 		ctx.body={code:500,message:error}
// 	})
	//改写
	let result = await Goods.findOne({ID:goodsId}).exec();
	ctx.body = {
		code:200,
		data:result,
		message:'ok'
	}
	}catch(err){
		console.log(err)
		ctx.body={
			code : 500 ,
			message : 'fail'
		}
	}

})

//读取大类别的API
router.get('/getCategoryList',async(ctx)=>{
	try{
		const Category = mongoose.model('Category');
		let result =await Category.find().exec()
		ctx.body = {code:200,message:'ok',data:result}
	}catch(err){
		ctx.body = {code:500,message:'fail'}
	}
})

// 读取小类别的API
router.post('/getCategorySubList',async(ctx)=>{
	try{
		let categoryId = ctx.request.body.categoryId;
		const CategorySub = mongoose.model('Category_sub');
		let result = await CategorySub.find({MALL_CATEGORY_ID : categoryId}).exec();
		ctx.body = {code:200,message:'ok',data:result}
	}catch(err){
		
		ctx.body = {code:500,message:'fail'}
	}
})

//根据类别获取商品列表
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
	try{
		let categorySubId = ctx.request.body.categorySubId;  //子类别ID
		let page = ctx.request.body.page;  //当前页数
		let num = 10;  //每页显示数量
		let start = (page-1) * num;
		
		console.log(categorySubId,page,"xxx")
		const Goods = mongoose.model('goods');
		let result =await Goods.find({SUB_ID:categorySubId})
		.skip(start)  //跳过 几个
		.limit(num)   //获取几个
		.exec();
		console.log(result,"resres")
		ctx.body = {code:200,data:result,message:'ok'}
	}catch(err){
		console.log(err)
		ctx.body = {code:500,message:'fail'}
	}
	
	
	
})

module.exports = router;

