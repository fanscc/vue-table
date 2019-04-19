<template>
  <div class="fe-select">
    <el-form-item :label="title" :prop="regulation">
      <el-select
        style="width: 200px"
        v-model="defaultValue"
        :placeholder="placeholder"
        class="fe-select-content"
        :disabled="disabled"
        filterable
        clearable
        dataOptions
        :multiple="multiple"
        :loading="loading"
        ref="input"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <!--<el-option-->
        <!--value=""-->
        <!--key="all"-->
        <!--label="全部"-->
        <!--&gt;全部</el-option>-->
        <el-option v-for="item in dataOptions" :key="item.value" v-bind="item">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
// import request from '@/utils/request'
// import _ from 'lodash'
/* eslint-disable */
  export default {
    name: 'fe-select',
    props: {
      prop: {
          type: Array
      },
      regulation: {
        type: String
      },
      title: {
          type: String
      },
      placeholder: {
          type: String
      },
      disabled: {
        type: Boolean
      },
      isEdit: Boolean | undefined | String,
      value: {
        type: String | Array
      },
      defaultVal: {
        type: String | Array
      },
      multiple: {
        type: Boolean,
        default: false
      },
      path: {
        type: String
      },
      immediate: {
        type: Boolean,
        default: false
      },
      name: {
        type: String
      },
      staticParams: {
        type: Object,
        default() {
          return {}
        }
      },
      dataname: {
        type: String 
      },
      paramsMaping: {
        type: Object,
        default() {
          return {
            'label': 'label',
            'value': 'value'
          }
        }
      }
    },
    mounted() {
      if (this.immediate) {
        this.getData()
      }
    },
    data() {
      return {
        defaultValue: this.multiple ? [] : '',
        loading: false,
        dataOptions: []
      }
    },
    watch: {
      value: {
        handler(val) {
          this.defaultValue = val? val : this.multiple? []: ''
          console.log(this.value);
        },
        deep: true,
        immediate: true
      },
      defaultValue(val) {
        this.$emit('input', val)
        this.clearChild(val)
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData(val = {}) {
        if (this.$attrs.parent && !val.params) {
            return new Promise((resolve, reject) => {
              resolve()
            })
        }
        let endParams = Object.assign({}, this.staticParams, val)
        console.log(endParams)
        return new Promise((resolve, reject) => {
          this.$http(this.path, endParams).then(res => {
            if (this.dataname) {
              this.dealData(res.model[this.dataname]); 
            } else {
              this.dealData(res.model); 
            }        
          })    
        })  
      },
      dealData(data) {
        debugger
        data.map((item) => {
          item['label'] = item[this.paramsMaping['label']]
          item['value'] = item[this.paramsMaping['value']]
        })
        this.dataOptions = data
      },
      // 城市联动的更改父级的时候清空子级
      clearChild(val) {
        let guanliancompent = ''
        this.$parent.$children.map((item) => {
            if (item.$attrs.parent === this.name) {
                guanliancompent = item
            }
        })
        if (guanliancompent) {
            guanliancompent.defaultValue = guanliancompent.multiple? [] : ''
            guanliancompent.dataOptions = []
            let params = this.name
            guanliancompent.getData({params: val})
        }
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
 
</style>
