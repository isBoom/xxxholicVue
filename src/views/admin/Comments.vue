<template>
    <div>
        <CommentListTable :comments="comments" :config="config" 
            @load-page="loadPage" @update-comments="updateComments" 
            @batch-delete="batchDelete"/>
    </div>
</template>
<script>
import CommentListTable from "@/components/CommentListTable.vue"
import * as API from "@/api/admin"
export default {
    data(){
        return{
            form:{},
            comments:[],
            config:{
                pageSize:10,
                count:0,
                currentPage:1,
                search: '',
            }
        }
    },
    components:{
        CommentListTable,
    },
    methods:{
        loadPage(){
            this.form.content = this.config.search
            this.form.offset = this.config.pageSize*(this.config.currentPage-1)
            this.getComments()
            this.form = {}
            for(let i = 0;i<document.getElementsByClassName("ant-pagination-item").length;i++){
                document.getElementsByClassName("ant-pagination-item")[i].classList.remove("ant-pagination-item-active")
            }
            if(document.getElementsByClassName("ant-pagination-item").length!=0){
                document.getElementsByClassName("ant-pagination-item")[this.config.currentPage-1].classList.add("ant-pagination-item-active")
            }
        },
        updateComments(){

        },
        batchDelete(ids){
            let data={"ids":ids}
            API.batchDeleteComments(data).then(res=>{
                if(res.code==0){
                    this.$notify({
                        type:"success",
                        title: '删除成功',
                    });
                    console.log(this.comments.length);
                    console.log(ids.split(",").length);
                    if(this.comments.length <= ids.split(",").length){
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
        getComments(){
            API.commentList(this.form).then(res => {
                if(res.code == 0){
                    console.log(res);
                    this.comments = res.data
                    this.config.count = res.count
                    this.comments.forEach(element => {
                        element.createdAt = this.unix(element.createdAt)
                    });
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
    created() {
        this.form.limit = 10
        this.getComments()
    },
}
</script>