const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

router.get('/',async(ctx)=>{
	ctx.body= "这是用户操作首页"
})

router.post('/register',async(ctx)=>{
// 	console.log('------11')
// 	console.log(ctx.request.body);
// 	console.log('------11')
// 	ctx.body = ctx.request.body;

	//取得model
	const User = mongoose.model('User');
	
	//把从前端接收的POST数据封装成一个新的user对象
	let newUser = new User(ctx.request.body);
	
	//使用mongoose的save方法直接存储，然后判断是否成功
	await newUser.save().then(()=>{
		//保存成功 返回code == 200，并返回成功信息
		
		ctx.body = {
			code : 200,
			msg:"注册成功"
		}
	}).catch(error =>{
		//失败返回 code = 500，返回错误信息
		ctx.body = {
			code: 500,
			message:error
		}
	})
	
})

router.post('/login',async(ctx)=>{
	let logUser = ctx.request.body;
	let userName = logUser.userName;
	let password = logUser.password;
	
	// 引入User的Model
	
	const User = mongoose.model('User');
	
	// 查找用户名是否存在
	
	await User.findOne({userName}).exec().then(async(result)=>{
		console.log(result);
		if(result){
			//用户名存在时，开始比对密码
			let newUser = new User();  //实例方法 所以new出对象才能调用
			await newUser.comparePassword(password,result.password).then((isMatch)=>{
				//返回对比结果
				ctx.body = {code: 200 ,message: isMatch}
			}).catch(error =>{
				console.log(error)
				ctx.body = {code:500,message:error}
			})
		}else{
			ctx.body = {
				code: 405,
				message:'用户名不存在'
			}
		}
	}).catch(error=>{
		console.log(error)
		ctx.body = {code:500,message:error}
	})
})


module.exports = router;