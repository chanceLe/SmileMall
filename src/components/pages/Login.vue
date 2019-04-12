<template>
	<div>
		
		<van-nav-bar 
		 title="用户登录"
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
				   <van-button type="primary" :loading="loading"  @click="loginAction"  size="large">登录</van-button>
			   </div>
		 </div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { login }  from '@/service.js'
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
		created(){
			if(localStorage.getItem("user")){
				Toast("已经登录不需要重复登录")
				this.$router.push('/')
			}
		},
		methods:{
			loginAction(){
				this.checkForm() && this.axiosLogin();
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
			
			axiosLogin(){
				this.loading= true
				axios({
					url:login,
					method: 'post',
					data:{
						userName: this.username,
						password: this.password,
						
					}
				}).then(response=>{
					
					
					if(response.data.code == 200){
						if(response.data.message){
							new Promise((resolve,reject)=>{
								localStorage.setItem("user",this.userName)
								setTimeout(()=>{resolve()},500)
							}).then(()=>{
								Toast('登录成功')
								this.$router.push('/')
							}).catch(err=>{
								console.log(err,"本地存储error")
								Toast('登录状态保存失败')
							})
						}else{
							Toast('密码错误')
							this.loading= false
						}
					}else{
						Toast.fail(response.data.message)
						this.loading= false
					}
				}).catch((err)=>{
					Toast.fail('登录失败')
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
