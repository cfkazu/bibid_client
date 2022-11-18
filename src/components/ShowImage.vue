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
                    <v-card :max-width="$vuetify.breakpoint.width * 2 / 3" class="mx-auto" elevation="0">


                        <v-list three-line>



                            <v-card-actions>
                                <router-link :to="'/user/' + this.imagedata.author_id.id">
                                    <v-list-item-avatar size="50">
                                        <v-img :src="this.imagedata.author_id.profile_url"></v-img>
                                    </v-list-item-avatar>
                                </router-link>
                                <router-link :to="'/user/' + this.imagedata.author_id.id">
                                    <v-list-item-content>
                                        <v-list-item-title>@{{ this.imagedata.author_id.username }}</v-list-item-title>

                                    </v-list-item-content>
                                </router-link>
                            </v-card-actions>

                        </v-list>
                    </v-card>
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