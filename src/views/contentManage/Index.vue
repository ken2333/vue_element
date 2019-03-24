<template>
  <div>
    <Paginate
            api="articleIndexPage"
            :params="params"
            :refresh="refresh"
            @val-change="PaginateData" >
    </Paginate>
  </div>
</template>

<script>

  import  Paginate from '@/components/Paginate.vue';

  export default {
    data() {
      return {
          params:{start:0,limit:25},
          PaginateData:[],
          refresh:false
      }
    },
    methods:  {

    },
    components: {
        Paginate
    }
  }
</script>