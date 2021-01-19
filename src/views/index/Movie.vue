<template>
 <div class="home">
    <VideoBox class="videoBox"/>
    <VideoRank class="videoRank"/>
 </div>
</template>
<script>
import VideoBox from './VideoBox.vue';
import VideoRank from './VideoRank.vue';
export default {
    name: "Movie",
    components: {
        VideoBox,
        VideoRank
    },
    methods:{
    },
    created(){
      this.$store.state.exclude = this.$store.state.exclude.filter(item => item != this.$route.name)
    },
    // activated(){
    //   if(this.$route.meta.keepAlive == false){
    //     this.$route.meta.keepAlive = true
    //   }
    // },
    deactivated(){
      this.$router.beforeEach((to, from, next) => {
        if (to.name == "Video"){
            this.$store.state.exclude.push(this.$route.name)
        }
        next()
      })
    },
}
</script>