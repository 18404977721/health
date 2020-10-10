<template>
  <a-select :placeholder="placeholder" :value="value" @change="handleInput">
    <a-select-option value="">请选择</a-select-option>
    <a-select-option v-for="(item, key) in departOptions" :key="key" :value="item.departId">{{ item.departName }}</a-select-option>
  </a-select>
</template>

<script>
  import {ajaxGetDepartItems} from '@/api/api'

  export default {
    name: "JDepartSelectTag",
    props: {
      groupCode: String,
      placeholder: String,
      triggerChange: Boolean,
      value: String,// 1.接收一个 value prop
    },
    data() {
      return {
        departOptions: [],
      }
    },
    created() {
      console.log(this.groupCode);
      //获取字典数据
      this.initDictData();
    },
    methods: {
      initDictData() {
        //根据字典Code, 初始化字典数组
        ajaxGetDepartItems(this.groupCode, null).then((res) => {

          if (res.success) {
//                console.log(res.result);
            this.departOptions = res.result;
          }
        })
      },
      handleInput(val) {
        console.log(val);
        if(this.triggerChange){
          this.$emit('change', val);
        }else{
          this.$emit('input', val);
        }
      }
    }
  }
</script>

<style scoped>
</style>