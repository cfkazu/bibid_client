<template>



    <v-main>
        <v-container class="">



            <v-list class="">

                <v-list-item class="">


                    <v-list-item-content class="">
                        <v-row justify="start" v-if="displaytitle">
                            <div class="text-right font-weight-bold">
                                &emsp;#{{ word }}
                            </div>
                        </v-row>

                        <v-row class="mb-6 " no-gutters justify="start">

                            <v-col v-for="list in displayLists" :key="list.id" cols="12" sm="12" md="8" lg="8" xl="4"
                                class="mb-6 ">
                                <v-col md="12" class="mb-6 ">
                                    <v-card loading="false" class="mx-auto  " max-width="374" align="center">
                                        <router-link :to="'/image/' + list.id">
                                            <v-img :aspect-ratio="1" v-bind:src="list.image">
                                            </v-img>
                                        </router-link>
                                        <br>
                                        <v-row class="">
                                            <v-col cols="1" sm="1" md="1" lg="1">

                                            </v-col>
                                            <v-col>
                                                <div class="search-about__contents-text" align="left">
                                                    {{
                                                    list.title
                                                    }}
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-card-actions>

                                            <v-list-item class="grow ">

                                                <router-link :to="'/user/' + list.author_id.id">
                                                    <v-list-item-avatar color="grey darken-3">
                                                        <v-img class="elevation-6" alt=""
                                                            :src="list.author_id.profile_url">
                                                        </v-img>
                                                    </v-list-item-avatar>
                                                </router-link>
                                                <router-link :to="'/user/' + list.author_id.id">
                                                    <v-list-item-content>
                                                        <v-list-item-title>{{ list.author_id.first_name }}
                                                        </v-list-item-title>
                                                    </v-list-item-content>
                                                </router-link>
                                                <v-row align="center" justify="end">
                                                    <v-icon class="mr-1" color="red lighten-2" v-show="list.id in favs"
                                                        @click="disfavorite(list)">
                                                        mdi-heart
                                                    </v-icon>
                                                    <v-icon class="mr-1" @click="favorite(list)"
                                                        v-show="!(list.id in favs)">
                                                        mdi-heart
                                                    </v-icon>
                                                    <span class="subheading mr-2">{{ list.good }}</span>
                                                </v-row>
                                            </v-list-item>
                                        </v-card-actions>
                                    </v-card>

                                </v-col>
                            </v-col>

                        </v-row>
                        <v-btn justify="end" @click="Go_Search">もっと見る</v-btn>

                    </v-list-item-content>

                </v-list-item>
            </v-list>

            <br><br>

        </v-container>
    </v-main>

</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import constants from '../common/constants';
export default {
    name: 'App',
    props: {
        word: { type: String },
        order: { type: String },
        nsfw: { type: Number },
        displaytitle: { type: Boolean }
    },
    data() {
        return {

            page: 1,
            length: 0,
            num: 0,
            displayLists_devided: [],
            dividenum: 5,
            displayLists: [],
            pageSize: 12,
            favs: {},

        }
    },
    methods: {
        Go_Search() {
            this.$router.push("/search?order=" + this.order + "&nsfw=" + this.nsfw + "&word=" + this.word);
        },
        need_login: function () {
            if (!this.$cookies.isKey("user")) {
                Swal.fire({
                    type: 'warning',
                    icon: 'warning',
                    text: 'ログインしてください。',
                    showConfirmButton: true,
                    showCloseButton: false,
                }).then(
                    () => {
                        return false;
                    }
                )
            } else {
                return true;
            }
        },
        disfavorite(list) {
            if (!this.need_login()) {
                return;
            }
            const header = {
                'Content-Type': 'application/json',
                "X-AUTH-TOKEN": this.$cookies.get('user').token,
            }
            axios.get(constants.host + '/delfav/' + list.id, { headers: header }).then(() => {
                list.good -= 1;
                // console.log("TEST")
                //console.log(this.favs)
                delete this.favs[list.id];
                // console.log(this.favs)
            }).catch(err => {
                console.error(err);
            });
        },
        favorite(list) {
            if (!this.need_login()) {
                return;
            }
            const header = {
                'Content-Type': 'application/json',
                "X-AUTH-TOKEN": this.$cookies.get('user').token,
            }
            axios.get(constants.host + '/fav/' + list.id, { headers: header }).then(() => {
                list.good += 1;
                this.favs[list.id] = list.title
            }).catch(err => {
                console.error(err);
            });
        },
        gotoimage: function (id) {
            this.$router.push({ path: '/image/' + id })
        },

        sliceByNumber: function (array, number) {
            const length = Math.ceil(array.length / number)
            return new Array(length).fill().map((_, i) =>
                array.slice(i * number, (i + 1) * number)
            )
        },
        search_again: function () {

            let url = constants.host + "/searchbyword_nopage/?order=new&limit=6&nsfw=" + this.nsfw

            axios.get(url)
                .then(response => {
                    this.num = response.data.count
                        ;
                    this.length = Math.ceil(this.num / this.pageSize);
                    //console.log(this.length)
                    this.displayLists = response.data;
                    this.displayLists_devided = this.sliceByNumber(this.displayLists, this.dividenum);
                    //console.log(this.displayLists[0].title)
                    //console.log(this.displayLists_devided)
                })
                .catch(error => {
                    console.log(error);
                });

            let fav_url = ""
            if (this.$cookies.isKey("user")) {
                const header = {
                    'Content-Type': 'application/json',
                    "X-AUTH-TOKEN": this.$cookies.get('user').token,
                }
                // console.log("token")
                // console.log(this.$cookies.get('user').token,)
                fav_url = constants.host + "/getfavorite"
                axios.get(fav_url, { headers: header })
                    .then(response => {
                        this.favs = response.data;
                      
                    })
                    .catch(error => {
                        console.error(error);
                    });

            }
        },


    },

    mounted: function () {


        let url = constants.host + "/searchbyword_nopage/?order=" + this.order + "&limit=6&nsfw=" + this.nsfw + "&word=" + this.word

        axios.get(url)
            .then(response => {
                this.displayLists = response.data;

            })
            .catch(error => {
                console.error(error);
            });

        let fav_url = ""
        if (this.$cookies.isKey("user")) {
            const header = {
                'Content-Type': 'application/json',
                "X-AUTH-TOKEN": this.$cookies.get('user').token,
            }
            // console.log("token")
            // console.log(this.$cookies.get('user').token,)
            fav_url = constants.host + "/getfavorite"
            axios.get(fav_url, { headers: header })
                .then(response => {
                    this.favs = response.data;

                })
                .catch(error => {
                    console.error(error);
                });

        }

    }
    //さすがに全件持っとくのはどうかと思うので、ページごとにリクエスト飛ばしていいんじゃないか？
    //pageChangeのところでもらっていこう。
    //Todo:最新n件を取得するAPI,m以降のn件を取得するAPI
    //それらをいい感じに表示する
}
</script>
<style lang="scss" scoped>
@import '../styles/common/common';

.search-result__contents {
    margin-top: 20px;
    justify-content: center;

    &-img {
        text-align: center;
    }

    &-text {
        margin-left: 20px;
        word-wrap: break-word;
    }
}
</style>