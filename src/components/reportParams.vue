<template>
  <div class="report-params">
    <el-form ref="form" :inline="true" :model="form" label-width="80px">
      <el-form-item label="订单号">
        <el-input v-model="form.orderNo" clearable></el-input>
      </el-form-item>
      <el-form-item label="供应商">
        <el-select
          v-model="form.supplierId"
          clearable
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in suppliersMap"
            :key="item.supplierId"
            :label="item.supplierName"
            :value="item.supplierId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-form-item label="订单状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="开单未打包" :value="1"></el-option>
            <el-option label="打包未入库" :value="2"></el-option>
            <el-option label="入库未发货" :value="3"></el-option>
            <el-option label="已发货" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.startTime"
                value-format="yyyy-MM-dd"
                @change.native="form.startTime = $event.target.value"
                style="width:202px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center;">至</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.endTime"
                value-format="yyyy-MM-dd"
                @change.native="form.endTime = $event.target.value"
                style="width:202px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onExport">导出</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
/* eslint-disable */
  let config = null
  export default {
    name: 'report-params',
    components: {
    },
    data(){
      return{
        suppliersMap: []
      }
    },
    props: {
      form: {
        type: Object
      }
    },
    computed: {
    },
    mounted() {
    },
    beforeMount() {
    },
    watch: {
    },
    created() {
      this.getSuppliersMap()
    },
    methods: {
      getSuppliersMap() {
        this.$http('/cky/getSuppliersMap').then(res => {
          console.log(res)
          this.suppliersMap= res.model
        })
      },
      onSubmit() {
        console.log(this.form)
      },
      onExport() {}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
 
</style>
