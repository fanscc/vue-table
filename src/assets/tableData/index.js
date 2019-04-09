export const distributionlistColumns = [
  {
    title: "序号",
    type: "index",
    width: "60"
  },
  {
    title: "货号",
    name: "spuCode"
  },
  {
    title: "商品名称",
    name: "spuName"
  },
  {
    title: "结算价",
    name: "otherTotal",
    type: "formatter"
  },
  {
    title: "折算价",
    name: "conversionPrice",
    type: "formatter"
  },
  {
    title: "数量",
    name: "number"
  },
  {
    title: "配货状态",
    type: "print",
    width: "100"
  }
];

export const ckytestColumns = [
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
          type: "router",
          params: ["order_code"],
          url: "/about"
        }
      },
      {
        name: "删除",
        icon: null,
        event: {
          type: "delete",
          params: ["order_code"],
          url: "/report/delete/order_code"
        }
      }
    ]
  }
];
