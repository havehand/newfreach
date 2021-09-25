<template>
  <div class="basic-detail">
    <a-form-model
        ref="ruleForm"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="name" label="商品标题" required prop="title">
        <a-input v-model="form.title"/>
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc"/>
      </a-form-model-item>
      <a-form-model-item label="商品类目" :required="true" prop="category">
        <a-select v-model="form.category" placeholder="请选择商品类别"  @change="changeCategory">
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{c.name}}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_items" placeholder="请选择子类目">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">
            {{c}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
            mode="tags"
            placeholder="Please select"
            :default-value="['包邮，最晚次日达']"
            v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达">
            {{'包邮最晚次日达'}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <div class="steps-action">
          <a-button type="primary" @click="next">
            下一步
          </a-button>
        </div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from "@/api/category"
export default {
  name: "basicDetail",
  props: ['current','form'],
  data() {
    return {
      categoryList: [],
      categoryItems: [],
      labelCol: { span: 5 },
      wrapperCol: { span: 13 },
      rules: []
    };
  },
  methods: {
    changeCategory(category){
      console.log(category);
      for (let item of this.categoryList){
        if (item.id === category){
          this.categoryItems = item.c_items;
          return;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('next');
        } else {
          this.$emit('next')
          return false;
        }
      });
    }
  },
  mounted() {
    api.list(this.$store.state.user).then((res)=>{
      this.categoryList = res.data;
    })
  }
}
</script>

<style scoped>
  .steps-action {
    position: relative;
    left: 250px;
  }
</style>