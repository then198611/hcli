  /**
   * @api 倒计时组件
   * @apiName countdown
   * @apiGroup countdown
   * @apiVersion 0.0.1
   * @apiParam {String} start 时间，格式"2017-07-10 00:00:00"
   * @apiParam {String} [end] 默认当前时间 
   * @apiParam {fundtion} onEnd 结束后调用
   * @apiParamExample Example:
   *   <ai-count-down start="2017-07-10 00:00:00" @onEnd="countDownEnd"></ai-count-down>
   * @api
   */

import CountDown from './count-down.vue'

export default CountDown
