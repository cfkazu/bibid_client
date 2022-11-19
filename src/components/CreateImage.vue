
<template>
    <section class="home-about">

        <v-container>

            <div class="section__title">
                <div class="sectiontitle-text">イラスト投稿</div>

            </div>
            <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submit">

                    <v-file-input ref="fileInput" label="イラスト(クリックで選択)" accept="image/*" :clearable="true"
                        @click="clearFileName" @change="inputFile">
                    </v-file-input>

                    <div>
                        <img :src="previewSrc" alt="" width="300" />
                    </div>
                    <validation-provider v-slot="{ errors }" name="タイトル" rules="required|max:30">
                        <v-text-field v-model="imagedata.title" :counter="30" :error-messages="errors"
                            label="タイトル(30文字以内)" required>
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="Description">
                        <v-textarea v-model="imagedata.decription" :error-messages="errors"
                            label="キャプション(簡単な説明、制作秘話など)">
                        </v-textarea>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="Prompt">
                        <v-textarea v-model="imagedata.prompt" :error-messages="errors" label="プロンプト(任意)">
                        </v-textarea>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="NegPrompt">
                        <v-textarea v-model="imagedata.neg_prompt
                        " :error-messages="errors" label="ネガティブプロンプト(任意)">
                        </v-textarea>
                    </validation-provider>

                    <validation-provider v-slot="{ errors }" name="AdditonalTag">
                        <v-textarea v-model="imagedata.additonal_tags
                        " :error-messages="errors" label="タグ(任意)">
                        </v-textarea>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="年齢設定" rules="required">
                        <v-select v-model="imagedata.is_nsfw" :error-messages="errors" :items="NSFW" label="年齢設定"
                            required>
                        </v-select>
                    </validation-provider>

                    <v-btn class="mr-4" type="submit" :disabled="(invalid || !imagedata.image)">
                        投稿
                    </v-btn>
                    <v-btn @click="clear">
                        クリア
                    </v-btn>
                    <div>
                        <br> <br> <br> <br> <br>
                    </div>
                </form>
            </validation-observer>
        </v-container>
    </section>
</template>
<script>
import constants from '../common/constants';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../router';
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')

extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
    ...required,
    message: '{_field_}は必須です。',
})

extend('max', {
    ...max,
    message: '{_field_}は{length}文字以内でお願いします。',
})

extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
    ...email,
    message: 'Email must be valid',
})
const reader = new FileReader();
export default {
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            url: "",
            imagedata: {},
            filename: "",
            select: null,
            checkbox: null,
            previewSrc: "",
            NSFW: ['全年齢', 'R18', 'R18-G'],
        }
    }, mounted() {
        this.checkLoggedIn();
    },
    computed: {
        nsfw_id: function () {
            if (this.imagedata.is_nsfw == '全年齢') {
                return 0;
            } else if (this.imagedata.is_nsfw == 'R18') {
                return 1;
            } else {
                return 2;
            }
        }
    },
    methods: {
        uploadFile() {
            const file = this.$refs.preview.files[0];
            this.url = URL.createObjectURL(file)
        },
        submit() {
            this.$refs.observer.validate()
            const header = {
                'Content-Type': 'multipart/form-data',
                // "X-AUTH-TOKEN": this.$session.get('token'),
                "X-AUTH-TOKEN": this.$cookies.get('user').token,
            }

            var formData = new FormData();
            formData.append('image', this.imagedata.image);
            formData.append('title', this.imagedata.title);
            formData.append('decription', this.imagedata.decription);
            formData.append('prompt', this.imagedata.prompt);
            formData.append('neg_prompt', this.imagedata.neg_prompt);
            formData.append('additonal_tags', this.imagedata.additonal_tags);
            formData.append('author_id_id', this.$cookies.get('user').id);
            formData.append('good', 0)
            formData.append('seed', -1)
            formData.append('is_nsfw', this.nsfw_id)
            console.log(this.imagedata.is_nsfw)
            console.log("IDD")
            for (let value of formData.entries()) {
                console.log(value);
            }
            // console.log(this.$session.get('id'));
            axios.post(constants.host + "/creategraph/", formData, { headers: header })
                .then((response) => {
                    console.log(response);
                    Swal.fire({
                        title: '投稿完了',
                        text: '投稿が完了しました。',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const newid = response.data.newid
                            router.push('/image/' + newid);
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
        clear() {
            this.imagedata.title = "";
            this.imagedata.decription = "";
            this.imagedata.prompt = "";
            this.imagedata.neg_prompt = "";
            this.imagedata.additonal_tags = "";
        },
        inputFile: function (e) {
            reader.onload = e => {
                this.previewSrc = e.target.result;
            };
            reader.readAsDataURL(e);
            this.imagedata.image = e;
            this.fileName = e.name;
        },
        clearFile: function () {
            this.file = null;
            this.fileName = '';
            this.previewSrc = '';
            this.$refs.fileInput.lazyValue = '';
        },
        clearFileName: function (e) {
            e.target.value = '';
        },
        checkLoggedIn() {
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
            /*
                        this.$session.start();
                        if (!this.$session.has("token")) {
                            Swal.fire({
                                type: 'warning',
                                icon: 'warning',
                                text: 'ログインしてください。',
                                showConfirmButton: true,
                                showCloseButton: false,
                            }).then(function () {
                                router.push('/login');
                            })
                        } else {
                            this.imagedata.author_id_id = this.$session.get("id");
                        }*/
        },

    },
}
</script>
<style lang="scss" scoped>
@import '../styles/common/common';
</style>