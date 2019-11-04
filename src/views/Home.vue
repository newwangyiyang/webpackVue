<template>
    <div class="box w-h-100p bg-1 p-t-80">
        <div class="bg-3 w-300 h-300 brs10 brs-t-l250 brs-b-r250 flex-col flex-space-a box-son">
            <span class="col-0">box</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: ''
        }
    },
    created() {
        document.title = '首页'
    }
}
</script>

<style lang="scss">
@import '../assets/scss-mixins/common.scss';
.box {
    height: 100vh;
}
.box-son {
    transform: rotateZ(-45deg);
}
</style>