<template>
	<div class="wrap">
		<a-radio-group v-model="value" @change="onChange">
		    <a-radio :style="radioStyle" :value="1">
		      我是企业用户
		    </a-radio>
		    <a-radio :style="radioStyle" :value="2">
		      我是个人用户
		    </a-radio>
		  </a-radio-group>
		 <a-form :form="form" @submit="handleSubmit">
			<a-form-item 
			  label="姓  名"
				v-bind="formItemLayout"
			>
				<a-input
					v-decorator="['note', { rules: [{ required: true, message: '请输入姓名' }] }]"
				/>
			</a-form-item>
			<a-form-item
				v-bind="formItemLayout"
				label="手机号"
			>
				<a-row :gutter="8">
					<a-col :span="13" >
						<a-input
							v-decorator="[
								'captcha',
								{ rules: [{ required: true, message: '请输入验证码' }] },
							]"
						/>
					</a-col>
					<a-col :span="5">
						<a-button>发送验证码</a-button>
					</a-col>
				</a-row>
			</a-form-item>
			<a-form-item
			  label="个人住址"
				v-bind="formItemLayout"
			>
				<a-cascader 
					:options="options"
					placeholder="请选择" 
					v-decorator="[
						'address',
						{ rules: [{ required: true, message: '请选择个人住址' }] },
					]"
				/>
			</a-form-item>
			<a-form-item
			  label="验证码"
				v-bind="formItemLayout"
			>
				<a-input
					v-decorator="['note1', { rules: [{ required: true, message: '请输入验证码' }] }]"
				/>
			</a-form-item>
			<a-form-item
			  label="密码"
				v-bind="formItemLayout"
			>
				<a-input
					v-decorator="['note2', { rules: [{ required: true, message: '请输入密码' }] }]"
				/>
			</a-form-item>
			<a-form-item
			  label="确认密码"
				v-bind="formItemLayout"
			>
				<a-input
					v-decorator="['note3', { rules: [{ required: true, message: '请输入确认密码' }] }]"
				/>
			</a-form-item>
			<a-form-item
			  label="认证邀请"
				v-bind="formItemLayout"
			>
				<a-input
					placeholder="请输入您的推荐人的注册手机号"
					v-decorator="['note3', { rules: [{ required: false, message: '请输入您的推荐人的注册手机号' }] }]"
				/>
			</a-form-item>
			<a-radio v-model="readValue" @click="onReadChange">我已阅读并同意<<大健康产业联盟>></a-radio>
			<a-form-item>
				<a-button type="primary" html-type="submit" style="width:100%;">
					同意条款并提交
				</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script>

	export default {
		name: "register",
		data() {
			return {
				form: this.$form.createForm(this),
				radioStyle: {
					height: '30px',
					lineHeight: '30px',
				},
				value:2,
				readValue:false,
				formItemLayout: {
					labelCol: {
						xs: { span: 6,offset: 0 },
						sm: { span: 6,offset: 0 },
					},
					wrapperCol: {
						xs: { span: 17,offset: 1 },
						sm: { span: 17,offset: 1 },
					},
				},
				options: [
					{
						value: 'zhejiang',
						label: 'Zhejiang',
						children: [
							{
								value: 'hangzhou',
								label: 'Hangzhou',
								children: [
									{
										value: 'xihu',
										label: 'West Lake',
									},
								],
							},
						],
					},
					{
						value: 'jiangsu',
						label: 'Jiangsu',
						children: [
							{
								value: 'nanjing',
								label: 'Nanjing',
								children: [
									{
										value: 'zhonghuamen',
										label: 'Zhong Hua Men',
									},
								],
							},
						],
					},
				],
			}
		},
		created() {
			
		},
		methods: {
			onReadChange(e) {
				this.readValue = !this.readValue 
				console.log('radio checked', this.readValue);
			},
			onChange(e) {
				console.log('radio checked', e.target.value);
			},
			// 提交数据
			handleSubmit (e) {
			  var that = this;
			  e.preventDefault()
			  this.form.validateFields((err, values) => {
			    if (!err) {
			      // that.confirmLoading = true;
			      // let obj =[];
			      // let params = {};
			      // params = values
			      // if(values.attachmentList){
			      //   let attach = values.attachmentList;
			      //   for(let j=0;j<attach.length;j++){
			      //     if(attach[j].status != 'done'){
			      //       attach.splice(j,1)
			      //     }else{
			      //       attach[j].url = attach[j].response.message;
			      //     }
			      //   }
			      //   params.attachmentList = attach;
			      // }
			      // obj.push(params)
			      // let url = "/task/work/add";//重点工作新增
			      // postAction(url,obj).then((res) => {
			      //   if (res.success) {
			      //     this.$notification['success']({
			      //       message: res.message,
			      //       description: ''
			      //     })
			      //     this.form.resetFields();
			      //   }else{
			      //     this.$notification['error']({
			      //       message: res.message,
			      //       description: ''
			      //     })
			      //   }
			      // }).finally(() => {
			      //   that.confirmLoading = false;
			      //   that.$emit('pageReload');
			      //   that.close();
			      // })
			    }
			  })
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
		padding:20px;
	}
	.ant-form >>> .ant-form-item-label {
	    text-align: right;
		line-height:none;
	}
</style>
