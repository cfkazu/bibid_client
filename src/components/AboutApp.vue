<template>
    <section class="about">
        <AppBackgroundHolder :title="title" />

        <v-app>
            <v-card width="400px" class="mx-auto mt-5">
                <v-card-title>
                    <h1 class="display-1">アカウントを作成</h1>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="mdi-account-circle" label="ユーザ名" v-model="name" />
                        <v-text-field v-bind:type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword" prepend-icon="mdi-lock"
                            v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" label="パスワード"
                            v-model="password" />
                        <v-card-actions>
                            <v-btn class="info" @click="submit">ログイン</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-app>
    </section>

</template>
<script>
import AppBackgroundHolder from './AppBackGroundHolder.vue'
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            showPassword: false,
            title: '新規登録' + this.$route.query.t,
            name: '',
            password: '',
        }
    },
    beforeMount() {


        this.$session.start();
        if (this.$route.query.id === void 0) {
            console.log("come")
        } else {
            if (!this.$cookies.isKey("user")) {
                this.$cookies.config(60 * 60 * 1, '', '', true);
                var user = { id: this.$route.query.id, token: this.$route.query.t }
                this.$cookies.set("user", user);
                Swal.fire({
                    text: 'ログインしました。',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (this.$cookies.isKey("togo")) {
                            const togo = this.$cookies.get("togo")
                            this.$cookies.remove("togo")
                            this.$router.push({ path: togo });
                        } else {
                            this.$router.push({ path: '/about' })
                        }
                    }
                })
            }
        }
    }
    ,
    methods: {


    },
    components: {
        AppBackgroundHolder
    }
}
</script>