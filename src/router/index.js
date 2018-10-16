import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Biyong from '@/pages/biyong'
import Yule from '@/pages/yule'
import Iframe from '@/pages/iframe'
import Active from '@/pages/actives'
import zuanDetails from '@/pages/zuanDetails'
import loginDays from '@/pages/loginActive'
import Duihuan from '@/pages/duihuan'
import prod from '@/pages/prod'
import regin from '@/pages/regin'
import login from '@/pages/login'
import My from '@/pages/my'
import Renwu from '@/pages/renwu'
import Gz from '@/pages/gz'
import toast from '../components/toast'
Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			redirect: '/login',
		},
		{
			path: '/index',
			name: 'index',
			component: Index
		},
		{
			path: '/biyong',
			name: 'biyong',
			component: Biyong
		},
		{
			path: '/yule',
			name: 'yule',
			component: Yule
		},
		{
			path: '/iframe/:appid',
			name: 'iframe',
			component: Iframe
		},
		{
			path: "/active",
			component: Active
		},
		{
			path: "/zuanDetails",
			component: zuanDetails
		},
		{
			path: "/loginDays",
			component: loginDays
		},
		{
			path: "/duihuan",
			component: Duihuan
		},
		{
			path: "/prod/:id",
			component: prod
		},
		{
			path: "/regin",
			component: regin
		},
		{
			path: "/login",
			name: 'login',
			component: login,

		},
		{
			path: "/my",
			component: My
		},
		{
			path: "/renwu",
			component: Renwu
		},
		{
			path: "/gz",
			component: Gz
		},
		{
			path: "/toast",
			component: toast
		}

	]
})
router.beforeEach((to, from, next) => {
	let old = window.localStorage.getItem("time")?JSON.parse(window.localStorage.getItem("time")):0
	let now=[]
	now.push(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())
	console.log(now,old)
	if(to.path != "/login") {
		if(now[0] > old[0]) {
			next("/login")
		} else {
			if(now[1] > old[1]) {
				next("/login")
			} else {
				if(now[2] > old[2]) {
					next("/login")
				}else{
					
				}
			}
		}
	}	
	if(to.path=="/login"){
		if(now[0]==old[0]&&now[1]==old[1]&&now[2]==old[2]){
		next("/index")
	}
	}
	
	next()
	//	// 
	//	console.log(to.path)
	//	if(to.path != "/login") {
	//		if(1) {
	//			router.push({name:'login'})
	//		}
	//	}else{
	//		
	//	}

})
export default router