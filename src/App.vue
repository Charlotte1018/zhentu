<template>
  <div id="app">
    <div class="content">
        <div class="box">
            <div class="title">
                <span>照片详情</span>
            </div>
            <div class="imgBox">
                <img class="img border" src="" alt="time">
            </div>
            <div class="info">
                <div class="middle">
                    <img class="icon" src="./img/clock.png" alt="time">
                    <span style="margin-left:5px;">拍摄时间</span>
                </div>
                <div class="text">{{info.time}}</div>
            </div>
            <div class="info">
                <div class="middle">
                    <img class="icon" src="./img/location.png" alt="time">
                    <span style="margin-left:13px;">拍摄地点</span>
                </div>
                <div class="text" id="time">{{info.position}}</div>
            </div>
            <div class="info">
                <div class="middle">
                    <img class="icon" src="./img/phone.png" alt="time">
                    <span style="margin-left:15px;">拍摄手机号</span>
                </div>
                <div class="text">{{info.mobile}}</div>
            </div>
            <div class="info">
                <div class="middle">
                    <img class="icon" src="./img/print.png" alt="time">
                    <span style="margin-left:8px;">数据指纹</span>
                </div>
                
                <van-button type="default" plain @click="show=!show">查看</van-button>
            </div>
            <div>
                <van-dialog
                v-model="show"
                :before-close="beforeClose"
                :close-on-click-overlay="true"
                title="数字指纹"
                >
                    <textarea class="textarea" disabled v-model="info.hash" rows="4" cols="40" placeholder="描述信息...">
</textarea>
                </van-dialog>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup, Icon, Dialog, Field} from 'vant';
Vue.use(Dialog,Field);
import { http } from './utils/http';
export default {
  created() {
    this.getInfo();
  },
  data(){
    return {
        info:{},
        cert_id:8427,
        show:false
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon
  },
  methods:{
    getInfo(){
      let msg = {
        url:`http://beta.51zbb.net/ztll/cert/getinfo?cert_id=${this.cert_id}`
      }
      http(msg).then(res => {
          this.info = res;
          console.log(res);
      });
    },
    dataHash(){
        Dialog.alert({
            title: '数字指纹',
            message: this.info.hash
            }).then(() => {
            // on close
        });
    },
    beforeClose(action){
        if (action === 'confirm') {
            let _this = this;
            setTimeout(()=>{
                _this.show = false;
            }, 100);
        } else {
            this.show = false;
        }
    }
  }
};
</script>

<style>
        body {
          background-color: #fff;
        }

        .center {
            text-align: center;
        }

        .middle {
            flex:1;
        }

        .df {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        .ml {
            margin-left: 10%;
            /* vertical-align: middle; */
        }

        html {
            font-size: 14px;
        }

        .border {
            border: 1px solid red;
        }

        .content {
            width: 90%;
            margin: 0 auto;
        }

        .box {
            /* height: 50px; */
        }

        .title {
            font-size: 20px;
            padding: 10px 0;
            text-align: center;
        }

        .imgBox {
            width:100%;
            height:100%;
        }

        .img {
            /* height: 200px; */
            /*height: 0; padding-bottom: 50%;*/
            width: 400px;
            height:200px;
            margin: 0 auto;
            transform:rotate(90deg);
            box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.555);
        }

        .info {
            display: flex;
            color: #8290A9;
            justify-content: space-between;
            align-items: center;
            padding: 25px 0 0 0;
        }

        .text {
            color: #1076F0;
            flex: 2;
            text-align: right;
            text-overflow: ellipsis
        }

        .icon {
            transform: scale(0.7);
            vertical-align: middle;
            flex:1;
        }
        .textarea{
            width:90%;
            margin-left:5%;
        }
</style>
