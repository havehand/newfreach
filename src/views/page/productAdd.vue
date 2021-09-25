<template>
  <div class="product-detail">
    <a-steps :current="current" class="steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicDetail
          :current="current"
          :steps="steps"
          v-show="current === 0"
          @next="current+=1"
          :form="form.base"
      ></BasicDetail>
      <SaleDetail
          @finish="handleFinish"
          :form="form.sale"
          v-show="current === 1"
          @prev="current -= 1"
          @pushImg="handlePushImg"
          @deleteImg="handleDeleteImg"
      ></SaleDetail>
    </div>
  </div>
</template>

<script>
import BasicDetail from "@/components/basicDetail"
import SaleDetail from "@/components/saleDetail";
import api from "@/api/product"
export default {
  name: "productAdd",
  components: {
    BasicDetail,
    SaleDetail
  },
  data(){
    return{
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
          content: 'First-content',
        },
        {
          title: '填写商品销售信息',
          content: 'Second-content',
        },
      ],
      form: {
        base: {
          title: '',
          desc: '',
          category: '',
          c_items: [],
          tags: []
        },
        sale: {
          price: 0,
          price_off: 0,
          inventory: 0,
          unit: '',
          images: [],
          status: 1,
          sale: 10010
        }
      }
    }
  },
  methods: {
    handleFinish(){
      if (this.$route.path.indexOf('edit') !== -1){
        api.edit({
          appkey: this.$store.state.user.appkey,
          id: this.$route.params.id,
          ...this.form.base,
          ...this.form.sale,
        }).then(()=>{
          this.$message.success("修改成功");
          this.$router.push({
            name: 'ProductList'
          })
          this.$store.commit('changeMenuCurrent', 'ProductList');
        })
      }else {
        api.add({
          appkey: this.$store.state.user.appkey,
          ...this.form.base,
          ...this.form.sale
        }).then(()=>{
          this.$message.success("添加成功");
          this.$router.push({
            name: 'ProductList'
          })
          this.$store.commit('changeMenuCurrent', 'ProductList');
        })
      }
    },
    handlePushImg(url){
      this.form.sale.images.push(url);
    },
    handleDeleteImg(url){
      this.form.sale.images = this.form.sale.images.filter((item)=> item !== url)
    }
  },
  mounted() {
    if (this.$route.path.indexOf('edit') !== -1){
      const {id} = this.$route.params
      api.detail(id, this.$store.state.user).then((res)=>{
        this.form.base.title = res.title;
        this.form.base.desc = res.desc
        this.form.base.category = res.category
        this.form.base.c_items = res.c_items
        this.form.base.tags = res.tags

        this.form.sale.price = res.price;
        this.form.sale.price_off = res.price_off;
        this.form.sale.inventory = res.inventory;
        this.form.sale.unit = res.unit;
        this.form.sale.images = res.images;
        this.form.sale.status = res.status;
      })
    }
  }
}
</script>

<style scoped lang="less">
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
    display: flex;
    justify-content: center;
  }

  .product-detail{
    padding: 0 40px;
  }

  .steps{
    width: 70%;
    margin: 20px auto;
  }
</style>