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

        console.log(this.$route.params.id)
        this.$session.start();
        if (this.$route.query.id === void 0) {
            console.log(this.$route.params.id)
        } else {
            if (!this.$session.has("token")) {
                this.$session.set('token', this.$route.query.t);
                this.$session.set('id', this.$route.query.id)
                Swal.fire({
                    text: 'ログインしました。',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ path: '/about' })
                    }
                })
            }



        }
    }
    ,
    methods: {
        submit() {
            console.log(this.name, this.password)
            console.log("koko")
        },

    },
    components: {
        AppBackgroundHolder
    }
}
</script>