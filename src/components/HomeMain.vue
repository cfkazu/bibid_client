
<template>
    <section class="home">

        <!-- ここから追加 -->
        <HomeAbout />
        <NewestImage />
        <!-- ここまで追加 -->
    </section>
</template>
<script>

import HomeAbout from './HomeAbout.vue' // 今回追加
import NewestImage from './NewestImage.vue'
export default {
    components: {

        HomeAbout,
        NewestImage,
    }
}
</script>
<style lang="scss" scoped>
.home {
    padding-bottom: 50px;
}
</style>