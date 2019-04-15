<template>
  <div class="report-params">
    <el-form
      ref="form"
      :inline="true"
      :model="valueClone"
      label-width="110px"
      size="small"
      :rules="froms.formRules"
    >
      <div
        class="report-params-item"
        :class="[{ 'is-hidden': item.isHidden }]"
        v-for="(item, $index) in froms.params"
        :key="$index"
      >
        <component
          :is="getComponentName(item)"
          ref="formComponents"
          v-model="valueClone[item.name]"
          v-bind="item"
        ></component>
      </div>
      <el-form-item>
        <el-button
          :type="item.style"
          v-for="(item, index) in froms.buttons"
          :key="index"
          @click="onSubmit(item.type)"
          >{{ item.type | fiterName }}</el-button
        >
      </el-form-item>
      <!-- </el-row> -->
    </el-form>
  </div>
</template>
<script>
import fsInput from "./common/input";
import fsSelect from "./common/select";
/* eslint-disable */
  let config = null
  export default {
    name: 'report-params',
    components: {
      fsInput,
      fsSelect
    },
    data(){
      return{
        suppliersMap: [],
        valueClone: {}
      }
    },
    props: {
      froms: {
        type: Object
      }
    },
    computed: {
    },
    filters: {
      fiterName(val) {
         let objs = {
          'inquire': '查询',
          'export': '导出'
        }
        return objs[val]
      }
    },
    mounted() {
    },
    beforeMount() {
    },
    watch: {
    },
    created() {
    },
    methods: {
      getComponentName(item) {
        const componentName = item.inputModel
        return componentName
      },
      efficacy() {
        let onflag
        this.$refs['form'].validate((valid) => {
           onflag = valid
        })
        return onflag
      },
      onSubmit(type) {
        this.$emit('buttomChild', `method${type}`, this.valueClone)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.report-params {
  .report-params-item {
    display: inline-block;
  }
}
</style>
