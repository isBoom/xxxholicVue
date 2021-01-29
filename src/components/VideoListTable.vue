<template>
    <div class="videoListTable">
        <UpdateVideo v-if="showUpdateVideo" :visible.sync="showUpdateVideo" 
        @update-data="(data)=>{$emit('update-video',data)}" :title="title" :videoObj='videoObj'
        :identity=true />
        <VideoPlay v-if="showVideoPlay" :visible.sync="showVideoPlay" :videoObj='videoObj'/>
        <!-- <UpdateUser v-if="showUpdateUser" :visible.sync="showUpdateUser"  @refresh-data="refreshData" :userObj='userObj'></UpdateUser> -->
        <el-table ref="multipleTable" :data="videos" border stripe tooltip-effect="dark" style="width: 100%;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="ID" width="40" show-overflow-tooltip prop="id"></el-table-column>
            <el-table-column label="创建日期" width="160" show-overflow-tooltip prop="created_at"></el-table-column>
            <el-table-column prop="user.userName" width="120" label="用户姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="title" label="标题" show-overflow-tooltip ></el-table-column>
            <el-table-column prop="info" label="简介" show-overflow-tooltip ></el-table-column>
            <el-table-column prop="videoType" width="80" label="视频类型" show-overflow-tooltip></el-table-column>
            <el-table-column width="210">
                <template slot="header" slot-scope="scope"><div v-if="false">{{scope}}</div>
                    <el-button size="mini" @click="retrieve" style="width:100%">检索</el-button>
                    <el-input v-model="config.search" size="mini" placeholder="用户名/标题/详情" style="width:100%"/>
                    
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handlePlay(scope.$index, scope.row)">播放</el-button>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin: 15px 0">
            <el-button @click="batchDelete()" :disabled="multipleSelection.length==0" type="danger">批量删除</el-button>
            <el-button @click="toggleSelection()" >取消选择</el-button>
        </div>
        <div v-if="isLoading" class="pagination">
            <v-pagination show-quick-jumper @change="loadPage" :pageSize="config.pageSize" :total="config.count"></v-pagination>
        </div>        
    </div>
</template>
<script>
import UpdateVideo from "@/components/UpdateVideo.vue"
import VideoPlay from "@/components/VideoPlay.vue"
export default {
    components:{UpdateVideo,VideoPlay},
    data() {
        return {
            title:"更新视频信息",
            isLoading:false,
            batchDeleteDisabled:true,
            multipleSelection: [],
            id:[],
            form:{},
            //
            showVideoPlay:false,
            showUpdateVideo: false,
        };
    },
    watch:{
        // videoList:{
        //     handler(e){
        //         console.log(e);
        //     },
        //     deep:true
        // }
        "config.count":{
            handler(v){
                if(v > 10){
                    this.isLoading = true
                }else{
                    this.isLoading = false
                }
            },
            // deep:true,
            // immediate: true
        },
        "multipleSelection.length":{
            handler(v){
                if (v == 0) {
                    this.batchDeleteDisabled = true
                }else{
                    this.batchDeleteDisabled = false
                }
            }
        }
    },
    props:{
        videos:{
            type:Array,
            default:()=>[]
        },
        config:{
            type:Object,
            default:{},
        },
    },
    methods: {
        loadPage(i){
            this.config.currentPage = i
            this.$emit("load-page")
        },
        //检索
        retrieve(){
            //记录坑
            this.config.currentPage = 1
            this.$emit("load-page")
        },
        handleEdit(a,b){
            this.showUpdateVideo = true
            this.videoObj = JSON.parse(JSON.stringify(b))
        },
        handlePlay(a,b){
            this.showVideoPlay = true
            this.videoObj = JSON.parse(JSON.stringify(b))
        },
        batchDelete(){
            this.$confirm('确认操作？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let id = []
                this.multipleSelection.forEach(element => {
                    id.push(element.id)
                });
                this.$emit("batch-delete",id.join(","))
            }).catch(() => {});
        },
        handleDelete(a,b){
            this.$confirm('确认操作？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$emit("batch-delete",String(b.id))
            }).catch(() => {});
        },
        //toggleSelection(rows) {
            // console.log(">>>>");
            // if (rows) {
            // rows.forEach(row => {
            //     this.$refs.multipleTable.toggleRowSelection(row);
            // });
            // } else {
            // this.$refs.multipleTable.clearSelection();
            // }
        //},
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
    },
    
    mounted(){
        // var that = this
        // setTimeout(function(){
        //     console.log(that.videoList);
        // },1000)
        // this.videoParams.status = "normal"
        // this.videoParams.userId = 1
        // this.videoParams.limit=this.pageSize,
        // this.videoParams.info = this.$route.query.info
        // this.getVideos(this.videoParams)
    }
}
</script>
<style lang="scss" scoped>
.videoListTable{
    position: relative;
    .pagination{
        position: absolute;
        bottom:10px;
        right:30px;
    }
}
</style>