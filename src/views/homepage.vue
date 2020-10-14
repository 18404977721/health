<template>
	<div class="wrap">
		<div class="topWrap">
			<!-- 登录 -->
			<div class="login-index-con Center Abs">
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
			</div>
			<!-- 轮播图 -->
			<a-carousel autoplay>
				<div style="height: 420px;overflow:hidden;"><img class="carouselimg" src="@assets/banner_01.png" alt=""></div>
				<div style="height: 420px;overflow:hidden;"><img class="carouselimg" src="@assets/banner_01.png" alt=""></div>
			</a-carousel>
		</div>
		<div class="container Center Clear">
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
		              <dt><a href="html/news/index.html" class="r_more">换一换</a></dt>
		            </dl>
		            <ul class="r-list">
		              <li>
		                <a href="#123" target="_blank">
		                  <div class="news-list-tit"><i class="port"></i> 吉商峰会</div>
		                  <div class="news-list-txt"><span class="news-list-txt1">峰会</span><span>阅读量:14.5万人</span><span>主持人:里斯本</span></div>
		                </a>
		              </li>
		              <li>
		                <a href="#123" target="_blank">
		                  <div class="news-list-tit"><i class="port"></i> 吉商峰会</div>
		                  <div class="news-list-txt"><span class="news-list-txt1">峰会</span><span>阅读量:14.5万人</span><span>主持人:里斯本</span></div>
		                </a>
		              </li>
		              <li>
		                <a href="#123" target="_blank">
		                  <div class="news-list-tit"><i class="port"></i> 吉商峰会</div>
		                  <div class="news-list-txt"><span class="news-list-txt1">峰会</span><span>阅读量:14.5万人</span><span>主持人:里斯本</span></div>
		                </a>
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
		              <dt><a href="html/news/index.html" class="r_more">换一换</a></dt>
		            </dl>
		            <ul class="r-list">
		              <li>
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
		              </li>
		              <li>
		                <a href="#123" target="_blank">
		                  <div class="news-list-tit"><i class="port"></i> 吉商峰会</div>
		                  <div class="news-list-txt"><span class="news-list-txt2">峰会</span><span>阅读量:14.5万人</span><span>主持人:里斯本</span></div>
		                </a>
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
		              <dd class="th">推荐话题</dd>
		              <dt><a href="html/news/index.html" class="r_more">换一换</a></dt>
		            </dl>
		            <ul class="r-list">
		              <li>
		                <a href="#123" target="_blank">
		                  <div class="news-list-tit"><i class="port"></i> 吉商峰会</div>
		                  <div class="news-list-txt"><span class="news-list-txt1">峰会</span><span>阅读量:14.5万人</span><span>主持人:里斯本</span></div>
		                </a>
		              </li>
		              <li>
		                <a href="#123" target="_blank">
		                  <div class="news-list-tit"><i class="port"></i> 吉商峰会</div>
		                  <div class="news-list-txt"><span class="news-list-txt3">峰会</span><span>阅读量:14.5万人</span><span>主持人:里斯本</span></div>
		                </a>
		              </li>
		              <li>
		                <a href="#123" target="_blank">
		                  <div class="news-list-tit"><i class="port"></i> 吉商峰会</div>
		                  <div class="news-list-txt"><span class="news-list-txt1">峰会</span><span>阅读量:14.5万人</span><span>主持人:里斯本</span></div>
		                </a>
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
		              <a class="Fl friend-link-item">
		                <img src="@assets/news_link.jpg">
		              </a>
		              <a class="Fl friend-link-item">
		                <img src="@assets/news_link.jpg">
		              </a>
		              <a class="Fl friend-link-item">
		                <img src="@assets/news_link.jpg">
		              </a>
		              <a class="Fl friend-link-item">
		                <img src="@assets/news_link.jpg">
		              </a>
		              <a class="Fl friend-link-item">
		                <img src="@assets/news_link.jpg">
		              </a>
		              <a class="Fl friend-link-item">
		                <img src="@assets/news_link.jpg">
		              </a>
		              <a class="Fl friend-link-item">
		                <img src="@assets/news_link.jpg">
		              </a>
		              <a class="Fl friend-link-item">
		                <img src="@assets/news_link.jpg">
		              </a>
		              <a class="Fl friend-link-item">
		                <img src="@assets/news_link.jpg">
		              </a>
		            </div>
		          </div>
		        </div>
		      </div>
		    </li>
		  </ul>
		  <div class="more-s">
		    <a href="#">查看更多话题<span style="color: #f67f00;font-weight: bold;"> <i class="layui-icon layui-icon-right"></i></span></a>
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
		      <li class="act-model-item Clear">
		        <a href="#act" class="img-box Fl">
		          <img src="@assets/act_01_img.jpg">
		        </a>
		        <div class="act-row act-row01 Clear">
		          <a href="#">
		            <div class="act-col act-row-img Fl">
		              <img src="@assets/dome1.jpg">
		            </div>
		            <div class="act-col act-row-txts Fl">
		              <div class="act-row-txt-tit">助学梦, 造未来公益项目</div>
		              <div>
		                <b class="layui-icon layui-icon-time"></b>
		                2020年8月8日 置 2020年8月10日
		              </div>
		              <div>
		                <b class="layui-icon layui-icon-location"></b>
		                长春
		              </div>
		            </div>
		            <div class="act-col act-row-sta Fr">
		              <!-- stu_img_01.jpg 01 进行中  02已结束-->
		              <img src="@assets/stu_img_01.jpg">
		            </div>
		          </a>
		        </div>
		      </li>
		      <li class="act-model-item Clear">
		        <a href="#act" class="img-box Fl">
		          <img src="@assets/act_02_img.jpg">
		        </a>
		        <div class="act-row act-row02">
		          <div class="Fl" style="width: 664px;">
		            <a href="#">
		              <div class="Clear">
		                <div class="act-col act-row-txts Fl">
		                  <div class="act-row-txt-tit">助学梦, 造未来公益项目</div>
		                  <div>
		                    <b class="layui-icon layui-icon-time"></b>
		                    2020年8月8日 置 2020年8月10日
		                  </div>
		                  <div>
		                    <b class="layui-icon layui-icon-location"></b>
		                    长春
		                  </div>
		                </div>
		                <div class="act-col act-row-sta Fr">
		                  <img src="@assets/stu_img_01.jpg">
		                </div>
		              </div>
		              <div class="act-row-imglist Clear">
		                <div class="act-col act-row-img Fl">
		                  <img src="@assets/dome2.jpg">
		                </div>
		                <div class="act-col act-row-img Fl">
		                  <img src="@assets/dome2.jpg">
		                </div>
		                <div class="act-col act-row-img Fl">
		                  <img src="@assets/dome2.jpg">
		                </div>
		              </div>
		            </a>
		          </div>
		        </div>
		      </li>
		      <li class="act-model-item Clear">
		        <a href="#act" class="img-box Fl">
		          <img src="@assets/act_03_img.jpg">
		        </a>
		        <div class="act-row act-row02">
		          <div class="Fl" style="width: 664px;">
		            <a href="#">
		              <div class="Clear">
		                <div class="act-col act-row-txts Fl">
		                  <div class="act-row-txt-tit">助学梦, 造未来公益项目</div>
		                  <div>
		                    <b class="layui-icon layui-icon-time"></b>
		                    2020年8月8日 置 2020年8月10日
		                  </div>
		                  <div>
		                    <b class="layui-icon layui-icon-location"></b>
		                    长春
		                  </div>
		                </div>
		                <div class="act-col act-row-sta Fr">
		                  <img src="@assets/stu_img_01.jpg">
		                </div>
		              </div>
		              <div class="act-row-imglist Clear">
		                <div class="act-col act-row-img Fl">
		                  <img src="@assets/dome2.jpg">
		                </div>
		                <div class="act-col act-row-img Fl">
		                  <img src="@assets/dome2.jpg">
		                </div>
		                <div class="act-col act-row-img Fl">
		                  <img src="@assets/dome2.jpg">
		                </div>
		              </div>
		            </a>
		          </div>
		        </div>
		      </li>
		      <li class="act-model-item Clear">
		        <a href="#act" class="img-box Fl">
		          <img src="@assets/act_04_img.jpg">
		        </a>
		        <div class="act-row act-row01 Clear">
		          <a href="#">
		            <div class="act-col act-row-img Fl">
		              <img src="@assets/dome1.jpg">
		            </div>
		            <div class="act-col act-row-txts Fl">
		              <div class="act-row-txt-tit">助学梦, 造未来公益项目</div>
		              <div>
		                <b class="layui-icon layui-icon-time"></b>
		                2020年8月8日 置 2020年8月10日
		              </div>
		              <div>
		                <b class="layui-icon layui-icon-location"></b>
		                长春
		              </div>
		            </div>
		            <div class="act-col act-row-sta Fr">
		              <img src="@assets/stu_img_02.jpg">
		            </div>
		          </a>
		        </div>
		      </li>
		      <li class="act-model-item Clear">
		        <a href="#act" class="img-box Fl">
		          <img src="@assets/act_03_img.jpg">
		        </a>
		        <div class="act-row act-row02">
		          <div class="Fl" style="width: 664px;">
		            <a href="#">
		              <div class="Clear">
		                <div class="act-col act-row-txts Fl">
		                  <div class="act-row-txt-tit">助学梦, 造未来公益项目</div>
		                  <div>
		                    <b class="layui-icon layui-icon-time"></b>
		                    2020年8月8日 置 2020年8月10日
		                  </div>
		                  <div>
		                    <b class="layui-icon layui-icon-location"></b>
		                    长春
		                  </div>
		                </div>
		                <div class="act-col act-row-sta Fr">
		                  <img src="@assets/stu_img_01.jpg">
		                </div>
		              </div>
		              <div class="act-row-imglist Clear">
		                <div class="act-col act-row-img Fl">
		                  <img src="@assets/dome2.jpg">
		                </div>
		                <div class="act-col act-row-img Fl">
		                  <img src="@assets/dome2.jpg">
		                </div>
		                <div class="act-col act-row-img Fl">
		                  <img src="@assets/dome2.jpg">
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
		                <li>
		                  <a href="#123" target="_blank" class="Clear">
		                    <div class="act-list-tit Fl text-over"><i class="port red"></i> 吉商阿萨德阿萨德阿萨德发峰会</div>
		                    <div class="act-list-tim Fr">2017-02-08</div>
		                  </a>
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
		                <li>
		                  <a href="#123" target="_blank">
		                    <div class="act-list-q">吉商峰会吉商峰会吉商峰会吉商峰会吉商峰会吉商峰会吉商峰会吉商峰会</div>
		                    <div class="act-list-a">吉商峰会吉商峰会吉商峰会吉商峰会吉商峰会吉商峰会吉商峰会吉商峰会</div>
		                  </a>
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
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
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
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
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
		            <a href="html/news/index.html" class="text-tit-more">
		              · · ·
		            </a>
		          </dt>
		        </dl>
		        <ul class="r-list">
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
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
		            <a href="html/news/index.html" class="text-tit-more">
		              · · ·
		            </a>
		          </dt>
		        </dl>
		        <ul class="r-list">
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		          <li>
		            <a href="#123" target="_blank" class="Clear">
		              <div class="text-list-tit Fl text-over">吉商阿萨德阿萨德阿萨德发峰会</div>
		              <div class="text-list-tim Fr">2017-02-08</div>
		            </a>
		          </li>
		        </ul>
		      </div>
		    </div>
		  </li>
		</ul>

	</div>
</template>

<script>
	// import "@/assets/less/layui.css"
	import "@/assets/less/base.css"
	import "@/assets/less/home.css"
	
	export default {
		name: "Homepage",
		data() {
			return {
				
			}
		},
		created() {

		},
		methods: {
			clickRegister(){
				this.$router.push({path: '/user/WebRegister'})
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
