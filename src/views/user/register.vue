<template>
	<div style="width:100%;margin:0;background:#fff;padding:120px 0 50px;">
		<div class="wrap">
			<img src="@assets/tab_web.png" alt="" style="width:804px;height:106px;position:absolute;top:-88px;left:50%;margin-left:-402px;">
			<a-radio-group v-model="userType">
				<a-radio :style="radioStyle" :value="1">
					我是企业用户
				</a-radio>
				<a-radio :style="radioStyle" :value="0">
					我是个人用户
				</a-radio>
			</a-radio-group>
			<img src="@assets/step.png" alt="" style="width:100%;margin:20px 0;">
			<div style="border-top:1px solid #959595;position:relative;width:290px;margin:20px auto;"><span style="display:inline-block;width:90px;height:20px;text-align:center;line-height:20px;position:absolute;top:-13px;left:50%;margin-left:-45px;background:#fff;color:#959595;">{{userType==0?'个人用户':'企业用户'}}</span></div>
			<a-form :form="form" @submit="handleSubmit">
				<!-- 个人 -->
				<div v-if="userType==0">
					<a-form-item label="姓名" v-bind="formItemLayout">
						<a-input v-decorator="['username', { rules: [{ required: true, message: '请输入姓名' }] }]" />
					</a-form-item>
          <a-form-item label="账号" v-bind="formItemLayout">
          	<a-input v-decorator="['workNo', { rules: [{ required: true, message: '请输入账号' }] }]" />
          </a-form-item>
					<a-form-item v-bind="formItemLayout" label="手机号">
						<a-row :gutter="8">
							<a-col :span="13">
								<a-input v-model="phone" v-decorator="[
										'phone',
										{ rules: [{ required: true, message: '请输入正确的手机号码' ,pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/}] },
									]" />
							</a-col>
							<a-col :span="5">
								<a-button @click="getSms">发送验证码</a-button>
							</a-col>
						</a-row>
					</a-form-item>
					<a-form-item label="个人住址" v-bind="formItemLayout">
						<a-input
							v-decorator="['userRegion', { rules: [{ required: true, message: '请输入个人住址' }] }]"
						/>
					</a-form-item>
					<a-form-item label="验证码" v-bind="formItemLayout">
						<a-input v-decorator="['code', { rules: [{ required: true, message: '请输入验证码' }] }]" />
					</a-form-item>
					<a-form-item label="密码" v-bind="formItemLayout">
						<a-input v-model="password" v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]" />
					</a-form-item>
					<a-form-item label="确认密码" v-bind="formItemLayout">
						<a-input v-model="password1" @blur="inputBlur('个人')" v-decorator="['password1', { rules: [{ required: true, message: '请输入确认密码' }] }]" />
					</a-form-item>
					<a-form-item label="认证邀请" v-bind="formItemLayout">
						<a-input placeholder="请输入您的推荐人的注册手机号" v-decorator="[
								'recommend',
								{ rules: [{ required: false, message: '请输入正确的手机号码' ,pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/}] },
							]" />
					</a-form-item>
				</div>
				<!-- 企业 -->
				<div v-if="userType==1">
					<a-form-item label="行业分类" v-bind="formItemLayout1">
						<a-cascader :options="industryTypeOption" placeholder="请选择" v-decorator="[
								'industryClass',
								{ rules: [{ required: true, message: '请选择行业分类' }] },
							]" />
					</a-form-item>
					<a-form-item label="公司名称" v-bind="formItemLayout1">
						<a-input v-decorator="['businessName', { rules: [{ required: true, message: '请输入公司名称' }] }]" />
					</a-form-item>
					<a-form-item label="公司地址" v-bind="formItemLayout1">
						<a-input v-decorator="['businessAddr', { rules: [{ required: true, message: '请输入公司地址' }] }]" />
					</a-form-item>
					<a-form-item label="公司电话" v-bind="formItemLayout1">
						<a-input v-decorator="[
								'businessPhone',
								{ rules: [{ required: true, message: '请输入公司电话' }] },
							]" />
					</a-form-item>
					<a-form-item label="电子邮箱" v-bind="formItemLayout1">
						<a-input v-decorator="['businessEmail', { rules: [{ required: true, message: '请输入电子邮箱' }] }]" />
					</a-form-item>
					<a-form-item label="公司性质" v-bind="formItemLayout1">
						<a-select v-decorator="[
								'businessNature',
								{ rules: [{ required: true, message: '请选择公司性质' }] },
							]">
							<template v-for="item in queryList">
								<a-select-option :value="item.key">{{item.value}}</a-select-option>
							</template>
						</a-select>
					</a-form-item>
					<a-form-item label="员工总数" v-bind="formItemLayout1">
						<a-input v-decorator="['businessNum', { rules: [{ required: false, message: '请输入员工总数' }] }]" />
					</a-form-item>
					<a-form-item label="注册基金" v-bind="formItemLayout1">
						<a-input v-decorator="[
						    'businessAccount',
						    {rules: [{ required: true, message: '请输入注册基金' }],
						    }
						  ]"
						 addonAfter="万" />
					</a-form-item>
					<a-form-item label="联系人姓名" v-bind="formItemLayout1">
						<a-input v-decorator="['usernameQy', { rules: [{ required: true, message: '请输入联系人姓名' }] }]" />
					</a-form-item>
          <a-form-item label="账号" v-bind="formItemLayout">
          	<a-input v-decorator="['workNoQy', { rules: [{ required: true, message: '请输入账号' }] }]" />
          </a-form-item>
					<a-form-item label="个人住址" v-bind="formItemLayout1">
						<a-input
							v-decorator="['userRegionQy', { rules: [{ required: true, message: '请输入个人住址' }] }]"
						/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout1" label="联系人电话">
						<a-row :gutter="8">
							<a-col :span="12">
								<a-input v-model="phoneQy" v-decorator="[
										'phoneQy',
										{ rules: [{ required: true, message: '请输入联系人电话' ,pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/}] },
									]" />
							</a-col>
							<a-col :span="4">
								<a-button @click="getSms()">发送验证码</a-button>
							</a-col>
						</a-row>
					</a-form-item>
					<a-form-item label="输入验证码" v-bind="formItemLayout1">
						<a-input v-decorator="['codeQy', { rules: [{ required: true, message: '请输入验证码' }] }]" />
					</a-form-item>
					<a-form-item label="输入密码" v-bind="formItemLayout1">
						<a-input v-model="passwordQy" v-decorator="['passwordQy', { rules: [{ required: true, message: '请输入密码' }] }]" />
					</a-form-item>
					<a-form-item label="确认密码" v-bind="formItemLayout1">
						<a-input v-model="password1Qy" @blur="inputBlur('企业')" v-decorator="['password1Qy', { rules: [{ required: true, message: '请输入确认密码' }] }]" />
					</a-form-item>
					<img src="@assets/dash.png" alt="" style="width:100%;margin:20px 0;">
					<p style="font-weight:bold;">营业执照信息</p>
					<a-form-item label="法定代表人姓名" v-bind="formItemLayout1">
						<a-input v-decorator="['businessLegalName', { rules: [{ required: true, message: '请输入法定代表人姓名' }] }]" />
					</a-form-item>
					<a-form-item label="身份证号" v-bind="formItemLayout1">
						<a-input v-decorator="['businessLegalCard', { rules: [{ required: true, message: '请输入身份证号' }] }]" />
					</a-form-item>
					<a-form-item v-bind="formItemLayout1" label="法人身份证电子版">
						<a-upload v-decorator="[
								'attachmentList',
								{
									rules: [{ required: true, message: '请上传法人身份证电子版' }],
									valuePropName: 'fileList',
									getValueFromEvent: normFile,
								},
							]"
						 name="logo" action="/jeecg-boot/sys/file/upload" list-type="picture">
							<a-button>
								<a-icon type="upload" /> 选择文件</a-button>
						</a-upload>
					</a-form-item>
					<a-form-item v-bind="formItemLayout1" label="营业执照电子版">
						<a-upload v-decorator="[
								'attachmentList1',
								{
									rules: [{ required: true, message: '请上传营业执照电子版' }],
									valuePropName: 'fileList',
									getValueFromEvent: normFile,
								},
							]"
						 name="logo" action="/jeecg-boot/sys/file/upload" list-type="picture">
							<a-button>
								<a-icon type="upload" /> 选择文件</a-button>
						</a-upload>
					</a-form-item>


					<a-form-item 
					  :label-col="{ span: 10 }" :wrapper-col="{ span: 20 }"
					  label="">
						<p style="background:#fffcf5;color:#e40005;font-size:12px;line-height:17px;margin-left:244px;">以上所需要上传电子版资质仅支持JPG、GIF、PNG格式的图片，大小不超过8M，请确保图片清晰，文字可辩并有清晰的红色公章</p>
					</a-form-item>
				</div>
				<a-radio v-model="readValue" @click="onReadChange" style="margin:10px 118px 20px;">我已阅读并同意<span style="color:#e40005;"
					 @click="clickTip">
						<<大健康产业联盟>>
					</span></a-radio>
				<a-form-item style="text-align:center;">
					<a-button type="primary" html-type="submit" style="width:176px;height:40px;font-size:18px;">
						同意条款并提交
					</a-button>
				</a-form-item>
			</a-form>
			<tip ref="tip"></tip>
		</div>
	</div>
</template>

<script>
	import {
		getAction,
		postAction
	} from '@/api/manage';
	import tip from "./modules/tip"

	export default {
		name: "WebRegister",
		components: {
			tip
		},
		data() {
			return {
				form: this.$form.createForm(this),
				radioStyle: {
					height: '30px',
					lineHeight: '30px',
				},
				userType: 0,
				readValue: false,
				formItemLayout: {
					labelCol: {
						xs: {
							span: 6,
							offset: 0
						},
						sm: {
							span: 6,
							offset: 0
						},
					},
					wrapperCol: {
						xs: {
							span: 15,
							offset: 0
						},
						sm: {
							span: 15,
							offset: 0
						},
					},
				},
				formItemLayout1: {
					labelCol: {
						xs: {
							span: 7,
							offset: 0
						},
						sm: {
							span: 7,
							offset: 0
						},
					},
					wrapperCol: {
						xs: {
							span: 14
						},
						sm: {
							span: 14
						},
					},
				},
				phone: '',
				phoneQy: '',
				password: '',
				password1: '',
				passwordQy: '',
				password1Qy: '',
				queryList: [],
				industryTypeOption: [],
			}
		},
		created() {
			this.getQueryList()
			this.getlistTree()
		},
		methods: {
			//确认密码
			inputBlur() {
				if (this.userType == 0) {
					if (this.password != '' && this.password1 != '' && this.password != this.password1) {
						this.$message.warning('两次输入的密码不同，请重新输入');
						this.password1 = ''
						this.form.setFieldsValue({
							password1: ''
						})
					}
				} else {
					if (this.passwordQy != '' && this.password1Qy != '' && this.passwordQy != this.password1Qy) {
						this.$message.warning('两次输入的密码不同，请重新输入');
						this.password1Qy = ''
						this.form.setFieldsValue({
							password1Qy: ''
						})
					}
				}

			},
			//发送验证码
			getSms() {
				var that = this
				var url = '/sys/sms';
				let jsonObject = {};
				if (this.userType == 0) {
					if (that.phone == '') {
						that.$message.warning('请输入手机号');
						return
					}
					jsonObject.mobile = that.phone
					jsonObject.smsmode = 1
				} else {
					if (that.phoneQy == '') {
						that.$message.warning('请输入手机号');
						return
					}
					jsonObject.mobile = that.phoneQy
					jsonObject.smsmode = 1
				}
				postAction(url, jsonObject).then(res => {
					if (res.success) {
						that.$message.success(res.message);
					} else {
						that.$message.error(res.message);
					}
				})
			},
			//行业类别
			getlistTree() {
				var url = '/sysIndustryType/listTree';
				getAction(url).then((res) => {
					this.industryTypeOption = res.result;
				})
			},
			//公司性质
			getQueryList() {
				var url = '/sys/user/queryList';
				getAction(url).then((res) => {
					this.queryList = res.result;
				})
			},
			//点击条款
			clickTip() {
				this.$refs.tip.showModal();
			},
			normFile(e) {
				console.log('Upload event:', e);
				if (Array.isArray(e)) {
					return e;
				}
				return e && e.fileList;
			},
			onReadChange(e) {
				this.readValue = !this.readValue
			},
			// 提交数据
			handleSubmit(e) {
				var that = this;
				e.preventDefault()
				if (!that.readValue) {
					that.$message.warning('请勾选条款');
					return
				}
				this.form.validateFields((err, values) => {
					if (!err) {
						let obj = {};
						obj.post = this.userType
						if (this.userType == 0) { //个人
							obj.username = values.username
              obj.workNo = values.workNo
							obj.userRegion = values.userRegion
							obj.phone = values.phone
							obj.code = values.code
							obj.password = values.password
							obj.recommend = values.recommend
						} else { //企业
							obj.industryClass = values.industryClass[values.industryClass.length - 1]
							obj.businessName = values.businessName
							obj.businessAddr = values.businessAddr
							obj.businessPhone = values.businessPhone
							obj.businessEmail = values.businessEmail
							obj.businessNature = values.businessNature
							obj.businessNum = values.businessNum
							obj.businessAccount = values.businessAccount
							obj.username = values.usernameQy
              obj.workNo = values.workNoQy
							obj.userRegion = values.userRegionQy
							obj.phone = values.phoneQy
							obj.code = values.codeQy
							obj.password = values.passwordQy
							obj.businessLegalName = values.businessLegalName
							obj.businessLegalCard = values.businessLegalCard

							var attach = values.attachmentList;
							if (attach) {
								for (var i = 0; i < attach.length; i++) {
									if (attach[i].status != 'done') {
										attach.splice(i, 1)
									} else {
										attach[i].fileName = attach[i].name;
										attach[i].filePath = attach[i].response.message;
										attach[i].fileType = attach[i].type;
									}
								}
								obj.idFileList = attach
							}
							var attach1 = values.attachmentList1;
							if (attach1) {
								for (var i = 0; i < attach1.length; i++) {
									if (attach1[i].status != 'done') {
										attach1.splice(i, 1)
									} else {
										attach1[i].fileName = attach1[i].name;
										attach1[i].filePath = attach1[i].response.message;
										attach1[i].fileType = attach1[i].type;
									}
								}
								obj.businessFileList = attach1
							}
						}

						let url = "/sys/user/register";
						postAction(url, obj).then((res) => {
							if (res.success) {
								that.$message.success(res.message);
							} else {
								that.$message.error(res.message);
							}
						})
					}
				})
			},
		},
	}
</script>

<style scoped>
	/* html,
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
	} */

	li {
		list-style: none;
	}

	.wrap {
		width: 1200px;
		margin: 0 auto 60px;
		border:1px solid #e40001;
		border-radius:20px;
		position:relative;
		padding:50px 184px;
	}

	.ant-form>>>.ant-form-item-label {
		text-align: right;
		line-height: 40px;
	}
</style>
