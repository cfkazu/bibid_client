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
                <div class="text-center">
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-row class="mb-6" no-gutters>

                                    <v-col v-for="list in displayLists" :key="list.id" cols="12" sm="6" md="4" lg="3">
                                        <v-col cols="12" sm="12" md="12" lg="12">
                                            <v-card loading="false" class="mx-auto my-12" align="center">
                                                <router-link :to="'/image/' + list.id">
                                                    <v-img :aspect-ratio="1" v-bind:src="list.image">
                                                    </v-img>
                                                </router-link>
                                                <br>
                                                <v-row>


                                                    <v-col>


                                                        <div class="search-about__contents-text" align="left">{{
                                                                list.title
                                                        }}
                                                        </div>
                                                    </v-col>
                                                    <v-col>
                                                        <v-icon large @click="delete_image(list)" class="mt+5">
                                                            mdi-delete
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
            displayLists_devided: [],
            dividenum: 5,
            displayLists: [],
            pageSize: 10,
            maxnum: 40,
            following: {

            },
            editing: false,
            mypage: false,
            uid: 0,
        }
    },
    methods: {
        delete_image: function (list) {
            Swal.fire(
                '削除しますか？',
                '',
                'warning'
            ).then((result) => {
                if (result.isConfirmed) {
                    const header = {
                        'Content-Type': 'application/json',
                        "X-AUTH-TOKEN": this.$cookies.get('user').token,
                    }
                    console.log(constants.host + '/deletegraph/' + list.id)
                    axios.get(constants.host + '/deletegraph/' + list.id, { headers: header }).then(() => {
                        this.displayLists = this.displayLists.filter(function (value) {
                            return value.id != list.id;
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                }
            })

        },
        editchange: function () {
            if (this.editing) {
                const header = {
                    'Content-Type': 'application/json',
                    "X-AUTH-TOKEN": this.$cookies.get('user').token,
                }
                console.log(this.user.description)
                axios.post(constants.host + "/modifyme/", this.user, { headers: header })
                    .then((response) => {
                        console.log(response);
                    })
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
                    this.$router.push('/');
                }
            )
        }

        this.uid = this.$cookies.get('user').id;
        axios.get(constants.host + "/getImagebyUserid/?user_id=" + this.uid + "&limit=" + this.maxnum)
            .then(response => {
                this.displayLists = response.data;
                this.displayLists_devided = this.sliceByNumber(this.displayLists, this.dividenum);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(constants.host + "/getuser/" + this.uid)
            .then(response => {
                this.user = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        let f_url = ""

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