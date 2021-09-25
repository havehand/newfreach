<template>
  <div class="index-container" ref="indexContainer" >
    <myCard></myCard>
    <Charts :parentWidth="myWidth"></Charts>
  </div>
</template>

<script>
import myCard from "@/components/myCard";
import Charts from "@/components/Charts"
export default {
  name: "index",
  components:{
    myCard,
    Charts
  },
  data(){
    return{
      myWidth: '1319px'
    }
  }
}
</script>

<style scoped lang="less">
.index-container{
  width: 100%;
  height: 100%;
  background-color: #ececec
}
</style>