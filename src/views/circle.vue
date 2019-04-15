<template>
  <div class="circle" >
    <div class="svgView" :id="`svgView${id}`"></div>
    <div class="data">
      <span>SC-OT达成率</span>
      <span>60%</span>
      <span>时间进度 50%</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Circle',
  props: {
    id: {
      required: false,
      default: 1
    },
    size: {
      required: false,
      default: 30
    }
  },
  data () {
    return {
      startX: 5,
      startY: 130,
      dotStartX: 15,
      dotStartY: 130,
      radius: 120,
      dotRadius: 110,
      svg: ''
    }
  },
  created () {
    console.log('初始化')
    this.$nextTick(() => {
      this.svgView(`#svgView${this.id}`, this.size)
      this.drawtext()
    })
  },
  methods: {
    drawtext () {
      let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('x', 30)
      text.setAttribute('y', 130)
      text.setAttribute('fill', 'red')
      text.innerHTM = 123
      this.svg.appendChild(text)
    },
    /**
     * 传入相应参数返回圆形制定半径的弧度坐标
     * @param {*} x 中心点X坐标
     * @param {*} y 中心点y坐标
     * @param {*} R 圆半径
     * @param {*} a 角度
     */
    coordMap (x, y, R, a) {
      debugger
      let ta = a * Math.PI / 180
      let tx = R * Math.cos(ta) // 角度邻边
      let ty = R * Math.sin(ta) // 角度的对边
      if (a === 0) {
        return {
          x: x,
          y: y
        }
      } else {
        return {
          x: x + R - tx,
          y: y - ty // 注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。
        }
      }
    },
    /**
   * 创建弧线
   * @param {*} data.startAngle 开始角度
   * @param {*} data.endAngle 结束角度
   * @param {*} data.R 圆半径
   * @param {*} data.x 中心点X坐标
   * @param {*} data.y 中心点y坐标
   * @param {*} data.color 边框颜色  默认#CCC
   * @param {*} data.strokeWidth 边框宽度 默认1
   * @param {*} data.strokelinecap 不同类型的路径的开始结束点 可选值 butt round square  默认butt
   * @param {*} data.strokeDasharray 虚线设置 它是一个<length>和<percentage>数列，数与数之间用逗号或者
   * 空白隔开，指定短划线和缺口的长度。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值。因此，5,3,2等同于5,3,2,5,3,2。
   * @param {*} data.transform CSS3旋转设置
   */
    drawSVG (data) {
      // 起点坐标
      let s = this.coordMap(data.x, data.y, data.R, data.startAngle)
      // 结束坐标
      let e = this.coordMap(data.x, data.y, data.R, data.endAngle)
      // 创建弧线路径
      let tpath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      // console.log(s)
      // console.log(e)
      // 画一段到(x,y)的椭圆弧. 椭圆弧的 x, y 轴半径分别为 rx,ry. 椭圆相对于 x 轴旋转 x-axis-rotation 度. large-arc=0表明弧线小于180读, large-arc=1表示弧线大于180度. sweep=0表明弧线逆时针旋转, sweep=1表明弧线顺时间旋转.
      // svg : [A | a] (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
      let path = 'M' + s.x + ',' + s.y + 'A' + data.R + ',' + data.R + ',0,' + (+(data.endAngle - data.startAngle > 180)) + ',1,' + e.x + ',' + e.y
      // console.log(path)
      // 设置路径
      tpath.setAttribute('d', path)
      // 去掉填充
      tpath.setAttribute('fill', 'none')
      // 设置颜色
      tpath.setAttribute('stroke', data.color || '#CCC')
      // 边线宽度
      tpath.setAttribute('stroke-width', data.strokeWidth || 1)
      if (data.strokelinecap) {
        tpath.setAttribute('stroke-linecap', data.strokelinecap)
      }
      if (data.strokeDasharray) {
        tpath.setAttribute('stroke-dasharray', data.strokeDasharray)
      }
      if (data.transform) {
        tpath.setAttribute('transform', data.transform)
      }
      return tpath
    },
    /**
     * 画进度条
     * @param {*} $select  容器
     * @param {*} size 多少步 共100步
     */
    svgView ($select, size) {
      // 创建SVG
      debugger
      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      this.svg = svg
      svg.setAttribute('version', '1.1') // IE9+ support SVG 1.1 version
      // svg.setAttribute('viewBox', '0 0 320 320')
      svg.setAttribute('width', '250px')
      svg.setAttribute('height', '130px')
      // svg.setAttribute('preserveAspectRatio', 'meet')
      // 画底线并加入SVG中
      svg.appendChild(this.drawSVG({
        startAngle: 0,
        endAngle: 180,
        x: this.startX,
        y: this.startY,
        R: this.radius,
        strokelinecap: 'round',
        color: '#EEEEEE',
        strokeWidth: 4
        // transform: 'rotate(-270, 120, 130)'
      }))
      // 步长
      let step = 2 //(315 - 45) / 100
      let i = 1
      // 画第一步并加入SVG中
      svg.appendChild(this.drawSVG({
        startAngle: 0,
        endAngle: i,
        x: this.startX,
        y: this.startY,
        R: this.radius,
        strokelinecap: 'round',
        strokeWidth: 6,
        color: '#1574FF'
        // transform: 'rotate(-270, 120, 130)'
      }))
      // 写入页面
      console.log(document.querySelector($select))
      document.querySelector($select).appendChild(svg)
      // 通过设置时间循环步
      let tc = setInterval(() => {
        // console.log(i, '----', step * i, '-----')
        // 创建新的弧线 替换进度弧线
        svg.appendChild(this.drawSVG({
          startAngle: 0,
          endAngle: 0 + step * i,
          x: this.startX,
          y: this.startY,
          R: this.radius,
          strokelinecap: 'round',
          strokeWidth: 6,
          color: '#1574FF'
        //   transform: 'rotate(-270, 120, 130)'
        }), svg.lastChild)
        i++
        if (i > size) {
          clearInterval(tc)
        }
      }, 20)
      // 虚线
      svg.appendChild(this.drawSVG({
        startAngle: 0,
        endAngle: 180,
        x: this.dotStartX,
        y: this.dotStartY,
        R: this.dotRadius,
        // strokelinecap: 'round',
        color: '#EEEEEE',
        strokeWidth: 2,
        strokeDasharray: '6,3'
        // transform: 'rotate(-270, 120, 130)'
      }))
      // 通过设置时间循环步
      let tc1 = setInterval(() => {
        // console.log(i, '----', step * i, '-----')
        // 创建新的弧线 替换进度弧线
        svg.appendChild(this.drawSVG({
          startAngle: 0,
          endAngle: 0 + step * i,
          x: this.dotStartX,
          y: this.dotStartY,
          R: this.dotRadius,
          strokelinecap: 'round',
          strokeWidth: 2,
          color: '#FF7749',
          strokeDasharray: '6,3'
        //   transform: 'rotate(-270, 120, 130)'
        }), svg.lastChild)
        i++
        if (i > size) {
          clearInterval(tc1)
        }
      }, 20)
    }
  }
}
</script>
<style>
.circle {
  position: relative;
  width: 250px;
  height: 130px;
}
.svgView {
  width: 250px;
  height: 130px;
  background: red
}
.data {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
