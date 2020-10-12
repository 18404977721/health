<template>
    <div style="padding: 0.3rem;">
        <van-row>
            <van-col class="detailTitle" span="6">企业名称</van-col>
            <van-col class="detailContent" span="18">{{detailData.enterpriseName}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">企业性质</van-col>
            <van-col class="detailContent" span="18">{{detailData.enterpriseType}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">隶属关系</van-col>
            <van-col class="detailContent" span="18">{{detailData.enterpriseRelation}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">企业法人</van-col>
            <van-col class="detailContent" span="18">{{detailData.enterpriseLegalPerson}}</van-col>
        </van-row>
        <van-divider />
        <van-row v-if="sourceType=='06'">
            <van-col class="detailTitle" span="6">引资方名称</van-col>
            <van-col class="detailContent" span="18">{{detailData.attractName}}</van-col>
        </van-row>
        <van-divider v-if="sourceType=='06'" />
        <van-row v-if="sourceType=='06'">
            <van-col class="detailTitle" span="6">签约场合</van-col>
            <van-col class="detailContent" span="18">{{detailData.signPlace}}</van-col>
        </van-row>
        <van-divider v-if="sourceType=='06'" />
        <van-row>
            <van-col class="detailTitle" span="6">企业简介</van-col>
            <van-col class="detailContent" span="18">{{detailData.enterpriseInfo}}</van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "EnterpriseInfor",
        props: ['idData'],
        data() {
            return {
                detailData:{},
                sourceType:'',//区分三大板块
            };
        },
        created() {
            this.setData(this.idData)
        },
        methods: {
            setData(idData){
                var that = this;
                that.detailData = idData;
                that.sourceType = idData.sourceType;
            },
        }
    }
</script>

<style scoped>
    .detailTitle{
        font-size: 0.26rem;
        color: #999999;
    }
    .detailContent{
        font-size: 0.26rem;
        text-align:right;
    }
    .van-tabs__wrap>>> .van-tab--active{
        font-weight:bold !important;
    }
</style>