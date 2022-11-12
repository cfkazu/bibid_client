<template>
    <v-app id="inspire">

        <v-app-bar class="mt" max-height="70" color="grey" dark>
            <v-app-bar-nav-icon @click="drawer = true" color="blue-grey lighten-3"></v-app-bar-nav-icon>



            <v-card-text class="d-flex align-left">
                <right>
                    <span2>
                        <v-btn href="https://hoge.example" outlined text>
                            <span class="text-left">ログイン</span>

                        </v-btn>
                    </span2>

                    <v-btn href="https://hoge.example" outlined text>
                        <span class="text-left">新規登録</span>
                    </v-btn>
                </right>
            </v-card-text>


        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary color="white">
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item href="https://kikuichige.com" target="_blank">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>イチゲブログ</v-list-item-title>
                    </v-list-item>
                    <v-list-item href="https://vuetifyjs.com/ja/" target="_blank">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Vuetify</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-main class="pink lighten-4">
            <v-container>
                <v-row>
                    <v-col cols="12" md="5">

                        <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="1200"
                            src="https://storage.googleapis.com/chichipui/cache/2e/45/2e45ad47962de9a239cc3de90ec3f405.jpg">
                        </v-img>

                    </v-col>
                    <v-col cols="12" md="2">

                    </v-col>
                    <v-col cols="12" md="5">
                        <v-sheet height="180" color="pink lighten-5">

                            <br>
                            <v-row>
                                <v-col cols="12" md="2" class="ml-4">
                                    <v-avatar class="mb" color="grey darken-1" size="50">

                                        <img alt="Avatar"
                                            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460">

                                    </v-avatar>
                                </v-col>
                                <v-col cols="12" md="8" class="mt">
                                    <div v-html="'<h1>Hello World</h1>'"></div>

                                </v-col>
                            </v-row>
                            <br>
                            <h3 class="text-left">前後の作品</h3>
                            <v-row>
                                <v-col cols="12" md="2" class="ml-4">
                                    <v-img max-height="100" contain v-bind:src="enemyHandImage"></v-img>
                                </v-col>
                                <v-col cols="12" md="2" class="ml-4">
                                    <v-img max-height="100" contain v-bind:src="choki"></v-img>
                                </v-col>
                                <v-col cols="12" md="2" class="ml-4">
                                    <v-img max-height="100" contain v-bind:src="paa"></v-img>
                                </v-col>

                            </v-row>
                            <br>
                            <v-card class="mx-auto" max-width="1044">
                                <v-card-text>
                                    <div>Prompt</div>

                                    <div class="text--primary">
                                        masterpiece,ikemen
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn text color="deep-purple accent-4">
                                        Learn More
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                            <br>
                            <v-card class="mx-auto" max-width="1044">
                                <v-card-text>
                                    <div>Negative Prompt</div>

                                    <div class="text--primary">
                                        masterpiece,ikemen


                                    </div>
                                </v-card-text>

                                <v-btn text color="deep-purple accent-4">
                                    Learn More
                                </v-btn>

                            </v-card>
                            <br>
                            <v-card class="mx-auto" max-width="1044">
                                <v-card-text>
                                    <div>Additional Tags</div>

                                    <div class="text--primary">
                                        masterpiece,ikemen


                                    </div>
                                </v-card-text>

                                <v-btn text color="deep-purple accent-4">
                                    Learn More
                                </v-btn>

                            </v-card>
                            <!-- v-imgはsrcに指定した像を表示 v-bind:によりenemyHandImage変数の中身がsrcに代入される -->

                        </v-sheet>
                    </v-col>

                    <!-- じゃんけんend -->
                </v-row>

            </v-container>

        </v-main>
        <CCalouse v-bind:moji="message"></CCalouse>
        <!-- フッター -->
        <v-footer padless>
            <v-col class="text-center" cols="12">
                <p>Copyright (c) 2022 イチゲブログ</p>
                <v-btn href="https://opensource.org/licenses/mit-license.php">Released under the MIT license</v-btn>
            </v-col>
        </v-footer>
        <!-- フッターend -->
    </v-app>
</template>

<script>
import CCalouse from './CarouselComp.vue'
export default {
    components: {
        CCalouse,
    },
    data() {
        return {
            drawer: null,
            message: "",
            enemyHand: '',
            /*じゃんけん */
            hand: ['goo', 'choki', 'paa'],
            enemyHandImage: 'https://2.bp.blogspot.com/-VhlO-Yfjy_E/Uab3z3RNJQI/AAAAAAAAUVg/fX8VnSVDlWs/s800/janken_gu.png',
            myHandImage: '',
            result: '',
            testimg: 'https://i.pximg.net/img-master/img/2017/06/14/20/57/02/63383047_p0_master1200.jpg',
            goo: 'https://2.bp.blogspot.com/-VhlO-Yfjy_E/Uab3z3RNJQI/AAAAAAAAUVg/fX8VnSVDlWs/s800/janken_gu.png',
            choki: 'https://4.bp.blogspot.com/-__yEIXe5SxU/Uab3zO7BB2I/AAAAAAAAUVI/MYg6TVeiv-Y/s800/janken_choki.png',
            paa: 'https://3.bp.blogspot.com/-qZtyoue9xKs/Uab30IG0Q5I/AAAAAAAAUVk/qnH8a2OgrvI/s800/janken_pa.png'

        }
    },
    methods: {
        //ジャンケン関数  myHandには'goo''choki''paa'が送られてくる。
        janken: function (myHand) {
            //乱数により敵の手を決める
            var index = Math.floor(Math.random() * Math.floor(3));//0から3までの乱数が得られる
            this.enemyHand = this.hand[index];
            //敵の手表示 
            if (this.enemyHand === 'goo') {
                this.enemyHandImage = this.goo;
            } else if (this.enemyHand === 'choki') {
                this.enemyHandImage = this.choki;
            } else if (this.enemyHand === 'paa') {
                this.enemyHandImage = this.paa;
            }
            //自分の手表示
            if (myHand === 'goo') {
                this.myHandImage = this.goo;
            } else if (myHand === 'choki') {
                this.myHandImage = this.choki;
            } else if (myHand === 'paa') {
                this.myHandImage = this.paa;
            }
            //勝負判定
            if (myHand === this.enemyHand) {
                this.result = '引き分け'
            }
            if (this.enemyHand === 'goo' && myHand === 'paa') {
                this.result = '勝ち'
            }
            if (this.enemyHand === 'choki' && myHand === 'goo') {
                this.result = '勝ち'
            }
            if (this.enemyHand === 'paa' && myHand === 'choki') {
                this.result = '勝ち'
            }
            if (this.enemyHand === 'goo' && myHand === 'choki') {
                console.log('負け');
                this.result = '負け'
            }
            if (this.enemyHand === 'choki' && myHand === 'paa') {
                this.result = '負け'
            }
            if (this.enemyHand === 'paa' && myHand === 'goo') {
                this.result = '負け'
            }
        }
    }
}
</script>