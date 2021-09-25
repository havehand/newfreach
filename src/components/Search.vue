<template>
  <a-form layout="inline" class="searchForm">
    <a-form-item label="搜索关键字">
      <a-input placeholder="请输入搜索的关键字" v-model="searchInfo.searchWord">
<!--        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />-->
      </a-input>
    </a-form-item>
    <a-form-item label="商品类目" style="margin-left: 20px">
      <a-select :allowClear="true" style="width: 200px" @change="handleChange" placeholder="请选择商品类目">
        <a-select-option :value="item.name" v-for="item in categoryList" :key="item.id">
          {{item.name}}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" @click="handleSubmit">
        搜索
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data(){
    return{
      searchInfo: {
        searchWord: '',
        category: ''
      },
    }
  },
  props: ['categoryList'],
  methods: {
    handleChange(value) {
      this.searchInfo.category = value;
    },
    handleSubmit(){
      this.$emit('submit', this.searchInfo)
    }
  }
}
</script>

<style scoped lang="less">
.searchForm{
  margin-left: 80px;
  margin-bottom: 30px;
}
</style>