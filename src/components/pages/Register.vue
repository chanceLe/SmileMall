<template>
	<div>
		
		<van-nav-bar 
		 title="用户注册"
		 left-text="返回"
		 left-arrow
		 @click-left="goBack"
		 />
		 <div class="register-panel">
			 <van-field 
				v-model="username"
				label="用户名"
				icon="clear"
				placeholder="请输入用户名"
				required
				:error-message="errorName"
				@click-icon="username = ''"
			  />
			  
			 <van-field 
				v-model="password"
				label="密码"
				type="password"
				placeholder="请输入密码"
				required
				:error-message="errorPwd"
				@click-icon="username = ''"
			   />
			   
			   <div class="register-button">
				   <van-button type="primary" :loading="loading"  @click="registerAction"  size="large">马上注册</van-button>
			   </div>
		 </div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { register }  from '@/service.js'
	import { Toast }  from 'vant'
	export default {
		data(){
			return{
				username: '',
				password:'',
				loading:false,
				errorName:'',
				errorPwd:''
			}
		},
		methods:{
			registerAction(){
				this.checkForm() && this.axiosRegister();
			},
			checkForm(){
				let ff = true ; 
				if(this.username.length < 5 ){
					this.errorName = '用户名不能小于5位'
					ff = false;
				}else{
					this.errorName = ''
				}
				
				if(this.password.length < 5 ){
					this.errorPwd = '用户名不能小于5位'
					ff = false;
				}else{
					this.errorPwd = ''
				}
				
				return ff;
			},
			goBack(){
				this.$router.go(-1)
			},
			
			axiosRegister(){
				this.loading= true
				axios({
					url:register,
					method: 'post',
					data:{
						userName: this.username,
						password: this.password,
						
					}
				}).then(response=>{
					if(response.data.code == 200){
						Toast.success("注册成功")
						this.$router.push('/')
					}else{
						console.log(response.data.msg);
						Toast.fail('注册失败')
						this.loading= false
					}
				}).catch((err)=>{
					Toast.fail('注册失败')
					this.loading= false
				})
			}
		}
	}
</script>

<style scoped>
	.register-panel{
		width: 96%;
		border-radius: 5px;
		margin: 20px auto;
		padding-bottom: 80px;
	}
	.register-button{
		padding: 15px 0;
	}
</style>
