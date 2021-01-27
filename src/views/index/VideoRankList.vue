<template>
    <div class="videoRankDaily">
        <div>
        <el-row >
            <el-col  v-for="(v , i) in videos" :key="v.id" @click.native="videoInfo(v)">
            <!-- details -->
            <div class="details" id="details">
                <div class="elBoxLeft">
                <el-col :span="9">
                    <el-card shadow="never">
                    <div class="videoBanner">
                        <el-image :src="v.avatar" style="width:100%">
                            <div slot="error">
                            <img src="@/static/defaultAvatar.png" style="width:100%" />
                            </div>
                        </el-image>
                    </div>
                    </el-card>
                </el-col>
                <div class="elBoxRight">
                    <el-col :span="14" :push="1">
                    <p class="videoTitle">{{ v.title }}</p>
                    <div class="detailsSpan">
                        <span class="userName" v-html="v.user.userName" ></span>
                        <span class="time" v-html="unix(v.created_at)"></span>
                    </div>
                    </el-col>
                </div>
                </div>
            </div>
            <!-- 主体 -->
            <el-col :span="2" class="hot">
                <p class="rank">{{i+1}}</p>
            </el-col>
            <el-col v-if="i < 3" :span="22">
                <div class="elBoxIf">
                <!-- 主体左 -->
                    <div class="elBoxLeft">
                        <el-col :span="9">
                            <el-card shadow="never">
                                <div class="videoBanner">
                                    <el-image :src="v.avatar" style="width:100%">
                                        <div slot="error">
                                        <img src="@/static/defaultAvatar.png" style="width:100%" />
                                        </div>
                                    </el-image>
                                </div>
                            </el-card>
                        </el-col>
                    </div>
                <!-- 主体右 -->
                <div class="elBoxRight">
                    <el-col :span="15" :push="1">
                        <p class="videoTitle">{{ v.title }}</p>
                        <span class="videoViewCount" v-html="'播放'+' '+v.view"></span>
                    </el-col>
                </div>
                </div>
            </el-col>
            <el-col v-else :span="21" class="elBoxElse">
                <el-col>
                    <p class="videoTitle">{{ v.title }}</p>
                </el-col>
            </el-col>
            </el-col>
        </el-row>
        <div class="brace"></div>
        </div>
    </div>
</template>
<script>
import * as API from "@/api/video/";
export default {
    name: "VideoRankDaily",
    data() {
        return {
            params:{
                videoType:"",
                rankType:"",
            },
            nbsp: "&#12288;",
            videos: [],
        };
    },
    props:{
        rankType:{
            type:String,
            required:true,
        }
    },
    methods: {
        unix(value) {
        let date = new Date(value * 1000);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        return y + "-" + MM + "-" + d;
        },
        getVideoRank(params) {
        API.getVideoRank(params)
            .then(res => {
            this.videos = res.data;
            console.log(res);
            })
            .catch(err => {
            console.log(err);
            });
        },
        videoInfo(v) {
        this.$router.push({ path: "/video/" + `${v.id}` });
        }
    },
    created() {
        this.params.videoType = this.$route.path.replaceAll("/","")
        this.params.rankType = this.rankType
        this.getVideoRank(this.params);
    }
};
</script>