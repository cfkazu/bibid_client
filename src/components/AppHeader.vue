<template>
    <header>
        <v-app-bar app dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title>MyPortfolioSite</v-toolbar-title>
            <v-tabs dark>
                <!-- :toプロパティを追加 -->
                <v-tab v-for="(menuItem, index) in headerItems" :key="index" :to="menuItem.url">
                    {{ menuItem.name }}
                </v-tab>
            </v-tabs>
        </v-app-bar>
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

export default {
    data() {
        return {
            drawer: false,
            menuItems: constants.menuItems,
            headerItems: constants.headerItems
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