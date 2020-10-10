<template>
	<a-drawer :title="title" :maskClosable="false" :width="drawerWidth" placement="right" :closable="true" @close="handleCancel"
	 :visible="visible" style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
		<template slot="title">
			<div style="width: 100%;">
				<span>{{ title }}</span>
			</div>
		</template>
		<a-spin :spinning="confirmLoading">
			<a-form :form="form">
				<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
					<a-radio-group v-model="dataRoleType" :defaultValue="0">
						<a-radio :style="radioStyle" value="0">仅查本单位</a-radio>
						<a-radio :style="radioStyle" value="1">配置查询的开发区</a-radio>
						<a-radio :style="radioStyle" value="2">配置行政区</a-radio>
						<a-radio :style="radioStyle" value="3">管理员权限</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
					<!-- <a-tree
					  v-if="dataRoleType === '1'"
					  checkable
					  :treeData="devAreaList"
					  :checkedKeys="selectedGroups"
					  @check="this.onCheck"
					>
					</a-tree> -->
					<a-tree v-if="dataRoleType === '2'" checkable :treeData="groupList" :checkedKeys="selectedGroups" @check="this.onCheck">
					</a-tree>
				</a-form-item>
			</a-form>
		</a-spin>
		<div class="drawer-bootom-button" v-show="!disableSubmit">
			<a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
				<a-button style="margin-right: .8rem">取消</a-button>
			</a-popconfirm>
			<a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
		</div>
	</a-drawer>
</template>

<script>
	import {
		editDataDevareaGroups,
		queryDepartDataGroup,
		queryDevAreaRegionGroup,

	} from '@/api/api'
	import {
		getUsercenterAction
	} from '@/api/manage';

	export default {
		name: "SysDevAreaRoleModal",
		components: {
			queryDepartDataGroup,
			editDataDevareaGroups,
			queryDevAreaRegionGroup,
		},
		data() {
			return {
				modalWidth: 800,
				drawerWidth: 700,
				modaltoggleFlag: true,
				confirmDirty: false,
				departId: "", //保存单位id
				dataRoleType: "0", //数据权限类型
				disableSubmit: false,
				title: "数据权限授权",
				visible: false,
				model: {},
				groupList: [],
				//devAreaList: [],
				selectedGroups: [],
				labelCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 5
					},
				},
				wrapperCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 16
					},
				},
				uploadLoading: false,
				confirmLoading: false,
				form: this.$form.createForm(this),
				radioStyle: {
					display: 'block',
					height: '50px',
					lineHeight: '50px',
				},
			}
		},
		methods: {
			onCheck(selectedGroups) {
				this.selectedGroups = selectedGroups;
			},
			//初始化行政地市树
			initialGroupList() {
				queryDevAreaRegionGroup().then((res) => {
					if (res.success) {
						this.groupList = res.result;
						this.loadDepartGroups(this.departId);
					} else {
						console.log(res.message);
					}
				});
			},
			// 			//初始化所有开发区
			// 			initialDevAreaList() {
			// 				queryDevAreaGroup().then((res) => {
			// 					if (res.success) {
			// 						this.devAreaList = res.result;
			// 						debugger;
			// 						//this.loadDepartGroups(this.departId);
			// 					} else {
			// 						console.log(res.message);
			// 					}
			// 				});
			// 
			// 			},
			//回显数据
			loadDepartGroups(departId) {
				var that = this;
				that.dataRoleType = "0"; //重置
				this.selectedGroups = [];
				queryDepartDataGroup({
					departId: departId
				}).then((res) => {
					if (res.success) {
						if (res.result != null) {
							let dataDevarea = res.result;
							this.selectedGroups = dataDevarea.dataCodes.split(',');
							that.dataRoleType = dataDevarea.dataRoleType;
						}
					} else {
						console.log(res.message);
					}
				});
			},

			edit(departId) {
				let that = this;
				that.initialGroupList();
				//that.initialDevAreaList();
				that.form.resetFields();
				that.departId = departId;
				that.visible = true;
			},
			close() {
				this.$emit('close');
				this.visible = false;
				this.disableSubmit = false;
				this.selectedGroups = [];
			},
			handleSubmit() {
				const that = this;
				// 触发表单验证
				this.form.validateFields((err, values) => {
					if (!err) {
						that.confirmLoading = true;
						let formData = Object.assign(this.model, values);
						formData.departId = this.departId;
						formData.dataRoleType = this.dataRoleType;
						formData.selectedGroups = "";
						if (this.dataRoleType === "2") {
							formData.selectedGroups = this.selectedGroups.length > 0 ? this.selectedGroups.join(",") : '';
						}
						editDataDevareaGroups(formData).then((res) => {
							if (res.success) {
								that.$message.success(res.message);
								that.$emit('ok');
							} else {
								that.$message.warning(res.message);
							}
						}).finally(() => {
							that.confirmLoading = false;
							that.close();
						})

					}
				})
			},
			handleCancel() {
				this.close()
			},

		}
	}
</script>

<style scoped>
	.ant-table-tbody .ant-table-row td {
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.drawer-bootom-button {
		position: absolute;
		bottom: -8px;
		width: 100%;
		border-top: 1px solid #e8e8e8;
		padding: 10px 16px;
		text-align: right;
		left: 0;
		background: #fff;
		border-radius: 0 0 2px 2px;
	}

	.radioStyle {
		display: block;
		height: 30px;
		lineHeight: 30px;
	}
</style>
