<template>
    <section class="home-about">

        <br><br>
        <v-text-field class="input-color-red-class" v-model="imagedata.title"></v-text-field>

        <v-textarea class="input-color-black-class" v-model="imagedata.decription"></v-textarea>


        <v-container>
            <v-row class="home-about__contents" align="center" fill-height>
                <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="home-about__contents-img">
                    <v-radio-group row v-model="imagedata.is_nsfw">
                        <v-radio name="nsfw" label="全年齢" :value="0"></v-radio>
                        <v-radio name="nsfw" label="R-18" :value="1"></v-radio>
                        <v-radio name="nsfw" label="R-18G" :value="2"></v-radio>
                    </v-radio-group>
                    <img :src="imgSrc" alt="" class="img-fluid">
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

                        </v-list>
                    </v-card>
                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Prompt</div>

                            <v-textarea v-model="imagedata.prompt">

                            </v-textarea>
                        </v-card-text>

                    </v-card>
                    <br>

                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Negative Prompt</div>


                            <v-textarea v-model="imagedata.neg_prompt">

                            </v-textarea>
                        </v-card-text>

                    </v-card>
                    <br>
                    <v-card class="mx-auto" max-width="1044">
                        <v-card-text>
                            <div>Additional Tags</div>
                            <v-text-field v-model="imagedata.additonal_tags">

                            </v-text-field>

                        </v-card-text>

                    </v-card>
                </v-col>

                <v-btn justify="end" @click="Submit">変更を保存
                </v-btn>

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
import router from '../router';
export default {
    name: 'LoginMain',
    components: {
        NewestImage,
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
        modify_addition_tag: false,
        modify_prompt: false,
        modify_neg_prompt: false,
        modify_title: false,
        modify_description: false,

    }),

    mounted() {
        if (!this.$cookies.isKey("user")) {
            Swal.fire({
                type: 'warning',
                icon: 'warning',
                text: 'ログインしてください。',
                showConfirmButton: true,
                showCloseButton: false,
            }).then(() => {
                this.$cookies.config(60 * 60 * 1, '');
                this.$cookies.set("togo", "/createimg");
                router.push('/login');
            })
        }
        this.url = constants.host + '/getgraph/' + this.$route.params.id + '/'
        this.current_comment['image_id'] = this.$route.params.id
        this.current_comment['comment'] = ''
        console.log(this.url)
        axios.get(this.url)
            .then(response => {
                if (response.data.author_id.id != this.$cookies.get("user").id) {
                    Swal.fire({
                        type: 'warning',
                        icon: 'warning',
                        text: '権限がありません。',
                        showConfirmButton: true,
                        showCloseButton: false,
                    }).then(() => {
                        router.push('/mypage');
                    })
                }
                this.imagedata = response.data;
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
                console.log(this.imagedata)
                console.log(this.imagedata.prompt)
            })
            .catch(error => {
                console.log(error);
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
                    console.log(error);
                });
        }
        const comment_url = constants.host + '/getcomment/' + this.$route.params.id
        axios.get(comment_url)
            .then(response => {
                this.comments = response.data;
                console.log(this.comments)
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
        Submit() {
            if (!this.$cookies.isKey("user")) {
                return;
            }
            this.imagedata.description = this.imagedata.decription
            const header = {
                'Content-Type': 'application/json',
                "X-AUTH-TOKEN": this.$cookies.get('user').token,
            }
            axios.put(constants.host + '/modifyimage/' + this.$route.params.id, this.imagedata, {
                headers: header
            }).then((response) => {
                console.log(response);
                Swal.fire({
                    title: '投稿完了',
                    text: '投稿が完了しました。',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/image/' + this.$route.params.id);
                    }
                })
            })
                .catch((error) => {
                    Swal.fire({
                        title: '投稿失敗',
                        text: '投稿に失敗しました。' + error,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                })
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
                .then(response => {
                    console.log(response)
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
            this.url = constants.host + '/getgraph/' + to.params.id + '/'
            this.current_comment['image_id'] = to.params.id
            this.current_comment['comment'] = ''
            console.log(this.url)
            axios.get(this.url)
                .then(response => {
                    this.imagedata = response.data;
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
                    console.log(this.imagedata)
                    console.log(this.imagedata.prompt)
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
                    console.log(this.comments)
                })
        }
    },

}
</script>
<style scoped>
.input-color-red-class.v-text-field>>>input {
    color: red !important;
    font-weight: 700;
    font-size: 30px;
    text-align: center;
    padding: 0 !important;
}

.input-color-black-class.v-textarea>>>input {
    color: red !important;
    font-weight: 700;
    font-size: 30px;
    text-align: center;
    padding: 0 !important;
}
</style>