<template>
  <div>
    <div class="logo">
      <img src="@/assets/logo-big.png" alt="logo" style="width: 112px" v-if="!isCollapse">
      <img src="@/assets/logo-small.png" alt="logo" style="width: 56px" v-else>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        mode="vertical"
        background-color="#FFFFFF"
        text-color="#282F3A"
        active-text-color="#44519E"
      >
        <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    const routesss = this.$router.options.routes
    for (const o in routesss) {
      const obj = routesss[o]
      if (obj.path.indexOf('myiframe') >= 0) {
        obj.children[0].path = 'urlPath?src=https://www.baidu.com'
      }
    }
  }
}
</script>
