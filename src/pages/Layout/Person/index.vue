<template>
  <div class="person">
    <div class="user-panel">
      <el-descriptions
          :column="1"
          border
      >
        <el-descriptions-item label="Username">{{ user_name }}</el-descriptions-item>
        <el-descriptions-item label="Nickname">{{ user_nickname }}</el-descriptions-item>
        <el-descriptions-item label="Telephone">{{ user_tel }}</el-descriptions-item>
        <el-descriptions-item label="Place" :span="2">Suzhou</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store'
import { User } from '@/store/user'

const {user_name, user_nickname, user_tel, user_type} = useStore().userStore.userInfo as User

</script>

<style scoped lang="less">
.person {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 100%;

  .user-panel {
    min-width: 400px;
    max-width: 800px;
  }
}

</style>

