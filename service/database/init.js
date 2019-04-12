const mongoose = require('mongoose');
const db = 'mongodb://localhost/simle-db';

const glob = require('glob'); //需要安装
const { resolve } = require('path');  //node内置

exports.initSchemas = () => {
	glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)

}

exports.connect = () => {
	//连接数据库
	mongoose.connect(db);
	let maxConnectTimes = 0;
	return new Promise((resolve,reject)=>{
		
		//增加数据库监听事件  断开连接
		mongoose.connection.on('disconnected',()=>{
			console.log('*****数据库断开')
			if(maxConnectTimes < 3){
				mongoose.connect(db)
				maxConnectTimes++;
			}else{
				reject();
				throw new Error('数据库出现问题...')
			}
			
		// 错误
		})
		mongoose.connection.on('error',(err)=>{
			console.log('*****数据库错误')
			if(maxConnectTimes < 3){
				mongoose.connect(db)
				maxConnectTimes++;
			}else{
				reject(err);
				throw new Error('数据库出现问题...')
			}
		})
		
		//链接打开时
		mongoose.connection.once('open',()=>{
			console.log('mongDB connected successfully...  ')
			resolve();
		})
	})
}