<template>
    <section class="home-about">
        <div class="section__title">
            <div class="section__title-text">What is Bibid?</div>
            <div class="section_title-main">
                Bibidでは、イラストAIを使って描いた画像を投稿・共有することができます。<br>みんなのプロンプト(呪文)を参考に、あなただけのイラストを作成しよう！</div>
        </div>
        <v-container>
            <v-row class="home-about__contents">
                <v-col md="5" class="home-about__contents-img">
                    <img height="150" src="../assets/img/profile.jpg" alt="" class="img-fluid">
                </v-col>
                <v-col md="5" class="home-about__contents-text">
                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Prompt</div>

                            <div class="text--primary">
                                masterpiece,ikemen
                            </div>
                        </v-card-text>

                    </v-card>
                    <br>

                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Negative Prompt</div>

                            <div class="text--primary">
                                masterpiece,ikemen
                            </div>
                        </v-card-text>

                    </v-card>
                    <br>
                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Additional Tags</div>

                            <div class="text--primary">
                                masterpiece,ikemen
                            </div>
                        </v-card-text>

                    </v-card>
                </v-col>
            </v-row>


        </v-container>
    </section>
</template>
<style lang="scss" scoped>
@import '../styles/common/common';

.home-about__contents {
    margin-top: 20px;
    justify-content: center;

    &-img {
        text-align: center;
    }

    &-text {
        word-wrap: break-word;
    }
}
</style>
