<script>
import router from '../router'
export default {
    name: 'RedirectImage',
    mounted() {
        console.log("REDIRECT")
        router.push('/image/' + this.$route.query.id)
    }
}

</script>