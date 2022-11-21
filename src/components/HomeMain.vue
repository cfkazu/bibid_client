
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
import Swal from 'sweetalert2';
export default {
    components: {

        HomeAbout,
        NewestImage,
        HottestImage,
        RecommendImage,
    },
    beforeMount() {

        console.log(this.$route.params.id)
        this.$session.start();
        if (this.$route.query.id === void 0) {
            console.log(this.$route.params.id)
        } else {
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