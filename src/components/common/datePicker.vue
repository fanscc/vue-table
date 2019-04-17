<template>
  <div class="fe-single-data-picker">
    <el-form-item :label="title">
      <el-date-picker
        style="width: 200px;"
        v-model="defaultValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :value-format="format"
        ref="input"
        :type="dateType"
        :picker-options="dataOptions"
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
      type: String
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
    }
  },
  data() {
    this.dataOptions = {
      disabledDate: this.setDateRange,
      firstDayOfWeek: 1
    };
    return {
      defaultValue: "",
      preDefaultValue: "" // 上一个时间
    };
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
    setDateRange() {
      return false;
    }
  },
  watch: {
    value: {
      handler(val) {
        this.defaultValue = val;
      },
      deep: true,
      immediate: true
    },
    defaultValue(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss"></style>
