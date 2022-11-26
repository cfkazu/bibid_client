
<template>
    <section class="home">

        <!-- ここから追加 -->
        <HomeAbout />
        <router-link :to="'/contest'" style="text-decoration: none; color: inherit;">
            <v-card>
                <div class="competetion_title-bigtitleminimini mt-10 black">
                    Bibid投稿コンテスト第一弾！&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
                </div>
                <div class=" competetion_title-bigtitlemid mt-n1 black">
                    姉派？妹派？&nbsp;<br>
                </div>
                <div class="competetion_title-bigtitle mt-n5 black">
                    あなたは、どっち派？<br>
                </div>
                <div class="competetion_title-bigtitlemini mt-n2 black">
                    投稿してAmazonギフト券10000円を手に入れよう！<br>
                </div>
                <div class="competetion_title-bigtitleminimini mt-n2 black">
                    2022年11月23日～12月24日<br>
                </div>

            </v-card>
        </router-link>

        <ChildResult v-bind:nsfw="nsfw" v-bind:order="order" v-bind:word="word" v-bind:displaytitle="visible" />
        <ChildResult v-bind:nsfw="nsfw" v-bind:order="order" v-bind:word="word2" v-bind:displaytitle="visible" />
        <HottestImage />
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
                            this.$router.push({ path: '/' })
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

.competetion_title {
    margin-top: 20px;
    justify-content: center;

    &-bigtitle {
        text-align: center;
        font-size: 48px;
        font-weight: bold;
        color: yellow;
    }

    &-bigtitleminimini {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: white;
    }

    &-bigtitlemid {
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        color: white;
    }

    &-bigtitlemini {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        color: white;
    }

    &-bigtitleleft {
        text-align: left;
        margin-left: 100px;
        font-size: 40px;
        font-weight: bold;
        color: #2196F3;
        text-shadow: 2px 2px 0 #FFF, -2px -2px 0 #FFF,
            -2px 2px 0 #FFF, 2px -2px 0 #FFF,
            0px 2px 0 #FFF, 0-2px 0 #FFF,
            -2px 0 0 #FFF, 2px 0 0 #FFF;
    }

    &-bigtitleleftwhite {
        text-align: left;
        margin-left: 100px;
        font-size: 40px;
        font-weight: bold;
        color: #E91E63;

        text-shadow: 2px 2px 0 #FFF, -2px -2px 0 #FFF,
            -2px 2px 0 #FFF, 2px -2px 0 #FFF,
            0px 2px 0 #FFF, 0-2px 0 #FFF,
            -2px 0 0 #FFF, 2px 0 0 #FFF;
    }

    &-bigtitleright {
        text-align: right;
        margin-left: 100px;
        font-size: 40px;
        font-weight: bold;
        color: #e65f78;
    }

    &-title {
        color: yellow;
        font-size: 60px;
        font-weight: bold;
        text-align: center;
    }

    &-subtitle {
        color: yellow;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
    }

    &-img {
        text-align: center;
    }

    &-textblack {
        color: #e65f78;
        margin-left: 20px;
        word-wrap: break-word;
        text-align: center;
    }

    &-text {
        color: white;
        font-size: 20px;
        margin-left: 20px;
        word-wrap: break-word;
        text-align: center;
    }
}
</style>