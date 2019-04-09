<template>
  <div class="home">
    <div>table</div>
    <div class="reportParams">
      <reportParams :form="form"></reportParams>
    </div>
    <tableElement
      :realTableData="orderDetailVOList"
      :realTableColumns="returnGoods"
      @childmethods="childmethods"
    ></tableElement>
  </div>
</template>

<script>
import reportParams from "@/components/reportParams.vue";
import tableElement from "@/components/tableElement.vue";
import { ckytestColumns } from "@/assets/tableData";
export default {
  name: "ckytable",
  data() {
    return {
      orderDetailVOList: [],
      returnGoods: ckytestColumns,
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
    getDatas(pageNo = 1) {
      this.pageNo = pageNo;
      let params = {
        pageNo: pageNo,
        pageSize: 20
      };
      this.$http(this.getDataPath, params).then(res => {
        debugger;
        this.orderDetailVOList = res.data.data;
        console.log(res.data.data);
      });
    },
    childmethods(type, val) {
      if (typeof type === "string") {
        this.getDatas(val);
      } else {
        let ntype = type.event.type;
        let params = {};
        type.event.params.map(o => {
          params[o] = val[o];
        });
        this["method" + ntype] &&
          this["method" + ntype](params, type.event.url);
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
