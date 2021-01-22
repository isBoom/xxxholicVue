<template>
  <div class="">
  </div> 
</template>
<script>
import * as API from "@/api/video/";
export default {
  name: '',
  data() {
    return {
    };
  },
  methods: {
  },
  created(){
     
  },
  updated() {
   
  },
  activated(){
  },
}
</script>
<style lang="scss" scoped>
.home-video-info p {
  margin-top: 5%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.coverBoxBig {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
  .coverBoxSmall {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .el-card {
       /* 去边框 */
      border: 0px solid !important;
      -webkit-box-shadow: 0 0 0;
      box-shadow: 0px 0px 0px;
      /* 强制宽高比 */
      .videoBanner {
        width: 100%;
        padding-bottom: 60%;
        position: relative;
        .el-image{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          &::after{
            display: block;
            content: "";
            width: 100%;
            height: 100%;
            position:absolute;
            top:0px;
            box-shadow: 0 -50px 20px rgba(0, 0, 0, 0.5) inset;
          }
        }
      }
      .watchView{
        position: absolute;
        bottom: 5%; left: 5%;
        color:white;
        font-size:0.5em;
      }
      .title{
        font-size:14px;
        padding-right:10%
      }
      .owner{
        position: absolute;
        bottom:5%;
        color:#909399;
        font-family:'宋体';
        font-size:12px;
      }
    }
  }
}
</style>
<style lang="scss">
.videoBox{
  .braceVideoBox{
    width: 840px;
    height: 1px;
  }
  .el-card{
    .el-card__body {
      padding: 0 ;
    }
  }
}
</style>