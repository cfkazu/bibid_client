
<template>
    <section class="home">

        <!-- ここから追加 -->
        <HomeAbout />

        <HottestImage />

        <ChildResult v-bind:nsfw="nsfw" v-bind:order="order" v-bind:word="word" v-bind:displaytitle="visible" />
        <ChildResult v-bind:nsfw="nsfw" v-bind:order="order" v-bind:word="word2" v-bind:displaytitle="visible" />
        <NewestImage />

        <RecommendImage />
        <!-- ここまで追加 -->
    </section>
</template>
<script>

import HomeAbout from './HomeAbout.vue' // 今回追加
import NewestImage from './NewestImage.vue'
import HottestImage from './HottestImage.vue'
import RecommendImage from './RecommendImage.vue'
import ChildResult from './ChildResult_hanyou.vue'
import Swal from 'sweetalert2';
export default {
    components: {

        HomeAbout,
        NewestImage,
        HottestImage,
        RecommendImage,
        ChildResult
    },
    data() {
        return {
            order: 'new',
            nsfw: 0,
            word: "姉派",
            word2: "妹派",
            visible: true,
        }
    },
    beforeMount() {


        this.$session.start();
        if (!(this.$route.query.id === void 0)) {
            if (!this.$cookies.isKey("user")) {
                this.$cookies.config(60 * 60 * 1, '', '', true);
                var user = { id: this.$route.query.id, token: this.$route.query.t }
                this.$cookies.set("user", user);
                Swal.fire({
                    text: 'ログインしました。',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (this.$cookies.isKey("togo")) {
                            const togo = this.$cookies.get("togo")
                            this.$cookies.remove("togo")
                            this.$router.push({ path: togo });
                        } else {
                            this.$router.push({ path: '/about' })
                        }
                    }
                })
            }
        }
    }
}

</script>
<style lang="scss" scoped>
.home {
    padding-bottom: 50px;
}
</style>