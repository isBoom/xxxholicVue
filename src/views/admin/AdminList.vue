<template>
    <div class="table">
        <UpdateUser v-if="showUpdateUser" :visible.sync="showUpdateUser" @refresh-data="refreshData" :userObj='userObj'></UpdateUser>
        <el-table ref="multipleTable"  :data="users" border stripe tooltip-effect="dark" style="width: 100%;"
            @selection-change="handleSelectionChange" :row-key="(row) => {return row.id}">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="ID" width="40" show-overflow-tooltip prop="id"></el-table-column>
            <el-table-column label="创建日期" width="200" show-overflow-tooltip prop="created_at"></el-table-column>
            <el-table-column prop="email" width="200" label="邮箱" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userName" width="120" label="姓名" show-overflow-tooltip ></el-table-column>
            <el-table-column prop="status" width="80" label="状态" show-overflow-tooltip ></el-table-column>
            <el-table-column prop="signature" label="个性签名" show-overflow-tooltip></el-table-column>
            <el-table-column width="300">
                <template slot="header" slot-scope="scope"><div v-if="false">{{scope}}</div>
                    <el-input v-model="search" size="mini" placeholder="邮箱/姓名" style="width:45%;margin-right:5%"/>
                    <el-button size="mini" @click="retrieve">检索</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" v-if="scope.row.id!=1" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin: 15px 0">
            <!-- <el-button @click="toggleSelection([users[1], users[2]])">切换第二、第三行的选中状态</el-button> -->
            <el-button @click="batchDelete()" :disabled="multipleSelection.length==0" type="danger">批量删除</el-button>
            <el-button @click="toggleSelection()" >取消选择</el-button>
            <el-button @click="loadPage(0)" >强制刷新数据</el-button>
        </div>
        <div v-if="isLoading" class="pagination">
            <v-pagination show-quick-jumper @change="loadPage" :pageSize="pageSize" :total="count"></v-pagination>
        </div>
    </div>
</template>
<script>
import UpdateUser from "@/components/UpdateUser.vue"
import * as API from '@/api/admin'
    export default {
        data() {
            return {
                search: '',
                isLoading:false,
                pageSize:10,
                count:0,
                batchDeleteDisabled:true,
                users: [],
                multipleSelection: [],
                id:[],
                currentPage:0,
                form:{},
                showUpdateUser:false,
                userObj:{},
            }
        },
        components:{
            UpdateUser,
        },
        methods: {
            refreshData(){
                this.loadPage(this.currentPage)
                this.refresh = false
            },
            loadPage(i){
                this.form.email = this.userName = this.search
                this.form.offset = this.pageSize*(i-1)
                this.getUserList()
                this.form = {}
                this.currentPage = i
                this.resetAntPaginationItem()
            },
            resetAntPaginationItem(){
                for(let i = 0;i<document.getElementsByClassName("ant-pagination-item").length;i++){
                    document.getElementsByClassName("ant-pagination-item")[i].classList.remove("ant-pagination-item-active")
                }
                if(document.getElementsByClassName("ant-pagination-item").length!=0){
                    document.getElementsByClassName("ant-pagination-item")[this.currentPage-1].classList.add("ant-pagination-item-active")
                }
            },
            toggleSelection(rows) {
                console.log(">>>>");
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
            //控制删除按钮
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
                if(this.multipleSelection.length == 0){
                    this.batchDeleteDisabled = true
                }else{
                    this.batchDeleteDisabled = false
                }
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
                this.loadPage(1)
                for(let i = 0;i<document.getElementsByClassName("ant-pagination-item").length;i++){
                    document.getElementsByClassName("ant-pagination-item")[i].classList.remove("ant-pagination-item-active")
                }
                if(document.getElementsByClassName("ant-pagination-item").length!=0){
                    document.getElementsByClassName("ant-pagination-item")[0].classList.add("ant-pagination-item-active")
                }
            },
            getUserList(){
                this.form.permissionsType = "admin"
                API.userList(this.form).then(res =>{
                    if(res.code == 0){
                        if (res.data != null){
                            res.data.forEach(element => {
                                element.created_at = this.unix(element.created_at)
                                element.permissions = "admin"
                            });
                            this.users = res.data
                        }else{
                            this.users = []
                            return
                        }
                        if(res.count > this.pageSize){
                            this.isLoading = true
                            this.count = res.count
                        }else{
                            this.isLoading = false
                        }
                    }else{
                        this.$notify({
                            type:"error",
                            message:"获取用户列表失败"
                        })
                        console.log(res);
                    }
                }).catch(e =>{
                    console.log(e);
                    // this.$message({
                    //     type:"error",
                    //     message:"服务器异常",
                    // })
                })
            },
            handleDelete(a,b){
                this.$confirm('确认操作？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.id.push(b.id)
                    this.delUser()
                }).catch(() => {});
            },
            handleEdit(a,b){
                this.showUpdateUser = true
                this.userObj = JSON.parse(JSON.stringify(b))
            },
            batchDelete(){
                this.$confirm('确认操作？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.id = []
                    this.multipleSelection.forEach(element => {
                        if(element.id!=1){
                            this.id.push(element.id)
                        }
                    });
                    this.delUser()
                }).catch(() => {});
                
            },
            delUser(){
                let data = {"ids":this.id.join(",")}
                    API.batchDeleteUser(data).then(res =>{
                        if(res.code == 0){
                            if(this.users.length <= this.id.join(",").split(",").length){
                                this.currentPage--
                            }
                            this.loadPage(this.currentPage)
                            this.multipleSelection = []
                            this.id = []
                            this.$notify({
                                type:"success",
                                title:"删除成功"
                            })
                        }else{
                            this.$notify({
                                type:"error",
                                title:"删除失败"
                            })
                            console.log(res);
                        }
                    }).catch(e =>{
                        this.$notify({
                            type:"error",
                            title:"请求失败",
                        })
                    })
            }
            
        },
        created(){
            this.getUserList({})
        }
    }
</script>
<style lang="scss" scoped>
.table{
    position: relative;
    .pagination{
        position: absolute;
        bottom:10px;
        right:30px;
    }
}
</style>
