<template>
    <div style="padding: 0.3rem">
        <div v-if="sourceType=='01'||sourceType=='02'">
            <van-row>
                <van-col class="detailTitle" span="6">事项编号</van-col>
                <van-col class="detailContent" span="18">{{detailData.taskCode}}</van-col>
            </van-row>
            <van-divider />
            <van-row v-if="sourceType=='01'">
                <van-col class="detailTitle" span="6">事项名称</van-col>
                <van-col class="detailContent" span="18">{{detailData.taskName}}</van-col>
            </van-row>
            <van-divider v-if="sourceType=='01'" />
            <van-row>
                <van-col class="detailTitle" span="6">任务来源</van-col>
                <van-col class="detailContent" span="18">{{detailData.sourceTaskName}}</van-col>
            </van-row>
            <van-divider />
            <van-row v-if="sourceType=='02'">
                <van-col class="detailTitle" span="6">任务分类</van-col>
                <van-col class="detailContent" span="18">{{detailData.workName}}</van-col>
            </van-row>
            <van-divider  v-if="sourceType=='02'" />
            <van-row>
                <van-col class="detailTitle" span="6">关联副省长</van-col>
                <van-col class="detailContent" span="18">{{detailData.relateLeaderName}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">牵头单位</van-col>
                <van-col class="detailContent" span="18">{{detailData.mainOrg}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">交办人</van-col>
                <van-col class="detailContent" span="18">{{detailData.assignPerson}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">交办电话</van-col>
                <van-col class="detailContent" span="18">{{detailData.assignDepartMobile}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">创建时间</van-col>
                <van-col class="detailContent" span="18">{{detailData.taskTime}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">落实时限</van-col>
                <van-col class="detailContent" span="18">{{detailData.limitType}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">所属版块</van-col>
                <van-col class="detailContent" span="18">{{detailData.typeName}}</van-col>
            </van-row>
            <van-divider />
            <van-row v-if="sourceType=='02'">
                <van-col class="detailTitle" span="6">主管单位</van-col>
                <van-col class="detailContent" span="18">省政府办公厅</van-col>
            </van-row>
            <van-divider v-if="sourceType=='02'" />
            <van-row>
                <van-col class="detailTitle" span="12">关联行政相对方手机号</van-col>
                <van-col class="detailContent" span="12">{{detailData.relatePhone}}</van-col>
            </van-row>
            <van-divider />
            <van-row v-if="sourceType=='02'">
                <van-col class="detailTitle" span="6">任务事项</van-col>
                <van-col class="detailContent" span="18">{{detailData.taskName}}</van-col>
            </van-row>
            <van-row v-if="sourceType=='01'">
                <van-col class="detailTitle" span="12">事项内容</van-col>
            </van-row>
            <div class="moduContent">
                {{detailData.taskContent}}
            </div>
        </div>
        <div v-if="sourceType=='04'||sourceType=='05'||sourceType=='06'">
            <van-row>
                <van-col class="detailTitle" span="6">事项编号</van-col>
                <van-col class="detailContent" span="18">{{detailData.taskCode}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">任务来源</van-col>
                <van-col class="detailContent" span="18">{{detailData.specificType}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">主管副省长</van-col>
                <van-col class="detailContent" span="18">胡玉亭副省长</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">关联副省长</van-col>
                <van-col class="detailContent" span="18">{{detailData.relateLeaderName}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">交办人</van-col>
                <van-col class="detailContent" span="18">{{detailData.assignPerson}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="6">交办电话</van-col>
                <van-col class="detailContent" span="18">{{detailData.assignDepartMobile}}</van-col>
            </van-row>
            <van-divider />
            <van-row>
                <van-col class="detailTitle" span="12">落实要求</van-col>
            </van-row>
            <div class="moduContent">
                {{detailData.taskContent}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EnterpriseInfor",
        props: ['idData'],
        data() {
            return {
                detailData:{},
                sourceType:'',
            };
        },
        created() {
            this.setData(this.idData)
        },
        methods: {
            setData(idData){
                console.log(idData)
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
    .moduContent{
        margin-top: 0.26rem;
        line-height: 0.39rem;
        font-size: 0.3rem;
        background-color: #F3F6F9;
        border-radius:0.1rem;
        padding: 0.3rem;
    }
    .van-tabs__wrap>>> .van-tab--active{
        font-weight:bold !important;
    }
</style>