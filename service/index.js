const Koa = require('koa');
const app = new Koa();

// 数据库连接器
const mongoose = require('mongoose');



const { connect ,initSchemas } = require('./database/init.js');

const Router = require('koa-router');
let user = require('./appApi/user.js');
let home = require('./appApi/home.js');
let goods = require('./appApi/goods.js')

// 接收请求的中间件
const bodyParser = require('koa-bodyparser');
// 支持跨域的中间件
const cors = require('koa2-cors');


//这两个是需要放到其他app.use操作之前才生效
app.use(bodyParser())
app.use(cors())

// 装载所有子路由
let router = new Router();
router.use('/user',user.routes())
router.use('/home',home.routes())
router.use('/goods',goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


;(async ()=>{
	await connect();
	initSchemas();	
})()


// ;(async ()=>{
// 	await connect();
// 	initSchemas();
// 	const User = mongoose.model('User');
// 	let oneUser = new User({userName:'chance02',password:'123456'});
// 	
// 	oneUser.save().then(()=>{
// 		console.log('插入成功')
// 	});
// 	let user = await User.findOne({userName:'chance01'}).exec()
// 	console.log('----------')
// 	console.log(user)
// 	console.log('----------')
// 	
// })()

app.use(async(ctx)=>{
	ctx.body = '<h1>hello world</h1>'
});
app.listen(3000,()=>{
	console.log('[server]started at port 3000....')
})