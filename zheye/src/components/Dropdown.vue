<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </a>

    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    // ref 响应式数据
    const isOpen = ref(false) // 是否显示下拉框
    const dropdownRef = ref<null | HTMLElement>(null) // dropdownRef.value 就是那个 DOM 元素
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    // 是否点击下拉框的外面
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isClickOutside.value && isOpen) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
<style>
</style>
