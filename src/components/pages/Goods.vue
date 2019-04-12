<template>
	<div>
		<div class="navbar-div">
			<van-nav-bar 
			title="商品详情"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
			/>
		</div>
		
		<div class="topimage-div">
			<img :src="goodsInfo.IMAGE1" alt="">
		</div>
		
		<div class="goods-name">{{goodsInfo.NAME}}</div>
		<div class="goods-price">价格: <span>{{goodsInfo.PRESENT_PRICE | moneyFilter}}</span> </div>
		
		<div>
			<van-tabs swipeable  sticky>
				<van-tab title='商品详情'>
					<div class="detail" v-html="goodsInfo.DETAIL"></div>	
				</van-tab>
				<van-tab title="评价">
					正在制作中
				</van-tab>
			</van-tabs>
		</div>
		
		<div class="goods-bottom">
			<div>
				
				<van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
			</div>
			
			<div>
				
				<van-button size="large" type="primary">直接购买</van-button>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { goodsDetail } from '@/service.js'
	import { toMoney } from '@/filter/moneyFilter.js'
	import { Toast } from 'vant'
	export default {
		data(){
			return {
				goodsId:'775e575ce28a4f89b1dfe2c99eb08ae7',
				goodsInfo:{} //商品详细数据
			}
		},
		created(){
			this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId:this.$route.params.goodsId
			
			this.getInfo();
		},
		filters:{
			moneyFilter(val){
				return toMoney(val)
			}
		},
		methods:{
			
			addGoodsToCart(){
				//取出本地购物车中的商品
				let cartInfo = localStorage.cartInfo? JSON.parse(localStorage.cartInfo) : [];
				let isHaveGoods = cartInfo.find(cart=>cart.goodsId == this.goodsId);
				console.log(isHaveGoods)
				if(!isHaveGoods){
					let newGoodsInfo = {
						goodsId: this.goodsId,
						name: this.goodsInfo.NAME,
						price:this.goodsInfo.PRESENT_PRICE,
						image:this.goodsInfo.IMAGE1,
						count:1
					}
					cartInfo.push(newGoodsInfo);
					
				}else{
					let index = cartInfo.indexOf(isHaveGoods);
					cartInfo[index].count++;
				}
				localStorage.cartInfo = JSON.stringify(cartInfo);
				Toast.success("添加购物车成功")
				this.$router.push({name:"Cart"})
			},
			onClickLeft(){
				this.$router.go(-1)
			},
			getInfo(){
				axios({
					url:goodsDetail,
					method:'post',
					data:{
						goodsId:this.goodsId
					}
				}).then(response=>{
					console.log(response,"1111")
					if(response.data.code == 200){
						
						this.goodsInfo = response.data.data;
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	img{display: block}
	.detail{
		/*使图片衔接正常*/
		font-size: 0px; 
	}
	.goods-name{
		padding:  10px 15px 0 ;
		background: #fff;
		border-top: 1px solid #eee;
	}
	.goods-price{
		padding:  10px 15px;
		background-color: #fff;
		font-size: 14px;
	}
	.goods-price >span{
		color: red;
		font-size: 18px;
	}
	
	.goods-bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		width: 100%;
		display: flex;
	}
	.goods-bottom >div{
		flex: 1;
		padding: 5px;
	}
</style>
