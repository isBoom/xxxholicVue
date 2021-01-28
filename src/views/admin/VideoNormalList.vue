<template>
    <div>
        <VideoListTable />
    </div>
</template>
<script>
import VideoListTable from "@/components/VideoListTable.vue"
export default {
    components:{
        VideoListTable,
    },
    methods:{
        loadPage(i){
                // this.form.offset = this.pageSize*(i-1)
                // this.getUserList(this.form)
                // this.form = {}
                // this.currentPage = i
        },
        
        getUserList(form){
            // API.adminList(form).then(res =>{
            //     if(res.code == 0){
            //         if (res.count == 0){
            //             this.users = this.users.filter(data => false)
            //             return
            //         }
            //         res.data.forEach(element => {
            //             element.created_at = this.unix(element.created_at)
            //             element.permissions = "admin"
            //         });
            //         this.users = res.data
            //         if(res.count > this.pageSize){
            //             this.isLoading = true
            //             this.count = res.count
            //         }else{
            //             this.isLoading = false
            //         }
            //     }else{
            //         this.$notify({
            //             type:"error",
            //             message:"获取用户列表失败"
            //         })
            //         console.log(res);
            //     }
            // }).catch(e =>{
            //     console.log(e);
            //     // this.$message({
            //     //     type:"error",
            //     //     message:"服务器异常",
            //     // })
            // })
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
        batchDelete(){
            // this.$confirm('确认操作？', '警告', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     this.id = []
            //     this.multipleSelection.forEach(element => {
            //         if(element.id!=1){
            //             this.id.push(element.id)
            //         }
            //     });
            //     this.delUser()
            // }).catch(() => {});
            
        },
        delUser(){
            // let data = {"ids":this.id.join(",")}
            //     API.batchDelete(data).then(res =>{
            //         if(res.code == 0){
            //             this.loadPage(this.currentPage)
            //             this.multipleSelection = []
            //             this.id = []
            //             this.$notify({
            //                 type:"success",
            //                 title:"删除成功"
            //             })
            //         }else{
            //             this.$notify({
            //                 type:"error",
            //                 title:"删除失败"
            //             })
            //             console.log(res);
            //         }
            //     }).catch(e =>{
            //         this.$notify({
            //             type:"error",
            //             title:"请求失败",
            //         })
            //     })
        }
            
    },
}
</script>