<template>
    <v-carousel cycle height="200" hide-delimiter-background show-arrows-on-hover class="ml-3">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                    <div class="text-h2">
                        {{ slide }} Slide
                        <p>{{ moji }}</p>
                    </div>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>
<script>
export default {
    props: ["moji"],
    data() {
        return {
            colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
            ],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
        }
    },
}
</script>