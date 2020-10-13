<template>
	<div class="wrap">
		<div class="top">
			<!-- 轮播图 -->
			<a-carousel autoplay>
				<div style="height: 420px;overflow:hidden;"><img class="carouselimg" src="@assets/banner_01.png" alt=""></div>
				<div style="height: 420px;overflow:hidden;"><img class="carouselimg" src="@assets/banner_01.png" alt=""></div>
			</a-carousel>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Homepage",
		data() {
			return {
				
			}
		},
		created() {

		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
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

		.top {
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
