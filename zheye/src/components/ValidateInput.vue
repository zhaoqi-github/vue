<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput"
      :value="inputRef.val"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<!-- v-model="inputRef.val"
:value="inputRef.val"
@input="updateValue" -->
<!-- type="text" v-bind="$attrs" 获取placeholder和type 绑定在input上 -->
<script lang='ts'>
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'
interface RuleProp {
  type: 'required' | 'email' | 'password'
  message: string
}
export type RulesProps = RuleProp[]
const emailReg =
  /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export default defineComponent({
  props: {
    // 提供相对 `Array` 更确定的类型
    rules: Array as PropType<RulesProps>,
    modelValue: String
  },
  inheritAttrs: false, // 禁止继承除props之外的attributes，要不然会加在这个组件的根节点上
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    // 自定义组件支持双向绑定的关键
    const updateValue = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        // 如果遇到返回是 false 的元素，every() 方法将会立即返回 false 并停止遍历数组
        const allPassed = props.rules.every((rule) => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'password':
              passed = inputRef.val.length >= 6
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return false
    }
    emitter.on('form-item-clear', (res) => {
      inputRef.val = ''
      context.emit('update:modelValue', '')
    })
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>
<style>
</style>
