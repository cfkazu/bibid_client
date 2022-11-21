<template>
    <v-app>


        <v-main>
            <v-card :max-width="$vuetify.breakpoint.width * 2 / 3" class="mx-auto" elevation="0">


                <v-list three-line>



                    <v-list-item>
                        <v-list-item-avatar size="90">
                            <v-img :src="this.user.profile_url"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ this.user.first_name }}(<a
                                    :href="'https://twitter.com/' + this.user.username">@{{
                                    this.user.username
                                    }}</a>)
                            </v-list-item-title>
                            <v-list-item-subtitle>{{ this.user.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions>
                        <v-icon @click="unfollow()" color="red lighten-2" v-show="fav">mdi-heart</v-icon>


                        <v-icon @click="follow()" color="red lighten-2" v-show="!fav">mdi-heart-outline</v-icon>
                        <v-btn icon text color="blue lighten-2" :href="'https://twitter.com/' + this.user.username">
                            <img src="../../public/static/twitter.png" style="height: 20px" />
                        </v-btn>
                    </v-card-actions>
                </v-list>
            </v-card>
            <v-container mt-n12 pt-1>

                <div class="text-center">
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-row justify="start">
                                    <div class="text-right font-weight-bold">
                                        <br><br><br><br>
                                        &emsp;投稿画像
                                    </div>

                                </v-row>
                                <v-radio-group row v-model="nsfw" @change="nsfw_change">
                                    <v-radio name="nsfw" label="すべて" :value="-1"></v-radio>
                                    <v-radio name="nsfw" label="全年齢" :value="0"></v-radio>
                                    <v-radio name="nsfw" label="R-18" :value="1"></v-radio>
                                    <v-radio name="nsfw" label="R-18G" :value="2"></v-radio>
                                </v-radio-group>
                                <v-row class="mb-6" no-gutters>

                                    <v-col v-for="list in displayLists" :key="list.id" cols="6" sm="6" md="4" lg="3"
                                        xl="2">
                                        <v-col cols="12" sm="12" md="12" lg="12">
                                            <v-card loading="false" class="mx-auto " align="center">
                                                <router-link :to="'/image/' + list.id">
                                                    <v-img :aspect-ratio="1" v-bind:src="list.image">
                                                    </v-img>
                                                </router-link>
                                                <br>
                                                <div class="search-about__contents-text" align="left">{{ list.title }}
                                                </div>
                                            </v-card>

                                        </v-col>
                                    </v-col>
                                </v-row>


                            </v-list-item-content>
                        </v-list-item>
                    </v-list>


                    <br><br>
                </div>
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
            nsfw:0,
            fav: false,
            user: {

            },
            displayLists_devided: [],
            dividenum: 5,
            displayLists: [],
            pageSize: 12,
            maxnum: 40,
            following: {

            },
            mypage: false,
        }
    },
    methods: {
        search_again() {
            axios.get(constants.host + "/getImagebyUserid/?user_id=" + this.$route.params.id + "&limit=" + this.maxnum + "&nsfw=" + this.nsfw)
                .then(response => {
                    this.displayLists = response.data;
                    this.displayLists_devided = this.sliceByNumber(this.displayLists, this.dividenum);
                })
                .catch(error => {
                    console.log(error);
                });
            axios.get(constants.host + "/getuser/" + this.$route.params.id)
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
            let f_url = ""
            if (this.$cookies.isKey("user")) {
                const header = {
                    'Content-Type': 'application/json',
                    "X-AUTH-TOKEN": this.$cookies.get('user').token,
                }
                f_url = constants.host + "/getfollowing/"
                axios.get(f_url, { headers: header })
                    .then(response => {
                        this.following = response.data;
                        this.fav = this.$route.params.id in this.following
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        nsfw_change() {
            if (this.nsfw != "0") {

                Swal.fire({
                    text: '年齢制限のあるコンテンツが含まれます。本当に表示しますか？',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    showConfirmButton: true,
                    showCancelButton: true,

                }).then((result) => {
                    if (result.isDismissed) {
                        this.nsfw = 0;

                    } else if (result.isConfirmed) {
                        this.search_again();
                    }
                })

            } else {
                this.search_again();
            }
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
        }, follow() {
            if (!this.need_login()) {
                return;
            }
            const header = {
                'Content-Type': 'application/json',
                "X-AUTH-TOKEN": this.$cookies.get('user').token,
            }
            axios.get(constants.host + '/follow/' + this.$route.params.id, { headers: header }).then(() => {
                this.fav = !this.fav;
            }).catch(err => {
                console.log(err);
            });
        }, unfollow() {
            if (!this.need_login()) {
                return;
            }
            const header = {
                'Content-Type': 'application/json',
                "X-AUTH-TOKEN": this.$cookies.get('user').token,
            }
            axios.get(constants.host + '/unfollow/' + this.$route.params.id, { headers: header }).then(() => {
                this.fav = !this.fav;
            }).catch(err => {
                console.log(err);
            });
        },

        sliceByNumber: function (array, number) {
            const length = Math.ceil(array.length / number)
            return new Array(length).fill().map((_, i) =>
                array.slice(i * number, (i + 1) * number)
            )
        },
        
        
    },

    mounted: function () {
        if (!(this.$route.params.nsfw === void 0)) {
            this.nsfw = this.$route.params.nsfw;
        } else {
            this.nsfw = 0;
        }
        axios.get(constants.host + "/getImagebyUserid/?user_id=" + this.$route.params.id + "&limit=" + this.maxnum+"&nsfw="+this.nsfw)
            .then(response => {
                this.displayLists = response.data;
                this.displayLists_devided = this.sliceByNumber(this.displayLists, this.dividenum);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(constants.host + "/getuser/" + this.$route.params.id)
            .then(response => {
                this.user = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        let f_url = ""
        if (this.$cookies.isKey("user")) {
            const header = {
                'Content-Type': 'application/json',
                "X-AUTH-TOKEN": this.$cookies.get('user').token,
            }
            f_url = constants.host + "/getfollowing/"
            axios.get(f_url, { headers: header })
                .then(response => {
                    this.following = response.data;
                    this.fav = this.$route.params.id in this.following
                })
                .catch(error => {
                    console.log(error);
                });
        }

    },
    watch: {
        $route(to) {
            axios.get(constants.host + "/getImagebyUserid/?user_id=" + to.params.id + "&limit=" + this.maxnum+"&nsfw="+this.nsfw)
                .then(response => {
                    this.displayLists = response.data;
                    this.displayLists_devided = this.sliceByNumber(this.displayLists, this.dividenum);
                })
                .catch(error => {
                    console.log(error);
                });
            axios.get(constants.host + "/getuser/" + to.params.id)
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
            let f_url = ""
            if (this.$cookies.isKey("user")) {
                const header = {
                    'Content-Type': 'application/json',
                    "X-AUTH-TOKEN": this.$cookies.get('user').token,
                }
                f_url = constants.host + "/getfollowing/"
                axios.get(f_url, { headers: header })
                    .then(response => {
                        this.following = response.data;
                        this.fav = to.params.id in this.following
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    },
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