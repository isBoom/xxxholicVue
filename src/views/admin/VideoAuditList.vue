<template>
    <div>
        <VideoListTable :videos="videos" :config="config" 
            @load-page="loadPage" @update-video="updateVideo" 
            @batch-delete="batchDelete"/>
    </div>
</template>
<script>
import VideoListTable from "@/components/VideoListTable.vue"
import * as API from "@/api/admin"
export default {
    data(){
        return{
            form:{},
            videos:[],
            config:{
                pageSize:10,
                count:0,
                currentPage:1,
                search: '',
            }
        }
    },
    components:{
        VideoListTable,
    },
    methods:{
        loadPage(){
            this.form.title = this.form.info = this.form.userName = this.config.search
            this.form.offset = this.config.pageSize*(this.config.currentPage-1)
            this.getVideoList()
            this.form = {}
            for(let i = 0;i<document.getElementsByClassName("ant-pagination-item").length;i++){
                document.getElementsByClassName("ant-pagination-item")[i].classList.remove("ant-pagination-item-active")
            }
            if(document.getElementsByClassName("ant-pagination-item").length!=0){
                document.getElementsByClassName("ant-pagination-item")[this.config.currentPage-1].classList.add("ant-pagination-item-active")
            }
        },
        updateVideo(data){
            API.updateVideo(data).then(res=>{
                if(res.code == 0){
                    this.loadPage()
                    this.$notify({
                        type:"success",
                        title: '更新成功',
                    });
                }else{
                    this.$notify({
                        type:"error",
                        title: '更新失败',
                        message: res.msg,
                    });
                }
            }).catch(e=>{
                this.$notify({
                    type:"error",
                    title: '服务器异常',
                    message: e,
                });
                console.log(e);
            })
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
        },
        getVideoList(){
            this.form.status = "audit"
            API.videoList(this.form).then(res => {
                if(res.code == 0){
                    console.log(res);
                    if (res.data!= null){
                        res.data.forEach(element => {
                            element.created_at = this.unix(element.created_at)
                        });
                    }
                    this.config.count = res.count
                    this.videos = res.data
                }else{
                    this.$notify({
                        type:"error",
                        title: '出现异常',
                        message:res.msg
                    });
                }
            }).catch(e => {
                this.$notify({
                    type:"error",
                    title: '服务器异常',
                    message: e,
                });
                console.log(e);
            })
        },
        handleDelete(a,b){
            // this.$confirm('确认操作？', '警告', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     this.id.push(b.id)
            //     this.delUser()
            // }).catch(() => {});
        },
        handleEdit(a,b){
            // this.showUpdateUser = true
            // this.userObj = JSON.parse(JSON.stringify(b))
        },
        batchDelete(ids){
            let data={"ids":ids}
            API.batchDeleteVideo(data).then(res=>{
                if(res.code==0){
                    this.$notify({
                        type:"success",
                        title: '删除成功',
                    });
                    console.log(this.videos.length);
                    console.log(ids.split(",").length);
                    if(this.videos.length <= ids.split(",").length){
                        this.config.currentPage--
                    }
                    this.loadPage()
                }else{
                    this.$notify({
                        type:"error",
                        title: '删除失败',
                        message: res.msg
                    });
                }
            }).catch(e=>{
                this.$notify({
                    title: '服务器异常',
                    message: 'e'
                });
            })
        },
    },
    created() {
        //setInterval(()=>{console.log(this.config.currentPage);},1000)
        this.getVideoList()
    },
}
</script>