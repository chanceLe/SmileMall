
// url配置
const BASEURL = '/base/';
const LOCAL = 'http://localhost:3000/'

const URL = {
	getShopMall : BASEURL + 'index',
	getGoodsInfo : BASEURL + 'getGoodsInfo',
	
	register: LOCAL + 'user/register',
	login : LOCAL + 'user/login',
	goodsDetail: LOCAL + 'goods/getDetailGoodsInfo',  //商品详情
	
	getCategoryList:LOCAL + 'goods/getCategoryList',  //大类
	getCategorySubList: LOCAL + 'goods/getCategorySubList', //子类
	getGoodsListByCategorySubID: LOCAL + 'goods/getGoodsListByCategorySubID', //得到小类商品列表
	
}

module.exports = URL;