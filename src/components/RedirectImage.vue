<script>
import router from '../router'
export default {
    name: 'RedirectImage',
    mounted() {

        router.push('/showimages/' + this.$route.query.id)
    }
}

</script>