<template>
    <div>

        <Paginate
                api="articleIndexPage"
                :params="params"
                :refresh="refresh"
                @val-change="PaginateData">
        </Paginate>
    </div>
</template>

<script>

    import Paginate from '@/components/Paginate.vue';

    export default {
        data() {
            return {
                input: "",
                params: {start: 0, limit: 25, userID: this.$Config.userID,
                    input: this.$route.params.input},
                PaginateData: [],
                refresh: false
            }
        },
        methods: {},
        components: {
            Paginate
        },
        beforeRouteUpdate (to, from, next) {
            next(vm => {
                console.log(vm)
            })
        }


    }
</script>