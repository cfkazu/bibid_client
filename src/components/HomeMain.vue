
<template>
    <section class="home">
        <HomeHero />
        <!-- ここから追加 -->
        <HomeAbout />
        <!-- ここまで追加 -->
    </section>
</template>
<script>
import HomeHero from './HomeHero.vue'
import HomeAbout from './HomeAbout.vue' // 今回追加

export default {
    components: {
        HomeHero,
        HomeAbout // 今回追加
    }
}
</script>
<style lang="scss" scoped>
.home {
    padding-bottom: 50px;
}
</style>