<template>
  <div class="productList-container" style="background-color: #fff">
    <Search @submit="handleSearch" :category-list="categoryList"></Search>
    <Table
        :data="tableData"
        :page="page"
        @pageChange="handlePageChange"
        @edit="handleEditProduct"
        @remove="handleRemoveProduct"
    ></Table>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Table from "@/components/Table"
import api from "@/api/product"
import apiCategory from "@/api/category"
export default {
  name: "productList",
  data(){
    return{
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 1
      }
    }
  },
  components:{
    Search,
    Table
  },
  methods:{
    handleSearch(info){
      for (let item of this.categoryList){
        if (item.name === info.category){
          this.searchForm = {
            category: item.id,
            searchWord: item.searchWord
          }
          this.getTableData()
          return;
        }
      }
      this.getTableData();
    },
    handlePageChange(page){
      this.page = page;
      this.getTableData()
    },
    getTableData(){
      api.getTableList({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
        appkey: this.$store.state.user.appkey
      }).then((res)=>{
        this.page.total = res.total;
        this.tableData = res.data.map((item)=>{
          return{
            ...item,
            key: item.id,
            categoryName:  this.categoryList[item.category-1].name
          }
        });
      });
    },
    handleEditProduct(record){
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id
        }
      })
    },
    handleRemoveProduct(record){
      this.$confirm({
        title: '确认删除',
        content: '确认删除产品标题为：' + record.title,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk:()=> {
          api.remove({
            id: record.id,
            appkey: this.$store.state.user.appkey
          }).then((res)=>{
            this.getTableData()
            console.log(res)
          });
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  },
  mounted(){
    apiCategory.list(this.$store.state.user).then((res)=>{
      this.categoryList = res.data;
    })
    this.getTableData();
  }
}
</script>

<style scoped lang="less">

</style>