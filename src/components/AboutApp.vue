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

export default {
    data() {
        return {
            showPassword: false,
            title: '新規登録',
            name: '',
            password: '',
        }
    },
    methods: {
        submit() {
            console.log(this.name, this.password)
            console.log("koko")
        }
    },
    components: {
        AppBackgroundHolder
    }
}
</script>