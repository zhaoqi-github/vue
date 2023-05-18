<template>
  <div class="container">
    <global-header :user="currentUser" />
    <router-view></router-view>
    <!-- <column-list :list="list" /> -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
          placeholder="请输入密码"
          type="password"
        ></validate-input>
      </div>
      <!-- v-slot:submit -->
      <template #submit>
        <span class="btn btn-danger">Sub迷人</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ColumnProps } from './components/ColumnList.vue'
import ValidateInput, { RulesProps } from './components/ValidateInput.vue'
import ValidateForm, { emitter } from './components/ValidateForm.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: '专栏1',
    description: '非常有意思',
    avatar: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF'
  },
  {
    id: 1,
    title: '专栏2',
    description: '非常有意思'
    // avatar: 'https://t7.baidu.com/it/u=4080826490,615918710&fm=193&f=GIF'
  }
]
const currentUser: UserProps = {
  isLogin: true,
  name: 'zhaoqi'
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    const emailVal = ref('zhaoqi')
    const passwordVal = ref('')
    const emailRules: RulesProps = [
      { type: 'required', message: '电子邮箱不能为空' },
      {
        type: 'email',
        message: '请输入正确的电子邮箱'
      }
    ]
    const passwordRules: RulesProps = [
      { type: 'required', message: '密码不能为空' },
      {
        type: 'password',
        message: '密码长度不能少于6'
      }
    ]
    const onFormSubmit = (res: boolean) => {
      emitter.emit('form-item-clear', res)
    }
    return {
      list: testData,
      currentUser,
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
