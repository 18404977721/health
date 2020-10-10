<template>
	<a-card :bordered="false">
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline">
				<a-row :gutter="24">

					<a-col :md="6" :sm="12">
						<a-form-item label="姓名">
							<a-input placeholder="请输入钉钉姓名查询" v-model="queryParam.name"></a-input>
						</a-form-item>
					</a-col>
					<!-- <a-col :md="6" :sm="8">
						<a-form-item label="电话">
							<a-input placeholder="请输入电话查询" v-model="queryParam.mobile"></a-input>
						</a-form-item>
					</a-col> -->
					<a-col :md="6" :sm="8">
						<span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
							<a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
							<a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
						</span>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<!-- 操作按钮区域 -->
		<div class="table-operator" style="border-top: 5px">
			<a-button @click="handleDDUser" type="primary" icon="plus">新增</a-button>
			<a-button @click="handleSyn" type="primary" icon="fall">同步数据</a-button>
			<a-button @click="reloadRedis" type="primary" icon="puls">刷新缓存</a-button>
		</div>
		<!-- table区域-begin -->
		<div>
			<a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSource" :pagination="ipagination"
			 :loading="loading" @change="handleTableChange">
				<span slot="action" slot-scope="text, record">
					<!-- <a @click="handleDetail(record)">详情</a>
					<a-divider type="vertical" /> -->
					<a @click="addDDUser(record.id)">系统用户授权</a>
					<!-- <a-dropdown>
						<a class="ant-dropdown-link">
							更多
							<a-icon type="down" />
						</a>
						<a-menu slot="overlay">
							<a-menu-item>
								<a href="javascript:;" @click="handleDDUser(record.id)">系统用户授权</a>
							</a-menu-item>
							<a-menu-item>
								<a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
									<a>删除</a>
								</a-popconfirm>
							</a-menu-item>
						</a-menu>
					</a-dropdown> -->
				</span>
			</a-table>
		</div>
		<!-- table区域-end -->
		<dd-user-modal ref="ddusermodal" @ok="modalFormOk"></dd-user-modal>
		<query-sys-user-modal ref="querysysusermodal" @ok="modalFormOk"></query-sys-user-modal>
	</a-card>
</template>
<script>
	import DdUserModal from './modules/DdUserModal'
	import {
		getUsercenterAction
	} from '@/api/manage';
	import {
		JeecgListMixin
	} from '@/mixins/JeecgListMixin';
	import QuerySysUserModal from './modules/QuerySysUserModal'

	export default {
		name: "DdUserList",
		mixins: [JeecgListMixin],
		components: {
			DdUserModal,
			QuerySysUserModal
		},
		data() {
			return {
				description: '这是钉钉用户管理页面',
				queryParam: {},
				columns: [
					{
						title: '钉钉userid',
						align: "center",
						width: 80,
						dataIndex: 'userid'
					},
					{
						title: '钉钉用户名称',
						align: "center",
						dataIndex: 'name',
						width: 200
					},

					{
						title: '钉钉所属部门',
						align: "center",
						width: 200,
						dataIndex: 'department'
					},
					{
						title: '系统对应用户名称',
						align: "center",
						width: 200,
						dataIndex: 'sysusername'
					},
					{
						title: '电话',
						align: "center",
						width: 100,
						dataIndex: 'phone',
					},
					{
						title: '操作',
						dataIndex: 'action',
						scopedSlots: {
							customRender: 'action'
						},
						align: "center",
						width: 170
					}
				],
				url: {
					syncUser: "/ddsynuser",
					list: "/sys/dduser/list",
					delete: "/sys/dduser/delete",
					deleteBatch: "/sys/dduser/deleteBatch",
					reloadRedis:"/sys/dduser/reloadredis",
				},
			}
		},
		computed: {},
		methods: {

			//增加钉钉权限
			handleDDUser(record) {
				this.$refs.ddusermodal.edit(record);
			},
			addDDUser(id) {
				this.$refs.querysysusermodal.edit(id);
			},
			handleSyn() {
				var that = this;
				getUsercenterAction(that.url.syncUser, {}).then((res) => {
					if (res.success) {
						this.loadData();
						that.$message.success(res.message);
					} else {
						that.$message.warning(res.message);
					}
				})
			},
			reloadRedis() {
				var that = this;
				getUsercenterAction(that.url.reloadRedis, {}).then((res) => {
					debugger;
					if (res.success) {
						that.$message.success(res.message);
					} else {
						that.$message.warning(res.message);
					}
				})
			},
		}
	}
</script>
<style scoped>
	/** Button按钮间距 */
	.ant-btn {
		margin-left: 3px
	}

	.ant-card-body {
		margin-bottom: 18px;
	}

	.table-operator button {
		margin-bottom: 18px;
		margin-right: 5px;
	}

	.ant-table-tbody .ant-table-row td {
		padding-top: 15px;
		padding-bottom: 15px;
	}

	.anty-row-operator button {
		margin: 0 5px
	}

	.ant-btn-danger {
		background-color: #ffffff
	}

	.ant-modal-cust-warp {
		height: 100%
	}

	.ant-modal-cust-warp .ant-modal-body {
		height: calc(100% - 110px) !important;
		overflow-y: auto
	}

	.ant-modal-cust-warp .ant-modal-content {
		height: 90% !important;
		overflow-y: hidden
	}

	.anty-img-wrap {
		height: 25px;
		position: relative;
	}

	.anty-img-wrap>img {
		max-height: 100%;
	}
</style>
