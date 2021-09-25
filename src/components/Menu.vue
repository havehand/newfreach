<template>
  <div class="menu-container">
    <a-menu
        :default-selected-keys="['0']"
        :default-open-keys="[$store.state.menuRoutes[0].name]"
        mode="inline"
        :theme="theme"
        :selected-keys="[this.$store.state.current]"
        @click="handleClick"
    >
      <template v-for="parent in $store.state.menuRoutes">
        <a-sub-menu v-if="!parent.meta.hidden" :key="parent.name">
          <span slot="title"><a-icon type="home" /><span>{{parent.meta.title}}</span></span>
          <template v-for="child in parent.children">
            <a-menu-item v-if="!child.meta.hidden" :key="child.name">
              <router-link :to="{name: child.name}"><a-icon :type="child.meta.icon"></a-icon>{{child.meta.title}}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: 'dark',
    };
  },
  methods: {
    handleClick(e) {
      this.$store.commit('changeMenuCurrent', e.key);
    },
    changeTheme(checked) {
      this.theme = checked ? 'dark' : 'light';
    },
  },
  mounted() {
    let link = location.pathname.slice(1);
    function changeFirstLetter(str){
      //转换为字符串数组
      let array = str.toLowerCase().split("/")
      for(let i =0 ;i < array.length; i++){
        //给数组的每一个元素重新赋值,将首字母变为大写
        array[i]=array[i][0].toUpperCase()+array[i].substring(1,array[i].length)
      }
      return array.join("")
    }
    this.$store.commit('changeMenuCurrent', changeFirstLetter(link));
  }
};
</script>
