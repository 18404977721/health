<template>
	<div class="wrap">
		<div class="topWrap">
			<!-- 登录 -->
			<div v-if="userInfo==null" class="login-index-con Center Abs">
			  <div class="login-index-box Fr">
			    <div class="login-index">
			      <div class="login-face">
			        <div class=""></div>
			        <img src="@assets/login_off_img.png">
			        <p style="color:#666;font-size:16px;font-family: '微软雅黑';">登 录</p>
			      </div>
			      <div class="login-con">
              <a-form :form="form" class="user-layout-login" ref="formLogin" id="formLogin">
                <a-form-item>
                  <a-input
                    size="large"
                    v-decorator="['username',validatorRules.username,{ validator: this.handleUsernameOrEmail }]"
                    type="text"
                    placeholder="请输入帐户名">
                    <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                  </a-input>
                </a-form-item>
                
                <a-form-item>
                  <a-input
                    v-decorator="['password',validatorRules.password]"
                    size="large"
                    type="password"
                    autocomplete="false"
                    placeholder="密码">
                    <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                  </a-input>
                </a-form-item>
                
                <a-row :gutter="0">
                  <a-col :span="16">
                    <a-form-item>
                      <a-input
                        v-decorator="['inputCode',validatorRules.inputCode]"
                        size="large"
                        type="text"
                        @change="inputCodeChange"
                        placeholder="请输入验证码">
                        <a-icon slot="prefix" type="smile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                      </a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8" style="text-align: right">
                    <img v-if="requestCodeSuccess" style="margin-top: 4px;" :src="randCodeImage" @click="handleChangeCheckCode"/>
                    <img v-else style="margin-top: 4px;" src="../../assets/checkcode.png" @click="handleChangeCheckCode"/>
                  </a-col>
                </a-row>
              </a-form>
              <a-form-item>
                <a-checkbox v-decorator="['rememberMe', {initialValue: true, valuePropName: 'checked'}]" >自动登陆</a-checkbox>
                <router-link target="_blank" :to="{ name: 'alteration'}" class="forge-password" style="float: right;">
                  忘记密码
                </router-link>
               <router-link target="_blank" :to="{ name: 'register'}" class="forge-password" style="float: right;margin-right: 10px" >
                  注册
                </router-link>
              </a-form-item>
              
              <a-form-item>
                <a-button
                 style="width:100%;"
                  size="large"
                  type="primary"
                  htmlType="submit"
                  :loading="loginBtn"
                  @click.stop.prevent="handleSubmit"
                  :disabled="loginBtn">确定
                </a-button>
              </a-form-item>
              
              
							<!-- <ul>
							  <li>
									<input type="text" name="username" placeholder="请输入邮箱或手机号" autocomplete="off">
								</li>
							  <li><input type="password" name="password" required  placeholder="请输入8-18位数字和字母密码" autocomplete="off"></li>
							</ul>
							<div style="overflow:hidden;margin-bottom:10px;">
								<span style="float:left;">忘记密码 ?</span>
								<span style="float:right;cursor:pointer;" @click="clickRegister">注册</span>
							</div>
							<button type="submit" class="index-login-btn" >登录</button> -->
			      </div>
			    </div>
			  </div>
			</div>
			<!-- 轮播图 -->
			<a-carousel autoplay style="height:420px;">
				<div v-for="(item, index) in rotationList" :key="index" style="height: 420px;overflow:hidden;"><img class="carouselimg" :src="item.picList[0].filePath" alt=""></div>
			</a-carousel>
		</div>
		<div class="container-index Center Clear">
		  <div class="input Fl">
		    <input type="text" placeholder="请输入要搜索的内容" autocomplete="off" id="search-input" v-model="keyWord">
		  </div>
		  <div class="search Fr" @click="searchContent">搜 索</div>
		</div>
		<!-- 信息圈板块 -->
		<!-- <i class="port"></i> 图标class = port:点  top:最热  jian:推荐-->
		<div class="Center news-con">
		  <div class="title-con">
		    <img src="@assets/xinxi_title.jpg">
		  </div>
		  <ul class="Clear">
		    <li class="news-list Fl">
		      <div class="news-left">
		        <div class="Clear news-left-t">
		          <div class="Clear news-left-d">
		            <dl class="news-r-th">
		              <dd class="th">最新</dd>
		              <dt @click="getnewList()" style="cursor:pointer;"><span class="r_more">换一换</span></dt>
		            </dl>
		            <ul class="r-list">
		              <li v-for="(item, index) in newList" :key="index" @click="clickDetail(item.id,'xxq')" style="cursor:pointer;">
		                <div class="news-list-tit"><i class="port"></i> <span class="news-list-title">{{item.title}}</span><span style="float:right;padding-right: 10px;"><i v-if="item.isTop=='1'" class="top"></i><i v-if="item.isRecommend=='1'" class="jian"></i></span></div>
		                <div class="news-list-txt"><span class="news-list-txt1">{{item.typeValue}}</span><span><span class="_span">阅读量:</span>{{item.clientNum?item.clientNum:0}}人</span><span style="text-align:right;"><span class="_span">发布人:</span>{{item.createBy}}</span></div>
		              </li>
		            </ul>
		          </div>
		        </div>
		      </div>
		    </li>
		    <li class="news-list Fl">
		      <div class="news-left">
		        <div class="Clear news-left-t">
		          <div class="Clear news-left-d">
		            <dl class="news-r-th">
		              <dd class="th">最热</dd>
		              <dt @click="gethotList()" style="cursor:pointer;"><span class="r_more">换一换</span></dt>
		            </dl>
		            <ul class="r-list">
                  <li v-for="(item, index) in hotList" :key="index" @click="clickDetail(item.id,'xxq')" style="cursor:pointer;">
                    <div class="news-list-tit"><i class="port"></i> <span class="news-list-title">{{item.title}}</span><span style="float:right;padding-right: 10px;"><i v-if="item.isTop=='1'" class="top"></i><i v-if="item.isRecommend=='1'" class="jian"></i></span></div>
                    <div class="news-list-txt"><span class="news-list-txt1">{{item.typeValue}}</span><span>阅读量:{{item.clientNum?item.clientNum:0}}人</span><span style="text-align:right;">发布人:{{item.createBy}}</span></div>
                  </li>
		              <!-- <li>
		                <a href="#123" target="_blank">
		                  <div class="news-list-tit"><i class="port"></i> 吉商峰会<i class="top"></i></div>
		                  <div class="news-list-txt"><span class="news-list-txt2">峰会</span><span>阅读量:14.5万人</span><span>主持人:里斯本</span></div>
		                </a>
		              </li>
		              <li>
		                <a href="#123" target="_blank">
		                  <div class="news-list-tit"><i class="port"></i> 吉商峰会<i class="jian"></i></div>
		                  <div class="news-list-txt"><span class="news-list-txt2">峰会</span><span>阅读量:14.5万人</span><span>主持人:里斯本</span></div>
		                </a>
		              </li> -->
		            </ul>
		          </div>
		        </div>
		      </div>
		    </li>
		    <li class="news-list Fl">
		      <div class="news-left">
		        <div class="Clear news-left-t">
		          <div class="Clear news-left-d">
		            <dl class="news-r-th">
		              <dd class="th">推荐话题</dd>
                  <dt @click="getrecommendList()" style="cursor:pointer;"><span class="r_more">换一换</span></dt>
		            </dl>
		            <ul class="r-list">
                  <li v-for="(item, index) in recommendList" :key="index" @click="clickDetail(item.id,'xxq')" style="cursor:pointer;">
                    <div class="news-list-tit"><i class="port"></i> <span class="news-list-title">{{item.title}}</span><span style="float:right;padding-right: 10px;"><i v-if="item.isTop=='1'" class="top"></i><i v-if="item.isRecommend=='1'" class="jian"></i></span></div>
                    <div class="news-list-txt"><span class="news-list-txt1">{{item.typeValue}}</span><span>阅读量:{{item.clientNum?item.clientNum:0}}人</span><span style="text-align:right;">发布人:{{item.createBy}}</span></div>
                  </li>
		            </ul>
		          </div>
		        </div>
		      </div>
		    </li>
		    <li class="news-list Fl">
		      <div class="news-left">
		        <div class="Clear news-left-t">
		          <div class="Clear news-left-d">
		            <dl class="news-r-th">
		              <dd class="th">友情链接</dd>
		            </dl>
		            <div class="Clear friend-link-list">
		              <a class="Fl friend-link-item" v-for="(item, index) in linkList" :key="index" :href="item.url" target="_blank">
		                <img :src="item.picList[0].filePath">
		              </a>
		            </div>
		          </div>
		        </div>
		      </div>
		    </li>
		  </ul>
		  <div class="more-s">
		    <router-link target="_blank" to='/dashboard/HealthInfoCircleList'>查看更多话题<span style="color: #f67f00;font-weight: bold;"><a-icon type="right" /></span></router-link>
		  </div>
		</div>
		<!-- banner -->
		<div>
		  <img style="width: 100%;height: auto;" src="@assets/banner_img.jpg">
		</div>
		<!-- 活动板块 -->
		<div class="act-con Center">
		  <div class="title-con">
		    <img src="@assets/huodong_title.jpg">
		  </div>
		  <div class="act-model Clear">
		    <ul class="act-model-l Fl">
		      <li class="act-model-item Clear" v-if="gy.picList&&gy.picList.length!=0">
		        <span class="img-box Fl" @click="clickhd(gyId)">
		          <img src="@assets/act_01_img.jpg">
		        </span>
		        <div class="act-row act-row01 Clear" v-if="gy.picList&&gy.picList.length==1" @click="clickDetail(gy.id,'hd')" style="cursor:pointer;">
		          <div class="act-col act-row-img Fl">
		            <img :src="gy.picList[0].filePath">
		          </div>
		          <div class="act-col act-row-txts Fl">
		            <div class="act-row-txt-tit1">{{gy.title}}</div>
		            <div>
		              <b class="layui-icon layui-icon-time"></b>
		              <a-icon type="clock-circle" />{{gy.startTime}} 至 {{gy.endTime}}
		            </div>
		            <div>
		              <b class="layui-icon layui-icon-location"></b>
		              <a-icon type="environment" />{{gy.activeAddr}}
		            </div>
		          </div>
		          <div class="act-col act-row-sta Fr">
		            <!-- stu_img_01.jpg 01 进行中  02已结束-->
		            <img v-if="gy.state=='进行中'" src="@assets/stu_img_01.jpg">
		            <img v-if="gy.state=='已结束'" src="@assets/stu_img_02.jpg">
		          </div>
		        </div>
            <div class="act-row act-row02" v-if="gy.picList&&gy.picList.length>1" @click="clickDetail(gy.id,'hd')" style="cursor:pointer;">
              <div class="Fl" style="width: 664px;">
                <div class="Clear">
                  <div class="act-col act-row-txts Fl">
                    <div class="act-row-txt-tit">{{gy.title}}</div>
                    <div>
                      <b class="layui-icon layui-icon-time"></b>
                      <a-icon type="clock-circle" />{{gy.startTime}} 至 {{gy.endTime}}
                    </div>
                    <div>
                      <b class="layui-icon layui-icon-location"></b>
                      <a-icon type="environment" />{{gy.activeAddr}}
                    </div>
                  </div>
                  <div class="act-col act-row-sta Fr">
                    <img v-if="gy.state=='进行中'" src="@assets/stu_img_01.jpg">
                    <img v-if="gy.state=='已结束'" src="@assets/stu_img_02.jpg">
                  </div>
                </div>
                <div class="act-row-imglist Clear">
                  <div v-if="index<3" class="act-col act-row-img Fl" v-for="(item, index) in gy.picList" :key="index" >
                    <img :src="item.filePath">
                  </div>
                </div>
              </div>
            </div>
		      </li>
		      <li class="act-model-item Clear">
		        <span class="img-box Fl" @click="clickhd(zhId)">
		          <img src="@assets/act_02_img.jpg">
		        </span>
		        <div class="act-row act-row01 Clear" v-if="zh.picList&&zh.picList.length==1" @click="clickDetail(zh.id,'hd')" style="cursor:pointer;">
		          <div class="act-col act-row-img Fl">
		            <img :src="zh.picList[0].filePath">
		          </div>
		          <div class="act-col act-row-txts Fl">
		            <div class="act-row-txt-tit1">{{zh.title}}</div>
		            <div>
		              <b class="layui-icon layui-icon-time"></b>
		              <a-icon type="clock-circle" />{{zh.startTime}} 至 {{zh.endTime}}
		            </div>
		            <div>
		              <b class="layui-icon layui-icon-location"></b>
		              <a-icon type="environment" />{{zh.activeAddr}}
		            </div>
		          </div>
		          <div class="act-col act-row-sta Fr">
		            <!-- stu_img_01.jpg 01 进行中  02已结束-->
		            <img v-if="zh.state=='进行中'" src="@assets/stu_img_01.jpg">
		            <img v-if="zh.state=='已结束'" src="@assets/stu_img_02.jpg">
		          </div>
		        </div>
		        <div class="act-row act-row02" v-if="zh.picList&&zh.picList.length>1" @click="clickDetail(zh.id,'hd')" style="cursor:pointer;">
		          <div class="Fl" style="width: 664px;">
		            <div class="Clear">
		              <div class="act-col act-row-txts Fl">
		                <div class="act-row-txt-tit">{{zh.title}}</div>
		                <div>
		                  <b class="layui-icon layui-icon-time"></b>
		                  <a-icon type="clock-circle" />{{zh.startTime}} 至 {{zh.endTime}}
		                </div>
		                <div>
		                  <b class="layui-icon layui-icon-location"></b>
		                  <a-icon type="environment" />{{zh.activeAddr}}
		                </div>
		              </div>
		              <div class="act-col act-row-sta Fr">
		                <img v-if="zh.state=='进行中'" src="@assets/stu_img_01.jpg">
		                <img v-if="zh.state=='已结束'" src="@assets/stu_img_02.jpg">
		              </div>
		            </div>
		            <div class="act-row-imglist Clear">
		              <div v-if="index<3" class="act-col act-row-img Fl" v-for="(item, index) in zh.picList" :key="index" >
		                <img :src="item.filePath">
		              </div>
		            </div>
		          </div>
		        </div>
		      </li>
		      <li class="act-model-item Clear">
		        <span class="img-box Fl" @click="clickhd(gfId)">
		          <img src="@assets/act_03_img.jpg">
		        </span>
		        <div class="act-row act-row01 Clear" v-if="gf.picList&&gf.picList.length==1" @click="clickDetail(gf.id,'hd')" style="cursor:pointer;">
		          <div class="act-col act-row-img Fl">
		            <img :src="gf.picList[0].filePath">
		          </div>
		          <div class="act-col act-row-txts Fl">
		            <div class="act-row-txt-tit1">{{gf.title}}</div>
		            <div>
		              <b class="layui-icon layui-icon-time"></b>
		              <a-icon type="clock-circle" />{{gf.startTime}} 至 {{gf.endTime}}
		            </div>
		            <div>
		              <b class="layui-icon layui-icon-location"></b>
		              <a-icon type="environment" />{{gf.activeAddr}}
		            </div>
		          </div>
		          <div class="act-col act-row-sta Fr">
		            <!-- stu_img_01.jpg 01 进行中  02已结束-->
		            <img v-if="gf.state=='进行中'" src="@assets/stu_img_01.jpg">
		            <img v-if="gf.state=='已结束'" src="@assets/stu_img_02.jpg">
		          </div>
		        </div>
		        <div class="act-row act-row02" v-if="gf.picList&&gf.picList.length>1" @click="clickDetail(gf.id,'hd')" style="cursor:pointer;">
		          <div class="Fl" style="width: 664px;">
		            <div class="Clear">
		              <div class="act-col act-row-txts Fl">
		                <div class="act-row-txt-tit">{{gf.title}}</div>
		                <div>
		                  <b class="layui-icon layui-icon-time"></b>
		                  <a-icon type="clock-circle" />{{gf.startTime}} 至 {{gf.endTime}}
		                </div>
		                <div>
		                  <b class="layui-icon layui-icon-location"></b>
		                  <a-icon type="environment" />{{gf.activeAddr}}
		                </div>
		              </div>
		              <div class="act-col act-row-sta Fr">
		                <img v-if="gf.state=='进行中'" src="@assets/stu_img_01.jpg">
		                <img v-if="gf.state=='已结束'" src="@assets/stu_img_02.jpg">
		              </div>
		            </div>
		            <div class="act-row-imglist Clear">
		              <div v-if="index<3" class="act-col act-row-img Fl" v-for="(item, index) in gf.picList" :key="index" >
		                <img :src="item.filePath">
		              </div>
		            </div>
		          </div>
		        </div>
		      </li>
		      <li class="act-model-item Clear">
		        <span class="img-box Fl" @click="clickhd(kcId)">
		          <img src="@assets/act_04_img.jpg">
		        </span>
		        <div class="act-row act-row01 Clear" v-if="kc.picList&&kc.picList.length==1" @click="clickDetail(kc.id,'hd')" style="cursor:pointer;">
		          <div class="act-col act-row-img Fl">
		            <img :src="kc.picList[0].filePath">
		          </div>
		          <div class="act-col act-row-txts Fl">
		            <div class="act-row-txt-tit1">{{kc.title}}</div>
		            <div>
		              <b class="layui-icon layui-icon-time"></b>
		              <a-icon type="clock-circle" />{{kc.startTime}} 至 {{kc.endTime}}
		            </div>
		            <div>
		              <b class="layui-icon layui-icon-location"></b>
		              <a-icon type="environment" />{{kc.activeAddr}}
		            </div>
		          </div>
		          <div class="act-col act-row-sta Fr">
		            <!-- stu_img_01.jpg 01 进行中  02已结束-->
		            <img v-if="kc.state=='进行中'" src="@assets/stu_img_01.jpg">
		            <img v-if="gf.state=='已结束'" src="@assets/stu_img_02.jpg">
		          </div>
		        </div>
		        <div class="act-row act-row02" v-if="kc.picList&&kc.picList.length>1" @click="clickDetail(kc.id,'hd')" style="cursor:pointer;">
		          <div class="Fl" style="width: 664px;">
		            <div class="Clear">
		              <div class="act-col act-row-txts Fl">
		                <div class="act-row-txt-tit">{{kc.title}}</div>
		                <div>
		                  <b class="layui-icon layui-icon-time"></b>
		                  <a-icon type="clock-circle" />{{kc.startTime}} 至 {{kc.endTime}}
		                </div>
		                <div>
		                  <b class="layui-icon layui-icon-location"></b>
		                  <a-icon type="environment" />{{kc.activeAddr}}
		                </div>
		              </div>
		              <div class="act-col act-row-sta Fr">
		                <img v-if="kc.state=='进行中'" src="@assets/stu_img_01.jpg">
		                <img v-if="gf.state=='已结束'" src="@assets/stu_img_02.jpg">
		              </div>
		            </div>
		            <div class="act-row-imglist Clear">
		              <div v-if="index<3" class="act-col act-row-img Fl" v-for="(item, index) in kc.picList" :key="index" >
		                <img :src="item.filePath">
		              </div>
		            </div>
		          </div>
		        </div>
		      </li>
		      <li class="act-model-item Clear">
		        <span class="img-box Fl" @click="clickhd(lyId)">
		          <img src="@assets/act_05_img.jpg">
		        </span>
		        <div class="act-row act-row01 Clear" v-if="ly.picList&&ly.picList.length==1" @click="clickDetail(ly.id,'hd')" style="cursor:pointer;">
		          <div class="act-col act-row-img Fl">
		            <img :src="ly.picList[0].filePath">
		          </div>
		          <div class="act-col act-row-txts Fl">
		            <div class="act-row-txt-tit1">{{ly.title}}</div>
		            <div>
		              <b class="layui-icon layui-icon-time"></b>
		              <a-icon type="clock-circle" />{{ly.startTime}} 至 {{ly.endTime}}
		            </div>
		            <div>
		              <b class="layui-icon layui-icon-location"></b>
		              <a-icon type="environment" />{{ly.activeAddr}}
		            </div>
		          </div>
		          <div class="act-col act-row-sta Fr">
		            <!-- stu_img_01.jpg 01 进行中  02已结束-->
		            <img v-if="ly.state=='进行中'" src="@assets/stu_img_01.jpg">
		            <img v-if="gf.state=='已结束'" src="@assets/stu_img_02.jpg">
		          </div>
		        </div>
		        <div class="act-row act-row02" v-if="ly.picList&&ly.picList.length>1" @click="clickDetail(ly.id,'hd')" style="cursor:pointer;">
		          <div class="Fl" style="width: 664px;">
		            <div class="Clear">
		              <div class="act-col act-row-txts Fl">
		                <div class="act-row-txt-tit">{{ly.title}}</div>
		                <div>
		                  <b class="layui-icon layui-icon-time"></b>
		                  <a-icon type="clock-circle" />{{ly.startTime}} 至 {{ly.endTime}}
		                </div>
		                <div>
		                  <b class="layui-icon layui-icon-location"></b>
		                  <a-icon type="environment" />{{ly.activeAddr}}
		                </div>
		              </div>
		              <div class="act-col act-row-sta Fr">
		                <img v-if="ly.state=='进行中'" src="@assets/stu_img_01.jpg">
		                <img v-if="gf.state=='已结束'" src="@assets/stu_img_02.jpg">
		              </div>
		            </div>
		            <div class="act-row-imglist Clear">
		              <div v-if="index<3" class="act-col act-row-img Fl" v-for="(item, index) in ly.picList" :key="index" >
		                <img :src="item.filePath">
		              </div>
		            </div>
		          </div>
		        </div>
		      </li>
		    </ul>
		    <ul class="act-model-r Fr">
		      <li class="act-model-r-list r-list1">
		        <div class="act-left">
		          <div class="Clear act-left-t">
		            <div class="Clear act-left-d">
		              <dl class="act-r-th">
		                <dd class="th"><i class="tiao-icon"></i>公告栏</dd>
		                <dt>
                      <router-link target="_blank" to='/dashboard/HealthNoticList' class="act-r-more">
		                    <i class="layui-icon layui-icon-right" style="color: #e40002"></i>
		                    查看
		                  </router-link>
		                </dt>
		              </dl>
		              <ul class="r-list">
		                <li class="Clear" v-for="(item, index) in noticList" :key="index" @click="clickDetail(item.id,'ggl')" style="cursor:pointer;">
		                  <div class="act-list-tit Fl" :title="item.title"><i class="port red"></i> {{item.title}}</div>
		                  <div class="act-list-tim Fr">{{item.publishTime}}</div>
		                </li>
		              </ul>
		            </div>
		          </div>
		        </div>
		      </li>
		      <li class="act-model-r-list r-list2">
		        <div class="act-left">
		          <div class="Clear act-left-t">
		            <div class="Clear act-left-d">
		              <dl class="act-r-th">
		                <dd class="th"><i class="tiao-icon"></i>问答区</dd>
		                <dt>
                      <router-link target="_blank" to='/dashboard/HealthQuestionList' class="act-r-more">
                        <i class="layui-icon layui-icon-right" style="color: #e40002"></i>
                        查看
                      </router-link>
		                </dt>
		              </dl>
		              <ul class="r-list">
		                <li v-for="(item, index) in questionList" :key="index" @click="clickDetail(item.id,'wdq')" style="cursor:pointer">
		                  <div class="act-list-q">{{item.question}}</div>
		                  <div class="act-list-a" v-if="item.reply">{{item.reply}}</div>
		                </li>
		              </ul>
		            </div>
		          </div>
		        </div>
		      </li>
		    </ul>
		  </div>
		</div>
		<!-- 管理服务 -->
		<div class="manage-mod">
		  <div class="manage-con Center">
		    <div class="title-con">
		      <img src="@assets/ziyuan_title.jpg">
		    </div>
		    <ul class="manage-list Clear">
		      <li class="manage-item manage-item-01 Fl" style="line-height: 273px">
		        管理服务
		      </li>
		      <li class="manage-item Fl">
		        <a class="manage-item-a">
		          <div class="manage-item-img item-img-01"></div>
		          <div class="manage-item-txt">法律和知识<br/>产权服务</div>
		        </a>
		      </li>
		      <li class="manage-item Fl">
		        <a class="manage-item-a">
		          <div class="manage-item-img item-img-02"></div>
		          <div class="manage-item-txt">质量检验认证<br/>溯源服务</div>
		        </a>
		      </li>
		      <li class="manage-item Fl">
		        <a class="manage-item-a">
		          <div class="manage-item-img item-img-03"></div>
		          <div class="manage-item-txt" style="padding-top: 14px;">职业教育培训</div>
		        </a>
		      </li>
		      <li class="manage-item Fl">
		        <a class="manage-item-a">
		          <div class="manage-item-img item-img-04"></div>
		          <div class="manage-item-txt" style="padding-top: 14px;">市场与品牌共享</div>
		        </a>
		      </li>
		      <li class="manage-item Fl">
		        <a class="manage-item-a">
		          <div class="manage-item-img item-img-05"></div>
		          <div class="manage-item-txt" style="padding-top: 14px;">金融资本对接</div>
		        </a>
		      </li>
		      <li class="manage-item Fl">
		        <a class="manage-item-a">
		          <div class="manage-item-img item-img-06"></div>
		          <div class="manage-item-txt">国际合作及<br/>协同创新</div>
		        </a>
		      </li>
		    </ul>
		  </div>
		</div>
		<!-- 新闻信息 -->
		<ul class="Center textrow-mod Clear">
		  <li class="text-col Fl">
		    <div class="Clear text-left-t">
		      <div class="Clear text-left-d">
		        <dl class="text-tit-th">
		          <dd class="th">政策协调与服务</dd>
		          <dt>
		            <span @click="clickggzy(zcId)" class="text-tit-more">
		              · · ·
		            </span>
		          </dt>
		        </dl>
		        <ul class="r-list">
		          <li v-for="(item, index) in zc" :key="index" @click="clickDetail(item.id,'ggzy')" style="cursor:pointer;">
		            <div class="text-list-tit Fl text-over">{{item.title}}</div>
		            <div class="text-list-tim Fr">{{item.publishTime}}</div>
		          </li>
		        </ul>
		      </div>
		    </div>
		  </li>
		  <li class="text-col Fr">
		    <div class="Clear text-left-t">
		      <div class="Clear text-left-d">
		        <dl class="text-tit-th">
		          <dd class="th">国际交流与合作</dd>
		          <dt>
		            <span @click="clickggzy(gjId)" class="text-tit-more">
		              · · ·
		            </span>
		          </dt>
		        </dl>
		        <ul class="r-list">
              <li v-for="(item, index) in gj" :key="index" @click="clickDetail(item.id,'ggzy')" style="cursor:pointer;">
                <div class="text-list-tit Fl text-over">{{item.title}}</div>
                <div class="text-list-tim Fr">{{item.publishTime}}</div>
              </li>
		        </ul>
		      </div>
		    </div>
		  </li>
		  <li class="text-col Fl">
		    <div class="Clear text-left-t">
		      <div class="Clear text-left-d">
		        <dl class="text-tit-th">
		          <dd class="th">行业规范与协调</dd>
		          <dt>
		            <span @click="clickggzy(hygfId)" class="text-tit-more">
		              · · ·
		            </span>
		          </dt>
		        </dl>
		        <ul class="r-list">
              <li v-for="(item, index) in hygf" :key="index" @click="clickDetail(item.id,'ggzy')" style="cursor:pointer;">
                <div class="text-list-tit Fl text-over">{{item.title}}</div>
                <div class="text-list-tim Fr">{{item.publishTime}}</div>
              </li>
		        </ul>
		      </div>
		    </div>
		  </li>
		  <li class="text-col Fr">
		    <div class="Clear text-left-t">
		      <div class="Clear text-left-d">
		        <dl class="text-tit-th">
		          <dd class="th">行业分析与研究</dd>
		          <dt>
		            <span @click="clickggzy(hyfxId)" class="text-tit-more">
		              · · ·
		            </span>
		          </dt>
		        </dl>
		        <ul class="r-list">
              <li v-for="(item, index) in hyfx" :key="index" @click="clickDetail(item.id,'ggzy')" style="cursor:pointer;">
                <div class="text-list-tit Fl text-over">{{item.title}}</div>
                <div class="text-list-tim Fr">{{item.publishTime}}</div>
              </li>
		        </ul>
		      </div>
		    </div>
		  </li>
		</ul>
	</div>
</template>

<script>
	import "@/assets/less/base.css"
	import "@/assets/less/home.css"
	import {
		getAction,
		postAction
	} from '@/api/manage';
  import { mapActions } from "vuex"
  import { timeFix } from "@/utils/util"
  import Vue from "vue"
  import { USER_INFO} from "@/store/mutation-types"
  
	export default {
		name: "dashboard-analysis",
    inject:["reload"],
		data() {
			return {
        keyWord:'',//搜索相关
        rotationList:[],//轮播相关
        //信息圈相关
				newList:[],
        newPageNo:1,
        hotList:[],
        hotPageNo:1,
        recommendList:[],
        recommendPageNo:1,
        linkList:[],//友情链接相关
        noticList:[],//公告管理相关
        questionList:[],//问答区
        //公共资源相关
        zc:[],
        gj:[],
        hygf:[],
        hyfx:[],
        zcId:'',
        gjId:'',
        hygfId:'',
        hyfxId:'',
        //活动
        gy:[],
        zh:[],
        gf:[],
        kc:[],
        ly:[],
        gyId:'',
        zhId:'',
        gfId:'',
        kcId:'',
        lyId:'',
        //登录相关
        customActiveKey: "tab1",
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        requiredTwoStepCaptcha: false,
        stepCaptchaVisible: false,
        form: this.$form.createForm(this),
        encryptedString:{
          key:"",
          iv:"",
        },
        state: {
          time: 60,
          smsSendBtn: false,
        },
        validatorRules:{
          username:{rules: [{ required: true, message: '请输入用户名!'},{validator: this.handleUsernameOrEmail}]},
          password:{rules: [{ required: true, message: '请输入密码!',validator: 'click'}]},
          captcha:{rule: [{ required: true, message: '请输入验证码!'}]},
          inputCode:{rules: [{ required: true, message: '请输入验证码!'}]}
        },
        verifiedCode:"",
        inputCodeContent:"",
        inputCodeNull:true,
        currdatetime:'',
        randCodeImage:'',
        requestCodeSuccess:false,
        userInfo:null,
			}
		},
		created() {
      this.getRotationList()
      this.getnewList()
      this.gethotList()
      this.getrecommendList()
      this.getlinkList()
      this.getquestionList()
      this.getnoticList()
      this.getpubSourceList()
      this.getactiveList()
      
      this.currdatetime = new Date().getTime();
      this.handleChangeCheckCode();//初始化验证码
      const userInfo = Vue.ls.get(USER_INFO);
      this.userInfo = userInfo?userInfo:null
		},
		methods: {
      ...mapActions([ "Login", "Logout"]),
      //搜索
      searchContent(){
        if(this.keyWord==''){
          return
        }
        let word = encodeURI(this.keyWord)
        // this.$router.push({name:"search",params: {keyWord: word,}});
        let routeData = this.$router.resolve({name:"search",params: {keyWord: word,}});
        window.open(routeData.href, '_blank');
      },
      //进详情
      clickDetail(id,type){
        //this.$router.push({path: '/dashboard/HealthModal/'+id+'/'+type})
        let routeData = this.$router.resolve({path: '/dashboard/HealthModal/'+id+'/'+type});
        window.open(routeData.href, '_blank');
      },
      //进注册页
			clickRegister(){
				// this.$router.push({path: '/user/WebRegister'})
        let routeData = this.$router.resolve({path: '/user/WebRegister'});
        window.open(routeData.href, '_blank');
			},
      //轮播
      getRotationList() {
      	var url = '/health/healthRotationPic/list';
        let obj = {}
        obj.pageNo = 1
        obj.pageSize = 5
				obj.state = '1'
      	getAction(url,obj).then((res) => {
      		this.rotationList = res.result.records;
      	})
      },
      //信息圈
      getnewList() {
      	var url = '/health/healthInfoCircle/listV2';
        let obj = {}
        obj.type = 1
        obj.pageNo = this.newPageNo
        obj.pageSize = 3
      	getAction(url,obj).then((res) => {
          // debugger
      		this.newList = res.result.records;
          if(this.newPageNo<res.result.pages){
            this.newPageNo++
          }else{
            this.newPageNo = 1
          }
      	})
      },
      gethotList() {
      	var url = '/health/healthInfoCircle/listV2';
        let obj = {}
        obj.type = 2
        obj.pageNo = this.hotPageNo
        obj.pageSize = 3
      	getAction(url,obj).then((res) => {
      		this.hotList = res.result.records;
          if(this.hotPageNo<res.result.pages){
            this.hotPageNo++
          }else{
            this.hotPageNo = 1
          }
      	})
      },
      getrecommendList() {
      	var url = '/health/healthInfoCircle/listV2';
        let obj = {}
        obj.type = 3
        obj.pageNo = this.recommendPageNo
        obj.pageSize = 3
      	getAction(url,obj).then((res) => {
      		this.recommendList = res.result.records;
          if(this.recommendPageNo<res.result.pages){
            this.recommendPageNo++
          }else{
            this.recommendPageNo = 1
          }
      	})
      },
      //友情链接
      getlinkList() {
      	var url = '/health/healthLinks/list';
        let obj = {}
        obj.pageNo = 1
        obj.pageSize = 9
      	getAction(url,obj).then((res) => {
      		this.linkList = res.result.records;
      	})
      },
      //公告管理
      getnoticList() {
      	var url = '/health/healthNotic/list';
        let obj = {}
        obj.pageNo = 1
        obj.pageSize = 17
      	getAction(url,obj).then((res) => {
      		this.noticList = res.result.records;
      	})
      },
      //问答区
      getquestionList() {
      	var url = '/health/healthQuestion/list';
        let obj = {}
        obj.pageNo = 1
        obj.pageSize = 10
      	getAction(url,obj).then((res) => {
      		this.questionList = res.result.records;
      	})
      },
      //公共资源
      getpubSourceList() {
        let formData = {}
        formData.typeCode = 'ggzy'
        formData.pageNo = 1
        formData.pageSize = 100
        getAction('/health/healthTypeValue/list',formData).then((res) => {
          let arr = res.result.records
          let zc = ''
          let gj = ''
          let hygf = ''
          let hyfx = ''
          for(var i=0;i<arr.length;i++){
            if(arr[i].typeValue=='政策协调与服务'){
              zc = arr[i].id
              this.zcId = zc
            }
            if(arr[i].typeValue=='国际交流与合作'){
              gj = arr[i].id
              this.gjId = gj
            }
            if(arr[i].typeValue=='行业规范与协调'){
              hygf = arr[i].id
              this.hygfId = hygf
            }
            if(arr[i].typeValue=='行业分析与研究'){
              hyfx = arr[i].id
              this.hyfxId = hyfx
            }
          }
          
        	let obj = {}
        	obj.pageNo = 1
        	obj.pageSize = 5
        	obj.type = zc
        	getAction('/health/healthPubSource/list',obj).then((res1) => {
        		this.zc = res1.result.records;
        	})
          let objgj = {}
          objgj.pageNo = 1
          objgj.pageSize = 5
          objgj.type = gj
          getAction('/health/healthPubSource/list',objgj).then((res1) => {
          	this.gj = res1.result.records;
          })
          let objhygf = {}
          objhygf.pageNo = 1
          objhygf.pageSize = 5
          objhygf.type = hygf
          getAction('/health/healthPubSource/list',objhygf).then((res1) => {
          	this.hygf = res1.result.records;
          })
          let objhyfx = {}
          objhyfx.pageNo = 1
          objhyfx.pageSize = 5
          objhyfx.type = hyfx
          getAction('/health/healthPubSource/list',objhyfx).then((res1) => {
          	this.hyfx = res1.result.records;
          })
        })
      },
      clickggzy(type){
        let routeData = this.$router.resolve({path: '/dashboard/HealthPubSourceList/'+type});
        window.open(routeData.href, '_blank');
        //this.$router.push({path: '/dashboard/HealthPubSourceList/'+type})
      },
      //活动
      getactiveList() {
        let formData = {}
        formData.typeCode = 'hdlx'
        formData.pageNo = 1
        formData.pageSize = 100
        getAction('/health/healthTypeValue/list',formData).then((res) => {
          let arr = res.result.records
          let gy = ''
          let zh = ''
          let gf = ''
          let kc = ''
          let ly = ''
          for(var i=0;i<arr.length;i++){
            if(arr[i].typeValue=='公益'){
              gy = arr[i].id
              this.gyId = gy
            }
            if(arr[i].typeValue=='展会'){
              zh = arr[i].id
              this.zhId = zh
            }
            if(arr[i].typeValue=='高峰'){
              gf = arr[i].id
              this.gfId = gf
            }
            if(arr[i].typeValue=='考察'){
              kc = arr[i].id
              this.kcId = kc
            }
            if(arr[i].typeValue=='路演'){
              ly = arr[i].id
              this.lyId = ly
            }
          }
          
        	let obj = {}
        	obj.pageNo = 1
        	obj.pageSize = 1
        	obj.activeType = gy
        	getAction('/health/healthActive/list',obj).then((res1) => {
        		this.gy = res1.result.records[0];
        	})
          let objzh = {}
          objzh.pageNo = 1
          objzh.pageSize = 1
          objzh.activeType = zh
          getAction('/health/healthActive/list',objzh).then((res1) => {
          	this.zh = res1.result.records[0];
          })
          let objgf = {}
          objgf.pageNo = 1
          objgf.pageSize = 1
          objgf.activeType = gf
          getAction('/health/healthActive/list',objgf).then((res1) => {
          	this.gf = res1.result.records[0];
          })
          let objkc = {}
          objkc.pageNo = 1
          objkc.pageSize = 1
          objkc.activeType = kc
          getAction('/health/healthActive/list',objkc).then((res1) => {
          	this.kc = res1.result.records[0];
          })
          let objly = {}
          objly.pageNo = 1
          objly.pageSize = 1
          objly.activeType = ly
          getAction('/health/healthActive/list',objly).then((res1) => {
          	this.ly = res1.result.records[0];
          })
        })
      },
      clickhd(activeType){
        // this.$router.push({path: '/dashboard/HealthActiveList/'+activeType})
        let routeData = this.$router.resolve({path: '/dashboard/HealthActiveList/'+activeType});
        window.open(routeData.href, '_blank');
      },
      //登录
      handleChangeCheckCode(){
        this.currdatetime = new Date().getTime();
        getAction(`/sys/randomImage/${this.currdatetime}`).then(res=>{
          if(res.success){
            this.randCodeImage = res.result
            this.requestCodeSuccess=true
          }else{
            this.$message.error(res.message)
            this.requestCodeSuccess=false
          }
        }).catch(()=>{
          this.requestCodeSuccess=false
        })
      },
      loginSuccess () {
        // update-begin- author:sunjianlei --- date:20190812 --- for: 登录成功后不解除禁用按钮，防止多次点击
        // this.loginBtn = false
        // update-end- author:sunjianlei --- date:20190812 --- for: 登录成功后不解除禁用按钮，防止多次点击
        // this.$router.push({ name: "dashboard" })
        
        this.reload()
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`,
        });
      },
      cmsFailed(err){
        this.$notification[ 'error' ]({
          message: "登录失败",
          description:err,
          duration: 4,
        });
      },
      requestFailed (err) {
        this.$notification[ 'error' ]({
          message: '登录失败',
          description: ((err.response || {}).data || {}).message || err.message || "请求出现错误，请稍后再试",
          duration: 4,
        });
        this.loginBtn = false;
      },
      validateInputCode(rule,value,callback){
        if(!value || this.verifiedCode==this.inputCodeContent){
          callback();
        }else{
          callback("您输入的验证码不正确!");
        }
      },
      generateCode(value){
        this.verifiedCode = value.toLowerCase()
      },
      inputCodeChange(e){
        this.inputCodeContent = e.target.value
      },
      handleUsernameOrEmail (rule, value, callback) {
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (regex.test(value)) {
          this.loginType = 0
        } else {
          this.loginType = 1
        }
        callback()
      },
      handleSubmit () {
        let that = this
        let loginParams = {};
        that.loginBtn = true;
        // 使用账户密码登陆
        that.form.validateFields([ 'username', 'password','inputCode', 'rememberMe' ], { force: true }, (err, values) => {
          if (!err) {
            loginParams.username = values.username
            loginParams.password = values.password
            loginParams.remember_me = values.rememberMe
            loginParams.captcha = that.inputCodeContent
            loginParams.checkKey = that.currdatetime
            that.Login(loginParams).then((res) => {
              if(res.success){
                //console.log("登录参数",loginParams)
                that.loginSuccess()
              }else{
                that.requestFailed(res)
                that.Logout();
              }
            }).catch((err) => {
              that.requestFailed(err);
            });
          }else {
            that.loginBtn = false;
          }
        })
      },
 
    },
	}
</script>

<style lang="scss" scoped>
	.wrap {
		background: #fff;

		.topWrap {
			position: relative;
			.carouselimg {
				/*设置图片宽度和浏览器宽度一致*/
				width: 100%;
				height: inherit;
			}
		}
	}

	.top>>>.ant-carousel {
		width: 100%；
	}

	.top>>>.ant-carousel>>>.slick-slide {
		text-align: center;
		height: 420px;
		width: 100%;
		line-height: 160px;
		background: #364d79;
		overflow: hidden;
	}
  .ant-form-item{
    margin:0 0 5px !important;
  }
</style>
