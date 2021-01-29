<template>
  <div class="video">
    <div v-if="JSON.stringify(videoInfo) != '{}'" class="videoInfo">
      <div class="videoTitle">{{videoInfo.title}}</div>
      <div class="videoCreateTime">{{unix(videoInfo.created_at)}}</div>
      <div class="videoView">{{"播放:"+videoInfo.view}}</div>
    </div>
    <div class="videoPlayerBox">
      <video-player
        v-if="showVideo"
        class="video-player vjs-custom-skin demo"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
    <div class="videoInfoLong">
      <div>{{videoInfo.info}}</div>
    </div>
    <hr align="left" width="79%" style="opacity:0.5" />
    <div style="width:80%">
      <el-row>
        <el-col :span="2">
          <div class="commentAvatar me">
            <el-avatar :src="user.avatar">{{user.userName}}</el-avatar>
          </div>
        </el-col>
        <el-col :span="19">
          <el-input
            class="pl"
            autocomplete="off"
            type="textarea"
            placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
            v-model="textarea"
            maxlength="7777"
            show-word-limit
          ></el-input>
        </el-col>
        <el-col :span="2" :push="1">
          <el-button @click="onComment({})" class="primary" type="primary">发表评论</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 评论详情 -->
    <div class="commentBox" v-for="c in comments" :key="c.id">
      <!-- 增加变量  commentBoxShow控制评论框显示开关 placeholder评论框默认内容-->
      <font v-if="0">
        {{Vue.set(c,"commentBoxShow",false)}}
        {{Vue.set(c,"placeholder","")}}
      </font>
      <el-row>
        <el-col :span="2">
          <div class="commentAvatar">
            <el-avatar :src="c.user.avatar">{{user.userName}}</el-avatar>
          </div>
        </el-col>
        <el-col :span="22" style="border-top:1px solid rgba(0, 0, 0, 0.2)">
          <div style="width:100%" class="commentUsername">{{c.user.userName}}</div>
          <div style="width:100%" class="commentContent">{{c.content}}</div>
          <div style="width:100%" class="commentTime">
            {{unix(c.createdAt)}}
            <font class="replyButton" @click="showCommentBox(c,c)">回复</font>
            <el-dropdown trigger="hover" class="el-icon-more-box" v-if="c.user.id==user.id">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix" @click.native="delComments(c)">删除评论</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- 第二重评论 -->
          <div style="width:100%" class="commentTwo" v-for="cc in c.child" :key="cc.id">
            <el-row>
              <el-col :span="1">
                <div class="commentAvatar">
                  <el-avatar :src="cc.user.avatar">{{user.userName}}</el-avatar>
                </div>
              </el-col>
              <el-col :span="23">
                <div style="width:100%" class="commentUsername">
                  {{cc.user.userName}}
                  <font v-if="cc.parentId!=cc.firstId" class="commentContent">
                    回复@{{" "}}
                    <font style="color:#409EFF">{{cc.parentUser.userName}}</font>
                    {{" :"}}
                  </font>
                  <font class="commentContent">{{cc.content}}</font>
                </div>
                <div style="width:100%" class="commentTime">
                  {{unix(cc.createdAt)}}
                  <font class="replyButton" @click="showCommentBox(c,cc)">回复</font>
                  <el-dropdown
                    trigger="hover"
                    class="el-icon-more-box"
                    style="display:none"
                    v-if="cc.user.id==user.id"
                  >
                    <span class="el-dropdown-link">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item class="clearfix" @click.native="delComments(cc)">删除评论</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 评论的回复框 -->
          <div style="width:100%;margin-top:1em" v-if="c.showCommentBox">
            <el-row>
              <el-col :span="2">
                <div class="commentAvatar me">
                  <el-avatar :src="user.avatar">{{user.userName}}</el-avatar>
                </div>
              </el-col>
              <el-col :span="19">
                <el-input
                  class="pl"
                  autocomplete="off"
                  type="textarea"
                  :placeholder="c.placeholder"
                  v-model="replyTextarea"
                  maxlength="7777"
                  show-word-limit
                  autofocus="true"
                ></el-input>
              </el-col>
              <el-col :span="2" :push="1">
                <el-button
                  @click="onComment(c)"
                  class="primary"
                  type="primary"
                  style="margin-left:1em"
                >发表评论</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/video";
import * as userAPI from "@/api/user/";
import Vue from "vue";
export default {
  name: "Video",
  data() {
    return {
      comments: [],
      user: {},
      textarea: "",
      replyTextarea: "",
      nowCommentBoxId: 0,
      nowCommentId: 0,
      commentCount: 0,
      showVideo: false,
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        //preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "16:9",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: "video/mp4",
            //url地址
            src: ""
            //"https://xxxholic.oss-cn-hongkong.aliyuncs.com/upload/video/defaultVideo.mp4"
          }
        ],
        //你的封面地址
        poster: "",
        //"https://xxxholic.oss-cn-hongkong.aliyuncs.com/upload/avatar/defaultWhite.jpg",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true
        }
      },
      videoInfo: {}
    };
  },
  methods: {
    delComments(c) {
      this.$confirm("此操作将删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          let data = {};
          data.id = c.id;
          data.parentId = c.parentId;
          data.videoId = c.videoId;
          API.delComments(data)
            .then(res => {
              if (res.code == 0) {
                if (c.parentId == 0) {
                  let index = this.comments.indexOf(c);
                  if (index != -1) {
                    this.comments.splice(index, 1);
                  }
                } else {
                  //暂有bug
                  let obj = this.getParentObjectById(this.comments, c.id);
                  let index = obj.child.indexOf(c);
                  if (index != -1) {
                    obj.child.splice(index, 1);
                  }
                }
              } else {
                this.$message.error(res.msg);
                console.log(res);
              }
            })
            .catch(err => {
              this.$message.error("删除评论失败");
              console.log(err);
            });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    onComment(c) {
      if (
        (JSON.stringify(c) == "{}" && this.textarea == "") ||
        (JSON.stringify(c) != "{}" && this.replyTextarea == "")
      ) {
        //
      } else if (this.$store.state.user.id == undefined) {
        this.$message.error("请先登录再评论");
      } else {
        let data = {};
        data.content =
          JSON.stringify(c) == "{}" ? this.textarea : this.replyTextarea;
        data.videoId = this.$route.params.id;
        if (JSON.stringify(c) != "{}") {
          //回复
          data.parentId = this.nowCommentId;
        }
        API.comment(data)
          .then(res => {
            if (JSON.stringify(c) == "{}") {
              this.comments.unshift(res.data);
              this.textarea = "";
            } else {
              //一级评论
              if (c.child == null) {
                c.child = new Array();
              }
              c.child.unshift(res.data);
              this.replyTextarea = "";
              Vue.set(c, "showCommentBox", false);
            }
          })
          .catch(err => {
            this.$message.error("评论失败");
            console.log(err);
          });
      }
    },
    load() {
      API.getVideo(this.$route.params.id)
        .then(res => {
          this.videoInfo = res.data;
          this.playerOptions.sources[0].src = res.data.url;
          this.playerOptions.poster = res.data.avatar;
          this.showVideo = true;
        })
        .catch(error => {
          this.$message({
            message: "视频并不存在",
            duration: 1000,
            type: "warning"
          });
          console.log(error);
          this.$router.go(-1);
        });
    },
    getComments() {
      API.getComments(this.$route.params.id)
        .then(res => {
          this.comments = res.data.comments;
        })
        .catch(err => {
          this.$message({
            message: "加载评论失败",
            duration: 1000,
            type: "warning"
          });
        });
    },
    getObjectById(c, id) {
      for (let i of c) {
        if (i.id == id) {
          return i;
        } else if (i.child != null) {
          for (let j of i.child) {
            if (j.id == id) {
              return j;
            }
          }
        }
      }
      return {};
    },
    getParentObjectById(c, id) {
      for (let i of c) {
        if (i.id == id) {
          return c;
        } else if (i.child != null) {
          for (let j of i.child) {
            if (j.id == id) {
              return i;
            }
          }
        }
      }
      return {};
    },
    showCommentBox(c, cc) {
      let defaultPlaceholder =
        "请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。";
      this.nowCommentId = cc.id;
      //初次点击
      if (this.nowCommentBoxId == 0) {
        this.nowCommentBoxId = c.id;
        Vue.set(c, "showCommentBox", true);
      } else {
        let last = this.nowCommentBoxId;
        this.nowCommentBoxId = c.id;
        //切换placeholder
        if (
          last == this.nowCommentBoxId &&
          c.placeholder == defaultPlaceholder &&
          cc.parentId == 0 &&
          c.showCommentBox == true
        ) {
          //只有两种关闭形式，一种主动一种被动,同时满足这四项是唯一能触发主动关闭的事件
          Vue.set(c, "showCommentBox", false);
        } else {
          //被动关闭(切换父评论对象触发)
          for (let i of this.comments) {
            if (i.id == last) {
              Vue.set(i, "showCommentBox", false);
            }
          }
          //打开当前评论框
          Vue.set(c, "showCommentBox", true);
        }
      }
      //因为之前条件要判断上一个状态的placeholder,所以这里放在最后统一修改
      if (cc.parentId == 0) {
        Vue.set(c, "placeholder", defaultPlaceholder);
      } else {
        Vue.set(c, "placeholder", "回复 " + "@" + cc.user.userName + ":");
      }
    },
    getUser() {
      if (this.$store.state.user.id != undefined) {
        this.user = this.$store.state.user;
      } else {
        userAPI.simpleInfoMe().then(res => {
          if (res.code == 0) {
            this.user = res.data;
            this.$store.state.user = res.data;
          }
        });
      }
    },
    unix(row) {
      let date = new Date(row * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  created() {
    // console.log("create");
    // this.$router.beforeEach((to, from, next) => {
    //   console.log("from.meta.keepAlive = false;");
    //     from.meta.keepAlive = false;
    //     next()
    // })
    this.getUser();
    this.load();
    this.getComments();
  },
  deactivated(){
    this.$route.meta.keepAlive = false;
  }
  
};
</script>
<style lang="scss" scoped>
/* 视频本身 */
body {
  overflow: visible !important;
}
.video{
    .videoPlayerBox {
        width: 1024px;
        height: 576px;
        background: #fff;
        .demo {
          display: inline-block;
          width: 1024px;
          text-align: center;
          line-height: 100px;
          border: 1px solid transparent;
          border-radius: 4px;
          overflow: hidden;
          background: #fff;
          position: relative;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
          margin-right: 4px;
        }
    }
    /* 视频详情 */
    .videoTitle {
        margin-top: 1em;
        font-weight: 345;
    }
    .videoCreateTime,.videoView {
      color: #b39999;
      line-height: 15px;
      height: 15px;
      margin-bottom: 1px;
      font-size: 0.65em;
    }
    .videoInfoLong {
        font-weight: 400;
        font-size: 0.7em;
    }
    .commentBox {
      margin-bottom: 10px;
      width: 79%;
      word-break: break-all;
      white-space: normal;
    }
    .commentAvatar {
      margin-top: 10px;
      height: 80px;
      width: 80px;
      span {
        width: 70%;
        height: 70%;
        margin-top: 15%;
        line-height: 50px;
      }
    }
    .commentUsername {
      font-size: 12px;
      color: #606266;
      margin-top: 15px;
      margin-bottom: 5px;
    }
    .commentContent {
      font-size: 14px;
      color: #303133;
      margin-bottom: 7px;
      white-space: pre-wrap;
    }
    .commentTime {
      font-size: 12px;
      color: #909399;
    }
    .commentTwo{
        &:hover{
            .el-icon-more-box {
                display: block !important;
            }
        }
        .commentAvatar {
          margin-top: 15px;
          height: 40px;
          width: 40px;
          span {
            margin-top: 10%;
            line-height: 30px;
            font-size: 0.5em;
          }
        }
        .commentContent {
          margin-left: 0.5em;
          font-size: 1.1em;
        }
        .commentUsername {
          margin-bottom: 0.8em;
        }
    }
    .commentTime{
        .replyButton {
          margin-left: 1em;
          &:hover {
            cursor: pointer;
            color: #606266;
            background: rgba(45, 172, 204, 0.2);
            padding: 0.3em;
            border-radius: 4px;
          }
        }
        .el-icon-more-box {
          float: right;
          font-size: 1.2em;
          transform: rotate(-90deg);
          &:hover {
            color: rgb(31, 213, 219);
            // .el-icon-more-box {
            //     display: block !important;
            // }
          }
        }
    }
}
</style>
<style >
/* 吐槽文本框 */
.el-textarea__inner {
  height: 5em;
  font-size: 1em;
}
/* 吐槽按钮 */
.primary {
  height: 5em;
  width: 5em;
  padding: 1em;
}
.primary span {
  white-space: pre-wrap;
}
</style>
