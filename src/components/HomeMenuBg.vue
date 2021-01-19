<template>
<div class="homeMenuBg">
    <div class="homeMenuBgH"></div>
</div>
</template>
<script>
export default {
    name: 'homeMenuBg',
}
</script>
<style lang="scss" scoped>
.homeMenuBg{
    overflow: hidden;
    position:absolute;
    top: 0%;
    width: 100%;
    height: 155px;
    .homeMenuBgH{
        width: 104%;
        position:absolute;
        top: 0;
        left: -2%;
        padding: -10%;
        box-shadow: inset 0px 50px 30px rgba(0, 0, 0, 0.3);
        background: url("../static/homeBg.jpg") no-repeat center;
        background-size: 2013px 155px;
        height: 155px;
    }
}
</style>