<template>
  <div class="sale-detail">
    <a-form-model
        ref="ruleForm"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="name" label="商品价格" required prop="price">
        <a-input v-model="form.price"/>
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model="form.price_off"/>
      </a-form-model-item>
      <a-form-model-item label="商品库存" :required="true" prop="inventory">
        <a-input v-model="form.inventory"/>
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit"/>
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
            :action="`https://mallapi.duyiedu.com/upload/images?appkey=${this.$store.state.user.appkey}`"
            list-type="picture-card"
            @preview="handlePreview"
            @change="handleChange"
            :file-list="fileList"
            name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item>
        <div class="steps-action">
          <a-button type="primary" @click="prev">
            上一步
          </a-button>
          <a-button type="primary" @click="finish" style="margin-left: 30px">
            提交
          </a-button>
        </div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  name: "saleDetail",
  props: ['form'],
  data(){
    return{
      fileList: [],
      labelCol: { span: 5 },
      wrapperCol: { span: 13 },
      previewVisible: false,
      previewImage: '',
    }
  },
  methods:{
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({fileList, file}) {
      if (file.status === 'done'){
        this.$emit('pushImg', file.response.data.url)
      }
      if (file.status === 'removed'){
        this.$emit('deleteImg', file.response.data.url);
      }
      this.fileList = fileList;
    },
    prev(){
      this.$emit('prev');
    },
    finish(){
      this.$emit('finish');
    }
  },
  mounted() {
    let index = 1
    setTimeout(()=>{
      if (this.form.images){
        for (let i of this.form.images){
          this.fileList.push({
            uid: '-'+index,
            name: 'image.png',
            status: 'done',
            url: i
          });
          index += 1;
        }
      }
    },1000)
  }
}
</script>

<style scoped>
  .steps-action {
    position: relative;
    left: 250px;
  }
</style>