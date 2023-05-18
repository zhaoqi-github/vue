<template>
  <nav class="navbar bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#">者也专栏</router-link>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link to="#" class="btn btn-outline-light my-2"
            >注册</router-link
          >
        </li>
        <li class="list-inline-item">
          <router-link to="#" class="btn btn-outline-light my-2"
            >登录</router-link
          >
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <dropdown :title="`你好 ${user.name}`">
            <dropdown-item>
              <a href="#" class="dropdown-item">新建文章</a>
            </dropdown-item>
            <dropdown-item disabled>
              <a href="#" class="dropdown-item">编辑资料</a>
            </dropdown-item>
            <dropdown-item>
              <a href="#" class="dropdown-item">退出登录</a>
            </dropdown-item>
          </dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang='ts'>
import { PropType, defineComponent } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      // 提供相对 `Object` 更确定的类型
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>
<style>
</style>
