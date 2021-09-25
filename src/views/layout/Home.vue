<template>
  <a-layout id="components-layout-demo-custom-trigger">

    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <Menu></Menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; border-bottom: 1px solid #ccc">
        <slider-nav :collapsed="collapsed" @hasChange="collapsed = !collapsed"></slider-nav>
      </a-layout-header>
      <a-layout-content :style="{paddingTop: '24px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Menu from "@/components/Menu";
import sliderNav from "@/components/sliderNav";
export default {
  components: {
    Menu,
    sliderNav
  },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style>
#components-layout-demo-custom-trigger{
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
