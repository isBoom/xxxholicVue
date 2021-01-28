<template>
    <div class="videoListTable">
        videoListTable
        <!-- <UpdateUser v-if="showUpdateUser" :visible.sync="showUpdateUser"  @refresh-data="refreshData" :userObj='userObj'></UpdateUser> -->
        <el-table ref="multipleTable"  :data="videos" border stripe tooltip-effect="dark" style="width: 100%;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="ID" width="40" show-overflow-tooltip prop="id"></el-table-column>
            <el-table-column label="创建日期" width="200" show-overflow-tooltip prop="created_at"></el-table-column>
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            <el-table-column prop="email" width="200" label="邮箱" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userName" width="120" label="姓名" show-overflow-tooltip ></el-table-column>
            <el-table-column prop="status" width="80" label="状态" show-overflow-tooltip ></el-table-column>
            <el-table-column prop="signature" label="个性签名" show-overflow-tooltip></el-table-column>
            <el-table-column width="300">
                <template slot="header" slot-scope="scope"><div v-if="false">{{scope}}</div>
                    <el-input v-model="search" size="mini" placeholder="标题/详情" style="width:45%;margin-right:5%"/>
                    <el-button size="mini" @click="retrieve">检索</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" v-if="scope.row.id!=1" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin: 15px 0">
            <!-- <el-button @click="toggleSelection([videos[1], videos[2]])">切换第二、第三行的选中状态</el-button> -->
            <el-button @click="batchDelete()" :disabled="multipleSelection.length==0" type="danger">批量删除</el-button>
            <el-button @click="toggleSelection()" >取消选择</el-button>
        </div>
        <div v-if="isLoading" class="pagination">
            <v-pagination show-quick-jumper @change="loadPage" :pageSize="pageSize" :total="count"></v-pagination>
        </div>        
    </div>
</template>
<script>
import UpdateVideo from "@/components/UpdateVideo.vue"
import * as API from "@/api/video/";
export default {
    data() {
        return {
            currentPage:1,
            videos: [],
            search: '',
            isLoading:false,
            pageSize:10,
            count:0,
            batchDeleteDisabled:true,
            multipleSelection: [],
            id:[],
            form:{},
            showUpdateUser:false,
            videoObj:{},
            // showUpdateVideo: false,
            // boxHeightChange:"",
            // pageSize:12,
            // videoCount:0,
            // 
            // isLoading:false,
            // nbsp: "&nbsp;",
            // videoParams:{
            //     offset:0,
            //     limit:0,
            //     userId:0,
            //     status:"",
            // }
        };
    },
    components:{
        //UpdateVideo
    },
    methods: {
        loadPage(i){
                // this.form.offset = this.pageSize*(i-1)
                // this.getUserList(this.form)
                // this.form = {}
                // this.currentPage = i
        },
        toggleSelection(rows) {
            // console.log(">>>>");
            // if (rows) {
            // rows.forEach(row => {
            //     this.$refs.multipleTable.toggleRowSelection(row);
            // });
            // } else {
            // this.$refs.multipleTable.clearSelection();
            // }
        },
        //控制删除按钮
        handleSelectionChange(val) {
            // console.log(val);
            // this.multipleSelection = val;
            // if(this.multipleSelection.length == 0){
            //     this.batchDeleteDisabled = true
            // }else{
            //     this.batchDeleteDisabled = false
            // }
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
        retrieve(){
            // this.form.email = this.form.userName = this.search
            // this.loadPage(this.currentPage)
        },
    },
    
    created(){
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