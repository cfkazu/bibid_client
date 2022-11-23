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
                                    :href="'https://twitter.com/' + this.user.username">@{{ this.user.username }}</a>)
                            </v-list-item-title>
                            <v-textarea v-if="editing" v-model="user.description">
                            </v-textarea>
                            <v-list-item-subtitle v-else>{{ this.user.description }}
                            </v-list-item-subtitle>
                            <v-btn v-if="editing" @click="editchange">保存</v-btn>
                            <v-btn v-else @click="editchange">編集</v-btn>
                        </v-list-item-content>
                    </v-list-item>

                </v-list>

            </v-card>

            <v-container mt-n12 pt-1>
                <v-list>

                    <v-list-item>


                        <v-list-item-content>
                            <v-row justify="start">
                                <div class="text-right font-weight-bold">

                                    <br><br><br><br>
                                    &emsp;お気に入り画像
                                </div>
                            </v-row>


                            <v-row class="mb-6" no-gutters justify="start">

                                <v-col v-for="list in displayLists_fav" :key="list.id" cols="12" sm="6" md="3" lg="3"
                                    xl="2">

                                    <v-col md="12">
                                        <v-card loading="false" class="mx-auto " max-width="374" align="center">
                                            <router-link :to="'/image/' + list.image.id">
                                                <v-img :aspect-ratio="1" v-bind:src="list.image.image.split('?')[0]">
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

                                                    <router-link :to="'/user/' + list.image.author_id.id">
                                                        <v-list-item-avatar color="grey darken-3">
                                                            <v-img class="elevation-6" alt=""
                                                                :src="list.image.author_id.profile_url">
                                                            </v-img>
                                                        </v-list-item-avatar>
                                                    </router-link>
                                                    <router-link :to="'/user/' + list.image.author_id.id">
                                                        <v-list-item-content>
                                                            <v-list-item-title>{{ list.image.author_id.first_name }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </router-link>

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
                                <v-row class="mb-6" no-gutters>

                                    <v-col v-for="list in displayLists" :key="list.id" cols="12" sm="6" md="4" lg="3"
                                        xl="2">
                                        <v-col cols="12" sm="12" md="12" lg="12">
                                            <v-card loading="false" class="mx-auto " align="center">
                                                <router-link :to="'/image/' + list.id">
                                                    <v-img :aspect-ratio="1" v-bind:src="list.image.split('?')[0]">
                                                    </v-img>
                                                </router-link>
                                                <br>
                                                <v-row justify="space-between">


                                                    <v-col>


                                                        <div class="search-about__contents-text mt-2" align="left">{{
                                                                list.title
                                                        }}
                                                        </div>
                                                    </v-col>

                                                    <v-col class="justify-end">
                                                        <v-icon large @click="delete_image(list)" class="mr+2 mt+3">
                                                            mdi-delete
                                                        </v-icon>
                                                        &nbsp;
                                                        <v-icon large @click="edit_image(list)" class="mr+3 mt+3">
                                                            mdi-pencil-circle
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
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

import router from '../router';
export default {
    name: 'App',

    data() {
        return {
            query: {

            },
            page: 1,
            length: 0,
            num: 0,
            fav: false,
            user: {

            },
            displayLists_fav: [],
            displayLists_devided: [],
            dividenum: 5,
            displayLists: [],
            pageSize: 12,
            maxnum: 40,
            following: {

            },
            editing: false,
            mypage: false,
            uid: 0,
        }
    },
    methods: {
        Go_Search() {
            this.$router.push("/myfavoriteall");
        },
        delete_image: function (list) {
            Swal.fire({
                text: '削除しますか？',
                icon: "warning",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: '削除',
                cancelButtonText: 'キャンセル',
            }
            ).then((result) => {
                if (result.isConfirmed) {
                    const header = {
                        'Content-Type': 'application/json',
                        "X-AUTH-TOKEN": this.$cookies.get('user').token,
                    }
                    axios.get(constants.host + '/deletegraph/' + list.id, { headers: header }).then(() => {
                        this.displayLists = this.displayLists.filter(function (value) {
                            return value.id != list.id;
                        });
                    }).catch(err => {
                        console.error(err);
                    });
                }
            })

        },
        edit_image: function (list) {
            router.push("mimage/" + list.id);
        },
        editchange: function () {
            if (this.editing) {
                const header = {
                    'Content-Type': 'application/json',
                    "X-AUTH-TOKEN": this.$cookies.get('user').token,
                }

                axios.post(constants.host + "/modifyme/", this.user, { headers: header })

            }
            this.editing = !this.editing;
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
                console.error(err);
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
                console.error(err);
            });
        },
        sliceByNumber: function (array, number) {
            const length = Math.ceil(array.length / number)
            return new Array(length).fill().map((_, i) =>
                array.slice(i * number, (i + 1) * number)
            )
        }
    },

    mounted: function () {
        if (!this.$cookies.isKey("user")) {
            Swal.fire({
                type: 'warning',
                icon: 'warning',
                text: 'ログインしてください。',
                showConfirmButton: true,
                showCloseButton: false,
            }).then(
                () => {
                    this.$cookies.config(60 * 60 * 1, '');
                    this.$cookies.set("togo", "/mypage");
                    router.push('/login');
                }
            )
        }
        const header = {
            'Content-Type': 'application/json',
            "X-AUTH-TOKEN": this.$cookies.get('user').token,
        }
        let myfav_url = constants.host + "/getmyfavorite/4"

        axios.get(myfav_url, { headers: header })
            .then(response => {
                this.num = response.data.count
                    ;
                this.length = Math.ceil(this.num / this.pageSize);
                this.displayLists_fav = response.data;
                this.displayLists_fav_devided = this.sliceByNumber(this.displayLists_fav, this.dividenum);
            })
            .catch(error => {
                console.error(error);
            });
        this.uid = this.$cookies.get('user').id;
        axios.get(constants.host + "/getImagebyUserid/?user_id=" + this.uid + "&limit=" + this.maxnum)
            .then(response => {
                this.displayLists = response.data;
                this.displayLists_devided = this.sliceByNumber(this.displayLists, this.dividenum);
            })
            .catch(error => {
                console.error(error);
            });
        axios.get(constants.host + "/getuser/" + this.uid)
            .then(response => {
                this.user = response.data;
            })
            .catch(error => {
                console.error(error);
            });
        let f_url = ""


        f_url = constants.host + "/getfollowing/"
        axios.get(f_url, { headers: header })
            .then(response => {
                this.following = response.data;
                this.fav = this.$route.params.id in this.following
            })
            .catch(error => {
                console.error(error);
            });

    },

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