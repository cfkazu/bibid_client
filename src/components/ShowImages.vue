<template>
    <section class="home-about">
        <div class="section__title">
            <div class="section__title-text">{{ this.imagedata.title }}</div>
            <v-row>
                <v-col cols="0" sm="0" md="3" lg="4" xl="4">
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4" xl="4">
                    <div>
                        {{ this.imagedata.decription }}</div>
                    <div>
                        <br>
                        使用しているモデル:{{ this.imagedata.ai_model }}
                    </div>

                </v-col>
            </v-row>
        </div>
        <v-container>
            <v-row class="home-about__contents" align="center" fill-height>
                <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="home-about__contents-img">
                    <CCalouse :images="imagedata.images" @changeIndex="change_index"></CCalouse>

                </v-col>
                <v-col cols="12" sm="12" md="5" lg="5" xl="5" class="home-about__contents-text">
                    <v-card hide-details :max-width="$vuetify.breakpoint.width * 2 / 3" class="mx-auto" elevation="0">


                        <v-list three-line>



                            <v-card-actions>
                                <router-link :to="'/user/' + this.imagedata.author_id.id">
                                    <v-list-item-avatar size="50">
                                        <v-img :src="this.imagedata.author_id.profile_url"></v-img>
                                    </v-list-item-avatar>
                                </router-link>
                                <router-link :to="'/user/' + this.imagedata.author_id.id">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ this.imagedata.author_id.first_name }} (@{{
                                                    this.imagedata.author_id.username
                                            }})

                                        </v-list-item-title>

                                    </v-list-item-content>
                                </router-link>

                            </v-card-actions>
                            <v-row align="center" justify="start">
                                <br>&ensp;&ensp;&ensp;
                                <v-icon class="mr-1" color="red lighten-2" v-show="imagedata.id in favs"
                                    @click="disfavorite(imagedata)">
                                    mdi-heart
                                </v-icon>
                                <v-icon class="mr-1" @click="favorite(imagedata)" v-show="!(imagedata.id in favs)">
                                    mdi-heart
                                </v-icon>
                                <span class="subheading mr-2">{{ imagedata.good }}</span>
                                <v-btn class="f mt text-capitalize caption mx-4" rounded color="#9ee4ff" dark depressed
                                    height="48px" @click="share_twitter">
                                    <img class="button-logo-img mr-4" src="../../public/static/twitter.png"
                                        style="height: 20px" />
                                    ツイートする
                                </v-btn>


                            </v-row>
                        </v-list>
                    </v-card>
                    <v-card class="mx-auto my-4" max-width="1044">
                        <v-card-text>
                            <div>Prompt</div>

                            <div class="text--primary">
                                {{ this.imagedata.images[currentIndex].prompt }}
                            </div>
                        </v-card-text>

                    </v-card>
                    <br>

                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Negative Prompt</div>

                            <div class="text--primary">
                                {{ this.imagedata.images[currentIndex].neg_prompt }}
                            </div>

                        </v-card-text>

                    </v-card>
                    <br>
                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Additional Tags</div>

                            <div class="text--primary">
                                <a
                                    :href="'#/search?word=' + this.imagedata.tag0.substr(1, this.imagedata.tag0.length - 2)">{{
                                            this.imagedata.tag0
                                    }}</a>
                                <a
                                    :href="'#/search?word=' + this.imagedata.tag1.substr(1, this.imagedata.tag1.length - 2)">{{
                                            this.imagedata.tag1
                                    }}</a>
                                <a
                                    :href="'#/search?word=' + this.imagedata.tag2.substr(1, this.imagedata.tag2.length - 2)">{{
                                            this.imagedata.tag2
                                    }}</a>
                                <a
                                    :href="'#/search?word=' + this.imagedata.tag3.substr(1, this.imagedata.tag3.length - 2)">{{
                                            this.imagedata.tag3
                                    }}</a>
                                <a
                                    :href="'#/search?word=' + this.imagedata.tag4.substr(1, this.imagedata.tag4.length - 2)">{{
                                            this.imagedata.tag4
                                    }}</a>
                                <a
                                    :href="'#/search?word=' + this.imagedata.tag5.substr(1, this.imagedata.tag5.length - 2)">{{
                                            this.imagedata.tag5
                                    }}</a>
                                <a
                                    :href="'#/search?word=' + this.imagedata.tag6.substr(1, this.imagedata.tag6.length - 2)">{{
                                            this.imagedata.tag6
                                    }}</a>
                                <a
                                    :href="'#/search?word=' + this.imagedata.tag7.substr(1, this.imagedata.tag7.length - 2)">{{
                                            this.imagedata.tag7
                                    }}</a>
                                <a
                                    :href="'#/search?word=' + this.imagedata.tag8.substr(1, this.imagedata.tag8.length - 2)">{{
                                            this.imagedata.tag8
                                    }}</a>
                                <a
                                    :href="'#/search?word=' + this.imagedata.tag9.substr(1, this.imagedata.tag9.length - 2)">{{
                                            this.imagedata.tag9
                                    }}</a>
                            </div>

                        </v-card-text>

                    </v-card>
                </v-col>
            </v-row>

        </v-container>

        <v-container>
            <v-row justify="center">
                <v-col cols="12" sm="12" md="8" lg="8" xl="8">
                    <v-card elevation="0">
                        <v-card-text>
                            コメント
                            <v-textarea single-line auto-grow outlined rows="1" row-height="15"
                                v-model="current_comment.comment"></v-textarea>
                            <v-row justify="end">
                                <v-btn justify="end" @click="PostComment">送信</v-btn>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>

                        </v-card-actions>
                        <v-list>
                            <v-list-item v-for="comment in comments_divided" :key="comment.id">
                                <v-list-item-avatar size="30">
                                    <v-img :src="comment.user.profile_url"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{ comment.user.first_name }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ comment.comment }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item-content>
                                <v-btn justify="end" @click="AddComment_Max" :disabled="!there_is_more">もっと見る
                                </v-btn>
                            </v-list-item-content>
                        </v-list>

                    </v-card>
                </v-col>
            </v-row>


        </v-container>


        <NewestImage />
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
import NewestImage from './NewestImage.vue';
import constants from '../common/constants';
import Swal from 'sweetalert2';
import CCalouse from './CarouselComp.vue';
export default {
    name: 'LoginMain',
    components: {
        NewestImage,
        CCalouse,
    },
    data: () => ({
        imagedata: {},
        url: '',
        comments: [],
        islogin: false,
        current_comment: {

        },
        comment_max: 3,
        my_profile_url: '',
        my_first_name: '',
        favs: [],
        currentIndex: 0,
    }),

    mounted() {

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
        this.url = constants.host + '/imagemul/' + this.$route.params.id
        this.current_comment['image_id'] = this.$route.params.id
        this.current_comment['comment'] = ''

        axios.get(this.url)
            .then(response => {
                this.imagedata = response.data;
                this.imagedata.images.sort(
                    function (a, b) {
                        return a.id - b.id
                    }
                )
                console.log(this.imagedata)
                if (this.imagedata.tag0 != null) {
                    this.imagedata.tag0 = "#" + this.imagedata.tag0 + ","
                } else {
                    this.imagedata.tag0 = ""
                }
                if (this.imagedata.tag1 != null) {
                    this.imagedata.tag1 = "#" + this.imagedata.tag1 + ","
                } else {
                    this.imagedata.tag1 = ""
                }
                if (this.imagedata.tag2 != null) {
                    this.imagedata.tag2 = "#" + this.imagedata.tag2 + ","
                } else {
                    this.imagedata.tag2 = ""
                }
                if (this.imagedata.tag3 != null) {
                    this.imagedata.tag3 = "#" + this.imagedata.tag3 + ","
                } else {
                    this.imagedata.tag3 = ""
                }
                if (this.imagedata.tag4 != null) {
                    this.imagedata.tag4 = "#" + this.imagedata.tag4 + ","
                } else {
                    this.imagedata.tag4 = ""
                }
                if (this.imagedata.tag5 != null) {
                    this.imagedata.tag5 = "#" + this.imagedata.tag5 + ","
                } else {
                    this.imagedata.tag5 = ""
                }
                if (this.imagedata.tag6 != null) {
                    this.imagedata.tag6 = "#" + this.imagedata.tag6 + ","
                } else {
                    this.imagedata.tag6 = ""
                }
                if (this.imagedata.tag7 != null) {
                    this.imagedata.tag7 = "#" + this.imagedata.tag7 + ","
                } else {
                    this.imagedata.tag7 = ""
                }
                if (this.imagedata.tag8 != null) {
                    this.imagedata.tag8 = "#" + this.imagedata.tag8 + ","
                } else {
                    this.imagedata.tag8 = ""
                }
                if (this.imagedata.tag9 != null) {
                    this.imagedata.tag9 = "#" + this.imagedata.tag9 + ","
                } else {
                    this.imagedata.tag9 = ""
                }

            })
            .catch(error => {
                console.error(error);
            });
        this.islogin = this.$cookies.isKey('user')
        if (this.islogin) {
            const prof_url = constants.host + '/getuser/' + this.$cookies.get('user').id
            axios.get(prof_url)
                .then(response => {
                    this.my_profile_url = response.data.profile_url
                    this.my_first_name = response.data.first_name
                })
                .catch(error => {
                    console.error(error);
                });
        }
        const comment_url = constants.host + '/getcomment/' + this.$route.params.id
        axios.get(comment_url)
            .then(response => {
                this.comments = response.data;

            })

    },
    computed: {
        imgSrc() {
            return this.imagedata.image
        },
        comments_divided() {
            return this.comments.slice(0, this.comment_max)
        },
        there_is_more() {
            return this.comments.length > this.comment_max
        }
    },
    methods: {
        change_index(index) {
            this.currentIndex = index
        },
        share_twitter() {
            let gourl = "https://bibid-ai.com/showimages/" + this.$route.params.id
            let Hashtags = [];
            Hashtags.push("bibidai");
            Hashtags.push("bibid");
            Hashtags.push("AIイラスト");
            Hashtags = Hashtags.join(",");
            let myurl = "https://twitter.com/intent/tweet?url=" + gourl + "&text= 閲覧中:「" + this.imagedata.title + "」at Bibid-AI&hashtags=" + Hashtags;
            myurl = encodeURI(myurl)

            open(myurl);
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
        AddComment_Max() {
            this.comment_max += 5
        },
        PostComment() {

            if (!this.islogin) {
                Swal.fire({
                    icon: 'warning',
                    title: 'ログインしてください',
                    text: 'コメントを投稿するにはログインが必要です',
                    confirmButtonText: 'OK',
                }).then(() => {
                    return;
                })

            }
            const header = {
                'Content-Type': 'application/json',
                "X-AUTH-TOKEN": this.$cookies.get('user').token,
            }
            axios.post(constants.host + '/makecomment/', this.current_comment, {
                headers: header
            })
                .then(() => {

                    let newcomment = {
                        'user': {
                            'first_name': this.my_first_name,
                            'profile_url': this.my_profile_url,
                        },
                        'comment': this.current_comment.comment
                    }
                    this.comments.unshift(newcomment)
                    this.current_comment.comment = ''
                })
                .catch(error => {
                    console.error(error);
                });

        }

    },

    watch: {
        $route(to) {
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
            this.url = constants.host + '/imagemul/' + to.params.id
            this.current_comment['image_id'] = to.params.id
            this.current_comment['comment'] = ''

            axios.get(this.url)
                .then(response => {
                    this.imagedata = response.data;
                    console.log(this.imagedata)
                    if (this.imagedata.tag0 != null) {
                        this.imagedata.tag0 = "#" + this.imagedata.tag0 + ","
                    } else {
                        this.imagedata.tag0 = ""
                    }
                    if (this.imagedata.tag1 != null) {
                        this.imagedata.tag1 = "#" + this.imagedata.tag1 + ","
                    } else {
                        this.imagedata.tag1 = ""
                    }
                    if (this.imagedata.tag2 != null) {
                        this.imagedata.tag2 = "#" + this.imagedata.tag2 + ","
                    } else {
                        this.imagedata.tag2 = ""
                    }
                    if (this.imagedata.tag3 != null) {
                        this.imagedata.tag3 = "#" + this.imagedata.tag3 + ","
                    } else {
                        this.imagedata.tag3 = ""
                    }
                    if (this.imagedata.tag4 != null) {
                        this.imagedata.tag4 = "#" + this.imagedata.tag4 + ","
                    } else {
                        this.imagedata.tag4 = ""
                    }
                    if (this.imagedata.tag5 != null) {
                        this.imagedata.tag5 = "#" + this.imagedata.tag5 + ","
                    } else {
                        this.imagedata.tag5 = ""
                    }
                    if (this.imagedata.tag6 != null) {
                        this.imagedata.tag6 = "#" + this.imagedata.tag6 + ","
                    } else {
                        this.imagedata.tag6 = ""
                    }
                    if (this.imagedata.tag7 != null) {
                        this.imagedata.tag7 = "#" + this.imagedata.tag7 + ","
                    } else {
                        this.imagedata.tag7 = ""
                    }
                    if (this.imagedata.tag8 != null) {
                        this.imagedata.tag8 = "#" + this.imagedata.tag8 + ","
                    } else {
                        this.imagedata.tag8 = ""
                    }
                    if (this.imagedata.tag9 != null) {
                        this.imagedata.tag9 = "#" + this.imagedata.tag9 + ","
                    } else {
                        this.imagedata.tag9 = ""
                    }

                })
                .catch(error => {
                    console.error(error);
                });
            this.islogin = this.$cookies.isKey('user')
            if (this.islogin) {
                const prof_url = constants.host + '/getuser/' + this.$cookies.get('user').id
                axios.get(prof_url)
                    .then(response => {
                        this.my_profile_url = response.data.profile_url
                        this.my_first_name = response.data.first_name
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            const comment_url = constants.host + '/getcomment/' + to.params.id
            axios.get(comment_url)
                .then(response => {
                    this.comments = response.data;

                })
        }
    },

}
</script>