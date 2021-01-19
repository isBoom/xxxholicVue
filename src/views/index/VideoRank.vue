<template>
    <div class="videoRank">
        <el-tabs :tab-position="tabPosition">
            <el-tab-pane class="VideoRankDaily" label="日排行" lazy><VideoRankDaily /></el-tab-pane>
            <el-tab-pane class="VideoRankWeek" label="周排行" lazy><VideoRankWeekly /></el-tab-pane> 
            <el-tab-pane class="VideoRankMonth" label="月排行" lazy><VideoRankMonthly /></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import VideoRankDaily from "./VideoRankDaily.vue";
import VideoRankWeekly from "./VideoRankWeekly.vue";
import VideoRankMonthly from "./VideoRankMonthly.vue";
export default {
    name: "VideoRank",
    data() {
        return {
        tabPosition: 'top'
        };
    },
    components: {
        VideoRankDaily,
        VideoRankWeekly,
        VideoRankMonthly,
    }
}
</script>
<style lang="scss" >
.videoRank{
    padding-left: 5%;
    .el-tabs__header{
        padding-left: 10%;
        padding-right: 20%  ;
    }
    .brace{
        //完全就是撑盒子用的
        width: 300px;
        height: 1px;
        padding-left: 10%;
        font-size: 18px;
    }
    .el-tabs{
        display:inline-block;
        .el-tabs__content{
            //去除全局rank界面hover溢出隐藏
            overflow: visible;
            //去除全局videoBox界面封面padding
            .el-tab-pane{
                .el-card{
                    .el-card__body {
                    padding: 0 ;
                    }
                }
            }
        }
        .el-tab-pane{
            .el-row{
                //前三序号方框
                &  > div:nth-last-of-type(-n + 10) .rank {
                    width: 18px !important;
                    height: 18px !important;
                    font-size: 14px;
                    text-align: center;
                    line-height: 18px !important;
                    margin: 0;
                }
                /* rank 数字 */
                & > div:nth-of-type(-n + 3) .rank {
                    border-radius: 3px;
                    background: #2581dd;
                    color: aliceblue;
                }
                & > div:not(:nth-of-type(1)) .rank {
                    margin: 20% 0;
                }
                .el-col{
                    margin-bottom: 2px;
                    .videoTitle{
                        font-size: 14px;
                        line-height: 20px ;
                    }
                    .details .videoTitle{
                        color: #505050 !important;
                    }
                    &:hover .videoTitle{
                        color: #2581dd;
                    }
                    /* 强制封面宽高比 */
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
                    //hover显示视频详情
                    &:hover .details{
                        display: block;
                        border: 1px solid #dedede;
                        &:hover{
                            display: block !important;
                        }
                    }
                    //显示一行
                    .videoTitle{
                        display: -webkit-box;
                        color: #303133;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        font-size: 14px;
                        margin: 0;
                        height:36px;
                    }
                    .videoViewCount{
                        position: absolute;
                        bottom: -70%;
                    }
                    /* 视频详情 显现*/
                    .details {
                        position: absolute;
                        background-color: #ffffff;
                        border-radius: 5px;
                        display: none;
                        width: 100%;
                        margin-top: -31%;
                        padding: 10px;
                        z-index: 1000;
                        /* details右侧最后一行 */
                        .elBoxRight{
                            .el-col {
                                min-height: 3em;
                            }
                        }
                        .detailsSpan {
                            width: 100%;
                            padding-right: 10%;
                            position: absolute;
                            bottom:-25px;
                            left: 2%;
                            overflow: hidden;
                        }
                        //特殊处理
                        .videoTitle{
                            -webkit-line-clamp: 2 !important;
                        }
                    }
                    //特殊处理
                    .elBoxIf .videoTitle{
                        -webkit-line-clamp: 2 !important;
                        line-height: 18px;
                    }
                    .elBoxElse .videoTitle{
                        height: 25px;
                        line-height: 25px;
                    }    
                }
            }
        }
    }
    .el-tabs__nav-scroll{
        .el-tabs__nav{
            float: none !important;
        }
        
    }
}
</style>