<template>
	<div style="padding: 32px 0;background:#fff;">
		<a-row :gutter="10">
		  <a-col :md="4" :sm="24">
		  </a-col>
		  <a-col :md="16" :sm="24">
		    <a-form @submit="handleSubmit" :form="form">
		      <a-form-item
		        :labelCol="labelCol"
		        :wrapperCol="wrapperCol"
		        label="内容">
		        <a-textarea   v-decorator="['sql',{rules: [{ required: true, message: '请输入内容!' }]}]" placeholder="请输入内容" :rows="10"/>
		      </a-form-item>
					<a-form-item
					  :labelCol="labelCol"
					  :wrapperCol="wrapperCol"
					  label="密码">
					  <a-input style="background: #fff;color:#999;" v-decorator="['password',{rules: [{ required: true, message: '请输入密码!' }]}]" placeholder="请输入密码"/>
					</a-form-item>
					<a-form-item
						label="方法"
						:labelCol="labelCol"
						:wrapperCol="wrapperCol"
					>
						<a-radio-group
						  v-decorator="['urlLink',{rules: [{ required: true, message: '请选择方法!' }]}]"
							@change="handleFormLayoutChange">
							<a-radio-button value="查询">
								查询
							</a-radio-button>
							<a-radio-button value="DML">
								DML
							</a-radio-button>
							<a-radio-button value="DDL">
								DDL
							</a-radio-button>
						</a-radio-group>
					</a-form-item>
		      <a-form-item
		        :wrapperCol="{ span: 24 }"
		        style="text-align: center"
		      >
		        <a-button htmlType="submit"  type="primary">确定</a-button>
		      </a-form-item>
		
		    </a-form>
		  </a-col>
		  <a-col :md="4" :sm="24">
		  </a-col>
		</a-row>
		<p style="text-align:center;font-weight:bold;">输出结果</p>
		<a-table 
			v-if="flag==1"
			bordered
			style="width:1700px;margin:0 auto;"
			:scroll="{ x: 1700}"
			:columns="columns" 
			:data-source="arr">
		</a-table>
		<p v-if="flag!=1"style="width:1700px;margin:0 auto;">{{content}}</p>
	</div>
</template>
<script>
  import {postUsercenterAction} from '@/api/manage';

  export default {
    data () {
      return {
        form: this.$form.createForm(this),
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        link:'',
				arr:[],
				columns:[],
				content:'',
				flag:0,
      }
    },
    methods: {
			handleFormLayoutChange(e) {
				this.link = e.target.value=='查询'?'/db/query':e.target.value=='DML'?'/db/dml':'/db/ddl';
			},
      handleSubmit (e) {
        var that = this;
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err){
            var params = {};
						params.password = values.password
						params.sql = values.sql
            var url = this.link;
            postUsercenterAction(url,params).then((res) => {
              if (res.success) {
								that.columns = []
								that.arr = []
								that.content = ''
								
                that.$success({
                    title: '提示',
                    content:res.message ,
                });
								if(that.link=='/db/query'){
									if(res.result.length>0){
										let obj = res.result[0]
										let columns = that.columns 
										for(let name in obj ){
												var vote = {}
												vote.title = name
												vote.dataIndex = name
												vote.key = name
												columns.push(vote)
										}
										that.columns = columns
										that.arr = res.result
									}
									that.flag = 1
								}else{
									that.content = res.result 
									that.flag = 2
								}
              }else{
                that.$error({
                  title: '提示',
                  content:res.message,
                });
              }
            })
          }
        });
      }
    }
  }

</script>