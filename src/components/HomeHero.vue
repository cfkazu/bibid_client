<template>
    <section class="home-hero">
        <v-container fluid fill-height class="home-hero__content">
            <v-row>
                <v-col class="home-hero__content-text">
                    <p>AIイラスト画像を共有できるサイト</p>
                    <p>I'm a enginner.</p>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<style  lang="scss" scoped>
@import '../styles/common/common';

.home-hero__content {
    background: url("../assets/img/home-hero.jpg");
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 30vh;


    /* ここから追加 */
    @include display_pc {
        height: 30vh;
    }

    /* ここまで追加 */

    &-text {
        color: #e65f78;
        text-align: center;
        font-size: 28px;
        font-weight: bold;

        /* ここから追加 */
        @include display_pc {
            font-size: 40px;
        }

        /* ここまで追加 */
    }
}
</style>