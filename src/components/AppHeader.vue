<template>
    <header>
        <v-toolbar color="black" dark flat>


            <v-row justify="space-between" class="mt-4">
                <v-col cols="1" sm="1" md="4" lg="4" xl="4">
                    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
                </v-col>
                <v-col cols="8" sm="8" md="4" lg="4" xl="4">

                    <v-text-field class="expanding-search mt-1 " flat hide-details filled dense clearable label="Search"
                        prepend-inner-icon="mdi-magnify" solo-inverted @click:prepend-inner="search(search_word)"
                        v-model="search_word" @keyup.enter="search(search_word)">
                    </v-text-field>
                </v-col>
                <v-col cols="1" sm="1" md="4" lg="4" xl="4" justify="end">
                    <v-row class="justify-end mt-1">
                        <v-btn elevation="2" text @click="getlogin_or_out">
                            <div v-show="islogin">ログアウト</div>
                            <div v-show="!islogin">ログイン</div>
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
            <template v-slot:extension>
                <v-tabs v-model="tabs" centered>
                    <v-tab v-for="(menuItem, index) in headerItems" :key="index" :to="menuItem.url">
                        {{ menuItem.name }}
                    </v-tab>
                </v-tabs>

            </template>
        </v-toolbar>
        <!--   <v-app-bar app dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title>MyPortfolioSite</v-toolbar-title>
            <v-tabs dark>

                <v-tab v-for="(menuItem, index) in headerItems" :key="index" :to="menuItem.url">
                    {{ menuItem.name }}
                </v-tab>
                <v-tab>
                    <v-text-field class="expanding-search mt-7" prepend-inner-icon="mdi-magnify" filled dense clearable>
                    </v-text-field>
                </v-tab>
            </v-tabs>

            <v-col>
                <v-row class="justify-end">
                    <v-btn elevation="2" text>
                        <div v-show="islogin">ログアウト</div>
                        <div v-show="!islogin">ログイン</div>
                    </v-btn>
                </v-row>
            </v-col>
        </v-app-bar>-->
        <v-navigation-drawer v-model="drawer" temporary fixed>
            <v-list nav dense>
                <v-list-item-group>
                    <!-- :toプロパティを追加 -->
                    <v-list-item v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.url">
                        <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>


    </header>
</template>
 
<script>
import constants from '../common/constants';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            drawer: false,
            menuItems: constants.menuItems,
            headerItems: constants.headerItems,
            headerItems_login: constants.headerItems_login,
            islogin: false,
            search_word: "",
        }
    },

    mounted() {
        console.log("チェック")
        this.checkLoggedIn();
    },
    methods: {
        search(word) {
            console.log("ここ")
            console.log(word)
            const togo = "/search/?word=" + word;
            this.$router.push(togo);
        },
        checkLoggedIn() {
            this.islogin = this.$cookies.isKey("user");
            //     this.islogin = this.$session.has("token")
            // console.log("ログイン状況", this.islogin)
        },
        getlogin_or_out() {

            if (this.$cookies.isKey("user")) {
                this.$cookies.remove("user");
                this.islogin = false;
                Swal.fire({
                    text: 'ログアウトしました。',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ path: '/' })
                    }
                })
            } else {
                Swal.fire({
                    text: 'Twitter連携でログインします。',
                    icon: 'info',
                    confirmButtonText: 'OK',
                    showConfirmButton: true,
                    showCancelButton: true,

                }).then((result) => {
                    if (result.isConfirmed) {
                        //this.$router.push({ path: '/' })
                        this.$cookies.config(60 * 60 * 1, '');
                        this.$cookies.set("togo", this.$route.fullPath);
                        const url = 'http://localhost:8000/twitter_login';
                        window.location.href = url
                    }
                })

            }
            /*
            this.$session.start();
            if (this.$session.has("token")) {
                this.$session.destroy();
                this.islogin = false
                console.log("ログアウトしました")
                console.log(this.$session.has("token"))
                Swal.fire({
                    text: 'ログアウトしました。',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ path: '/about' })
                    }
                })
            } else {
                const url = 'http://localhost:8000/twitter_login';
                window.location.href = url
            }*/
        }
    }
}
</script>

<style lang="scss" scoped>
.v-toolbar__title {
    overflow: visible !important;
    margin-right: 50px !important;
}



@import '../styles/common/common';

.v-tabs {
    display: none;

    @include display_pc {
        display: block !important;
    }
}
</style>