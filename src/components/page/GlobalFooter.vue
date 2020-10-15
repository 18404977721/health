<template>
  <div class="footer">
    <div class="footer-mod">
      <div class="footer-com Center">
        <ul class="footer-top-con Clear">
          <li class="footer-top-item Fl" style="padding-right:30px">
            <div class="footer-logo"></div>
            <p class="footer-tit">大健康产业联盟</p>
            <img src="@assets/er_img.png">
          </li>
          <li class="footer-top-item Fl">
            <ul>
              <li class="footer-top-lif">公共资源</li>
              <li><a href="#foo">需求库</a></li>
              <li><a href="#foo">供给库</a></li>
              <li><a href="#foo">人脉</a></li>
              <li><a href="#foo">行业资讯</a></li>
              <li><a href="#foo">行业动态</a></li>
            </ul>
          </li>
          <li class="footer-top-item Fl">
            <ul>
              <li class="footer-top-lif">活动</li>
              <li><a href="#foo">公益</a></li>
              <li><a href="#foo">展会</a></li>
              <li><a href="#foo">高峰</a></li>
              <li><a href="#foo">考察</a></li>
              <li><a href="#foo">路演</a></li>
            </ul>
          </li>
          <li class="footer-top-item Fl">
            <ul>
              <li class="footer-top-lif">会员中心</li>
              <li><a href="#foo">会员注册</a></li>
              <li><a href="#foo">会员须知</a></li>
              <li><a href="#foo">会员服务</a></li>
            </ul>
          </li>
          <li class="footer-top-item Fl" style="width: 200px;">
            <ul>
              <li class="footer-top-lif">关于我们</li>
              <li><a href="#foo">大健康产业联盟介绍</a></li>
              <li><a href="#foo">联系我们</a></li>
              <li><a href="#foo">意见反馈</a></li>
            </ul>
          </li>
        </ul>
        <div class="link-txt Bold">友情链接</div>
        <ul class="footer-btm-con Clear">
          <li>
            <span class="Bold">政府部门</span>
            <a href="123#" target="_blank">长春市政府网站</a>
            <a href="123#" target="_blank">长春市中小企业电商平台</a>
            <a href="123#" target="_blank">长春市企业服务中心</a>
            <a href="123#" target="_blank">长春市政府网站</a>
          </li>
          <li>
            <span class="Bold">会员单位</span>
            <a href="123#" target="_blank">东北制药集团股份有限公司</a>
            <a href="123#" target="_blank">中国医药健康产业股份有限公司</a>
            <a href="123#" target="_blank">中国北京同仁堂 ( 集团 ) 有限责任公司</a>
            <a href="123#" target="_blank">中国科学器材有限公司</a>
          </li>
          <li>
            <span class="Bold">国际机构</span>
            <a href="123#" target="_blank">欧洲药品质量管理局EDQM</a>
            <a href="123#" target="_blank">美国药监局FDA</a>
            <a href="123#" target="_blank">全球基金</a>
            <a href="123#" target="_blank">联合国人口基金会</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
	import "@/assets/less/base.css"
	import "@/assets/less/home.css"
  export default {
    name: "LayoutFooter"
  }
</script>

<style lang="scss" scoped>
  .footer {

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, .45);

        &:hover {
          color: rgba(0, 0, 0, .65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
  }
</style>