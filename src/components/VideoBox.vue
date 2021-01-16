<template>
  <div class="videoBox">
    <div>
      <el-row :gutter="10" ref="boxHeight">
        <el-col :span="6" v-for="v in videos" :key="v.id" @click.native="videoInfo(v)">
          <!-- 大盒子强行宽高比 home-el-col-big -->
          <div class="coverBoxBig">
            <div class="coverBoxSmall">
              <el-card shadow="never">
                <!-- 强行宽高比 -->
                <div class="videoBanner">
                  <el-image :src="v.avatar" style="width:100%">
                    <div slot="error">
                      <img src="@/static/defaultAvatar.png" style="width:100%" />
                    </div>
                  </el-image>
                  <span class="watchView">
                    <i class="el-icon-view">
                      <span v-html="nbsp+' '+v.view"></span>
                    </i>
                  </span>
                </div>
                <div class="title">
                  <div class="home-video-info">
                    <p>{{ v.title }}
                      <span></span>
                    </p>
                  </div>
                  <div class="owner">
                    <span v-html="'up'+' '+v.user.nickname"></span>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="isLoading">
      <v-pagination show-quick-jumper @change="loadPage" :pageSize="pageSize" :total="videoCount"></v-pagination>
    </div>
  </div> 
</template>

<script>
import * as API from "@/api/video/";
export default {
  name: 'videoBox',
  data() {
    return {
        boxHeightChange:"",
        pageSize:12,
        videoCount:0,
        videos: [],
        currentData:"",
        isLoading:false,
        nbsp: "&nbsp;",
        videoParams:{
          offset:0,
          limit:0,
          videoType:""
        }
    };
  },
    methods: {
      loadPage(i) {
        this.videoParams.offset = this.pageSize * (i-1)
        this.getVideos(this.videoParams)
      },
      getVideos(params) {
        API.getVideos(params)
            .then(res => {
            if (res.code == 0 || res.code != 401) {
                this.videos = res.data;
                this.videoCount = res.count;
                if (res.count>this.pageSize) {
                  this.isLoading = true
                }
                
            } else {
                this.$message({
                message: res.msg,
                duration: 0,
                type: "error"
                });
            }
            })
            .catch(err => {
            this.$message({
                message: "服务器开小差啦，请您稍后再试",
                duration: 0,
                type: "error"
            });
            });
        },
        videoInfo(v) {
          this.$router.push({ path: "/video/" + `${v.id}` });
        }
    },
  // props: {
  //   msg: String
  // },
  created(){
      this.currentData = this.$route.path 
      this.videoParams.limit=this.pageSize,
      this.videoParams.videoType=this.$route.path.replaceAll("/","")
      this.getVideos(this.videoParams)
  },
  updated() {
    this.$refs.boxHeight.$el.style.height = this.$refs.boxHeight.$el.offsetHeight+"px"
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
      -webkit-box-shadow: 0 0 0 !important;
      box-shadow: 0px 0px 0px !important;
      //padding
      
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
  .el-card{
    .el-card__body {
      padding: 0 ;
    }
  }
}
</style>