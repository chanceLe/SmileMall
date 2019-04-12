const fs = require('fs');
fs.readFile('./data_json/goods.json','utf8',function(err,data){
	let newData = JSON.parse(data);
	let pushData = [];
	let i = 0;
	newData.RECORDS.map((value,index)=>{
		if(value.IMAGE1 != null){
			i++;
			console.log(value.NAME)
			pushData.push(value)
		}
	})
	console.log(i,"i");
	
	fs.writeFile('./data_json/newGoods.json',JSON.stringify(pushData),err=>{
		console.log(err?err:'写文件成功')
	})
	
})