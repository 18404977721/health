<template>
  <a-card :bordered="false" style="padding:40px 60px;">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="标题">
              <a-input placeholder="请输入标题" v-model="queryParam.title"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发布时间">
              <a-date-picker format='YYYY-MM-DD HH:mm:ss' v-model="queryParam.publishTime" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>
    <a-list item-layout="vertical" size="large" :pagination="ipagination" :data-source="dataSource">
      <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
        <div style="cursor:pointer;" @click="clickDetail(item.id)">
          <a-row :gutter="8">
          	<a-col :span="2">
          		标题：
          	</a-col>
          	<a-col :span="22">
          		{{ item.title }}
          	</a-col>
          </a-row>
          <a-row :gutter="8">
          	<a-col :span="2">
          		发布时间：
          	</a-col>
          	<a-col :span="22">
          		{{ item.publishTime }}
          	</a-col>
          </a-row>
        </div>
      </a-list-item>
    </a-list>  

    <!-- 表单区域 -->
    <healthInfoCircle-modal ref="modalForm" @ok="modalFormOk"></healthInfoCircle-modal>
  </a-card>
</template>

<script>
  import HealthInfoCircleModal from './modules/HealthInfoCircleModal'
  import {
    JeecgListMixin
  } from '@/mixins/JeecgListMixin'

  export default {
    name: "HealthInfoCircleList",
    mixins: [JeecgListMixin],
    components: {
      HealthInfoCircleModal
    },
    data() {
      return {
        description: '信息圈页面',
        url: {
          list: "/health/healthInfoCircle/list",
        },
      }
    },
    methods: {
      clickDetail(id){
        this.$refs.HealthInfoCircleModal.show(id)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
  
</style>
