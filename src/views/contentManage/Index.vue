<template>
    <div>

        <Paginate
                api="articleIndexPage"
                :params="params"
                :refresh="refresh"
                @val-change="PaginateData"
        >
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
                    input: this.$router.currentRoute.query.input},
                PaginateData: [],
                refresh: false
            }
        },
        methods: {

        },
        components: {
            Paginate
        },
       watch:{
           '$route' (to, from) { //监听路由是否变化
               if(to.query.input != from.query.input){
                   console.log(to.query.input)
                   this.params.input=to.query.input;
                   this.refresh=!this.refresh;
               }
           }
       }




    }
</script>