<template>
  <div class="home">
    <div>table</div>
    <div class="reportParams">
      <reportParams
        :froms="ckytesttable.froms"
        @buttomChild="buttomChild"
        ref="queryButton"
      ></reportParams>
    </div>
    <tableElement
      :realTableData="orderDetailVOList"
      :realTableColumns="ckytesttable.ckytestColumns"
      @childmethods="childmethods"
    ></tableElement>
  </div>
</template>

<script>
import reportParams from "@/components/reportParams.vue";
import tableElement from "@/components/tableElement.vue";
import { ckytesttable } from "@/assets/tableData";
export default {
  name: "ckytable",
  data() {
    return {
      orderDetailVOList: [],
      ckytesttable: ckytesttable,
      getDataPath: "/api-hxdgame/api/hxdgame/2220/v1/luckyDraw",
      pageNo: 1,
      form: {
        orderNo: "",
        orgName: "",
        startTime: "",
        endTime: "",
        status: 0,
        supplierId: null,
        transWay: 1 // 发货方式默认为“代发”
      }
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
      });
    },
    buttomChild(type, val) {
      this[type] && this[type](val);
    },
    childmethods(type, val) {
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
    methodinquire(val) {
      debugger;
      let onflag = this.$refs.queryButton.efficacy();
      console.log(onflag);
      if (onflag) {
        this.getDatas(1, val);
      }
    },
    methodrouter(val, url) {
      this.$router.push({ path: url, query: val });
    },
    methoddelete(val, url) {
      this.$http(url, val).then(res => {
        console.log(res);
        this.getDatas(this.pageNo);
      });
    }
  }
};
</script>
