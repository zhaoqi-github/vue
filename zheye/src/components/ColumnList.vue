<template>
  <div class="row">
    <div v-for="column in list" :key="column.id" class="col-6">
      <div class="card h-100 shadow-sm">
        <img
          :src="column.avatar"
          :alt="column.title"
          class="card-img-top"
          style="height: 8rem"
        />
        <div class="card-body text-center">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">
            {{ column.description }}
          </p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed } from '@vue/reactivity'
import { defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      // Array<ColumnProps>
      // Array as PropType<ColumnProps[]> 想把一个构造函数断言成类型就用PropType
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map((column) => {
        if (!column.avatar) {
          column.avatar = require('@/assets/logo.png')
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>
<style>
</style>
