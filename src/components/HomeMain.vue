
<template>
    <section class="home">

        <!-- ここから追加 -->
        <HomeAbout />
        <NewestImage />
        <HottestImage />
        <RecommendImage />
        <!-- ここまで追加 -->
    </section>
</template>
<script>

import HomeAbout from './HomeAbout.vue' // 今回追加
import NewestImage from './NewestImage.vue'
import HottestImage from './HottestImage.vue'
import RecommendImage from './RecommendImage.vue'
export default {
    components: {

        HomeAbout,
        NewestImage,
        HottestImage,
        RecommendImage,
    }
}
</script>
<style lang="scss" scoped>
.home {
    padding-bottom: 50px;
}
</style>