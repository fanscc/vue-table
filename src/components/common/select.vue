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
      needQuery: Boolean | undefined | String,
      isEdit: Boolean | undefined | String,
      value: {
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
        dataOptions: [],
        isFirst: 0
      }
    },
    watch: {
      value: {
        handler(val) {
          this.defaultValue = val
        },
        deep: true,
        immediate: true
      },
      defaultValue(val) {
        this.$emit('input', val)
        let guanliancompent = ''
        this.$parent.$children.map((item) => {
            if (item.$attrs.parent === this.name) {
                guanliancompent = item
            }
        })
        if (guanliancompent) {
            guanliancompent.defaultValue = ''
            guanliancompent.dataOptions = []
            let params = this.name
            guanliancompent.getData({params: val})
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData(val = {}) {
        if (this.$attrs.parent && !val.params) {
            return
        }
        let endParams = {}
        if (this.needQuery) {
          endParams = Object.assign({}, this.staticParams, val)
        } else {
          endParams = Object.assign({}, this.staticParams, val, this.$route.query)
        } 
        console.log(endParams)
        this.$http(this.path, endParams).then(res => {
            this.dealData(res.model);
        })     
      },
      dealData(data) {
        data.map((item) => {
          item['label'] = item[this.paramsMaping['label']]
          item['value'] = item[this.paramsMaping['value']]
        })
        this.dataOptions = data
        // 当父级选框重新选择时，清空子级选框的值
        if (this.target && this.target.length > 0) {
        } else {
          if (this.isEdit === true) {
            if (!this.isFirst) {
              this.isFirst = 1
              return false
            }
          }
          if (this.defaultValue) {
            this.defaultValue = this.multiple ? [] : ''  
          }
        }
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
 
</style>
