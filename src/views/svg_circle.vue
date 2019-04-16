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
  name: 'svgcircle',
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
     // this.drawtext()
    })
  },
  methods: {
    drawtext () {
      let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('x', 30)
      text.setAttribute('y', 130)
      text.setAttribute('fill', 'red')
      text.innerHTM = 123
      //this.svg.appendChild(text)
    },
    /**
     * 传入相应参数返回圆形制定半径的弧度坐标
     * @param {*} x 中心点X坐标
     * @param {*} y 中心点y坐标
     * @param {*} R 圆半径
     * @param {*} a 角度
     */
    coordMap (x, y, R, a) {
        let radian =  a * Math.PI / 180
        let tx = R*Math.cos(radian);
        let ty = R*Math.sin(radian);  
        return {
            x: R - tx + x,
            y: y - ty
        }
        
    },
    /**
   * 创建弧线
   * @param {*} data.startAngle 开始角度
   * @param {*} data.endAngle 结束角度
   * @param {*} data.R 圆半径
   * @param {*} data.x 起始x坐标
   * @param {*} data.y 起始y坐标
   * @param {*} data.color 边框颜色  默认#CCC
   * @param {*} data.strokeWidth 边框宽度 默认1
   * @param {*} data.strokelinecap 不同类型的路径的开始结束点 可选值 butt round square  默认butt
   * @param {*} data.strokeDasharray 虚线设置 它是一个<length>和<percentage>数列，数与数之间用逗号或者
   * 空白隔开，指定短划线和缺口的长度。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值。因此，5,3,2等同于5,3,2,5,3,2。
   * @param {*} data.transform CSS3旋转设置
   */
    drawSVG (data) {
       let endcoord = this.coordMap(data.x, data.y, data.R, data.endAngle)
       let tpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
       let path = `M ${data.x} ${data.y} A ${data.R} ${data.R} 0 ${+(data.endAngle - data.startAngle>180)} 1 ${endcoord.x} ${endcoord.y}`
       tpath.setAttribute('d', path);
        // 去掉填充
       tpath.setAttribute('fill', 'none')
       tpath.setAttribute('stroke', data.color || '#CCC')
         // 边线宽度
        tpath.setAttribute('stroke-width', data.strokeWidth || 1)
        tpath.setAttribute('class', data.class || '')
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
       let svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
       svg.setAttribute('version', '1.1');
       svg.setAttribute('width', '250px');
       svg.setAttribute('height', '130px');
       svg.appendChild(this.drawSVG({
           startAngle: 0,
           endAngle: 180,
           R: this.radius,
           x: this.startX,
           y: this.startY,
           color: '#eee',
           strokeWidth: '4',
           strokelinecap: 'round',
           class: 'excircle'
       }))
       svg.appendChild(this.drawSVG({
           startAngle: 0,
           endAngle: 180,
           R: this.dotRadius,
           x: this.dotStartX,
           y: this.startY,
           color: '#fff',
           strokeWidth: '2',
           strokelinecap: 'round',
           strokeDasharray: '6,4',
           class: 'innercircle'
       }))
       document.querySelector($select).appendChild(svg)

       // 实现循环加载进度条
       let speed = 20;
       let i = 0
       let timeBig =  setInterval(_ => {
           svg.appendChild(this.drawSVG({
                startAngle: 0,
                endAngle: i*20,
                R: this.radius,
                x: this.startX,
                y: this.startY,
                color: 'yellow',
                strokeWidth: '4',
                strokelinecap: 'round',
                class: 'excircle'
            }))
            if (document.getElementsByClassName('excircle').length>2) {
                svg.removeChild(document.getElementsByClassName('excircle')[1])
            }
            if (i*speed>100) {
                clearInterval(timeBig);
                timeBig = null
            }else {
                i++
            }
       }, 300)
       let timesmall =  setInterval(_ => {
           svg.appendChild(this.drawSVG({
                startAngle: 0,
                endAngle: i*20,
                R: this.dotRadius,
                x: this.dotStartX,
                y: this.startY,
                color: 'yellow',
                strokeWidth: '2',
                strokelinecap: 'round',
                strokeDasharray: '6,4',
                class: 'innercircle'
            }))
           if (document.getElementsByClassName('innercircle').length>2) {
                svg.removeChild(document.getElementsByClassName('innercircle')[1])
            }
            if (i*speed>100) {
                clearInterval(timesmall);
                timesmall = null;
            }else {
                i++
            }
       }, 300)     
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
