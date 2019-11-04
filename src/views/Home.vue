<template>
    <div>
        <header class="title">{{msg}}</header>
        <input v-model="msg" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: ''
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss-mixins/common.scss';
@include setBgColor('.title', teal);
</style>