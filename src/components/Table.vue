<template>
  <a-table
      :columns="columns"
      :data-source="data"
      :pagination="page"
      @change="handleChange"
  >
    <div slot="operation" style="white-space: nowrap" slot-scope="text, record">
      <a-button @click="handleEditProduct(record)">编辑</a-button>
      <a-button @click="handleRemoveProduct(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 200,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    width: 200
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'address category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
    width: 150
  },
  {
    title: '购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender: function (text, recode){
      return recode.status === 1 ? '上架': '下架';
    }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 200
  },
];
export default {
  data() {
    return {
      columns,
      pagination:{
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 10
      }
    };
  },
  props: ['data', 'page'],
  methods: {
    handleChange(page) {
      this.$emit('pageChange', page);
    },
    handleEditProduct(record) {
      this.$emit('edit', record);
    },
    handleRemoveProduct(record) {
      this.$emit('remove', record);
    }
  }
};
</script>
