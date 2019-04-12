<template>
	
	<div class="home">
		<van-row  class="test-row">
			<van-col span="3"><img class='search-icon' :src="locationIcon" width="20" alt=""></van-col>
			<van-col span="16">
				<input type="text" class="search-input">
				
			</van-col>
			<van-col span="5">
				<van-button size="mini">搜索</van-button>
			</van-col>
		</van-row>
		
		<!-- swiper area -->
		<div class="swiper-area">
			
			<van-swipe :autoplay='1000'>
				<van-swipe-item v-for="(v,k) in bannerPic" :key="k">
					<img v-lazy="v.imgUrl" alt="">
				</van-swipe-item>
			</van-swipe>
		</div>
		
		<!-- type bar -->
		<div class='type-bar'>
			<div v-for="(v,k) in category" :key="k">
				<img  v-lazy="v.image" width="80%" alt="">
				<span>{{v.mallCategoryName}}</span>
			</div>
		</div>
		
		
		<!--ad -->
		<div>
			<img v-lazy="adBanner" width='100%' alt="">
		</div>
		
		<!-- recommend  goods area -->
		<div class="recommend">
			<div  class="recommend-title">
				商品推荐
			</div>
			<div class="recommend-body">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(v,k)  in recommendGoods" :key="k">
						<div class="recommend-item">
							<img :src="v.image" width="80%" alt="">
							<div>{{v.goodsName}}</div>
							<div> ¥ {{v.price | moneyFilter}} (¥{{v.mallPrice | moneyFilter}})</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
	
		<!-- floor1 -->
		<FloorComponent :floorData="floor1" :floorTitle='floorName.floor1' />
		<FloorComponent :floorData="floor2" :floorTitle='floorName.floor2' />
		<FloorComponent :floorData="floor3" :floorTitle='floorName.floor3' />
		
		
		<div class="hot-area">
			<div class="hot-title">热卖商品</div>
			<div class="hot-goods">
			  <!--这里需要一个list组件-->
			  <van-list>
				  <van-row gutter='0'>
					  <van-col span='12' v-for="(item,index) in hotGoods" :key="index">
						  <goods-info :goodsId="item.goodsId" :goodsName="item.name" :goodsImage="item.image" :goodsPrice="item.mallPrice"></goods-info>
					  </van-col>
				  </van-row>
			  </van-list>
			  
			  
			</div>
		</div>
		
		
	</div>
</template>
<script>
	import axios from 'axios';
	import 'swiper/dist/css/swiper.css'
	import {swiper, swiperSlide } from 'vue-awesome-swiper'
	import FloorComponent from '@/components/component/FloorComponent'
	
	import {toMoney} from '@/filter/moneyFilter.js'
	import GoodsInfo from '@/components/component/GoodsInfo'
	export default {
		data(){
			return {
				swiperOption:{
					slidesPerView:3
				},
				locationIcon:require('../../assets/imgs/position.png'),
				bannerPic:[
					{imgUrl:require('../../assets/imgs/banner1.png')},
					{imgUrl:require('../../assets/imgs/banner2.png')},
					{imgUrl:require('../../assets/imgs/banner3.png')}
				],
				category:[],
				adBanner:'',
				recommendGoods:[],
				floor1:[],
				floor2:[],
				floor3:[],
				floorName : {},
				hotGoods:[]  //热卖商品
			}
		},
		filters:{
			moneyFilter(val){
				return toMoney(val)
			}
		},
		components:{
			swiper,
			swiperSlide,
			FloorComponent,
			GoodsInfo
		},
		created(){
			axios({
				url:'https://www.easy-mock.com/mock/5caaf409588bed4d5df4972e/smileVue/index',
				method:'get'
			}).then(res=>{
				console.log(res,"res")
				if(res.status == '200'){
					this.category = res.data.data.category;
					this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
					this.recommendGoods = res.data.data.recommend;
				    this.floor1 = res.data.data.floor1;
					this.floor2 = res.data.data.floor2;
					this.floor3 = res.data.data.floor3;
					this.floorName = res.data.data.floorName;
					this.hotGoods = res.data.data.hotGoods;
				}
				
			}).catch(err=>{
				console.log(err)
			})
		}
	}
</script>

<style scoped>
	.home{
		overflow: hidden;
		margin-bottom:  50px;
	}
	.test-row{
		height: 36px;
		line-height: 36px;
		text-align:  center;
		overflow: hidden;
		background-color: #e5017d;
	}
	
	.search-input{
		width: 100%;
		height: 1.3rem;
		border: 0;
		outline: 0;
		border-bottom: 1px solid #fff;
		background-color: #e5017d;
	}
	.search-icon{
		padding-top: .4rem;
		padding-left: .3rem;
		color: #fff;
	}
	
	.swiper-area img{
		width: 100%;
		height: 130px;

	}
	
	.type-bar{
		background: #fff;
		margin: 0 .3rem .3rem;
		border-radius: .3rem;
		text-align: center;
		font-size: 14px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;	
		justify-content: space-between;
	}
	.type-bar div{
		width: 15%;
		padding: .3rem;
	}
	
	.recommend{
		background: #fff;
		margin-top: .3rem;
	}
	.recommend-title{
		padding: .3rem;
		border-bottom: 1px solid #eee;
		font-size: 14px;
		color: #E5017D;
	}
	
	.recommend-body{
		border-bottom: 1px solid #eee;
	}
	.recommend-item{
		width: 99%;
		border-right:  1px solid #eee;
		font-size: 12px;
		text-align: center;
		padding-bottom: 10px;
	}
	
	.hot-area{
      text-align: center;
      font-size:14px;
	
	}
</style>
