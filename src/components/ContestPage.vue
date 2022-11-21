<template>
    <section class="home-about mt black">
        <v-card>
            <div class="competetion_title-bigtitle mt-10 black">
                あなたは、どっち派？<br>
            </div>
            <div class="competetion_title-bigtitlemini mt-n2 black">
                投稿してAmazonギフト券10000円を手に入れよう！<br>
            </div>
            <div class="competetion_title-bigtitleminimini mt-n2 black">
                2022年11月23日～12月24日<br>
            </div>


            <div class="competetion_title-textblack">

                <br><br><br>
            </div>
        </v-card>



        <v-row justify="space-between" class="black">
            <v-col class="blue lighten-3">
                <div class="competetion_title-bigtitleleftwhite ">
                    #姉派？

                </div>
                <ChildResult v-bind:nsfw="nsfw" v-bind:order="order" v-bind:word="word" v-bind:displaytitle="display" />
                <v-row justify="center mt-n10">
                    <v-btn @click="AneToukou" large depressed>#姉派で投稿する!</v-btn>
                </v-row>
            </v-col>
            <v-col class="pink lighten-2">
                <div class="competetion_title-bigtitleleft ">
                    #妹派？
                </div>
                <ChildResult v-bind:nsfw="nsfw" v-bind:order="order" v-bind:word="word2"
                    v-bind:displaytitle="display" />
                <v-row justify="center mt-n10">
                    <v-btn @click="ImouToukou" large depressed>#妹派で投稿する!</v-btn>
                </v-row>
            </v-col>
        </v-row>
        <v-container class="black mt-10" fluid>
            <div class="competetion_title">
                <div class="competetion_title-title">COMPETITION</div>
                <div class="competetion_title-text">
                    <br>
                    Bibidでは定期的にコンテストを開催します。<br>
                    開催期間中に最も皆様からの「いいね！」を集めた作品には<br>

                    Amazonギフト券10000円分を贈呈します！<br>
                    <br><br>
                </div>
                <div class="competetion_title-subtitle">参加方法</div>
                <div class="competetion_title-text">

                    タグに「姉派」「妹派」をつけて<br>
                    投稿された画像が自動でエントリーされます！<br>
                    もちろん通常の画像の投稿も大歓迎です！

                    <br><br>


                </div>
                <div class="competetion_title-subtitle">注意事項</div>
                <div class="competetion_title-text">

                    AIで生成された画像がエントリー対象です。<br>
                    一部人間の手によって修正された画像も対象となりまが、<br>
                    ご自身で生成・修正した画像のみを投稿してください。<br>
                    <br>
                    R-18画像も投稿可能です。<br>投稿画面より年齢指定を設定の上、事前に局部の修正をお願いします。
                    <br><br>
                    投稿画像をピックアップして作者を明示の上引用してツイートすることがありますが、<br>
                    投稿された画像の著作権は投稿者様に帰属します。<br>

                    <br>

                </div>
                <br><br>
            </div>


        </v-container>

    </section>
</template>
<script>
import ChildResult from './ChildResult.vue'
import router from '../router'
export default {
    components: {
        ChildResult
    },
    data() {
        return {
            order: 'new',
            nsfw: 0,
            word: "姉派",
            word2: "妹派",
            display: false,
        }
    },
    methods: {
        AneToukou() {
            router.push('/createimg?deftag=姉派,')
        },
        ImouToukou() {
            router.push('/createimg?deftag=妹派,')
        },

    }
}
</script>
<style lang="scss" scoped>
@import '../styles/common/common';

.v-application {
    font-family: "Noto Sans", "游明朝体", "M Plus 1p" !important;
}

.competetion_title {
    margin-top: 20px;
    justify-content: center;

    &-bigtitle {
        text-align: center;
        font-size: 60px;
        font-weight: bold;
        color: yellow;
    }

    &-bigtitleminimini {
        text-align: center;
        font-size: 20px;
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

* {
    margin: 0;
}
</style>