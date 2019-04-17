<template>
  <div class="fe-input">
    <el-form-item :label="title" :prop="regulation">
      <el-input
        :placeholder="placeholder"
        :prefix-icon="icon"
        ref="input"
        v-model="defaultValue"
        class="fe-input-content"
        :disabled="disabled"
      ></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: "fe-input",
  props: {
    value: {
      type: String
    },
    title: {
      type: String
    },
    regulation: {
      type: String,
      default: ""
    },
    prop: {
      type: Array
    },
    placeholder: {
      type: String
    },
    icon: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      defaultValue: ""
    };
  },
  watch: {
    value: {
      handler(val) {
        this.defaultValue = val;
        console.log(this.value);
      },
      deep: true,
      immediate: true
    },
    defaultValue(val) {
      this.$emit("input", val);
    }
  },
  methods: {}
};
</script>
<style rel="stylesheet/scss" lang="scss"></style>
