export const ckytesttable = {
  froms: {
    formRules: {
      // 配置效验规则
      receivingPointName: [
        { required: true, message: "请输入收货点名", trigger: "blur" },
        {
          validator: function(rule, val, callback) {
            let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(val)) {
              callback("请输入正确的手机号");
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ],
      type: [{ required: true, message: "必选", trigger: "change" }]
    },
    params: [
      // 配置查询条件
      {
        inputModel: "fsInput", // 用什么组件
        isHidden: false, // 是否隐藏
        name: "receivingPointName", // 给后台传参的字段名
        placeholder: "请选择活动周",
        title: "活动时间周", // lable显示内容
        regulation: "receivingPointName", // 跟上面效验规则对应
        value: "15274026566" // 默认值
      },
      {
        inputModel: "fsSelect",
        isHidden: false,
        name: "type",
        path: "/cky/getSuppliersMap", // 下来框的请求接口
        placeholder: "请选择产品品牌",
        title: "产品子品牌",
        regulation: "type",
        defaultVal: "和昌", // 默认值
        paramsMaping: {
          // 吧后台返回的字段转成lable跟value
          label: "supplierName",
          value: "supplierId"
        }
      },
      {
        inputModel: "fsSelect",
        isHidden: false,
        name: "type1",
        parent: "type", // 是否有父级关联 对应父级的name值
        path: "/cky/getSuppliersMap",
        placeholder: "请选择产品品牌",
        title: "产品子品牌2",
        multiple: true, // 是否多选
        value: [],
        paramsMaping: {
          label: "supplierName",
          value: "supplierId"
        }
      },
      {
        format: "yyyy-MM-dd", // 时间格式
        inputModel: "fsDatapicker",
        isHidde: false,
        name: "queryDate",
        placeholder: "请选择时间",
        title: "请选择时间",
        value: "2019-11-12" // 默认值
      },
      {
        format: "yyyy-MM-dd",
        inputModel: "fsdoubleDatePicker", // 开始时间至结束时间
        isHidde: false,
        name: "doublequery",
        placeholder: "请选择时间",
        title: "请选择时间",
        before: true, // 开始时间是结束时间算出来, after 结束时间是开始时间算出来
        value: ["", "2019-4-4"] // 开始时间跟结束时间默认值
      }
    ],
    buttons: [
      // 配置查询条件下面的按钮
      {
        style: "primary",
        type: "inquire",
        event: {
          path: "/form/customer/submit",
          type: "search"
        }
      },
      { style: "primary", type: "empty" },
      {
        style: "primary",
        type: "export",
        event: {
          path: "/form/customer/submit",
          type: "export"
        }
      },
      { style: "primary", type: "hidden" }
    ]
  },
  ckytestColumns: [
    // 配置表格
    {
      align: "center",
      name: "",
      title: "序号",
      type: "index",
      width: "50"
    },
    {
      align: "center",
      name: "",
      selectable:
        "function(row, index) { if(index%2 === 0) { return true} else { return false }}",
      title: "多选",
      type: "selection",
      width: "60"
    },
    {
      name: "noticeRole",
      title: "通知角色"
    },
    {
      name: "msgDetails",
      title: "消息详情",
      aglign: "center"
    },
    {
      name: "creationTime",
      title: "创建时间",
      aglign: "center"
    },
    {
      name: "creationMan",
      title: "创建人",
      aglign: "center"
    },
    {
      name: "money",
      type: "formatter",
      title: "授权金额",
      aglign: "right"
    },
    {
      name: "lastpushTime",
      title: "最后推送时间",
      aglign: "center"
    },
    {
      name: "",
      title: "操作",
      type: "button",
      buttons: [
        // 配置操作栏
        {
          name: "编辑",
          icon: null,
          event: {
            type: "routerMethod",
            params: ["order_code"],
            url: "/about"
          }
        },
        {
          name: "删除",
          icon: null,
          event: {
            type: "deleteMethod",
            params: ["order_code"],
            url: "/report/delete/order_code"
          }
        }
      ]
    }
  ]
};
