/*
  start 开始倒计时时间  必须传   格式  2017-07-07 00:00:00
  end   结束倒计时时间  默认当前时间
  isShowDay  是否显示天
  onEnd  倒计时结束后回调
  selfContent 是否自定义渲染内容
*/

<template>
  <div :class="prefixCls">
    <slot :time="time"></slot>
    <template v-if="!selfContent">
      <span :class="prefixCls+'-days'" v-if="isShowDay">{{dd}}</span>
      <span :class="prefixCls+'-hours'">{{hh}}</span>
      <span :class="prefixCls+'-minutes'">{{mm}}</span>
      <span :class="prefixCls+'-seconds'">{{ss}}</span>
    </template>
  </div>
</template>
<script>
  import {formatDate} from 'ai-i/base/date'
  export default {
    name: 'CountDown',
    data: () => ({
      prefixCls: 'ai-count-down',
      dd: '',
      hh: '',
      mm: '',
      ss: '',
      time: {},
      timeOut: null
    }),
    props: {
      isShowDay: {
        type: Boolean,
        default: true
      },
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        default: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      },
      onEnd: {
        type: Function
      },
      selfContent: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      start (newV, oldV) {
        if (newV !== oldV) {
          clearTimeout(this.timeOut)
          this.calculate()
        }
      },
      end (newV, oldV) {
        if (newV !== oldV) {
          clearTimeout(this.timeOut)
          this.calculate()
        }
      },
    },
    mounted () {
      this.calculate()
    },
    methods: {
      calculate () {
        let [startTime, endTime] = [
          new Date(Date.parse(this.start.replace(/-/g, '/'))).getTime(),
          new Date(Date.parse(this.end.replace(/-/g, '/'))).getTime()
        ]
        let differTime = endTime - startTime
        let differSecond = Math.floor(differTime / 1000)
        if (endTime < startTime) {
          return false
        }
        this.startCount(differSecond)
      },
      startCount (differSecond) {
        if (differSecond < 0) {
          this.$emit('onEnd')
        } else {
          this.dd = parseInt(differSecond / (60 * 60 * 24)) >= 10 ? parseInt(differSecond / (60 * 60 * 24)) : '0' + parseInt(differSecond / (60 * 60 * 24))
          let leftSecond = this.isShowDay ? differSecond - this.dd * 24 * 60 * 60 : differSecond
          this.hh = Math.floor(leftSecond / (60 * 60)) >= 10 ? Math.floor(leftSecond / (60 * 60)) : '0' + Math.floor(leftSecond / (60 * 60))
          this.mm = Math.floor((leftSecond - this.hh * 60 * 60) / 60) >= 10 ? Math.floor((leftSecond - this.hh * 60 * 60) / 60) : '0' + Math.floor((leftSecond - this.hh * 60 * 60) / 60)
          this.ss = Math.floor(leftSecond - this.hh * 60 * 60 - this.mm * 60) >= 10 ? Math.floor(leftSecond - this.hh * 60 * 60 - this.mm * 60) : '0' + Math.floor(leftSecond - this.hh * 60 * 60 - this.mm * 60)
          this.time = {
            dd: this.isShowDay ? this.dd : 0,
            hh: this.hh,
            mm: this.mm,
            ss: this.ss
          }
          --differSecond
          this.timeOut = setTimeout(() => {
            this.startCount(differSecond)
          }, 1000)
        }
      }
    }
  }
</script>
