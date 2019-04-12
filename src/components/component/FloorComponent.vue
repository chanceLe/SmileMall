<template>
	<div class="floor" v-if="floorData.length">
		<div class="floor-title">{{floorTitle}}</div>
		<div class="floor-normal">
			<div class="floor-1">
				<img v-lazy="floorData[0].image"  alt="">
			</div>
			
			
			<div >
				<div class='floor-2'>
					<img v-lazy="floorData[1].image"  alt="">
				</div>
				<img v-lazy="floorData[2].image"  alt="">
			</div>
		</div>
		
		<div class="floor-rule">
			<div v-for="(item,index) in floorData.slice(3)" :key="index">
				<img v-lazy="item.image" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'FloorComponent',
		props:['floorData','floorTitle'],
		data(){
			return {
				
			}
		},
	
	}
</script>

<style scoped>
	
	.floor-title{
		text-align: center;
		height: 32px;
		line-height: 32px;
		font-size: 14px;
	}
	.floor-normal{
		display: flex;
		flex-direction: row;
		background-color: #fff;
		border-bottom: 1px solid #ddd;
	}
	.floor-normal > div{
		width: 50%;
	}
	.floor-1{
		border-right: 1px solid #ddd;
	}
	.floor-2{
		border-bottom:  1px solid #ddd;
	}
	.floor-rule{
		display: flex;
		background-color: #fff;
	}
	
	.floor-rule > div{
		width: 50%;
		border-bottom: 1px solid #ddd;
	}
	.floor-rule > div:nth-child(odd){
		border-right: 1px solid #ddd;
	}
</style>
