<template>
 <div>
 <div class="wrap">
    <!-- 头部 Header 区域 -->
    <div class="header">
      <h3>小智同学</h3>
      <img src="~@/assets/person01.png" alt="icon" />
    </div>
    <!-- 中间 聊天内容区域 -->
    <div class="main">
      <ul class="talk_list" style="top: 0px;" id="talk_list">
        <li class="left_word">
          <img src="~@/assets/person01.png" /> <span>嗨，最近想我没有？</span>
        </li>
        <!-- <li class="right_word">
            <img src="img/person02.png" /> <span>你好哦</span>
          </li> -->
      </ul>
      <div class="drag_bar" style="display: none;">
        <div class="drager ui-draggable ui-draggable-handle" style="display: none; height: 412.628px;"></div>
      </div>
    </div>
    <!-- 底部 消息编辑区域 -->
    <div class="footer">
      <img :src="info.photo" alt="icon"/>
      <input type="text" class="input_txt" id="ipt" v-model="message" ref="message" onfocus="showClear=true" />
       <span @click="clear" class="clearVal" v-show="showClear">x</span>
      <input type="button" value="发 送" class="input_sub" onclick="send" />
    </div>
  </div>
  <!-- 注意：只要为 audio 指定了新的 src 属性，而且指定了 autoplay，那么，语音就会自动播放 -->
  <audio src="" id="voice" autoplay style="display: none;"></audio>
 </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'QaIndex',
  components: {},
  props: {},
  data () {
    return {
      message: '',
      showClear: true
    }
  },
  computed: {
    ...mapState(['info'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
  }
}
</script>

<style scoped lang="less">
.wrap {
  position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 100px;
    border: 1px solid #ebebeb;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}
.header {
    height: 150px;
    background: linear-gradient(90deg, rgba(246, 60, 47, 0.6), rgba(128, 58, 242, 0.6));
    overflow: hidden;
    z-index: 99;
}
.header h3 {
    color: #faf3fc;
    line-height: 55px;
    font-weight: normal;
    float: left;
    letter-spacing: 2px;
    margin-left: 25px;
    font-size: 18px;
    text-shadow: 0px 0px 5px #944846;
}
.header img {
    float: right;
    margin: 7px 25px 0 0;
    border-radius: 20px;
    box-shadow: 0 0 5px #f7f2fe;
}
.main {
    position: absolute;
    left: 0;
    right: 0;
    top: 120px;
    bottom: 55px;
    background-color: #f4f3f3;
    box-sizing: border-box;
    padding: 10px 0;
    overflow:hidden;
}
.talk_list{
    position: absolute;
    width:100%;
    left:0px;
    top:0px;
}
.talk_list li {
    overflow: hidden;
    margin: 20px 0px 30px;
}
.talk_list .left_word img {
    float: left;
    margin-left: 20px;
}
.talk_list .left_word span {
    float: left;
    background-color: #fe9697;
    padding: 10px 15px;
    max-width: 290px;
    border-radius: 12px;
    font-size: 16px;
    color: #fff;
    margin-left: 13px;
    position: relative;
    line-height: 24px;
}
.talk_list .left_word span:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 3px;
    width: 13px;
    height: 12px;
    background: url('~@/assets/corner01.png') no-repeat;
}
.talk_list .right_word img {
    float: right;
    margin-right: 20px;
}
.talk_list .right_word span {
    float: right;
    background-color: #fff;
    padding: 10px 15px;
    max-width: 290px;
    border-radius: 12px;
    font-size: 16px;
    color: #000;
    margin-right: 13px;
    position: relative;
    line-height: 24px;
}
.talk_list .right_word span:before {
    content: '';
    position: absolute;
    right: -8px;
    top: 3px;
    width: 13px;
    height: 12px;
    background: url('~@/assets/corner02.png') no-repeat;
}
.drag_bar{
    position:absolute;
    right:0px;
    top:0px;
    background-color: #fff;
    height:100%;
    width:6px;
    box-sizing:border-box;
    border-bottom:1px solid #f4f3f3;
}
.drager{
    position:absolute;
    left:0px;
    top:0px;
    background-color: #cdcdcd;
    height:100px;
    width:6px;
    border-radius:3px;
    cursor: pointer;
}

.footer{
    width:100%;
    height: 100px;
    left:0px;
    bottom:0px;
    background-color:#fff;
    position: absolute;
    .clearVal{
      position: absolute;
      display: block;
      width: 60px;
      height:60px;
      background-color: #fff;
      text-align: center;
      line-height: 50px;
      border-radius: 50%;
      top: 14px;
      right:180px;
      color: #ccc;
      font-size: 50px;
    }
}

.footer img{
    float: left;
    margin:8px 0 0 20px;
    width: 80px;
    height: 80px;
}

.input_txt{
  font-size: 25px;
  font-weight: 700;
    float: left;
    width:450px;
    height:70px;
    border:0px;
    background-color: #f4f3f3;
    margin:9px 0 0 20px;
    border-radius:8px;
    padding:0px;
    outline:none;
    text-indent:15px;
}
.input_sub{
    float: left;
    width:150px;
    height:70px;
    font-size: 30px;
    border:0px;
    background-color: #fe9697;
    margin:9px 0 0 15px;
    border-radius:8px;
    padding:0px;
    outline:none;
    color:#fff;
    cursor: pointer;
}</style>
