<template>
    <div class="commmentListTable">
        <!-- <UpdateUser v-if="showUpdateUser" :visible.sync="showUpdateUser"  @refresh-data="refreshData" :userObj='userObj'></UpdateUser> -->
        <el-table ref="multipleTable" :data="comments" border stripe tooltip-effect="dark" style="width: 100%;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="ID" width="40" show-overflow-tooltip prop="id"></el-table-column>
            <el-table-column label="创建日期" width="160" show-overflow-tooltip prop="createdAt"></el-table-column>
            <el-table-column label="视频ID" width="70" prop="videoId" show-overflow-tooltip ></el-table-column>
            <el-table-column label="视频详情"  width="80" >
                <template slot-scope="scope">
                    <el-button size="mini" @click="handlePlay(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="用户id"  prop="userId" width="70" show-overflow-tooltip></el-table-column>
            <el-table-column label="父评论id" prop="parentId" width="80"></el-table-column>
            <el-table-column label="根评论id" prop="firstId" width="80"></el-table-column>
            <el-table-column label="内容"prop="content" min-width="320"  show-overflow-tooltip ></el-table-column>
            <el-table-column width="210">
                <template slot="header" slot-scope="scope"><div v-if="false">{{scope}}</div>
                    <el-input v-model="config.search" size="mini" placeholder="评论内容" style="width:45%;margin-right:5%"/>
                    <el-button size="mini" @click="retrieve">检索</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin: 15px 0">
            <el-button @click="batchDelete()" :disabled="multipleSelection.length==0" type="danger">批量删除</el-button>
            <el-button @click="toggleSelection()" >取消选择</el-button>
            <el-button @click="loadPage(0)" >强制刷新数据</el-button>
        </div>
        <div v-if="isLoading" class="pagination">
            <v-pagination show-quick-jumper @change="loadPage" :pageSize="config.pageSize" :total="config.count"></v-pagination>
        </div>        
    </div>
</template>
<script>
import UpdateVideo from "@/components/UpdateVideo.vue";
import VideoPlay from "@/components/VideoPlay.vue";
export default {
    components:{UpdateVideo,VideoPlay},
    data() {
        return {
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
        // commentList:{
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
        comments:{
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
            this.commentObj = JSON.parse(JSON.stringify(b))
        },
        handlePlay(a,b){
            // this.showVideoPlay = true
            // this.commentObj = JSON.parse(JSON.stringify(b))
            window.open(`/#/video/${b.videoId}`,'_blank')
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
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
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

    }
}
</script>
<style  lang="scss"scoped>
.commmentListTable{
    position: relative;
    .pagination{
        position: absolute;
        bottom:10px;
        right:30px;
    }
}
</style>