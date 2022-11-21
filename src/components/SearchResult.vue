<template>



    <v-main>
        <div class="text-center">

            <v-list>
                <div v-show="query.word != ''">
                    {{ query.word }}の検索結果
                </div>


                <v-radio-group row v-model="nsfw" @change="nsfw_change">
                    <v-radio name="nsfw" label="すべて" :value="-1"></v-radio>
                    <v-radio name="nsfw" label="全年齢" :value="0"></v-radio>
                    <v-radio name="nsfw" label="R-18" :value="1"></v-radio>
                    <v-radio name="nsfw" label="R-18G" :value="2"></v-radio>

                </v-radio-group>

                <v-row align="center" justify="start">
                    <v-btn depressed @click="to_new" class="ml-2">
                        新しい順
                    </v-btn>
                    <v-btn depressed @click="to_old" class="ml-2">
                        古い順
                    </v-btn>
                    <v-btn depressed @click="to_ninki" class="ml-2">
                        人気順
                    </v-btn>

                </v-row>




                <v-list-item>
                    <v-list-item-content>
                        <v-row class="mb-6" no-gutters>

                            <v-col v-for="list in displayLists" :key="list.id" cols="12" sm="6" md="3" lg="3" xl="2">
                                <v-col md="12">
                                    <v-card loading="false" class="mx-auto " max-width="374" align="center">
                                        <router-link :to="'/image/' + list.id">
                                            <v-img :aspect-ratio="1" v-bind:src="list.image">
                                            </v-img>
                                        </router-link>
                                        <br>
                                        <div class="search-about__contents-text" align="left">{{ list.title }}</div>
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


                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-pagination v-model="page" :length="length" @input="pageChange"></v-pagination>
            <br><br>
        </div>
    </v-main>

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

            nsfw: 0
        }
    },

    methods: {
        to_new: function () {
            this.query.order = "new";
            this.search_again()
        },
        to_old: function () {
            this.query.order = "old"
            this.search_again()
        },
        to_ninki: function () {
            this.query.order = "popular"
            this.search_again()
        },
        search_again: function () {
            let url = constants.host + "/searchbyword/?word=" + this.query.word + "&order=" + this.query.order + "&nsfw=" + this.nsfw

            if (!isNaN(this.$route.query.page)) {
                this.page = this.$route.query.page
                url += "&page=" + this.$route.query.page
            }
            axios.get(url)
                .then(response => {
                    this.num = response.data.count
                        ;
                    this.length = Math.ceil(this.num / this.pageSize);

                    this.displayLists = response.data.results;
                    this.displayLists_devided = this.sliceByNumber(this.displayLists, this.dividenum);

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

                delete this.favs[list.id];

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
                console.log(err);
            });
        },
        gotoimage: function (id) {
            this.$router.push({ path: '/image/' + id })
        },
        pageChange: function (pageNumber) {
            //  this.displayLists = this.lists.slice(this.pageSize * (pageNumber - 1), this.pageSize * (pageNumber));
            axios.get(constants.host + "/searchbyword/?word=" + this.query.word + "&page=" + pageNumber + "&order=" + this.query.order)
                .then(response => {
                    this.displayLists = response.data.results;
                    this.displayLists_devided = this.sliceByNumber(this.displayLists, this.dividenum);
                })
                .catch(error => {
                    console.error(error);
                });

        },
        sliceByNumber: function (array, number) {
            const length = Math.ceil(array.length / number)
            return new Array(length).fill().map((_, i) =>
                array.slice(i * number, (i + 1) * number)
            )
        },
        nsfw_change: function () {
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
        }

    },
    mounted: function () {


        this.query.order = this.$route.query.order
        if (this.$route.query.word === void 0) {
            this.query.word = ""
        } else {
            this.query.word = this.$route.query.word
        }
        if (this.$route.query.nsfw === void 0) {
            this.nsfw = 0
        } else {
            this.nsfw = this.$route.query.nsfw
        }
        let url = constants.host + "/searchbyword/?word=" + this.query.word + "&order=" + this.query.order + "&nsfw=" + this.nsfw

        if (!isNaN(this.$route.query.page)) {
            this.page = this.$route.query.page
            url += "&page=" + this.$route.query.page
        }
        axios.get(url)
            .then(response => {
                this.num = response.data.count
                    ;
                this.length = Math.ceil(this.num / this.pageSize);

                this.displayLists = response.data.results;
                this.displayLists_devided = this.sliceByNumber(this.displayLists, this.dividenum);

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
    watch: {

        $route(to) {
            if (to.query.order === "new") {
                this.query.order = "new"
            } else {
                this.query.order = "old"
            }
            if (to.query.word === void 0) {
                this.query.word = ""
            } else {
                this.query.word = to.query.word
            }
            let url = constants.host + "/searchbyword/?word=" + this.query.word + "&order=" + this.query.order

            if (!isNaN(to.query.page)) {
                this.page = to.query.page
                url += "&page=" + this.$route.query.page
            }
            axios.get(url)
                .then(response => {
                    this.num = response.data.count
                        ;
                    this.length = Math.ceil(this.num / this.pageSize);

                    this.displayLists = response.data.results;
                    this.displayLists_devided = this.sliceByNumber(this.displayLists, this.dividenum);
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
                fav_url = constants.host + "/getfavorite"
                axios.get(fav_url, { headers: header })
                    .then(response => {
                        this.favs = response.data;
                        console.log(this.favs)
                    })
                    .catch(error => {
                        console.error(error);
                    });

            }
        }
    }
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