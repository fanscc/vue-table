export const ckytesttable = {
  froms: {
    formRules: {
      receivingPointName: [
        { required: true, message: "请输入收货点名", trigger: "blur" },
        {
          validator: function(rule, val, callback) {
            let rel = new Function("return " + rule.reg)();
            if (!rel.test(val)) {
              callback("请输入正确的手机号");
            }
          },
          trigger: "blur",
          reg:
            "/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$/"
        }
      ],
      type: [{ required: true, message: "必选", trigger: "change" }]
    },
    params: [
      {
        inputModel: "fsInput",
        isHidden: false,
        name: "receivingPointName",
        placeholder: "请选择活动周",
        title: "活动时间周",
        regulation: "receivingPointName"
      },
      {
        inputModel: "fsSelect",
        isHidden: false,
        name: "type",
        path: "/cky/getSuppliersMap",
        placeholder: "请选择产品品牌",
        title: "产品子品牌",
        regulation: "type",
        paramsMaping: {
          label: "supplierName",
          value: "supplierId"
        }
      }
    ],
    buttons: [{ style: "primary", type: "inquire" }, { type: "export" }]
  },
  ckytestColumns: [
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
      name: "lastpushTime",
      title: "最后推送时间",
      aglign: "center"
    },
    {
      name: "",
      title: "操作",
      type: "button",
      buttons: [
        {
          name: "编辑",
          icon: null,
          event: {
            type: "methodrouter",
            params: ["order_code"],
            url: "/about"
          }
        },
        {
          name: "删除",
          icon: null,
          event: {
            type: "methoddelete",
            params: ["order_code"],
            url: "/report/delete/order_code"
          }
        }
      ]
    }
  ]
};
