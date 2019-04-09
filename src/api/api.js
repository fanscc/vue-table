import { fetch } from "./http";

// 获取抽奖的奖品数据
export const getLuckyDrawData = params =>
  fetch("/api-hxdgame/api/hxdgame/2210/v1/queryLuckyDrawData", { ...params });

// 获取抽奖结果
// export const getLuckyDrawResult = params => fetch('/api/hxdgame/2220/v1/luckyDraw', { ...params }, 'POST', {withMask: false});
export const getOrderDetailVOList = params =>
  fetch("/api-hxdgame/api/hxdgame/2220/v1/luckyDraw", { ...params }, "POST", {
    withMask: false
  });
