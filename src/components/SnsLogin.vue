<template>
    <v-card class="d-flex flex-column mx-auto my-6 flat" width="374" color="#fff">
        <v-card-title class="d-flex justify-center pa-0 mt-6">ログイン</v-card-title>
        <v-card-text class="d-flex justify-center flex-column">
            <v-btn class="fill-width mt-6 text-capitalize caption mx-4" rounded color="#9ee4ff" dark depressed
                height="48px" @click="submitTwitter">
                <img class="button-logo-img mr-4" src="../../public/static/twitter.png" style="height: 20px" />
                twitterでログイン
            </v-btn>
            <!--
            <v-btn class="fill-width mt-6 text-capitalize caption mx-4 mb-6" rounded height="48px" outlined
                style="border-color: #979797" @click="submitGoogle">
                <img class="button-logo-img mr-4" src="https://madeby.google.com/static/images/google_g_logo.svg"
                    style="height: 24px" />
                Googleでログイン
            </v-btn>
            <p class="text-center pt-3 mt-3 text-subtitle-1 siginIn-border-top">
                メールアドレスでログイン
            </p>
            <v-form class="mx-9" ref="form" v-model="valid">
                <v-text-field placeholder="メールアドレス" outlined dense :rules="mailRules"></v-text-field>
                <v-text-field placeholder="パスワード" outlined dense :rules="pwRules"></v-text-field>
                <p class="pointer" @click="forgetPw">パスワードを忘れた方</p>
                <div class="text-center">
                    <v-btn class="primary" :disabled="!valid">ログイン</v-btn>
                </div>
            </v-form>
            -->
        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../router';
import constants from '../common/constants';
export default {
    data() {
        return {
            valid: false,
            mailRules: [
                (v) => !!v || "mail is required",
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
            pwRules: [(v) => !!v || "password is required"],
        };
    },
    mounted() {
        this.checkLoggedIn();
    },
    methods: {
        checkLoggedIn() {
            if (this.$cookies.isKey("user")) {
                Swal.fire({
                    type: 'warning',
                    icon: 'warning',
                    text: 'ログイン済みです。',
                    showConfirmButton: true,
                    showCloseButton: false,
                })
            }
        },
        validate() {
            this.$refs.form.validate();
        },
        submitTwitter() {
            const url = constants.host + '/twitter_login/';
            window.location.href = url
        },
        submitGoogle() {
            console.log("token");
            console.log(this.$session.get("token"));
            const header = {
                'Content-Type': 'application/json',
                "X-AUTH-TOKEN": this.$session.get('token'),
            }
            axios.post(constants.host + '/yesman', {}, { headers: header }).then(res => {
                console.log(res.data);
                // eslint-disable-next-line
            }).catch(e => {
                this.loading = false;
                console.error(e)
                Swal.fire({
                    type: 'warning',
                    title: 'Error',
                    text: 'ユーザー名もしくはパスワード、または両方が間違っています',
                    showConfirmButton: false,
                    showCloseButton: false,
                    timer: 3000
                })
            })
            // グーグルログインの処理
        },
        forgetPw() {

            axios.get(constants.host + '/islogin').then(res => {
                //print(res);
                if (res.data.res) {
                    router.push('/');
                } else {
                    router.push('/about');
                }
                // eslint-disable-next-line
            }).catch(e => {
                console.info(e)
                Swal.fire({
                    type: 'warning',
                    title: 'Error',
                    text: 'ユーザー名もしくはパスワード、または両方が間違っています',
                    showConfirmButton: false,
                    showCloseButton: false,
                    timer: 3000
                })
            })

            // パスワードを忘れた時の処理
        },
    },
};
</script>