<template>
  <div class="tableEment">
    <slot name="header"></slot>
    <el-table
      ref="table"
      v-loading="loading"
      :data="realTableData"
      :summary-method="getSummaries"
      :show-summary="showSummary"
      border
      style="overflow:auto;margin-bottom: 40px;"
      :cell-style="bodyStyle"
      :header-cell-style="headerStyle"
      @selection-change="pitchonChange"
    >
      <report-column
        v-for="(column, $index) in realTableColumns"
        :key="$index"
        v-on="$listeners"
        v-bind="column"
      ></report-column>
    </el-table>
    <el-pagination
      style="text-align:right;padding-bottom: 20px;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <slot name="footer"></slot>
  </div>
</template>
<script>
import reportColumn from "./reportColumn.vue";
// import _ from 'lodash'
/* eslint-disable */
export default {
    name: 'report-table',
    props: {
      realTableData: {
          type: Array
      },
      realTableColumns: {
        type: Array
      },
      currentPage: {
        type: Number
      },
      loading: {
        type: Boolean
      },
      showSummary: {
        type: Boolean,
        default: false
      },
      SummArryNameArry: {
        type: Array
      },
      total: {
        type: Number 
      }
    },
    components: {
      reportColumn
    },
    data() {
      return {
        bodyStyle: {
          'font-size': "12px",
          'padding': '0',
          'height': '40px',
        },
        headerStyle: {
          'font-size': '12px',
          'font-weight': 'blod',
          'color': 'rgba(49, 65, 86, 0.82)',
          'padding': '0',
          'height': '40px'
        },
        multipleSelection: []
      }
    },
    watch: {

    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    deactivated() {
    },
    activated() {

    },
    methods: {
      handleSizeChange(val) {
        this.$emit('childmethods', 'methodSizeChange', val);
      },
      handleCurrentChange(val) {
        this.$emit('childmethods', 'methodCurrentChange', val);
      },
      pitchonChange(val) {
        this.multipleSelection = val;
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.map((item,index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          if (this.SummArryNameArry.includes(item.property)) { 
             const values = data.map(items => Number(items[item.property]));
             if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' 元';
            } else {
              sums[index] = 'N/A';
            }
          }
        })
         return sums;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tableEment {
  display: flex;
  flex-direction: column;
  & /deep/ .el-table {
    width: 100%;
    flex: 1;
  }
}
</style>
