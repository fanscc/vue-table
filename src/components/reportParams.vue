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
      <div class="slideToggle" :class="[{ slideToggle_hiden: slideToggleDom }]">
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
      </div>
      <el-row>
        <el-form-item>
          <el-col :span="24">
            <el-button
              :type="item.style"
              v-for="(item, index) in froms.buttons"
              :key="index"
              @click="onSubmit(item.type, item.event)"
              >{{ item.typeName }}</el-button
            >
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import fsInput from "./common/input";
import fsSelect from "./common/select";
import fsDatapicker from "./common/datePicker";
import fsdoubleDatePicker from "./common/doubleDatePicker";
/* eslint-disable */
  let config = null
  export default {
    name: 'report-params',
    components: {
      fsInput,
      fsSelect,
      fsDatapicker,
      fsdoubleDatePicker
    },
    data(){
      return{
        slideToggleDom: false,
        suppliersMap: [],
        valueClone: {
        }
      }
    },
    props: {
      froms: {
        type: Object
      },
       searchData: {
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
      'froms.params': {
        async handler(val) {
          let paramsClone = this.$utils.deepClone(this.froms.params)
          await Promise.all(
            paramsClone.map(async (item,index) => {
                if (item.defaultVal) {
                    // 代表着下拉框有默认值需要先请求接口                
                    let res = await this.getDataSelect(item.path,item.staticParams) 
                    if (item.dataname) {
                        res = res[item.dataname]
                    }
                    if (item.paramsMaping) {
                        res.map((its,index) => {
                            its['label'] = its[item.paramsMaping['label']]
                            its['value'] = its[item.paramsMaping['value']]
                        })        
                    }
                    res.map((ite,index) => {
                        if (ite.label === item.defaultVal) {
                            item.value = ite.value
                        }
                    })  
                }
                this.timeCycle(item)
                this.$set(this.valueClone, item.name, item.value)
            })
          )
          this.$emit("getTableData", this.valueClone)
        },
        deep: true,
        immediate: true
      },
      valueClone: {
        handler(val) { 
          this.searchData.params = val      
        },
        deep: true,
        immediate: true
      }
    },
    created() {
    },
    methods: {
      getComponentName(item) {
        const componentName = item.inputModel
        return componentName
      },
      getDataSelect(path,val = {}) {
        let endParams = Object.assign({}, val)
        return new Promise((resolve, reject) => {
            this.$http.get(path).then(res => {
                resolve(res.model);
            })            
        })  
      },
      efficacy() {
        return new Promise((resolve, reject) => {
          this.$refs['form'].validate((valid) => {
            resolve(valid)
          })
        })
      },
       timeCycle(item) {
         if (item.value) return;
         if (item.inputModel === 'fsdoubleDatePicker') {
            // 双层时间控件
              item.value = [];
              const newTime = new Date();
              const newfullTime =
                `${newTime.getFullYear()
                }/${
                newTime.getMonth() + 1
                }/${
                newTime.getDate()}`;
              if (item.after) {
                const othernewTime = new Date(new Date().getTime()- 0 + item.timeLag)
                item.value[0] = newfullTime;
                item.value[1] =
                  `${othernewTime.getFullYear()
                  }/${
                  othernewTime.getMonth() + 1
                  }/${
                  othernewTime.getDate()}`;
              } else {
                const othernewTime = new Date(new Date().getTime() - item.timeLag)
                item.value[1] = newfullTime;
                item.value[0] =
                  `${othernewTime.getFullYear()
                  }/${
                  othernewTime.getMonth() + 1
                  }/${
                  othernewTime.getDate()}`;
            }
          }
          if (item.inputModel === 'fsDatapicker') {
              const newTime = new Date();
              const newfullTime =
                `${newTime.getFullYear()
                }/${
                newTime.getMonth() + 1
                }/${
                newTime.getDate()}`;
                item.value = newfullTime
          }
      },
      onSubmit(type,event) {
        if (type === 'hidden' || type === 'showSearch') {
          this.slideToggleDom = !this.slideToggleDom;
          this.froms.buttons.map((item,index) => {
            if (item.type === type) {
              if (this.slideToggleDom) {
                item.typeName = '显示查询条件'
              } else {
                item.typeName = '隐藏'
              }
            }
          })
          return
        }
        if (type === 'empty') {
          this.valueClone = {};
          return
        }
        if (event) {
          this.$emit('buttomChild', `${event.type}Method`, this.valueClone, event)
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.report-params {
  .report-params-item {
    display: inline-block;
  }
  .slideToggle {
    transition: max-height .5s;
    max-height: 500px; 
    overflow: hidden;
  }
  .slideToggle_hiden {
    max-height: 0;
  }
}
</style>
