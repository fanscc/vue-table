/* eslint-disable array-callback-return */
<template>
  <div class="table_index">
    <div class="reportParams">
      <reportParams
        ref="queryButton"
        :froms="tableConfigurationJson.froms"
        :searchData="searchData"
        @getTableData="getTableData"
        @buttomChild="buttomChild"
      ></reportParams>
    </div>
    <tableElement
      ref="tableConten"
      :realTableData="orderDetailVOList"
      :realTableColumns="tableConfigurationJson.ckytestColumns"
      :loading="loading"
      :total="total"
      :showSummary="showSummary"
      :SummArryNameArry="SummArryNameArry"
      @childmethods="childmethods"
    ></tableElement>
  </div>
</template>

<script>
import reportParams from "@/components/reportParams.vue";
import tableElement from "@/components/tableElement.vue";
// eslint-disable-next-line import/first

export default {
  name: "table_index",
  props: {
    tableConfigurationJson: {
      type: Object
    }
  },
  data() {
    return {
      orderDetailVOList: [],
      pageNo: 1,
      pageSize: 20,
      loading: false, // 控制table是否显示loading的问题
      total: 0,
      searchData: {}
    };
  },
  computed: {
    showSummary() {
      return this.tableConfigurationJson.showSummary;
    },
    SummArryNameArry() {
      return this.tableConfigurationJson.SummArryNameArry;
    }
  },
  components: {
    tableElement,
    reportParams
  },
  created() {
    // this.getDatas();
  },
  methods: {
    getTableData(val) {
      this.searchData.params = val;
      this.getDatas();
    },
    getDatas(pageNo = 1) {
      this.loading = true;
      this.pageNo = pageNo;
      let params = {
        current: pageNo,
        size: this.pageSize
      };
      if (!this.tableConfigurationJson.static)
        this.tableConfigurationJson.static = {};
      // eslint-disable-next-line max-len
      const searchParams = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const ite in this.searchData.params) {
        if (ite === "doublequery") {
          searchParams.createTimeStart = this.searchData.params[ite][0]
            ? `${this.searchData.params[ite][0]} 00:00:00`
            : null;
          searchParams.createTimeEnd = this.searchData.params[ite][1]
            ? `${this.searchData.params[ite][1]} 23:59:59`
            : null;
        } else {
          searchParams[ite] = this.searchData.params[ite];
        }
      }
      // eslint-disable-next-line max-len
      params = Object.assign(
        {},
        this.tableConfigurationJson.static,
        params,
        searchParams
      );
      debugger;
      this.$http[this.tableConfigurationJson.methods](
        this.tableConfigurationJson.getDataPath,
        { params }
      )
        .then(res => {
          this.loading = false;
          debugger;
          if (res.code === 0) {
            this.orderDetailVOList = res.data.data;
            this.total = res.data.totalRows;
          } else {
            this.$message.error(res.msg || "请求异常");
          }
        })
        .catch(() => {
          this.loading = false;
          this.$message.error("网络异常");
        });
    },
    buttomChild(type, val, eventObj) {
      this[type] && this[type](val, eventObj);
    },
    childmethods(type, val) {
      if (type === "methodCurrentChange") {
        this.getDatas(val);
      } else if (type === "methodSizeChange") {
        this.pageSize = val;
        this.getDatas();
      } else {
        const ntype = type.event.type;
        const params = {};
        // eslint-disable-next-line array-callback-return
        type.event.params.map(o => {
          params[o] = val[o];
        });
        this[ntype] && this[ntype](params, type.event.url);
      }
    },
    searchMethod() {
      this.$refs.queryButton.efficacy().then(res => {
        res && this.getDatas(1);
      });
    },
    // 导出按钮
    exportMethod(val, eventObj) {
      // 导出如果没有勾选则导出查询内容
      const multipleSelection = this.$refs.tableConten.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message(eventObj.path);
      } else {
        this.$message("导出勾选的数据");
      }
    },
    // 启用按钮
    startUsingMethod(val, eventObj) {
      const multipleSelection = this.$refs.tableConten.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.warning("请最少勾选一条数据");
      } else {
        const params = [];
        // eslint-disable-next-line array-callback-return
        multipleSelection.map((item, index) => {
          params[index] = {};
          // eslint-disable-next-line array-callback-return
          eventObj.params.map(o => {
            params[index][o] = item[o];
          });
        });
        this.$http
          .post(eventObj.path, params)
          .then(res => {
            if (res.code === 0 && res.success) {
              this.$message.success(res.msg);
              this.getDatas(this.pageNo);
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {
            this.$message.error("网络异常");
          });
      }
    },
    routerMethod(val, url) {
      this.$router.push({ path: url, query: val });
    },
    deleteMethod() {
      this.$confirm("确定要删除该节点吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        setTimeout(() => {}, 400);
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.table_index {
  .reportParams {
    padding: 20px;
  }
}
</style>
