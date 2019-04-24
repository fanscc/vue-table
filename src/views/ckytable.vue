<template>
  <div class="table_index_outer">
    11
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#iconzu2"></use>
    </svg>
    <table-index :tableConfigurationJson="tableConfigurationJson"></table-index>
  </div>
</template>

<script>
import tableIndex from "./index.vue";
import { ckytesttable } from "@/assets/tableData";

export default {
  name: "CreditQualificationManage",
  data() {
    return {
      tableConfigurationJson: ckytesttable
    };
  },
  created() {},
  computed: {},
  components: {
    tableIndex
  }
};
</script>
