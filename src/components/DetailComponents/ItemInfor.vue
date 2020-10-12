<template>
    <div style="padding: 0.3rem;">
        <van-row>
            <van-col class="detailTitle" span="6">项目归属</van-col>
            <van-col class="detailContent" span="18">{{detailData.projectPlace}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">项目名称</van-col>
            <van-col class="detailContent" span="18">{{detailData.projectName}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">行业类别</van-col>
            <van-col class="detailContent" span="18">{{detailData.industryType}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">项目性质</van-col>
            <van-col class="detailContent" span="18">{{detailData.projectProperty}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">项目简介</van-col>
            <van-col class="detailContent" span="18">{{detailData.projectContent}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">建设地址</van-col>
            <van-col class="detailContent" span="18">{{detailData.projectAddress}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="8">建设地址经度</van-col>
            <van-col class="detailContent" span="16">{{detailData.longitude}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="8">建设地址纬度</van-col>
            <van-col class="detailContent" span="16">{{detailData.latitude}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">总投资额</van-col>
            <van-col class="detailContent" span="18">{{detailData.projectTotalMoney}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="10">项目固定资产投资额</van-col>
            <van-col class="detailContent" span="14">{{detailData.projectFixedMoney}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="8">当年计划投资额</van-col>
            <van-col class="detailContent" span="16">{{detailData.projectCurrentMoney}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="8">计划开工时间</van-col>
            <van-col class="detailContent" span="16" v-if="detailData.projectPlanTime">{{detailData.projectPlanTime}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="8">计划完工时间</van-col>
            <van-col class="detailContent" span="16" v-if="detailData.projectEndTime">{{detailData.projectEndTime}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">财政支持</van-col>
            <van-col class="detailContent" span="18" v-for="item in financeList" :key="index" v-if="financeList.length>0">
                <label>{{item.support}}<span v-if="item.supportYear!=undefined&&item.supportYear!=''">/</span>{{item.supportYear}}年<span v-if="item.supportMoney!=undefined&&item.supportMoney!=''">/</span>{{item.supportMoney}}万元<span v-if="item.supportSource!=undefined&&item.supportSource!=''">/</span>{{item.supportSource}}</label>
            </van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">企业自筹</van-col>
            <van-col class="detailContent" span="18">{{detailData.raise}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">贷款</van-col>
            <van-col class="detailContent" span="18">{{detailData.loan}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">项目负责人</van-col>
            <van-col class="detailContent" span="18">{{detailData.mainPerson}}{{detailData.mainPersonMobile}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">项目联系人</van-col>
            <van-col class="detailContent" span="18">{{detailData.person}}{{detailData.personMobile}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">传真</van-col>
            <van-col class="detailContent" span="18">{{detailData.faxNum}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="6">电子邮箱</van-col>
            <van-col class="detailContent" span="18">{{detailData.email}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="24">月计划投资额（万元）</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="3">一月</van-col>
            <van-col class="detailContent1" span="9">{{detailData.projectPlanMoney1}}</van-col>
            <van-col class="detailTitle" span="3">二月</van-col>
            <van-col class="detailContent" span="9">{{detailData.projectPlanMoney2}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="3">三月</van-col>
            <van-col class="detailContent1" span="9">{{detailData.projectPlanMoney3}}</van-col>
            <van-col class="detailTitle" span="3">四月</van-col>
            <van-col class="detailContent" span="9">{{detailData.projectPlanMoney4}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="3">五月</van-col>
            <van-col class="detailContent1" span="9">{{detailData.projectPlanMoney5}}</van-col>
            <van-col class="detailTitle" span="3">六月</van-col>
            <van-col class="detailContent" span="9">{{detailData.projectPlanMoney6}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="3">七月</van-col>
            <van-col class="detailContent1" span="9">{{detailData.projectPlanMoney7}}</van-col>
            <van-col class="detailTitle" span="3">八月</van-col>
            <van-col class="detailContent" span="9">{{detailData.projectPlanMoney8}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="3">九月</van-col>
            <van-col class="detailContent1" span="9">{{detailData.projectPlanMoney9}}</van-col>
            <van-col class="detailTitle" span="3">十月</van-col>
            <van-col class="detailContent" span="9">{{detailData.projectPlanMoney10}}</van-col>
        </van-row>
        <van-divider />
        <van-row>
            <van-col class="detailTitle" span="3">十一月</van-col>
            <van-col class="detailContent1" span="9">{{detailData.projectPlanMoney11}}</van-col>
            <van-col class="detailTitle" span="3">十二月</van-col>
            <van-col class="detailContent" span="9">{{detailData.projectPlanMoney12}}</van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "ItemInfor",
        props: ['idData'],
        data() {
            return {
                detailData:{},
                financeList:[],
                sourceType:'',
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
                that.financeList = idData.financeList;
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
    .detailContent1{
        font-size: 0.26rem;
        text-align:right;
        padding-right:0.2rem;
    }
    .van-tabs__wrap>>> .van-tab--active{
        font-weight:bold !important;
    }
</style>