<template>
  <div class="fe-double-data-picker">
    <el-form-item :label="title">
      <el-date-picker
        style="width: 200px;"
        v-model="defaultValue[0]"
        :placeholder="placeholder"
        :disabled="disabled"
        :value-format="format"
        ref="input"
        :type="dateType"
        :picker-options="dataOptions_start"
        class="fe-single-data-picker-input-content"
      >
      </el-date-picker>
    </el-form-item>
    <span class="spanTyle">至</span>
    <el-form-item>
      <el-date-picker
        style="width: 200px;"
        v-model="defaultValue[1]"
        :placeholder="placeholder"
        :disabled="disabled"
        :value-format="format"
        ref="input"
        :type="dateType"
        :picker-options="dataOptions_end"
        class="fe-single-data-picker-input-content"
      >
      </el-date-picker>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: "fe-single-date-picker",
  props: {
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    value: {
      type: Array
    },
    limit: {
      type: Number
    },
    quickCard: {
      type: Object
    },
    name: {
      type: String
    },
    params: {
      type: Object
    },
    nowTimeStamp: {
      // 时间范围组件新添加
      type: Number
    },
    title: {
      type: String
    },
    before: {
      type: Boolean
    },
    after: {
      type: Boolean
    }
  },
  data() {
    this.dataOptions_start = {
      disabledDate: this.setDateRange_start,
      firstDayOfWeek: 1
    };
    this.dataOptions_end = {
      disabledDate: this.setDateRange_end,
      firstDayOfWeek: 1
    };
    return {
      defaultValue: ["", ""]
    };
  },
  created() {
    if (!this.value) {
      let newTime = new Date();
      let newfullTime =
        newTime.getFullYear() +
        "/" +
        (newTime.getMonth() + 1) +
        "/" +
        newTime.getDate();
      console.log(newfullTime);
      if (this.after) {
        this.defaultValue[0] = newfullTime;
        this.defaultValue[1] =
          newTime.getFullYear() +
          "/" +
          newTime.getMonth() +
          2 +
          "/" +
          newTime.getDate();
      }
      if (this.before) {
        this.defaultValue[1] = newfullTime;
        this.defaultValue[0] =
          newTime.getFullYear() +
          "/" +
          newTime.getMonth() +
          "/" +
          newTime.getDate();
      }
    }
  },
  mounted() {},
  computed: {
    dateType() {
      if (this.format.length < 12) {
        return "date";
      } else {
        return "datetime";
      }
    }
  },
  methods: {
    setDateRange_start(time) {
      debugger;
      if (!this.defaultValue[1]) return false;
      let endTime = new Date(this.defaultValue[1]).getTime();
      return time.getTime() > endTime || time.getTime() < endTime - 2678400000;
    },
    setDateRange_end(time) {
      if (!this.defaultValue[0]) return false;
      let startTime = new Date(this.defaultValue[0]).getTime();
      return (
        time.getTime() < startTime || time.getTime() > startTime + 2678400000
      );
    }
  },
  watch: {
    value: {
      handler(val) {
        this.defaultValue = val ? val : [];
      },
      deep: true,
      immediate: true
    },
    defaultValue(val) {
      console.log(val);
      this.$emit("input", val);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.fe-double-data-picker {
  .spanTyle {
    display: inline-block;
    transform: translateY(5px);
    margin-right: 8px;
  }
}
</style>
