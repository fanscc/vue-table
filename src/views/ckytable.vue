<template>
  <div class="home">
    <div class="reportParams">
      <reportParams
        ref="queryButton"
        :froms="ckytesttable.froms"
        @buttomChild="buttomChild"
      ></reportParams>
    </div>
    <tableElement
      ref="tableConten"
      :realTableData="orderDetailVOList"
      :realTableColumns="ckytesttable.ckytestColumns"
      :loading="loading"
      :showSummary="showSummary"
      :showSummArry="showSummArry"
      @childmethods="childmethods"
    ></tableElement>
  </div>
</template>

<script>
import reportParams from "@/components/reportParams.vue";
import tableElement from "@/components/tableElement.vue";
import { ckytesttable } from "@/assets/tableData";
import { setTimeout } from "timers";
export default {
  name: "ckytable",
  data() {
    return {
      orderDetailVOList: [],
      ckytesttable: ckytesttable,
      getDataPath: "/api-hxdgame/api/hxdgame/2220/v1/luckyDraw",
      pageNo: 1,
      showSummary: true,
      showSummArry: [6],
      loading: false // 控制table是否显示loading的问题
    };
  },
  components: {
    tableElement,
    reportParams
  },
  created() {
    this.getDatas();
  },
  methods: {
    getDatas(pageNo = 1, val) {
      this.loading = true;
      this.pageNo = pageNo;
      let params = {
        pageNo: pageNo,
        pageSize: 20
      };
      if (val) {
        params = Object.assign({}, params, val);
      }
      console.log(params);
      this.$http(this.getDataPath, params).then(res => {
        this.orderDetailVOList = res.data.data;
        console.log(res.data.data);
        this.loading = false;
      });
    },
    buttomChild(type, val, path) {
      this[type] && this[type](val, path);
    },
    childmethods(type, val) {
      debugger;
      if (type === "methodCurrentChange") {
        this.getDatas(val);
      } else {
        let ntype = type.event.type;
        let params = {};
        type.event.params.map(o => {
          params[o] = val[o];
        });
        this[ntype] && this[ntype](params, type.event.url);
      }
    },
    searchMethod(val) {
      this.$refs.queryButton.efficacy().then(res => {
        res && this.getDatas(1, val);
      });
    },
    exportMethod(val, url) {
      // 导出如果没有勾选则导出查询内容
      let multipleSelection = this.$refs.tableConten.multipleSelection;
      console.log(multipleSelection, val);
      if (multipleSelection.length === 0) {
        this.$message(url);
        alert(`导出查询条件为${JSON.stringify(val)}的数据`);
      } else {
        alert(`导出勾选的数据`);
      }
    },
    routerMethod(val, url) {
      this.$router.push({ path: url, query: val });
    },
    deleteMethod(val) {
      this.$confirm("确定要删除该节点吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        setTimeout(() => {
          alert(`第${JSON.stringify(val)}条删除成功`);
        }, 400);
      });
    }
  }
};
</script>
