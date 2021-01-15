<template>
 <div class="home">
    <VideoBox class="videoBox"/> 
    <VideoHot class="videoHot"/>
 </div>
</template>
<script>
import VideoBox from '@/components/VideoBox.vue';
import VideoHot from '@/components/VideoHot.vue';
export default {
    name: "anime",
    components: {
        VideoBox,
        VideoHot
    },
    methods:{
    },
    created(){
    }
}
</script>
<style lang="scss" scoped>
.home{
  .videoBox{
    width: 50%;
    float: left;
  }
  .videoHot{
    widows: 30%;
    float: left;
  }
}
</style>