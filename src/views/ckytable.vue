<template>
  <div class="table_index_outer">
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
