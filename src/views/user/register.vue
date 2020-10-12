<template>
	<div class="wrap">
		<img src="@assets/tab.png" alt="" style="width:100%;margin:0 0 20px;">
		<a-radio-group v-model="value" @change="onChange">
		    <a-radio :style="radioStyle" :value="1">
		      我是企业用户
		    </a-radio>
		    <a-radio :style="radioStyle" :value="2">
		      我是个人用户
		    </a-radio>
		  </a-radio-group>
			<img src="@assets/step_yd.png" alt="" style="width:100%;margin:20px 0;">
		 <a-form :form="form" @submit="handleSubmit">
			<!-- 个人 -->
			<div v-if="value==2">
				<a-form-item
				  label="姓名"
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
			</div>
			<!-- 企业 -->
			<div v-if="value==1">
				<a-form-item
				  label="行业分类"
					v-bind="formItemLayout1"
				>
					<a-select
						v-decorator="[
							'gender',
							{ rules: [{ required: true, message: '请选择行业分类' }] },
						]"
					>
						<a-select-option value="male">
							male
						</a-select-option>
						<a-select-option value="female">
							female
						</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item
				  label="公司名称"
					v-bind="formItemLayout1"
				>
					<a-input
						v-decorator="['gsmc', { rules: [{ required: true, message: '请输入公司名称' }] }]"
					/>
				</a-form-item>
				<a-form-item
				  label="公司地址"
					v-bind="formItemLayout1"
				>
					<a-input
						v-decorator="['gsdz', { rules: [{ required: true, message: '请输入公司地址' }] }]"
					/>
				</a-form-item>
				<a-form-item
				  label="公司电话"
					v-bind="formItemLayout1"
				>
					<a-input
						v-decorator="['gsdh', { rules: [{ required: true, message: '请输入公司电话' }] }]"
					/>
				</a-form-item>
				<a-form-item
				  label="电子邮箱"
					v-bind="formItemLayout1"
				>
					<a-input
						v-decorator="['dzyx', { rules: [{ required: true, message: '请输入电子邮箱' }] }]"
					/>
				</a-form-item>
				<a-form-item
				  label="公司性质"
					v-bind="formItemLayout1"
				>
					<a-select
						v-decorator="[
							'gsxz',
							{ rules: [{ required: true, message: '请选择公司性质' }] },
						]"
					>
						<a-select-option value="male">
							male
						</a-select-option>
						<a-select-option value="female">
							female
						</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item
				  label="员工总数"
					v-bind="formItemLayout1"
				>
					<a-input
						v-decorator="['ygzs', { rules: [{ required: false, message: '请输入员工总数' }] }]"
					/>
				</a-form-item>
				<a-form-item
				  label="注册基金"
					v-bind="formItemLayout1"
				>
					<a-input
					  v-decorator="[
					    'taskCurrentMoney',
					    {rules: [{ required: true, message: '请输入注册基金' }],
					    }
					  ]"
					  addonAfter="万"/>
				</a-form-item>
				<a-form-item
				  label="联系人姓名"
					v-bind="formItemLayout1"
				>
					<a-input
						v-decorator="['xm', { rules: [{ required: true, message: '请输入联系人姓名' }] }]"
					/>
				</a-form-item>
				<a-form-item
				  label="个人住址"
					v-bind="formItemLayout1"
				>
					<a-cascader 
						:options="options"
						placeholder="请选择" 
						v-decorator="[
							'address1',
							{ rules: [{ required: true, message: '请选择个人住址' }] },
						]"
					/>
				</a-form-item>
				<a-form-item
					v-bind="formItemLayout1"
					label="联系人电话"
				>
					<a-row :gutter="8">
						<a-col :span="12" >
							<a-input
								v-decorator="[
									'captch1a',
									{ rules: [{ required: true, message: '请输入联系人电话' }] },
								]"
							/>
						</a-col>
						<a-col :span="4">
							<a-button>发送验证码</a-button>
						</a-col>
					</a-row>
				</a-form-item>
				<a-form-item
				  label="输入验证码"
					v-bind="formItemLayout1"
				>
					<a-input
						v-decorator="['note11', { rules: [{ required: true, message: '请输入验证码' }] }]"
					/>
				</a-form-item>
				<a-form-item
				  label="输入密码"
					v-bind="formItemLayout1"
				>
					<a-input
						v-decorator="['note21', { rules: [{ required: true, message: '请输入密码' }] }]"
					/>
				</a-form-item>
				<a-form-item
				  label="确认密码"
					v-bind="formItemLayout1"
				>
					<a-input
						v-decorator="['note3', { rules: [{ required: true, message: '请输入确认密码' }] }]"
					/>
				</a-form-item>
				<img src="@assets/dash.png" alt="" style="width:100%;margin:20px 0;">
				<p style="font-weight:bold;">营业执照信息</p>
				<a-form-item
				  label="法定代表人姓名"
					v-bind="formItemLayout2"
				>
					<a-input
						v-decorator="['note31', { rules: [{ required: true, message: '请输入法定代表人姓名' }] }]"
					/>
				</a-form-item>
				<a-form-item
				  label="身份证号"
					v-bind="formItemLayout2"
				>
					<a-input
						v-decorator="['note3d1', { rules: [{ required: true, message: '请输入身份证号' }] }]"
					/>
				</a-form-item>
				<a-form-item 
					v-bind="formItemLayout2" 
					label="法人身份证电子版"
				>
					<a-upload
						v-decorator="[
							'upload',
							{
								rules: [{ required: true, message: '请上传法人身份证电子版' }],
								valuePropName: 'fileList',
								getValueFromEvent: normFile,
							},
						]"
						name="logo"
						action="/upload.do"
						list-type="picture"
					>
						<a-button> <a-icon type="upload" /> 选择文件</a-button>
					</a-upload>
				</a-form-item>
				<a-form-item
					v-bind="formItemLayout2" 
					label="营业执照电子版"
				>
					<a-upload
						v-decorator="[
							'upload1',
							{
								rules: [{ required: true, message: '请上传营业执照电子版' }],
								valuePropName: 'fileList',
								getValueFromEvent: normFile,
							},
						]"
						name="logo"
						action="/upload.do"
						list-type="picture"
					>
						<a-button> <a-icon type="upload" /> 选择文件</a-button>
					</a-upload>
				</a-form-item>
				<a-form-item
					v-bind="formItemLayout2" 
					label=" "
				>
					<p style="background:#fffcf5;color:#e40005;font-size:12px;line-height:17px;">以上所需要上传电子版资质仅支持JPG、GIF、PNG格式的图片，大小不超过8M，请确保图片清晰，文字可辩并有清晰的红色公章</p>
				</a-form-item>
			</div>
			<a-radio v-model="readValue" @click="onReadChange" style="margin-top:10px;">我已阅读并同意<span style="color:#e40005;"><<大健康产业联盟>></span></a-radio>
			<a-form-item>
				<a-button type="primary" html-type="submit" style="width:100%;margin-top:30px;height:50px;">
					同意条款并提交
				</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script>
	import { getAction } from '@/api/manage';
	export default {
		name: "register",
		data() {
			return {
				form: this.$form.createForm(this),
				radioStyle: {
					height: '30px',
					lineHeight: '30px',
				},
				value:1,
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
				formItemLayout1: {
					labelCol: {
						xs: { span: 7,offset: 0 },
						sm: { span: 7,offset: 0 },
					},
					wrapperCol: {
						xs: { span: 16,offset: 1 },
						sm: { span: 16,offset: 1 },
					},
				},
				formItemLayout2: {
					labelCol: {
						xs: { span: 10,offset: 0 },
						sm: { span: 10,offset: 0 },
					},
					wrapperCol: {
						xs: { span: 13,offset: 1 },
						sm: { span: 13,offset: 1 },
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
			normFile(e) {
				console.log('Upload event:', e);
				if (Array.isArray(e)) {
					return e;
				}
				return e && e.fileList;
			},
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
		line-height:40px;
	}
</style>
