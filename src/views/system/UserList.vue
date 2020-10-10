<template>
    <a-card :bordered="false">
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="24">
                    <a-col :md="6"
                           :sm="12">
                        <a-form-item label="账号">
                            <a-input placeholder="请输入账号查询"
                                     v-model="queryParam.username"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :md="6"
                           :sm="8">
                        <a-form-item label="真实姓名">
                            <a-input placeholder="请输入真实姓名查询"
                                     v-model="queryParam.realname"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :md="6"
                           :sm="8">
                        <a-form-item label="状态">
                            <a-select v-model="queryParam.status"
                                      placeholder="请选择用户状态查询">
                                <a-select-option value="">请选择用户状态</a-select-option>
                                <a-select-option value="1">正常</a-select-option>
                                <a-select-option value="2">解冻</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="6"
                           :sm="8">
                        <span style="float: left;overflow: hidden;"
                              class="table-page-search-submitButtons">
                          <a-button type="primary"
                                    @click="searchQuery"
                                    icon="search">查询</a-button>
                          <a-button type="primary"
                                    @click="searchReset"
                                    icon="reload"
                                    style="margin-left: 8px">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <!-- 操作按钮区域 -->
        <div class="table-operator"
             style="border-top: 5px">
            <a-button @click="handleAdd"
                      v-has="'user:add'"
                      type="primary"
                      icon="plus">添加用户
            </a-button>
            <a-button type="primary"
                      icon="download"
                      @click="handleExportXls">导出
            </a-button>
            <a-upload name="file"
                      :showUploadList="false"
                      :multiple="false"
                      :action="importExcelUrl"
                      @change="handleImportExcel">
                <a-button type="primary"
                          icon="import">导入
                </a-button>
            </a-upload>
            <a-dropdown v-if="selectedRowKeys.length > 0">
                <a-menu slot="overlay"
                        @click="handleMenuClick">
                    <a-menu-item key="1">
                        <a-icon type="delete"
                                @click="batchDel"/>
                        删除
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="lock"
                                @click="batchFrozen('2')"/>
                        冻结
                    </a-menu-item>
                    <a-menu-item key="3">
                        <a-icon type="unlock"
                                @click="batchFrozen('1')"/>
                        解冻
                    </a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px">
                    批量操作
                    <a-icon type="down"/>
                </a-button>
            </a-dropdown>
        </div>
        <!-- table区域-begin -->
        <div>
            <div class="ant-alert ant-alert-info"
                 style="margin-bottom: 16px;">
                <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{
                selectedRowKeys.length }}</a>项&nbsp;&nbsp;
                <a style="margin-left: 24px"
                   @click="onClearSelected">清空</a>
            </div>
            <a-table
                    ref="table"
                    bordered
                    size="middle"
                    rowKey="id"
                    :columns="columns"
                    :dataSource="dataSource"
                    :pagination="ipagination"
                    :loading="loading"
                    :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                    @change="handleTableChange">
                <template slot="avatarslot"
                          slot-scope="text, record, index">
                    <div class="anty-img-wrap">
                        <img :src="getAvatarView(record.avatar)"/>
                    </div>
                </template>
                <span slot="action"
                      slot-scope="text, record">
                    <a @click="handleEdit(record)"
                       v-has="'btn:edit'">编辑</a>
                    <a-divider type="vertical"/>
                    <a-dropdown>
                        <a class="ant-dropdown-link"> 更多 <a-icon type="down"/>
                        </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;"
                   @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item v-has="'btn:name'">
                <a href="javascript:;"
                   @click="handleChangeUsername(record.id,record.username)">用户名</a>
              </a-menu-item>
              <a-menu-item v-has="'btn:secret'">
                <a href="javascript:;"
                   @click="handleChangePassword(record.username)">密码</a>
              </a-menu-item>
			  <a-menu-item v-has="'btn:secret'">
			    <a href="javascript:;"
                   @click="handleChangeOpenId(record.id,record.openId)">修改openid</a>
			  </a-menu-item>
			  <a-menu-item v-has="'btn:secret'">
			    <a href="javascript:;"
                   @click="handleChangeDDUserid(record.id,record.ddUserId)">修改dduserid</a>
			  </a-menu-item>
              <a-menu-item>
                <a href="javascript:;"
                   @click="handleDDUser(record.id)">钉钉用户授权</a>
				</a-menu-item>
                <a-menu-item>
                    <a href="javascript:;"
                       @click="handleleader(record.id,record.basicLeaderId)">配置领导</a>
				</a-menu-item>
              <a-menu-item v-has="'btn:delete'">
                <a-popconfirm title="确定删除吗?"
                              @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item v-if="record.status==1"
                           v-has="'btn:frozen'">
                <a-popconfirm title="确定冻结吗?"
                              @confirm="() => handleFrozen(record.id,2)">
                  <a>冻结</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item v-if="record.status==2"
                           v-has="'btn:unfrozen'">
                <a-popconfirm title="确定解冻吗?"
                              @confirm="() => handleFrozen(record.id,1)">
                  <a>解冻</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
            </a-table>
        </div>
        <!-- table区域-end -->
        <user-modal ref="modalForm"
                    @ok="modalFormOk"></user-modal>
        <username-modal ref="usernamemodal"
                        @ok="usernameModalOk"></username-modal>
        <password-modal ref="passwordmodal"
                        @ok="passwordModalOk"></password-modal>
        <openid-modal ref="openidmodal"
                      @ok="openIdModalOk"></openid-modal>
        <dduserid-modal ref="dduseridmodal"
                        @ok="ddUserIdModalOk"></dduserid-modal>
        <sysdd-user-modal ref="sysddusermodal"></sysdd-user-modal>
        <sys-user-leader-modal ref="sysuserleadermodal" @userLeaderModalOk="userLeaderModalOk"></sys-user-leader-modal>
    </a-card>
</template>

<script>
import UserModal from './modules/UserModal'
import UsernameModal from './modules/UsernameModal'
import PasswordModal from './modules/PasswordModal'
import { putUsercenterAction } from '@/api/manage'
import { frozenBatch } from '@/api/api'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import SysddUserModal from './modules/SysddUserModal'
import SysUserLeaderModal from './modules/SysUserLeaderModal'
import OpenidModal from './modules/OpenidModal'
import DduseridModal from './modules/DduseridModal'

export default {
  name: 'UserList',
  mixins: [JeecgListMixin],
  components: {
    UserModal,
    UsernameModal,
    PasswordModal,
    SysddUserModal,
    SysUserLeaderModal,
    OpenidModal,
    DduseridModal
  },
  data() {
    return {
      description: '这是用户管理页面',
      queryParam: {},
      columns: [
        /*{
          title: '#',
          dataIndex: '',
          key:'rowIndex',
          width:60,
          align:"center",
          customRender:function (t,r,index) {
            return parseInt(index)+1;
          }
        },*/
        {
          title: '用户账号',
          align: 'center',
          dataIndex: 'username',
          width: 200
        },
        {
          title: '真实姓名',
          align: 'center',
          width: 200,
          dataIndex: 'realname'
        },

        {
          title: '性别',
          align: 'center',
          width: 80,
          dataIndex: 'sex_dictText'
        },

        {
          title: '手机号码',
          align: 'center',
          width: 100,
          dataIndex: 'phone'
        },
        {
          title: '邮箱',
          align: 'center',
          width: 200,
          dataIndex: 'email'
        },
        {
          title: '状态',
          align: 'center',
          width: 80,
          dataIndex: 'status_dictText'
        },
        /* {
           title: '创建时间',
           align: "center",
           width: 150,
           dataIndex: 'createTime',
           sorter: true
         },*/
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 170
        }

      ],
      url: {
        imgerver: window._CONFIG['domianURL'] + '/sys/common/view',
        syncUser: '/process/extActProcess/doSyncUser',
        list: '/sys/user/list',
        delete: '/sys/user/delete',
        deleteBatch: '/sys/user/deleteBatch',
        exportXlsUrl: 'sys/user/exportXls',
        importExcelUrl: 'sys/user/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    getAvatarView: function(avatar) {
      return this.url.imgerver + '/' + avatar
    },

    batchFrozen: function(status) {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return false
      } else {
        let ids = ''
        let that = this
        that.selectedRowKeys.forEach(function(val) {
          ids += val + ','
        })
        that.$confirm({
          title: '确认操作',
          content: '是否' + (status == 1 ? '解冻' : '冻结') + '选中账号?',
          onOk: function() {
            frozenBatch({ ids: ids, status: status }).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            })
          }
        })
      }
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        this.batchDel()
      } else if (e.key == 2) {
        this.batchFrozen(2)
      } else if (e.key == 3) {
        this.batchFrozen(1)
      }
    },
    handleFrozen: function(id, status) {
      let that = this
      frozenBatch({ ids: id, status: status }).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    handleChangeUsername(id, username) {
      this.$refs.usernamemodal.show(id, username)
    },
    handleChangePassword(username) {
      this.$refs.passwordmodal.show(username)
    },
    handleChangeOpenId(id, openid) {
      this.$refs.openidmodal.show(id, openid)
    },
    handleChangeDDUserid(id, dduserid) {
      this.$refs.dduseridmodal.show(id, dduserid)
    },
    //增加钉钉权限
    handleDDUser(id) {
      this.$refs.sysddusermodal.edit(id)
    },
    //配置领导
    handleleader(id,basicLeaderId) {
      this.$refs.sysuserleadermodal.edit(id,basicLeaderId)
    },
    handleSyncUser() {
      var that = this
      putUsercenterAction(that.url.syncUser, {}).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    usernameModalOk() {
      //TODO 用户名修改完成 不需要刷新页面，可以把datasource中的数据更新一下
    },
    passwordModalOk() {
      //TODO 密码修改完成 不需要刷新页面，可以把datasource中的数据更新一下
    },
    openIdModalOk() {
      this.loadData()
    },
    ddUserIdModalOk() {
      this.loadData()
    },
    userLeaderModalOk() {
     this.loadData()
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

.anty-img-wrap > img {
    max-height: 100%;
}
</style>