<template>
    <section class="home-about">
        <div class="section__title">
            <div class="section__title-text">{{ this.imagedata.title }}</div>
            <div class="section_title-main">
                {{ this.imagedata.decription }}</div>
        </div>
        <v-container>
            <v-row class="home-about__contents">
                <v-col md="5" class="home-about__contents-img">
                    <img height="150" :src="imgSrc" alt="" class="img-fluid">
                </v-col>
                <v-col md="5" class="home-about__contents-text">
                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Prompt</div>

                            <div class="text--primary">
                                {{ this.imagedata.prompt }}
                            </div>
                        </v-card-text>

                    </v-card>
                    <br>

                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Negative Prompt</div>

                            <div class="text--primary">
                                {{ this.imagedata.neg_prompt }}
                            </div>
                        </v-card-text>

                    </v-card>
                    <br>
                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Additional Tags</div>

                            <div class="text--primary">
                                {{ this.imagedata.additonal_tags }}
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
<script>
import axios from 'axios';
export default {
    name: 'LoginMain',

    data: () => ({
        imagedata: {},
        url: '',
    }),
    mounted() {
        this.url = 'http://localhost:8000/getgraph/' + this.$route.params.id + '/'
        console.log(this.url)
        axios.get(this.url)
            .then(response => {
                this.imagedata = response.data;
                console.log(this.imagedata)
                console.log(this.imagedata.prompt)
            })
            .catch(error => {
                console.log(error);
            });
    },
    computed: {
        imgSrc() {
            return this.imagedata.image
        }
    },
    methods: {

    }
}
</script>