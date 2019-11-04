<template>
    <div class="p-t-10 p-l-10 flex-center flex-col flex-space-a wrap">
        <input type="text" placeholder="请输入您的姓名" class="input h-30 l-h-30 w-300 p-l-10 brs5">
        <button @click="btnClick" class="btn h-30 w-60 l-h-30 f-s-14 col-0 bg-1 n-t-10">btn</button>
        <p class="paragh col-2 f-s-13">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam explicabo illum alias eveniet magnam, quo incidunt, inventore perferendis minus sunt quaerat distinctio minima tempore accusantium amet? Asperiores, ab. Expedita, commodi.</p>
        <div class="h-100 w-100 brs10 bg-3 i-box"></div>
        <span class="icon"></span>
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
    },
    methods: {
        btnClick() {
            console.log('110')
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss-mixins/common.scss';
.wrap {
    @include fullscreen-bg($url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3132986090,1187457678&fm=26&gp=0.jpg');
}
.btn {
    @include extend-click();
}
.input {
    @include beauty-placeholder($fz: 13px, $align: center);
}
.paragh {
    @include beauty-select($bgcolor: red);
    @include glow-text($color: red);
    @include first-letter();
    @include first-line();
    @include one-px(top);
}
.i-box {
    @include blur($blur: 0px);
    @include center-el($mode: 'transform');
}
.icon {
    @include icon-image($url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572881187373&di=f9806f73324991f4889dfe48d889a8ad&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F014ca3554859190000002b0190cdf1.jpg')
}
</style>