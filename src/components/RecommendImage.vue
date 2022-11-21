<template>
    <v-app>


        <v-main>
            <v-container>



                <v-list>

                    <v-list-item>


                        <v-list-item-content>
                            <v-row justify="start">
                                <div class="text-right font-weight-bold">
                                    &emsp;おすすめイラスト
                                </div>
                            </v-row>
                            <v-radio-group row v-model="nsfw" @change="nsfw_change">
                                <v-radio name="nsfw" label="全年齢" :value="0"></v-radio>
                                <v-radio name="nsfw" label="R-18" :value="1"></v-radio>
                                <v-radio name="nsfw" label="R-18G" :value="2"></v-radio>
                            </v-radio-group>

                            <v-row class="mb-6" no-gutters justify="start">

                                <v-col v-for="list in displayLists" :key="list.id" cols="12" sm="6" md="4" lg="3"
                                    xl="2">
                                    <v-col md="12">
                                        <v-card loading="false" class="mx-auto " max-width="374" align="center">
                                            <router-link :to="'/image/' + list.id">
                                                <v-img :aspect-ratio="1" v-bind:src="list.image">
                                                </v-img>
                                            </router-link>
                                            <br>
                                            <v-row>
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

                                                <v-list-item class="grow">

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
                                                        <v-icon class="mr-1" color="red lighten-2"
                                                            v-show="list.id in favs" @click="disfavorite(list)">
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


                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <br><br>

            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import constants from '../common/constants';
export default {
    name: 'App',

    data() {
        return {
            query: {

            },
            page: 1,
            length: 0,
            num: 0,
            displayLists_devided: [],
            dividenum: 5,
            displayLists: [],
            pageSize: 12,
            favs: {},
            nsfw: 0,
        }
    },
    methods: {

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
                console.log(err);
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
                console.log(err);
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
        nsfw_change: function () {
            this.query.order = "new"
            console.log("new")
            let url = constants.host + "/searchbyword_nopage/?order=recommend&limit=12&nsfw=" + this.nsfw
            //console.log(url)
            if (!isNaN(this.$route.query.page)) {
                this.page = this.$route.query.page
                url += "&page=" + this.$route.query.page
            }
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
                        console.log(this.favs)
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        },

    },

    mounted: function () {
        this.query.order = "new"
        console.log("new")

        let url = constants.host + "/searchbyword_nopage/?order=recommend&limit=12&nsfw=" + this.nsfw
        //console.log(url)
        if (!isNaN(this.$route.query.page)) {
            this.page = this.$route.query.page
            url += "&page=" + this.$route.query.page
        }
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
                    console.log(this.favs)
                })
                .catch(error => {
                    console.log(error);
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