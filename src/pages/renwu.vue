<template>
	<div>
		<m-header back>星球任务</m-header>
    <div class='header'>
       
        <div class='label'>贡献度：</div>
        <div class='count'>{{forceValue}}</div>
        <div class='tips1'>做任务可以获得贡献度，贡献度越高，获取的星钻会越多…</div> 
    </div>
<div class='renwu-list'>
        <div class='renwu-item'v-for="(item,id) in list" @click="toGz(item)">
            <div :class="'bg-r'+(id+1)" class='item-icon'>T{{id+otherCount}}</div>
            <div class='item-content'>
                <div class='item-title'>关注公众号“{{item.name}}”</div>
                <div>
                    <span class='red'>+50</span>贡献度</div>
            </div>
            <div class='get-btn' v-if="!item.isFollow">+获取</div>
            <div class='complete-btn' v-if="item.isFollow">已完成</div>
        </div>
        <!--<div class='renwu-item'>
            <div class='item-icon bg-r6'>T{{count+otherCount}}</div>
            <div class='item-content'>
                <div class='item-title'>每日登录</div>
                <div>
                    <span class='red'>+2</span>贡献度</div>
            </div>
            <div class='complete-btn'>已完成</div>
        </div>-->
        <!--<div class='renwu-item'>
            <div class='item-icon bg-r1'>T{{count+otherCount+1}}</div>
            <div class='item-content'>
                <div class='item-title'>身份绑定</div>
                <div>
                    <span class='red'>+50</span>贡献度</div>
            </div>
            <div class='get-btn' v-if="!isBind">+获取</div>
            <div class='complete-btn' v-if="isBind">已完成</div>
        </div>-->
        <!--<div class='renwu-item'>
            <div class='item-icon bg-r7'>T{{count+otherCount+2}}</div>
            <div class='item-content'>
                <div class='item-title'>阅读资讯</div>
                <div>
                    <span class='red'>+5</span>贡献度/篇，限10篇/天</div>
            </div>
            <div class='complete-btn'>敬请期待</div>
        </div>-->

    </div> 

  
    <!--<results id='baoxiang'></results>-->
</div>
</template>

<script>
	import fetch from '@/utils/fetch.js'
  import { mapState } from 'vuex'
	export default{
		data(){
			return{
				 loading: false,
        forceValue: 0,//贡献度
        tokenValue: 0,//星钻
        list: [],
        forceValue: 0,
        count: 0,
        others: [],
        otherCount: 0,
        complete: false,
        hidden: true,
        isBind: true,
        currentIndex: 0,//当前卡片索引
        taskList: [],//未完成任务列表
        noData: false
			}
		},
    computed: mapState(['userId']),
		created(){
			this.id=this.$route.params.id
			fetch.get("/api/force/user/total/"+this.userId)
			.then(res=>{
				this.forceValue=res.data.totalDetail.totalAmount
			}),
			fetch.get("/api/wx/user/followlist/"+this.userId)
			.then(res=>{
				this.list=res.data.followlist.details,
				this.count=res.data.followlist.details.length
			}),
			fetch.get("/api/wx/user/my/"+this.userId)
			.then(res=>{
				  this.isBind=res.data.myInfo.idBind
			}),
			fetch.get("/api/wx/ad/linklist/"+this.userId)
			.then(res=>{
				 this.others=res.data.linkList.details,
                this.hidden= false,
                this.otherCount=res.data.linkList.details.length
			})
		},
		methods:{
			toGz(item){
				this.$router.push('/gz?id='+this.userId+'&name='+item.name+'&code='+item.code)
			}
		}
	}
</script>

<style scoped>
	/* pages/renwu/renwu.wxss */
	.tips1{
		color: white;
	}
	.renwu-list{
		
	}
.header {
  background-image: url(https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/xqrwbg.png) ;
  background-size: 100%;
  background-position: 0 -100px;
  padding: 26px 60px;
  width: 100%;
  height: 518px;
  margin-bottom: 50px;
}
.title {
  font-family: PingFangHK-Medium;
  font-size: 52px;
  color: #FFFFFF;
  letter-spacing: 0;
  margin-bottom: 30px;
  padding-left: 40px;
}
.label {
  font-size: 26px;
  color: #6CE0FF;
  padding-left: 40px;
}
.count {
  font-family: PingFangHK-Semibold;
  font-size: 72px;
  color: #6CE0FF;
  letter-spacing: 9px;
  margin-bottom: 20px;
  position: relative;
  padding-left: 40px;
}
.zuan {
  background-image: url(https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/zuan.png) no-repeat;
  background-size: 100%;
  width: 30px;
  height: 24px;
  position: absolute;
  top: 16px;
  left: 0;
}
.tips {
  font-family: PingFangHK-Regular;
  font-size: 26px;
  color: #FFFFFF;
  letter-spacing: 2px;
  margin-left: 40px;
  width:480px;
}
.renwu-item {
  display: flex;
  padding: 0 40px 0 30px;
  align-items: center;
  margin-bottom: 64px;
}
.item-content {
  font-family: PingFangHK-Medium;
  font-size: 26px;
  color: #4A4A4A;
  letter-spacing: 2px;
  line-height: 37px;
  flex: 1;
}
.item-title {
  font-size: 32px;
  color: #000000;
  letter-spacing: 1px;
  margin-bottom: 8px;
} 
.red {
  color: #FF8EC3;
}
.get-btn {
  border: 2px solid rgba(42,157,255,0.58);
  border-radius: 8px;
  color: rgba(42,157,255,0.58);
  width: 124px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 28px;
}
.complete-btn {
  background: #D8D8D8;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 28px;
  color: #FFFFFF;
  letter-spacing: 2.15px;
}
.bg-r1 {
    width: 113px; 
    height: 111px; 
    line-height: 111px;
    background: url('https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/css_sprites.png') -647px -10px; 
}
.bg-r2 {
    width: 108px; 
    height: 106px;
    line-height: 106px;
    background: url('https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/css_sprites.png') -263px -10px;
}
.bg-r3 {
    width: 108px; 
    height: 97px;
    line-height: 97px;
    background: url('https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/css_sprites.png') -391px -10px;
}
.bg-r4 {
    width: 108px; 
    height: 94px;
    line-height: 94px;
    background: url('https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/css_sprites.png') -519px -10px;
}
.bg-r5 {
    width: 107px; 
    height: 92px;
    line-height: 92px;
    background: url('https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/css_sprites.png') -136px -10px;
}
.bg-r6 {
    width: 106px; 
    height: 99px;
    line-height: 99px;
    background: url('https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/css_sprites.png') -10px -10px;
}
.bg-r7 {
    width: 116px; 
    height: 99px;
    line-height: 99px;
    background: url('https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/css_sprites.png') -780px -10px;
}
.item-icon {
  margin-right: 12px;
  background-size: 906px;
  background-repeat: no-repeat;
  text-align: center;
  font-family: PingFangHK-Medium;
  font-size: 32px;
  color: #FFFFFF;
  letter-spacing: 2.46px;
}

/* 改版任务 */
</style>