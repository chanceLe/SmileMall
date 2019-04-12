<template>
	<div>
		<div class="navbar-div">
			<van-nav-bar title="类别列表" />
		</div>
		
		<div>
			<van-row>
				<van-col span="6">
					<div id="leftNav">
						<ul>
							<li :class="{active:index == categoryIndex }" v-for="(item,index) in category" :key="index" @click="handleClick(index,item.ID)">
								{{item.MALL_CATEGORY_NAME}}
							</li>
						</ul>
					</div>
				</van-col>
				
				<van-col span="18">
					<div class="tabCategorySub">
						<van-tabs v-model="active" @click="onClickSub">
							<van-tab   v-for="(item,index) in categorySub"  :key="index" :title="item.MALL_SUB_NAME">
							</van-tab>
						</van-tabs>
					</div>
					
					<div id="list-div">
						
						<van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
						
							<van-list 
							v-model="loading"
							:finished="finished"
							@load="onLoad"
							>
							<div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goGoodsInfo(item.ID)">
								<div class="list-item-image">
									<img :src="item.IMAGE1" alt="" :onerror="errorImg">
								</div>
								<div class="list-item-text">
									<div>{{item.NAME}}</div>
									<div class="price">¥ <span>{{item.ORI_PRICE | moneyFilter}}</span></div>
								</div>
								
							</div>
							</van-list>
						
						</van-pull-refresh>
					</div>
				</van-col>
			</van-row>
			
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { getCategoryList ,getCategorySubList , getGoodsListByCategorySubID}  from '@/service.js'
	import { Toast }  from 'vant'
	import {toMoney} from '@/filter/moneyFilter.js'
	export default{
		data(){
			return {
				category:[],
				categoryIndex:0,
				categorySub:[],
				active:0,
				loading:false , //上拉加载使用
				finished:false, //上拉加载是否没有数据了
				
				page:1, //页数
				categorySubId:'', //商品子类ID
				goodList:[] ,//商品数据
				isRefresh:false,  //下拉刷新
				errorImg:'this.src="' + require('@/assets/errorimg.png') + '"',
			}
		},
		filters:{
			moneyFilter(val){
				return toMoney(val)
			}
		},
		created(){
			this.getCategory()
		},
		mounted(){
			let winHeight = document.documentElement.clientHeight;
			document.getElementById("leftNav").style.height = (winHeight-46)+ 'px'
		},
		methods:{
			goGoodsInfo(id){
				console.log(id,"id")
				this.$router.push({name:'Goods',params:{goodsId:id}})
			},
			
			onClickSub(index,title){
				this.categorySubId = this.categorySub[index].ID
				console.log('subId',this.categorySubId)
				this.goodList = [];
				this.finished = false;
				this.onLoad();
				this.page = 1;
			},
			getGoodsList(){
				axios({
					url:getGoodsListByCategorySubID,
					method:'post',
					data:{
						page:this.page,
						categorySubId:this.categorySubId
					}
				}).then(res=>{
					console.log(res,"resss");
					if(res.data.code == 200 && res.data.data.length ){
						this.page++
						this.goodList = this.goodList.concat(res.data.data)
					}else{
						this.finished = true;
					}
					this.loading = false
				}).catch(err=>{
					console.log(err)
				})
			},
			onRefresh(){
				setTimeout(()=>{
					this.finished = false;
					this.isRefresh = false;
					this.goodList = [];
					this.page = 1;
					this.onLoad();
				},500)
			},
			onLoad(){
				setTimeout(()=>{
					this.categorySubId = this.categorySubId?this.categorySubId:this.categorySub[0].ID;
					this.getGoodsList();
				},1000)
			},
			handleClick(index,categoryId){
				this.categoryIndex = index;
				this.page = 1;
				this.goodList = [];
				this.finished = false;
				this.getCategorySubByCategoryId(categoryId)	
			},
			// 根据大类ID读取小类列表
			getCategorySubByCategoryId(categoryId){
				axios({
					url:getCategorySubList,
					method:'post',
					data:{
						categoryId:categoryId
					}
				}).then(response=>{
					
					if(response.data.code == 200 && response.data.data){
						this.categorySub = response.data.data;
					}else{
						Toast("服务器错误，数据获取失败")
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//获取大类
			getCategory(){
				axios({
					url:getCategoryList,
					method:'get'
				}).then(response=>{
					// console.log(response)
					if(response.data.code == 200 && response.data.data){
						this.category = response.data.data;
						
						this.getCategorySubByCategoryId(this.category[0].ID)
					}else{
						Toast('服务器错误，数据获取失败')
					}
				}).catch(err=>{
					console.log(err)
				})
				
			}
		}
	}
</script>

<style scoped>
	#leftNav ul li{
		line-height: 36px;
		border-bottom: 1px solid #E4E7ED;
		padding: 3px;
		font-size: 15px;
		text-align: center;
	}
	#leftNav ul li.active{
		background: #fff;
	}
	
	#list-div{
		overflow: auto;
		height: calc(100vh - 140px);
	}


	.list-item{
		display: flex;
		background: #fff;
		border-bottom: 1px solid #eee;
	}
    .list-item-image{
        flex:8;
		width: 30px;
		
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
	.price{
		font-size: 14px;
		color: red;
	}
	.price>span{
		font-size: 16px;
	}
</style>
