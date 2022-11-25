<template>
    <v-carousel height="800" width="800" hide-delimiter-background show-arrows-on-hover class="ml-3"
        v-model="currentIndex">
        <v-carousel-item v-for="(image, i) in images" :key="i">
            <img :src="image.image" style="max-width:100%;max-height:100%;" aspect-ratio="1" />
        </v-carousel-item>
    </v-carousel>
</template>
<script>
export default {
    props: ["images"],
    computed: {
        HeightandWidth() {
            return {
                height: this.$vuetify.breakpoint.height,
                width: this.$vuetify.breakpoint.width
            }
        }
    },
    data: () => ({
        currentIndex: 0,
    }),
    watch: {
        currentIndex() {
            this.$emit('changeIndex', this.currentIndex)
        }
    }
}
</script>