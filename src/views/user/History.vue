<template>
    <div class="history">
        <el-timeline>
            <el-timeline-item v-for="v in videos" :key="v.id" :timestamp="v.created_at" placement="top">
                <el-card shadow="never">
                    <div class="left">
                        <div class="videoBanner" @click="videoInfo(v.id)">
                            <el-image :src="v.avatar" style="width:100%">
                                <div slot="error">
                                <img src="@/static/defaultAvatar.png" style="width:100%" />
                                </div>
                            </el-image>
                        </div>
                    </div>
                    <div class="right">
                        <div class="top">
                            <p @click="videoInfo(v.id)">{{v.title}}</p>
                        </div>
                        <div class="bottom">
                            <el-avatar :src="v.user.avatar">{{v.user.userName[0]}}</el-avatar>
                            <div class="uv">
                                <span v-html="v.user.userName"></span>
                                <span v-html="kg"></span><span>|</span><span v-html="kg"></span>
                                <span v-html="v.videoType"></span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script>
import * as API from "@/api/user/"
export default {

    name:"History",
    data(){
        return{
            videos:[],
            form:{},
            kg:"&ensp;",
        }
    },
    methods:{
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
        },
        getHistory(){
            API.getHistory(this.form).then(res => {
                this.videos = res.data
                this.videos.forEach(element => {
                    element.created_at = this.unix(element.created_at)
                });
                console.log(this.videos);
            }).catch(e => {console.log(e);})
        },
        videoInfo(videoId){
            window.open(`/#/video/${videoId}`,'_self')
        }
    },
    created(){
        this.getHistory()
    }
}
</script>
<style lang="scss" >
.history{
    .left{
        width: 15%;
        float: left;
        .videoBanner {
            width: 100%;
            padding-bottom: 60%;
            position: relative;
            bottom: 10%;
            .el-image{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                img{
                    height: 100%;
                    position: absolute;
                    bottom: 0;
                }
                &::after{
                    display: block;
                    content: "";
                    width: 100%;
                    height: 100%;
                    position:absolute;
                    top:0px;
                    box-shadow: 0 -40px 20px -20px rgba(0, 0, 0, 0.5) inset;
                }
            }
        }
    }
    .right{
        float: left;
        margin-left: 2%;
        margin-top: 1%;
        .top{
            p:hover{
                color:#00a1d6
            }
        }
        .bottom{ 
            &:hover{
                color:#00a1d6
            }
            margin-top: 40px;
            .el-avatar{
                width: 30px;
                height: 30px;
                float: left;
            }
            .uv{
                float: left;
                margin-top: 10px;
                margin-left: 20px;
            }
        }
    }
}
</style>
<style lang="scss">
.history{
    .el-card{
        border: 0 solid red;
        .el-card__body{
            padding: 0;
        }
    }
}
</style>