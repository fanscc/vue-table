<template>
  <el-table-column
    v-if="type === 'print'"
    :label="title"
    :prop="name"
    :align="align"
    :width="width"
  >
    <template slot-scope="scope">
      <span class="print_check" v-if="scope"> </span>
    </template>
  </el-table-column>

  <el-table-column
    :type="type"
    :label="title"
    :prop="name"
    :align="align"
    :selectable="selectAble.bind(this)"
    :width="80"
    :reserve-selection="true"
    v-else-if="type === 'selection'"
  >
  </el-table-column>

  <el-table-column
    v-else-if="type === 'formatter'"
    :label="title"
    :prop="name"
    :align="align"
    :width="width"
    :type="type"
    :formatter="formatterMethods"
  >
  </el-table-column>

  <el-table-column
    :label="title"
    :prop="name"
    :align="align"
    :width="buttonWidth"
    v-else-if="type === 'button'"
  >
    <template slot-scope="scope">
      <div style="display:flex;justify-content: space-around;">
        <span v-for="(button, idx) in buttons" :key="idx">
          <el-button
            v-if="buttonShow(scope.$index, scope.row, button)"
            size="mini"
            type="primary"
            :disabled="!!button.disabled"
            @click.native.prevent.stop="handleButton(idx, scope.row, button)"
            >{{ button.name }}
          </el-button>
        </span>
      </div>
    </template>
  </el-table-column>

  <el-table-column
    v-else
    :label="title"
    :prop="name"
    :align="align"
    :width="width"
    :type="type"
  >
  </el-table-column>
</template>
<script>
export default {
  name: "report-column",
  props: {
    type: {
      type: String
    },
    width: {
      type: String
    },
    hidden: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    name: {
      type: String
    },
    align: {
      type: String,
      default: "center"
    },
    buttons: {
      type: Array,
      defalut: []
    },
    selectable: {
      type: String
    },
    formatterType: {
      type: String
    }
  },
  data() {
    return {};
  },
  watch: {},
  created() {},
  computed: {
    buttonWidth() {
      if (this.buttons) {
        return this.buttons.length * 100;
      } else {
        return this.width;
      }
    }
  },
  methods: {
    formatterMethods(row, column) {
      if (this.formatterType) {
        const Fn = Function;
        return new Fn(`return ${this.formatterType}`)()(row);
      }
      const nums = parseFloat(row[column.property] || 0).toFixed(2);
      const tostringNum = nums.toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return `￥ ${tostringNum}`;
    },
    buttonShow(index, row, button) {
      if (button.isShow) {
        const Fn = Function;
        return new Fn("return " + button.isShow)()(index, row, button);
      } else {
        return true;
      }
    },
    handleButton(idx, itemRow, button) {
      this.$emit("childmethods", button, itemRow);
    },
    selectAble(row, index) {
      if (this.selectable) {
        const Fn = Function;
        return new Fn("return " + this.selectable)()(row, index);
      } else {
        return true;
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.print_check {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid #ddd;
}
</style>
