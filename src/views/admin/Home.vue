<template>
    <div class="home">
        <el-row class="tac">
            <el-col :span="24">
                <el-menu :unique-opened="true" default-active="userList" class="el-menu-vertical-demo" active-text-color="#ffd04b" background-color="#33373b" text-color="rgba(255, 255, 255, 0.7)"
                        @open="handleOpen" @close="handleClose" @select="handleSelect">
                    <el-submenu index="1">
                        <template slot="title">
                            <!-- <i class="el-icon-location"></i> -->
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="userList">用户列表</el-menu-item>
                            <el-menu-item index="adminList">管理员列表</el-menu-item>
                            <el-menu-item index="createUser">新增用户</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <!-- <i class="el-icon-location"></i> -->
                            <span>资源管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="videoNormalList">已通过</el-menu-item>
                            <el-menu-item index="videoAuditList">审核中</el-menu-item>
                            <el-menu-item index="postVideo">发布视频</el-menu-item>
                        </el-menu-item-group>
                        </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <span>更多</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="home">前往主页</el-menu-item>
                            <el-menu-item index="exit">退出</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
import * as userAPI from "@/api/user"
export default {
    name: "Home",
    computed: {
        //key() {
        //路由发生变化就重新渲染
        // return this.$route.name
        //   ? this.$route.name + +new Date()
        //   : this.$route + +new Date()
        //}
    },
    components: {
    },
    methods:{
        exit() {
            userAPI.exit().then(res => {
                if (res.code == 0) {
                this.isLogin = false;
                window.open(`/login/#`,'_self')
                //this.$router.go(0);
                } else {
                console.log(res);
                }
            }).catch(err => {
                this.$message.error("退出失败");
                console.log(err);
                });
        },
        handleOpen(key, keyPath) {
            //console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            //console.log(key, keyPath);
        },
        handleSelect(key,keyPath){
            switch(key){
                case "home": window.open(`/#/`,'_self')
                    break;
                case "exit": this.exit()
                    break;
                default : this.$router.push(`/${key}`)
                    break;
            }
            
        }
    },
}

</script>

<style lang="scss" scoped>
.home {
    height: 100%;
    margin: 0 auto;
    .el-menu{
        border-right: solid 0px #e6e6e6;
    }
    .tac{
        height: 100%;
        background:#33373b;
    }
}
</style>