<template>
	<div class="wrap">
		<div class="content" >
      <!--重点推送-->
      <div class="zdbk" style="padding-top: 0px;padding-bottom: 15px;">
      	<div class="tit" style="margin-bottom: 15px;"><span>重要推送</span></div>
        <div style="padding:0 20px;background: #FFFFFF;">
          <a-list itemLayout="horizontal" :dataSource="propelList">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta > 
                <a slot="title">{{item.title}}</a>
                <img slot="avatar" style="margin-right: 15px;" src="~@/assets/star.png"/>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
     
			<!--重要交办-->
			<div class="zdbk" style="padding-top: 0px;">
				<div class="tit" style="margin-bottom: 15px;"><span>重要交办</span></div>
				<!-- <div :class="{'pic_wrap':true,'borderCss':!hidden}" v-if="leaderList.length>0">
					<div class="pic">
						<img :src="leaderList[0].imgPath" alt="" />
						<div class="pic_mask">{{leaderList[0].duties}}</div>
					</div>
					<p class="name" :id="leaderList[0].id" @click="clickList($event,leaderList[0].duties)">{{ leaderList[0].name }}</p>
				</div> -->
			</div>

			<!--省长关注-->
			<!-- <div :class="{'right':true,'border':!hidden}">
				<div class="tit"><span>{{ regionLevel==0?'书记关注':regionLevel==1?'领导关注':regionLevel==2?'领导关注':regionLevel==3?'领导关注':'领导关注' }}</span></div>
				<div class="box">
					<div class="mbkh" @click="clickMbkh">
						<img src="@/assets/icon_mbkh.png" alt="" />
						<p>目标考核</p>
					</div>
					<div class="zdzb" @click="clickZdzb">
						<img src="@/assets/icon_zdzb.png" alt="" />
						<p>重点指标</p>
					</div>
					<div class="clear"></div>
				</div>
				<div class="tip">
					<div v-show="notice==1">
						<p v-show="msgList.length==0"> <img src="@/assets/img_dbsx.png" alt="" />待办事项：<span>{{ message }}项</span></p>

						<a-popover v-show="msgList.length>0" trigger="hover">
							<div slot="content" v-for="(item, index) in msgList" :key="item.code" @click="clickPlate(item.code)">
								<p style="cursor:pointer;">{{ item.name }}: {{ item.todoName }}{{ item.todoNum }}&nbsp;&nbsp;{{ item.noticeName }}{{ item.noticeNum }}&nbsp;&nbsp;{{ item.superviseName }}{{ item.superviseNum }}</p>
							</div>
							<img src="@/assets/img_dbsx.png" alt="" />
							<p style="display:inline;">待办事项：<span>{{ message }}项</span></p>
						</a-popover>

					</div>
				</div>
			</div> -->
			<div class="port" v-if="hidden">
				<div class="picTab">
					<div :class="picFlag==(index + 1)?'tab-select':'tab'" @click="clickTab(index + 1)" v-for="(item,index) in assignedLeader">{{item.groupName}}</div>
				</div>
				<ul>
					<li class="pic_wrap" v-for="(leader, index) in leaderList[picFlag-1]" :key="leader.id">
						<div class="pic">
							<img :src="leader.imgPath" alt="" />
							<!--<div class="pic_mask" v-if="leader.duties!=''">{{ leader.duties }}</div>-->
						</div>
						<p class="name" :id="leader.id" :level="leader.level" @click="clickListF($event)"><span :id="leader.id" :level="leader.level">{{ leader.name }}</span></p>
					</li>
					<div class="clear"></div>
				</ul>
			</div>
      <!--其他督办事项-->
      <div class="zdbk" style="padding-top: 15px;padding-bottom: 15px;">
      	<div class="tit" style="margin-bottom: 15px;"><span>其他督办事项</span></div>
        <div style="padding:0 20px;background: #FFFFFF;">
      	<a-list itemLayout="horizontal" :dataSource="dbList">
      	  <a-list-item slot="renderItem" slot-scope="item, index">
      	    <a-list-item-meta > 
      	      <a slot="title">{{item.title}}</a>
      	      <span slot="avatar" style="display: inline-block;width: 8px;height: 8px;background: #CC0000;margin-right: 15px;"/>
      	    </a-list-item-meta>
      	  </a-list-item>
      	</a-list>
        </div>
      </div>
      <!--重点板块-->
      <div class="left">
        <div class="tit"><span>重点板块</span></div>
        <ul class="box">
          <li @click="clickPlate('01')" style="display: none;">
            <img src="@/assets/icon_zyjb.png" alt="" />
            <p>重要交办</p>
          </li>
          <li @click="clickPlate('02')">
            <img src="@/assets/icon_zybs.png" alt="" />
            <p>重要部署</p>
          </li>
          <li @click="clickPlate('07')">
            <img src="@/assets/icon_zywj.png" alt="" />
            <p>重要文件</p>
          </li>
          <li @click="clickPlate('kfqJS')">
            <img src="@/assets/icon_kfqjs.png" alt="" />
            <p>开发区建设</p>
          </li>
          <div class="clear"></div>
        </ul>
      </div>
      <!--重要链接-->
      <div class="right" >
        <div class="tit"><span>重要链接</span></div>
        <ul class="box" style="background: none;border: none;">
          <li @click="clickPlate('szf13710')">
            <img src="@/assets/icon_szf13710.png" alt="" />
            <p>省政府<br />13710</p>
          </li>
         <!-- <li @click="">
            <img src="@/assets/icon_kh.png" alt="" />
            <p>目标责任<br />考核系统</p>
          </li> -->
          <!-- <li @click="">
            <img src="@/assets/icon_ggxxgl.png" alt="" />
            <p>改革信息<br />管理平台</p>
          </li> -->
          <div class="clear"></div>
        </ul>
      </div>
      <div class="clear"></div>
			<!--责任单位-->
			<!-- <div class="zrdw" v-if="undertakeList.length>0" style="margin-top: 15px;">
				<div class="tit"><span>责任单位</span></div>
				<ul class="zrdw_box">
					<li style="font-weight: bold;background-color: #CC0000" v-for="(undertake,index) in undertakeList" :key="undertake.id">
						{{ undertake.name }}
						<div class="kong" :style="{left:'-'+index%5*243+'px'}">
							<span v-for="item in undertake.departList" :key="item.id" @click="clickUnit($event)" :id="item.id" :departOrder="item.departOrder">{{ item.departName }}</span>
						</div>
					</li>
					<div class="clear"></div>
				</ul>
			</div> -->
		</div>

	</div>
</template>

<script>
	import Vue from 'vue'
	import {
		USER_INFO
	} from "@/store/mutation-types"
	import {
      getUsercenterAction
	} from '@/api/manage';
	import {
		globalBus
	} from '@/api/globalBus'
  import { getViewList } from "@/utils/attachment"
	export default {
		name: "Homepage",
		data() {
			return {
				tabList: [],
				leaderList: [],
				undertakeList: [],
				deptId: '',
        dbList:[],
        assignedLeader:[],//重要交办
        propelList:[],//推送列表
				hidden: true,
				notice: 0, //待办事项0不显示，1显示
				insertLimit: 0, //头像是否进入交办列表 0不显示 1显示
				regionLevel: 0,
				message: 0,
				msgList: [],
				indexShow: 0, //不跳
				picFlag: 1 , //领导照片tab显示隐藏
        leaderId:"",
			}
		},
		created() {
			this.getUndertakeList();
      this.getLeaderList();
			this.getMenuClick();
			this.getMessage();
			//获取登陆用户信息
			const userInfo = Vue.ls.get(USER_INFO);
			this.indexShow = userInfo.indexShow;
			this.deptId = userInfo.departId;
      this.leaderId = userInfo.leaderId;
      this.propelList=[
        {title:'楼阳生书记3月份批示办理情况'},
        {title:'全省开发区一季度项目建设情况'},
        {title:'智慧旅游云平台上线试运行准备就绪'},
        {title:'脱贫攻坚普查进入关键阶段'},
        {title:'中小企业融资存在突出问题'},
      ];
      this.dbList = [
        {title:'楼阳生书记3月份批示办理情况'},
        {title:'全省开发区一季度项目建设情况'},
        {title:'智慧旅游云平台上线试运行准备就绪'},
        {title:'脱贫攻坚普查进入关键阶段'},
        {title:'中小企业融资存在突出问题'},
      ];
		},
		methods: {
			getMenuClick() {
				globalBus.$on('clickHomepage', (deptId) => {
					this.deptId = deptId;
					this.getLeaderList();
					this.getUndertakeList();
					this.getMessage();
					window.scrollTo(0, 0);
				});
			},
     getLeaderList (){//推送列表
        this.leaderList = [];
        let url = "/index/leadersV2";
        let params = {deptId:"140000000000000196"};
        getUsercenterAction(url,params).then((res) => {
          if (res.success) {
            this.assignedLeader = res.result;
            for(let i = 0;i < res.result.length;i++){
              this.leaderList.push(res.result[i]['leaderList']);
              this.setImgPath(res.result[i]['leaderList'])
            }
          }
          
         
        })
      },
      setImgPath(leaderList){
        for (let i = 0; i < leaderList.length; i++) {
        	// if (window.location.host.indexOf('localhost') > -1) {
        	// 	leaderList[i]['imgPath'] = 'http://182.92.107.90:8082' + leaderList[i]['imgPath'];
        	// } else if (window.location.host.indexOf('112') > -1) {
        	// 	leaderList[i]['imgPath'] = 'http://59.195.205.101:8080' + leaderList[i]['imgPath'];
        	// } else if (window.location.host.indexOf('192.167.107.26') > -1) {
        	// 	leaderList[i]['imgPath'] = 'http://192.167.107.23:8080' + leaderList[i]['imgPath'];
        	// } else {
        	// 	leaderList[i]['imgPath'] = 'http://' + window.location.host + leaderList[i]['imgPath'];
        	// }
          leaderList[i]['imgPath'] =  getViewList(leaderList[i]['imgPath']);
        	if (leaderList[i].name.length < 3) {
        		var name = leaderList[i].name;
        		name = name.split('');
        		name.splice(1, 0, "\xa0\xa0\xa0\xa0\xa0"); //空格的个数
        		leaderList[i].name = name.join("");
        	}
        }
      },
			getUndertakeList() { //承办单位
				// var json = '?deptId=' + this.deptId;
				// var url = "/index/departs" + json;
				// getAction(url).then((res) => {
				// 	if (res.success && res.result) {
				// 		this.undertakeList = res.result;
				// 	} else {
				// 		this.undertakeList = '';
				// 	}
				// })
			},
			toShow(e) {
				var id = e.target.getAttribute('id');
				var level = e.target.getAttribute('level');
				this.$router.push({
					path: '/show/leadershow/' + id + '/' + level,
					append: 'true'
				})
			},
			clickUnit(e) {
				this.deptId = e.target.getAttribute('id');
				this.getLeaderList();
				this.getUndertakeList();
				this.getMessage();
				window.scrollTo(0, 0);
				//this.reload()
			},
			// reload(){
			//   window.reload();
			// },

			clickPlate(val) {
				var that = this;
				// if (val == '01') {
				// 	that.$router.push({
				// 		path: '/task/leader/normal/normal',
				// 		append: true
				// 	})
				// } else if (val == '02') { //重要部署
				// 	that.$router.push({
				// 		path: '/worktask/MindMapping',
				// 	})
				// } else if (val == '03') { //重大改革
				// 	that.$router.push({
				// 		path: '/reform/reform',
				// 	})
				// } else if (val == '04') { //重点工程
				// 	that.$router.push({
				// 		path: '/engineering/list',
				// 	})
				// } else if (val == '05') { //重大技改
				// 	that.$router.push({
				// 		path: '/majorTec/list',
				// 	})
				// } else if (val == '06') { //重点招商
				// 	that.$router.push({
				// 		path: '/investment/list',
				// 	})
				// } else if (val == '07') { //重要文件
				// 	that.$router.push({
				// 		path: '/importFile/file',
				// 	})
				// } else if (val == '08') { //重大资金
				// 	that.$router.push({
				// 		path: '/fund/fund',
				// 	})
				// } else if (val == '09') { //审计整改
				// 	that.$router.push({
				// 		path: '/rectification/audit',
				// 	})
				// } else if (val == '10') { //督查整改
				// 	that.$router.push({
				// 		path: '/rectification/inspector',
				// 	})
				// } else if (val == 'szf13710') { //13710
				// 	window.open('http://59.195.205.101:8080')
				// } else if(val == 'kfqJS'){//开发区建设
    //       window.open('http://218.26.86.90:8082/sw_13710_kfq/map.html')
    //     }
			},
			clickList(e, dutiesData) { //点击书记一级
				var id = e.target.id;
				var duties = dutiesData;
				//if(this.insertLimit==1){
				if (duties == "书记") {
					this.$router.push({
						path: '/show/firstshow/' + id,
						append: true
					})
				} else {
					this.$router.push({
						path: '/task/leader/' + id + '/' + this.deptId,
						append: true
					})
				}
				//}
			},
			clickListF(e) { //点击副书记一级
				var id = e.target.id;
				// 				if(this.leaderList[0].duties=='书记'){//书记进来点击副书记进领导直观页
				// 					var level = 2;
				// 					this.$router.push({path:'/show/leadershow/'+id+'/'+level,append:'true'})
				// 				}else{
				// this.$router.push({
				// 	path: '/task/leader/' + id + '/' + this.deptId,
				// 	append: true
				// })
				// }
			},
			clickListD() { //点击待办事项
				// this.$router.push({
				//   path: '/task/leader/normal',
				//   append:true
				// })
			},
			//待办事项
			getMessage() {
				// var url = "/index/messageV2?deptId=" + this.deptId;
				// getAction(url).then((res) => {
				// 	if (res.success && res.result) {
				// 		this.message = res.result.total;
				// 		this.msgList = res.result.messageList;
				// 	}
				// })
			},
			//重点指标
			clickZdzb() {
				if (this.indexShow == 1) {
					window.open('http://59.195.199.183:8081/xtbg/ssoSxwwLogin.jsp?' +
						'uuid=NDAyN2VmOTE2NGRiM2VhZTAxNjRkYjUzYzViZjAwMGI=&meauLevel1=HZ28033a62e232320162e26fa3a10079')
				}
			},
			//目标考核
			clickMbkh() {
				//window.open('http://59.195.199.183:8081/xtbg/ssoSxwwLogin.jsp?uuid=NDAyODAzNDQ2MzQ5NTUwYzAxNjM0YThjNjViYzAwOTA=&meauLevel1=HZ28033a62e232320162e26fa3a10079')
			},
			//点击领导照片模块的tab
			clickTab(val) {
				this.picFlag = val;
			},
		},
	}
</script>

<style scoped>
	html,
	body,
	div,
	p,
	ul,
	li {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font-weight: normal;
		vertical-align: baseline;
		outline: none;
		font-family: "Microsoft YaHei", "PingFang SC";
	}

	.clear:after {
		content: "";
		display: block;
		height: 0px;
		overflow: hidden;
		clear: both;
		zoom: 1
	}

	li {
		list-style: none;
	}

	.wrap {
		background: #F3F6F9;
	}

	.ant-menu-horizontal {
		width: 1200px;
		height: 60px;
		background: #092C53;
		display: flex;
		align-items: center;
	}

	.ant-menu-horizontal>.ant-menu-item,
	.ant-menu-horizontal>.ant-menu-submenu {
		height: 16px;
		flex: 1;
		text-align: center;
		font-size: 16px;
		font-family: MicrosoftYaHei;
		font-weight: bold;
		color: #fff;
		line-height: 18px;
		border-right: 1px solid #264E9E;
		cursor: pointer;
	}

	.ant-menu-horizontal>.ant-menu-item:hover,
	.ant-menu-horizontal>.ant-menu-submenu:hover,
	.ant-menu-horizontal>.ant-menu-item-active,
	.ant-menu-horizontal>.ant-menu-submenu-active,
	.ant-menu-horizontal>.ant-menu-item-open,
	.ant-menu-horizontal>.ant-menu-submenu-open,
	.ant-menu-horizontal>.ant-menu-item-selected,
	.ant-menu-horizontal>.ant-menu-submenu-selected {
		border-bottom: none;
		color: #95beff;
	}

	.ant-menu-submenu-active,
	.ant-menu-horizontal>.ant-menu-item,
	.ant-menu-horizontal>.ant-menu-submenu {
		border-bottom: none;
	}

	.ant-menu-horizontal.ant-menu-sub,
	.ant-menu-vertical.ant-menu-sub,
	.ant-menu-vertical-left.ant-menu-sub,
	.ant-menu-vertical-right.ant-menu-sub {
		min-width: 140px !important;
	}

	.content {
		margin: 0 auto;
		width: 1200px;
		padding: 30px 0 92px 0;
	}

	.content .left {
		float: left;
		width: 590px;
	}

	.content .left .tit {
		width: 590px;
		height: 40px;
		border-bottom: 1px solid #CC0000;
		margin-bottom: 15px;
		font-weight: bold;
	}

	.content .left .tit span {
		display: inline-block;
		width: 129px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #CC0000;
		font-size: 20px;
		color: #fff;
	}

	.content .left .pic_wrap {
		height: 352px;
		text-align: center;
		background: #FFFFFF;
		padding-top: 30px;
		border: 1px solid #E8EDF3;
		border-bottom: none;
		box-sizing: border-box;
	}

	.content .left .pic_wrap .pic {
		background: #F3F6F9;
		padding: 6px 7px;
		height: 268px;
		width: 198px;
		margin: 0 auto;
		position: relative;
		box-sizing: border-box;
	}

	.content .left .pic_wrap .pic img {
		display: inline-block;
		width: 184px;
		height: 255px;
	}

	.content .left .pic_wrap .pic .pic_mask {
		width: 184px;
		text-align: center;
		background: rgba(77, 109, 166, 1);
		opacity: 0.85;
		position: absolute;
		bottom: 6px;
		left: 7px;
		height: 37px;
		line-height: 37px;
		font-size: 22px;
		font-family: MicrosoftYaHei-Bold;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	.content .left .name {
		margin-top: 16px;
		font-size: 18px;
		color: #333333;
		text-align: center;
		cursor: pointer;
	}

	.content .right {
		float: right;
		width: 610px;
		border-bottom: 1px solid #E8EDF3;
		padding-left: 20px;
		box-sizing: border-box;
	}

	.content .right .tit {
		font-weight: bold;
		width: 590px;
		height: 40px;
		border-bottom: 1px solid #CC0000;
		margin-bottom: 15px;
	}

	.content .right .tit span {
		display: inline-block;
		width: 129px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #CC0000;
		font-size: 20px;
		color: #fff;
	}

	.content .right .box {
		background: #fff;
		border: 1px solid #E8EDF3;
	}

	.content .right .box .mbkh {
		float: left;
		cursor: pointer;
	}

	.content .right .box .mbkh img {
		display: block;
		width: 120px;
		height: 125px;
	}

	.content .right .box .mbkh p {
		width: 120px;
		font-size: 18px;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #333333;
		text-align: center;
		margin-top: 20px;
		font-weight: bold
	}

	.content .right .box .zdzb {
		float: right;
		cursor: pointer;
	}

	.content .right .box .zdzb img {
		display: block;
		width: 120px;
		height: 125px;
	}

	.content .right .box .zdzb p {
		width: 120px;
		font-size: 18px;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #333333;
		text-align: center;
		margin-top: 20px;
		font-weight: bold
	}

	.content .right .tip {
		font-weight: bold;
		padding: 21px 0 13px;
		font-size: 16px;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		height: 58px;
		cursor: pointer;
	}

	.content .right .tip img {
		display: inline-block;
		width: 18px;
		height: 18px;
		vertical-align: middle;
		margin-right: 3px;
	}

	.content .right .tip span {
		color: #BB2335;
		margin-left: 10px;
		font-size: 18px;
		font-weight: bold;
	}

	.content .right .tip p {
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		font-size: 16px;
	}

	.content .port {
		border: 1px solid #E8EDF3;
		border-top: none;
		background: #fff;
		padding: 30px 0 0 0;
		clear: both;
	}

	.content .port ul {
		padding: 35px 33px 0 38px;
	}

	.content .port .pic_wrap {
		text-align: center;
		box-sizing: border-box;
		cursor: pointer;
		float: left;
		margin: 0 50px 19px 0;
	}

	.content .port .pic_wrap:nth-child(7n) {
		margin-right: 0;
	}

	.content .port .pic_wrap .pic {
		background: #F3F6F9;
		padding: 5px 6px;
		box-sizing: border-box;
		height: 161px;
		width: 118px;
		margin: 0 auto;
		position: relative;
	}

	.content .port .pic_wrap .pic img {
		display: inline-block;
		width: 108px;
		height: 150px;
	}

	.content .port .pic_wrap .pic .pic_mask {
		width: 107px;
		text-align: center;
		background: rgba(77, 109, 166, 1);
		opacity: 0.85;
		position: absolute;
		bottom: 5px;
		left: 6px;
		height: 22px;
		line-height: 22px;
		font-size: 14px;
		font-family: MicrosoftYaHei-Bold;
		font-weight: bold;
		color: #fff;
	}

	.content .port .name {
		margin-top: 10px;
		font-size: 18px;
		color: #333333;
		text-align: center;
		font-weight: bold
	}

	.pic_wrap .name {
		font-weight: bold
	}

	.content .port .picTab {
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
	}

	.content .port .picTab .tab {
		cursor: pointer;
		width: 280px;
		height: 80px;
		line-height: 80px;
		background: rgba(249, 230, 230, 1);
		box-shadow: 0px 6px 0px 0px rgba(238, 202, 202, 1);
		border-radius: 8px;
		text-align: center;
		font-size: 22px;
	}

	.content .port .picTab .tab-select {
		background: #EE2323;
		font-weight: bold;
		color: #fff;
		box-shadow: 0px 6px 0px 0px #CA0000;
		cursor: pointer;
		width: 280px;
		height: 80px;
		line-height: 80px;
		border-radius: 8px;
		text-align: center;
		font-size: 22px;
	}

	.content .zdbk {
		padding: 51px 0 0;
		clear: both;
	}

	.content .zylj {
		padding: 51px 0 46px;
		clear: both;
	}

	.content .zdbk .tit,
	.content .zylj .tit {
		font-weight: bold;
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #CC0000;
		margin-bottom: 30px;
	}

	.content .zdbk .tit span,
	.content .zylj .tit span {
		display: inline-block;
		min-width: 129px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #CC0000;
    padding: 0 20px;
		font-size: 20px;
		color: #fff;
	}

	.content .left .box,
	.content .right .box {
		display: flex;
	}

	.content .left .box li {
		height: 170px;
		width: 170px;
		margin-right: 30px;
		padding: 27px 0 0;
		box-sizing: border-box;
		border-radius: 8px;
		cursor: pointer;
	}

	.content .right .box li {
		height: 170px;
		width: 170px;
		margin-right: 30px;
		padding: 17px 0 0;
		box-sizing: border-box;
		border-radius: 8px;
		cursor: pointer;
	}

	.content .left .box li:nth-child(1) {
		background: #2051b0;
	}

	.content .left .box li:nth-child(2) {
		background: #C57A18;
	}

	.content .left .box li:nth-child(3) {
		background: #3F8C2C;
	}

	.content .left .box li:nth-child(4) {
		background: #8C45AD;
		margin-right: 0;
	}

	.content .right .box li:nth-child(1),
	.content .right .box li:nth-child(3) {
		background: #CC0000;
	}

	.content .right .box li:nth-child(2) {
		background: #8C45AD;
	}

	.content .left .box li img {
		display: block;
		height: 64px;
		width: 64px;
		margin: 0 auto 26px;
	}

	.content .right .box li img {
		display: block;
		height: 64px;
		width: 64px;
		margin: 0 auto 18px;
	}

	.content .left .box li p {
		margin: 0 auto;
		text-align: center;
		width: 138px;
		font-size: 24px;
		font-family: MicrosoftYaHei;
		font-weight: bold;
		color: #fff;
	}

	.content .right .box li p {
		margin: 0 auto;
		text-align: center;
		width: 138px;
		font-size: 24px;
		font-family: MicrosoftYaHei;
		font-weight: bold;
		color: #fff;
		line-height: 28px;
	}

	.content .zrdw .tit {
		font-weight: bold;
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #CC0000;
		margin-bottom: 30px;
	}

	.content .zrdw .tit span {
		display: inline-block;
		width: 129px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #CC0000;
		font-size: 20px;
		color: #fff;
	}

	.content .zrdw .zrdw_box li {
		margin-bottom: 10px;
		text-align: center;
		float: left;
		margin-right: 15px;
		width: 228px;
		height: 46px;
		line-height: 46px;
		background: #497ED1;
		font-size: 20px;
		color: #fff;
		cursor: pointer;
		position: relative;
	}

	.content .zrdw .zrdw_box li:nth-child(5n) {
		margin-right: 0;
	}

	.content .zrdw .zrdw_box li .kong {
		max-height: 140px;
		position: absolute;
		top: 44px;
		z-index: 10;
		width: 1200px;
		padding: 0 30px;
		box-sizing: border-box;
		background: #fff;
		border: 1px solid #E8EDF3;
		text-align: left;
		display: none;
		overflow-y: scroll;
	}

	.content .zrdw .zrdw_box li .kong span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
		color: #666666;
		width: 20%;
		text-align: left;
		display: block;
		line-height: 16px;
		float: left;
		overflow: hidden;
		line-height: 30px;
	}

	.content .zrdw .zrdw_box li:hover .kong {
		display: block;
	}

	.content .zrdw .zrdw_box li .kong span:hover {
		color: #497ED1;
	}

	.content .zrdw .zrdw_box li:hover {
		background: #fff;
		color: #f4cbcb;
	}

	.footer {
		padding: 33px 0;
		font-size: 14px;
		color: #fff;
		background: #CC0000;
		width: 100%;
		text-align: center;
	}
  .ant-list-item-meta{
    line-height: 65px;
  }
  .ant-list-item-meta-title{
    margin: 0px;
    font-size: 18px;
    line-height: 65px;
  }
	.borderCss {
		border-bottom: 1px solid #E8EDF3 !important;
	}

	.border {
		border-bottom: none !important;
	}
</style>
