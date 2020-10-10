<template>
	<a-drawer :title="title" :width="drawerWidth" placement="right" :closable="true" @close="handleCancel"
	 :visible="visible" style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
		<template slot="title">
			<div style="width: 100%;">
				<span>{{ title }}</span>
			</div>
		</template>
    <a-tree
        checkable
        defaultExpandAll
        v-model="checkedKeys"
        @check="onCheck"
        :treeData="treeData"
      >
    </a-tree>
		<div class="drawer-bootom-button" v-show="!disableSubmit">
			<a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
				<a-button style="margin-right: .8rem">取消</a-button>
			</a-popconfirm>
			<a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
		</div>
	</a-drawer>
</template>

<script>
	import {editDataDDUserGroups,queryDDtreeDataGroup,queryDDUserGroups} from '@/api/api'
	import {getUsercenterAction,putUsercenterAction} from '@/api/manage';
	export default {
		name: "SysddUserModal",
		components: {
			queryDDtreeDataGroup,
			editDataDDUserGroups,
			queryDDUserGroups,//获取钉钉用户树列表
		},
		data() {
			return {
        expandedKeys:[],
				modalWidth: 800,
				drawerWidth: 700,
        disableSubmit:false,
				modaltoggleFlag: true,
        autoExpandParent:true,
				confirmDirty: false,
				userId: "", //保存用户id
				title: "钉钉用户权限授权",
				visible: false,
				model: {},
        checkedKeys:[],
        treeData:[],
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
			}
		},
		methods: {
			edit(id) {
				let that = this;
				that.userId = id;
				that.visible = true;
        this.treeData = [];
        let url = "/sys/dduser/ddUserTree";
        getUsercenterAction(url).then((res)=>{
          if(res.success){
            this.treeData = res.result
          }
        })
        this.getSelectEdUser();
			},
      onCheck(checkedKeys){
        
      },
      getSelectEdUser(){
        this.checkedKeys = [];
        let url = "/sys/dduser/loaduser?userId="+this.userId;
        getUsercenterAction(url).then(res=>{
          this.checkedKeys.push(res.result.id)
        })
      },
			close() {
				this.$emit('close');
				this.visible = false;
			},
			handleSubmit() {
				const that = this;
				// 触发表单验证
        if(this.checkedKeys.length > 1){
          this.$message.warning("一个用户只可绑定一个钉钉用户");
        }else{
          let url = "/sys/dduser/goadd";
          // obj['userId'] = this.userId;
          // obj['selectedId'] = this.checkedKeys[0];
          if(this.checkedKeys[0]){
            url += "?userId="+this.userId+"&selectedId="+this.checkedKeys[0];
          }else{
            url += "?userId="+this.userId+"&selectedId=";
          }
          
        	getUsercenterAction(url).then((res) => {
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
