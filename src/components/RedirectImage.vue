<script>
import router from '../router'
export default {
    name: 'RedirectImage',
    mounted() {

        router.push('/image/' + this.$route.query.id)
    }
}

</script>