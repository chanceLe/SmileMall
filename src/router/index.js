import Vue from 'vue'
import Router from 'vue-router'
import ShopMall from '@/components/pages/ShopMall'

import User from '@/components/pages/User'

import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'

import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'

import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'

Vue.use(Router)

export default new Router({
  routes: [
		 {
		  path: '/main',
		  name: 'Main',
		  component: Main,
			children:[
				 {
				  path: '/',
				  name: 'ShopMall',
				  component: ShopMall
				},
				{
				  path: '/categorylist',
				  name: 'CategoryList',
				  component: CategoryList
				},
				{
				  path: '/cart',
				  name: 'Cart',
				  component: Cart
				},
				{
				  path: '/member',
				  name: 'Member',
				  component: Member
				},
				
			]
		},
   
		 {
		  path: '/register',
		  name: 'Register',
		  component: Register
		},
		 {
		  path: '/login',
		  name: 'Login',
		  component: Login
		},
		 {
		  path: '/goods',
		  name: 'Goods',
		  component: Goods
		},
		
  ]
})
