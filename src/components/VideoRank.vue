<template>
    <div class="videoRank">
        <el-tabs :tab-position="tabPosition">
            <el-tab-pane class="VideoRankDaily" label="日排行" lazy><VideoRankDaily /></el-tab-pane>
            <el-tab-pane class="VideoRankMonth" label="月排行" lazy><VideoRankMonth /></el-tab-pane>
            <el-tab-pane class="VideoRankWeek" label="周排行" lazy><VideoRankWeek /></el-tab-pane>     
        </el-tabs>
    </div>
</template>
<script>
import VideoRankDaily from "./VideoRankDaily.vue";
import VideoRankWeek from "./VideoRankWeek.vue";
import VideoRankMonth from "./VideoRankMonth.vue";
export default {
    name: "videoRank",
        components: {
        VideoRankDaily,
        VideoRankWeek,
        VideoRankMonth
    },
    data() {
        return {
        tabPosition: 'top'
        };
    },
}
</script>
<style lang="scss" scoped>
.videoRank{
    text-align: center;
    width: 100%;
    .el-tabs{
        display:inline-block
    }
}
</style>