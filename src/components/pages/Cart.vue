<template>
	<div>
		<div class="navbar-div">
			<van-nav-bar
			title="购物车"
			/>
		</div>
		
		<div class="cart-title">
			<van-button size="small"  type="danger" @click="clearCart" >清空购物车</van-button>
		</div>
		<!--显示购物车中的商品-->
		<div class="cart-list">
			<div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
				<div class="pang-img">
					<img :src="item.image" alt="">
				</div>
				<div class="pang-text">
					<div class="pang-name">{{item.name}}</div>
					<div class="pang-control">
						<van-stepper v-model="item.count" />
					</div>
				</div>
				<div class="pang-price">
					<div>
						¥{{item.price | moneyFilter }}	
					</div>	
					<div>
						x {{item.count}}
					</div>
					<div class="allPrice">
						¥{{item.price * item.count | moneyFilter }}
					</div>
				</div>
			</div>
		</div>
		<!-- 显示总价格 -->
		<div class="totalMoney">
			商品总价：¥{{ totalMoney | moneyFilter  }}
		</div>
		
	</div>
</template>

<script>
	import {toMoney} from '@/filter/moneyFilter.js'
	export default {
		data(){
			return {
				cartInfo:[],
				isEmpty:false,
			}
		},
		created(){
			this.getCartInfo();
		},
		filters:{
			moneyFilter(val){
				return toMoney(val)
			}
		},
		computed:{
			totalMoney(){
				let all = 0;
				this.cartInfo.forEach((item,index)=>{
					all += item.price * item.count
				});
				localStorage.cartInfo = JSON.stringify(this.cartInfo)
				return all;
			}
		},
		methods:{
			clearCart(){
				localStorage.removeItem("cartInfo");
				this.cartInfo = [],
				this.isEmpty = true;
			},
			getCartInfo(){
				if(localStorage.cartInfo){
					this.cartInfo = JSON.parse(localStorage.cartInfo);
				}
				// console.log('this.cartInfo',JSON.stringify(this.cartInfo))
				this.isEmpty = this.cartInfo.length> 0 ? true : false
			}
		}
	}
	
</script>

<style scoped>
	
	.cart-title{
		height: 36px;
		line-height: 36px;
		background: #fff;
		border-bottom: 1px solid #E4E7ED;
		padding: 5px;
		text-align: right;
	}
	.cart-list{
		background: #fff;	
	}
	.pang-row{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		padding: 10px;
		font-size: 14px;
		border-bottom: 1px solid #E4E7ED;
	}
	.pang-img{
		flex: 6;
	}
	.pang-text{
		flex: 14;
		padding-left: 10px;
	}
	.pang-control{
		padding-top: 10px;
	}
	.pang-price{
		flex:4;
		text-align: right;
	}
	.allPrice{
		color: red;
	}
	.totalMoney{
		text-align: right;
		background: #fff;
		border-bottom: 1px solid #E4E7ED;
		padding: 5px;
	}
</style>
