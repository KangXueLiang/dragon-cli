<template>
  <!-- <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb> -->
  <div style="display: inline-block;height: 56px;line-height: 56px;margin-left: 24px;" v-if="!sidebar.isMobile">
    <div style="display: inline-block; cursor: pointer; color: #788087;" @click="toggleSideBar()">
      <i v-if="isCollapse" class="iconfont icon-navicon toggle"
          style="border-radius: 60px;padding: 11px 10px 11px 12px;" />
      <i v-else class="iconfont icon-sandian toggle"
          style="border-radius: 60px;padding: 10px;" />
    </div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }" key="companyName">
          {{companyName || '首页'}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      levelList: null,
      companyName: '康强电子科技有限公司'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .toggle {
    position: relative;
    z-index: 5;
    color: #fff;
  }
  .toggle::after {
    content: '';
    position: absolute;
    z-index: 4;
    left: 0;
    top: 0;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0);
    transition: .3s cubic-bezier(.25,.8,.5,1);
  }
  .toggle:hover::after {
    background-color: rgba(255,255,255,0.2);
  }
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    margin-left: 10px;
    .no-redirect {
      color: #fff;
      cursor: text;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .app-breadcrumb {
    .el-breadcrumb__inner.is-link {
      color: #fff;
      font-weight: normal;
    }
    .el-breadcrumb__inner.is-link:hover {
      font-weight: bold;
      color: #FFF;
    }
  }
</style>

