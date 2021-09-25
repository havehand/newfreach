<template>
  <div class="slider-nav-container">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="changeCollapsed"/>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{$route.matched[0].meta.title}}</a-breadcrumb-item>
      <a-breadcrumb-item><a href="">{{$route.meta.title}}</a></a-breadcrumb-item>
    </a-breadcrumb>
    <div class="user-info">
      <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          {{$store.state.user.username}}
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a @click="loginOut">退出</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "sliderNav",
  props:{
    collapsed:{
      required: true
    }
  },
  methods:{
    changeCollapsed(){
      this.$emit("hasChange");
    },
    loginOut(){
      this.$store.dispatch('logout');
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style scoped lang="less">
  .slider-nav-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user-info{
      margin-right: 30px;
    }
  }
</style>