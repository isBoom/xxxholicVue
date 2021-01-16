<template>
 <div class="home">
    <VideoBox class="videoBox"/> 
    <VideoRank class="videoRank"/>
 </div>
</template>
<script>
import VideoBox from '@/components/VideoBox.vue';
import VideoRank from '@/components/VideoRank.vue';
export default {
    name: "home",
    components: {
        VideoBox,
        VideoRank
    },
    methods:{
    },
    created(){
    },
    deactivated(){
        this.$router.beforeEach((to, from, next) => {
        if (to.name == "Video"){
          this.$destroy()
        }
        next()
      })
    },
}
</script>
<style lang="scss" scoped>
.home{
  .videoBox{
    width: 70%;
    float: left;
  }
  .videoRank{
    width: 30%;
    float: left;
  }
}

</style>