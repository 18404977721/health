<template>
	<div class="wrap">
		<div class="topWrap">
			<!-- 登录 -->
			<!-- <div class="login-index-con Center Abs">
			  <div class="login-index-box Fr">
			    <div class="login-index">
			      <div class="login-face">
			        <div class=""></div>
			        <img src="@assets/login_off_img.png">
			        <p>登 录</p>
			      </div>
			      <div class="login-con">
							<ul>
							  <li>
									<input type="text" name="username" placeholder="请输入邮箱或手机号" autocomplete="off">
								</li>
							  <li><input type="password" name="password" required  placeholder="请输入8-18位数字和字母密码" autocomplete="off"></li>
							</ul>
							<div style="overflow:hidden;margin-bottom:10px;">
								<span style="float:left;">忘记密码 ?</span>
								<span style="float:right;cursor:pointer;" @click="clickRegister">注册</span>
							</div>
							<button type="submit" class="index-login-btn" >登录</button>
			      </div>
			    </div>
			  </div>
			</div> -->
			<!-- 轮播图 -->
			<a-carousel autoplay>
				<div v-for="(item, index) in rotationList" :key="index" style="height: 420px;overflow:hidden;"><img class="carouselimg" :src="item.picList[0].filePath" alt=""></div>
			</a-carousel>
		</div>
		<div class="container-index Center Clear">
		  <div class="input Fl">
		    <input type="text" placeholder="请输入要搜索的内容" autocomplete="off" id="search-input">
		    <div class="hot-list" id="hot-list"></div>
		  </div>
		  <div class="search Fr">搜 索</div>
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
		              <li v-for="(item, index) in newList" :key="index">
		                <div class="news-list-tit"><i class="port"></i> {{item.title}}</div>
		                <div class="news-list-txt"><span class="news-list-txt1">{{item.typeValue}}</span><span>阅读量:{{item.clientNum?item.clientNum:0}}人</span><span>主持人:{{item.createBy}}</span></div>
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
                  <li v-for="(item, index) in hotList" :key="index">
                    <div class="news-list-tit"><i class="port"></i> {{item.title}}</div>
                    <div class="news-list-txt"><span class="news-list-txt1">{{item.typeValue}}</span><span>阅读量:{{item.clientNum?item.clientNum:0}}人</span><span>主持人:{{item.createBy}}</span></div>
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
                  <li v-for="(item, index) in recommendList" :key="index">
                    <div class="news-list-tit"><i class="port"></i> {{item.title}}</div>
                    <div class="news-list-txt"><span class="news-list-txt1">{{item.typeValue}}</span><span>阅读量:{{item.clientNum?item.clientNum:0}}人</span><span>主持人:{{item.createBy}}</span></div>
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
		    <router-link to='/dashboard/HealthActiveList'>查看更多话题<span style="color: #f67f00;font-weight: bold;"><a-icon type="right" /></span></router-link>
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
		      <li class="act-model-item Clear" v-if="gy.picList.length!=0">
		        <a href="" class="img-box Fl">
		          <img src="@assets/act_01_img.jpg">
		        </a>
		        <div class="act-row act-row01 Clear" v-if="gy.picList.length==1">
		          <div class="act-col act-row-img Fl">
		            <img :src="gy.picList[0].filePath">
		          </div>
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
		            <!-- stu_img_01.jpg 01 进行中  02已结束-->
		            <img v-if="gy.state=='进行中'" src="@assets/stu_img_01.jpg">
		            <img else src="@assets/stu_img_02.jpg">
		          </div>
		        </div>
            <div class="act-row act-row02" v-if="gy.picList.length>1">
              <div class="Fl" style="width: 664px;">
                <a href="#">
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
                      <img else src="@assets/stu_img_02.jpg">
                    </div>
                  </div>
                  <div class="act-row-imglist Clear">
                    <div v-if="index<3" class="act-col act-row-img Fl" v-for="(item, index) in gy.picList" :key="index" >
                      <img :src="item.filePath">
                    </div>
                  </div>
                </a>
              </div>
            </div>
		      </li>
		      <li class="act-model-item Clear">
		        <a href="" class="img-box Fl">
		          <img src="@assets/act_02_img.jpg">
		        </a>
		        <div class="act-row act-row01 Clear" v-if="zh.picList.length==1">
		          <div class="act-col act-row-img Fl">
		            <img :src="zh.picList[0].filePath">
		          </div>
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
		            <!-- stu_img_01.jpg 01 进行中  02已结束-->
		            <img v-if="zh.state=='进行中'" src="@assets/stu_img_01.jpg">
		            <img else src="@assets/stu_img_02.jpg">
		          </div>
		        </div>
		        <div class="act-row act-row02" v-if="zh.picList.length>1">
		          <div class="Fl" style="width: 664px;">
		            <a href="#">
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
		                  <img else src="@assets/stu_img_02.jpg">
		                </div>
		              </div>
		              <div class="act-row-imglist Clear">
		                <div v-if="index<3" class="act-col act-row-img Fl" v-for="(item, index) in zh.picList" :key="index" >
		                  <img :src="item.filePath">
		                </div>
		              </div>
		            </a>
		          </div>
		        </div>
		      </li>
		      <li class="act-model-item Clear">
		        <a href="" class="img-box Fl">
		          <img src="@assets/act_03_img.jpg">
		        </a>
		        <div class="act-row act-row01 Clear" v-if="gf.picList.length==1">
		          <div class="act-col act-row-img Fl">
		            <img :src="gf.picList[0].filePath">
		          </div>
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
		            <!-- stu_img_01.jpg 01 进行中  02已结束-->
		            <img v-if="gf.state=='进行中'" src="@assets/stu_img_01.jpg">
		            <img else src="@assets/stu_img_02.jpg">
		          </div>
		        </div>
		        <div class="act-row act-row02" v-if="gf.picList.length>1">
		          <div class="Fl" style="width: 664px;">
		            <a href="#">
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
		                  <img else src="@assets/stu_img_02.jpg">
		                </div>
		              </div>
		              <div class="act-row-imglist Clear">
		                <div v-if="index<3" class="act-col act-row-img Fl" v-for="(item, index) in gf.picList" :key="index" >
		                  <img :src="item.filePath">
		                </div>
		              </div>
		            </a>
		          </div>
		        </div>
		      </li>
		      <li class="act-model-item Clear">
		        <a href="" class="img-box Fl">
		          <img src="@assets/act_04_img.jpg">
		        </a>
		        <div class="act-row act-row01 Clear" v-if="kc.picList.length==1">
		          <div class="act-col act-row-img Fl">
		            <img :src="kc.picList[0].filePath">
		          </div>
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
		            <!-- stu_img_01.jpg 01 进行中  02已结束-->
		            <img v-if="kc.state=='进行中'" src="@assets/stu_img_01.jpg">
		            <img else src="@assets/stu_img_02.jpg">
		          </div>
		        </div>
		        <div class="act-row act-row02" v-if="kc.picList.length>1">
		          <div class="Fl" style="width: 664px;">
		            <a href="#">
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
		                  <img else src="@assets/stu_img_02.jpg">
		                </div>
		              </div>
		              <div class="act-row-imglist Clear">
		                <div v-if="index<3" class="act-col act-row-img Fl" v-for="(item, index) in kc.picList" :key="index" >
		                  <img :src="item.filePath">
		                </div>
		              </div>
		            </a>
		          </div>
		        </div>
		      </li>
		      <li class="act-model-item Clear">
		        <a href="" class="img-box Fl">
		          <img src="@assets/act_05_img.jpg">
		        </a>
		        <div class="act-row act-row01 Clear" v-if="ly.picList.length==1">
		          <div class="act-col act-row-img Fl">
		            <img :src="ly.picList[0].filePath">
		          </div>
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
		            <!-- stu_img_01.jpg 01 进行中  02已结束-->
		            <img v-if="ly.state=='进行中'" src="@assets/stu_img_01.jpg">
		            <img else src="@assets/stu_img_02.jpg">
		          </div>
		        </div>
		        <div class="act-row act-row02" v-if="ly.picList.length>1">
		          <div class="Fl" style="width: 664px;">
		            <a href="#">
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
		                  <img else src="@assets/stu_img_02.jpg">
		                </div>
		              </div>
		              <div class="act-row-imglist Clear">
		                <div v-if="index<3" class="act-col act-row-img Fl" v-for="(item, index) in ly.picList" :key="index" >
		                  <img :src="item.filePath">
		                </div>
		              </div>
		            </a>
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
		                  <a href="html/news/index.html" class="act-r-more">
		                    <i class="layui-icon layui-icon-right" style="color: #e40002"></i>
		                    查看
		                  </a>
		                </dt>
		              </dl>
		              <ul class="r-list">
		                <li class="Clear" v-for="(item, index) in noticList" :key="index">
		                  <div class="act-list-tit Fl text-over"><i class="port red"></i> {{item.title}}</div>
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
		                  <a href="html/news/index.html" class="act-r-more">
		                    <i class="layui-icon layui-icon-right" style="color: #e40002"></i>
		                    查看
		                  </a>
		                </dt>
		              </dl>
		              <ul class="r-list">
		                <li v-for="(item, index) in questionList" :key="index">
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
		            <a href="html/news/index.html" class="text-tit-more">
		              · · ·
		            </a>
		          </dt>
		        </dl>
		        <ul class="r-list">
		          <li v-for="(item, index) in zc" :key="index">
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
		            <a href="html/news/index.html" class="text-tit-more">
		              · · ·
		            </a>
		          </dt>
		        </dl>
		        <ul class="r-list">
              <li v-for="(item, index) in gj" :key="index">
                <div class="text-list-tit Fl text-over">{{item.title}}</div>
                <div class="text-list-tim Fr">{{item.publishTime}}</div>
              </li>
		          
		          <!-- <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li> -->
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
		            <a href="html/news/index.html" class="text-tit-more">
		              · · ·
		            </a>
		          </dt>
		        </dl>
		        <ul class="r-list">
              <li v-for="(item, index) in hygf" :key="index">
                <div class="text-list-tit Fl text-over">{{item.title}}</div>
                <div class="text-list-tim Fr">{{item.publishTime}}</div>
              </li>
		          <!-- <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li> -->
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
		            <a href="html/news/index.html" class="text-tit-more">
		              · · ·
		            </a>
		          </dt>
		        </dl>
		        <ul class="r-list">
              <li v-for="(item, index) in hyfx" :key="index">
                <div class="text-list-tit Fl text-over">{{item.title}}</div>
                <div class="text-list-tim Fr">{{item.publishTime}}</div>
              </li>
		          <!-- <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li> -->
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
	export default {
		name: "dashboard-analysis",
		data() {
			return {
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
        //活动
        gy:[],
        zh:[],
        gf:[],
        kc:[],
        ly:[],
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
		},
		methods: {
			clickRegister(){
				this.$router.push({path: '/user/WebRegister'})
			},
      //轮播
      getRotationList() {
      	var url = '/health/healthRotationPic/list';
        let obj = {}
        obj.pageNo = 1
        obj.pageSize = 5
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
            }
            if(arr[i].typeValue=='国际交流与合作'){
              gj = arr[i].id
            }
            if(arr[i].typeValue=='行业规范与协调'){
              hygf = arr[i].id
            }
            if(arr[i].typeValue=='行业分析与研究'){
              hyfx = arr[i].id
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
            }
            if(arr[i].typeValue=='展会'){
              zh = arr[i].id
            }
            if(arr[i].typeValue=='高峰'){
              gf = arr[i].id
            }
            if(arr[i].typeValue=='考察'){
              kc = arr[i].id
            }
            if(arr[i].typeValue=='路演'){
              ly = arr[i].id
            }
          }
          
        	let obj = {}
        	obj.pageNo = 1
        	obj.pageSize = 1
        	obj.type = gy
        	getAction('/health/healthActive/list',obj).then((res1) => {
        		this.gy = res1.result.records[0];
        	})
          let objzh = {}
          objzh.pageNo = 1
          objzh.pageSize = 1
          objzh.type = zh
          getAction('/health/healthActive/list',objzh).then((res1) => {
          	this.zh = res1.result.records[0];
          })
          let objgf = {}
          objgf.pageNo = 1
          objgf.pageSize = 1
          objgf.type = gf
          getAction('/health/healthActive/list',objgf).then((res1) => {
          	this.gf = res1.result.records[0];
          })
          let objkc = {}
          objkc.pageNo = 1
          objkc.pageSize = 1
          objkc.type = kc
          getAction('/health/healthActive/list',objkc).then((res1) => {
          	this.kc = res1.result.records[0];
          })
          let objly = {}
          objly.pageNo = 1
          objly.pageSize = 1
          objly.type = ly
          getAction('/health/healthActive/list',objly).then((res1) => {
          	this.ly = res1.result.records[0];
          })
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
</style>
