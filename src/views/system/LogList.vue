<template>
	<a-card :bordered="false">

		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline">
				<a-row :gutter="24">

					<a-col :md="6" :sm="8">
						<a-form-item label="来源">
							<a-select v-model="queryParam.fromClient" placeholder="请选择访问来源">
								<a-select-option value="">请选择</a-select-option>
								<a-select-option value="dingding">dingding</a-select-option>
								<a-select-option value="admin">admin</a-select-option>
								<a-select-option value="sw13710">sw13710</a-select-option>
								<a-select-option value="szf13710">szf13710</a-select-option>
								<a-select-option value="kfqWeb">kfqWeb</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :md="6" :sm="8">
						<a-form-item label="服务">
							<a-select v-model="queryParam.logModule" placeholder="请选择服务">
								<a-select-option value="">请选择</a-select-option>
								<a-select-option value="api-gateway">api-gateway</a-select-option>
								<a-select-option value="uaa-server">uaa-server</a-select-option>
								<a-select-option value="user-center">user-center</a-select-option>
								<a-select-option value="file-center">file-center</a-select-option>
								<a-select-option value="dev-area">dev-area</a-select-option>
								<a-select-option value="sx13710-app">sx13710-app</a-select-option>
								<a-select-option value="sw13710">sw13710</a-select-option>
								<a-select-option value="sw13710-job">sw13710-job</a-select-option>
								<a-select-option value="sw13710-mq">sw13710-mq</a-select-option>
								<a-select-option value="szf13710">szf13710</a-select-option>
								<a-select-option value="szf13710-job">szf13710-job</a-select-option>
								<a-select-option value="szf13710-mq">szf13710-mq</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :md="6" :sm="8">
						<a-form-item label="操作类型">
							<a-select v-model="queryParam.operateType" placeholder="请选择操作类型">
								<a-select-option value="">请选择</a-select-option>
								<a-select-option value="0">查询</a-select-option>
								<a-select-option value="1">增加</a-select-option>
								<a-select-option value="2">修改</a-select-option>
								<a-select-option value="3">删除</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<template v-if="toggleSearchStatus">
						<a-col :md="6" :sm="8">
							<a-form-item label="日志内容">
								<a-input placeholder="请输入日志内容" v-model="queryParam.logContent"></a-input>
							</a-form-item>
						</a-col>
						<a-col :md="6" :sm="8">
							<a-form-item label="操作用户名称">
								<a-input placeholder="请输入操作用户名称" v-model="queryParam.username"></a-input>
							</a-form-item>
						</a-col>
						<a-col :md="6" :sm="8">
							<a-form-item label="ip">
								<a-input placeholder="请输入ip" v-model="queryParam.ip"></a-input>
							</a-form-item>
						</a-col>
					</template>
					<a-col :md="6" :sm="8">
						<span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
							<a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
							<a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
							<a @click="handleToggleSearch" style="margin-left: 8px">
								{{ toggleSearchStatus ? '收起' : '展开' }}
								<a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
							</a>
						</span>
					</a-col>

				</a-row>
			</a-form>
		</div>

		<!-- 操作按钮区域 -->
		<div class="table-operator">
			<a-dropdown v-if="selectedRowKeys.length > 0">
				<a-menu slot="overlay">
					<a-menu-item key="1" @click="batchDel">
						<a-icon type="delete" />删除</a-menu-item>
				</a-menu>
				<a-button style="margin-left: 8px"> 批量操作
					<a-icon type="down" />
				</a-button>
			</a-dropdown>
			<!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
			<a-button type="primary" icon="download" @click="handleExportXls">导出</a-button>
			<a-upload name="file" :showUploadList="false" :multiple="false" :action="importExcelUrl" @change="handleImportExcel">
				<a-button type="primary" icon="import">导入</a-button>
			</a-upload>
			<a-dropdown v-if="selectedRowKeys.length > 0">
				<a-menu slot="overlay">
					<a-menu-item key="1" @click="batchDel">
						<a-icon type="delete" />删除</a-menu-item>
				</a-menu>
				<a-button style="margin-left: 8px"> 批量操作
					<a-icon type="down" />
				</a-button>
			</a-dropdown> -->
		</div>

		<!-- table区域-begin -->
		<div>
			<!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
				<i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
				<a style="margin-left: 24px" @click="onClearSelected">清空</a>
			</div> -->

			<a-table ref="table" size="middle" bordered rowKey="id" :columns="columns" :dataSource="dataSource" :pagination="ipagination"
			 :loading="loading" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" @change="handleTableChange">
				<span slot="operateType" slot-scope="text, record">
					{{record.operateType==0?'查询':record.operateType==1?'增加':record.operateType==2?'修改':'删除'}}
				</span>
				<span slot="logContent" slot-scope="text, record">
					<a-tooltip>
					  <template slot='title'>
					    {{text}}
					  </template>
					  <p class="logContent">{{text}}</p>
					</a-tooltip>
				</span>
				<span slot="action" slot-scope="text, record">
					<a @click="handleEdit(record)" v-has="'btn:check'">查看</a>

					<a-divider type="vertical" />
					<a-dropdown>
						<a class="ant-dropdown-link">更多
							<a-icon type="down" /></a>
						<a-menu slot="overlay">
							<a-menu-item v-has="'btn:delete'">
								<a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
									<a>删除</a>
								</a-popconfirm>
							</a-menu-item>
						</a-menu>
					</a-dropdown>
				</span>

			</a-table>
		</div>
		<!-- table区域-end -->

		<!-- 表单区域 -->
		<sysLog-modal ref="modalForm" @ok="modalFormOk"></sysLog-modal>
	</a-card>
</template>

<script>
	import SysLogModal from './modules/SysLogModal'
	import {
		JeecgListMixin
	} from '@/mixins/JeecgListMixin'

	export default {
		name: "SysLogList",
		mixins: [JeecgListMixin],
		components: {
			SysLogModal
		},
		data() {
			return {
				description: '系统日志管理页面',
				// 表头
				columns: [{
						title: '#',
						dataIndex: '',
						key: 'rowIndex',
						width: 60,
						align: "center",
						customRender: function(t, r, index) {
							return parseInt(index) + 1;
						}
					},
					{
						title: '来源',
						align: "center",
						dataIndex: 'fromClient'
					},
					{
						title: '服务',
						align: "center",
						dataIndex: 'logModule'
					},
					{
						title: '创建时间',
						align: "center",
						dataIndex: 'createTime'
					},
					{
						title: '操作类型',
						align: "center",
						dataIndex: 'operateType',
						scopedSlots: {
							customRender: 'operateType'
						},
					},
					{
						title: '日志内容',
						align: "center",
						dataIndex: 'logContent',
						scopedSlots: {
							customRender: 'logContent'
						},
					},
					{
						title: '操作用户名称',
						align: "center",
						dataIndex: 'username'
					},
					{
						title: 'IP',
						align: "center",
						dataIndex: 'ip'
					},
					{
						title: '耗时',
						align: "center",
						dataIndex: 'costTime'
					},
					{
						title: '操作',
						dataIndex: 'action',
						align: "center",
						scopedSlots: {
							customRender: 'action'
						},
						width:170
					}
				],
				url: {
					list: "/sys/log/list",
					delete: "/sys/log/delete",
					deleteBatch: "/sys/log/deleteBatch",
					exportXlsUrl: "sys/log/exportXls",
					importExcelUrl: "sys/log/importExcel",
				},
			}
		},
		computed: {
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
			}
		},
		methods: {

		}
	}
</script>
<style lang="less" scoped>
	/** Button按钮间距 */
	.ant-btn {
		margin-left: 3px
	}

	.ant-card-body .table-operator {
		margin-bottom: 18px;
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
	
	// .logContent{width: 12em;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding: 0px !important;margin:0 auto;cursor:pointer;text-align:center;}
</style>
