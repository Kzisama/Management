<template>
  <div class="person">
    <div class="left">
      <!--  用户面板  -->
      <div class="panel">
        <div class="avatar">
          <el-avatar
              size="large"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </div>
        <div class="info">
          <el-descriptions :column="1">
            <el-descriptions-item label="Username">{{ user_name }}</el-descriptions-item>
            <el-descriptions-item label="Telephone">{{ user_tel }}</el-descriptions-item>
            <el-descriptions-item label="Nickname">{{ user_nickname }}</el-descriptions-item>
            <el-descriptions-item label="Department">
              <el-tag size="small">{{ user_role }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
          <!--  修改昵称  -->
          <span class="edit" @click="dialogVisible = true">
          <el-icon color="#3F9FFF">
            <Edit />
          </el-icon>
        </span>
          <!--  弹出框  -->
          <el-dialog v-model="dialogVisible" title="修改你的昵称" width="300px">
            <el-input
                v-model="nicknameVal"
                minlength="2"
                maxlength="8"
                placeholder="请输入2-8个非空字符"></el-input>
            <template #footer>
            <span class="dialog-footer">
              <el-button @click="clearName">取消</el-button>
              <el-button type="primary" @click="setnameFn">确定</el-button>
            </span>
            </template>
          </el-dialog>
        </div>
      </div>
      <!--  便捷入口  -->
      <div class="menu">
        <QuickEntrance
            v-for="item in entranceArr"
            :key="item.path"
            :icon="item.icon"
            :text="item.text"
            :path="item.path">
        </QuickEntrance>
      </div>
    </div>
    <div class="right">
      <Date></Date>
      <Weather></Weather>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
import { Edit } from "@element-plus/icons-vue";
import useStore from "@/store";
import { User } from "@/store/user";
import { getUserInfoAPI, setNickNameAPI } from "@/api";
import QuickEntrance from "@/components/QuickEntrance/index.vue";
import Weather from "@/components/Weather/index.vue";
import Date from "@/components/Date/index.vue";

// 用户信息展示
const { user_name, user_nickname, user_tel, user_type } = useStore().userStore.userInfo as User;
const user_role = computed(() => {
  switch ( user_type ) {
    case 0:
      return "售货部";
    case 1:
      return "仓管部";
    case 2:
      return "管理部";
  }
});

// 快捷入口
const entranceArr = [
  {
    icon: "component",
    text: "商品总览",
    path: "/goods/goodspreview",
  },
  {
    icon: "password",
    text: "修改密码",
    path: "/password",
  },
];

// 修改昵称
const dialogVisible = ref<boolean>(false); // 弹出框显示状态
const nicknameVal = ref<string>("");
const clearName = () => {
  dialogVisible.value = false;
  nicknameVal.value = "";
};
const setnameFn = async () => {
  // 去除非空字符
  nicknameVal.value = nicknameVal.value.replace(/\s*/g, "");
  // 长度在2-8之间
  if ( nicknameVal.value.length >= 2 && nicknameVal.value.length <= 8 ) {
    const res = await setNickNameAPI(nicknameVal.value);
    if ( res.data.status === 0 ) {
      ElMessage({
        message: "修改成功",
        type: "success"
      });
      // 重新获取信息并存储到pinia
      const infoRes = await getUserInfoAPI();
      const { userStore } = useStore();
      userStore.setUserInfo(infoRes.data.data);
      window.location.reload();
    } else {
      ElMessage.error("修改昵称失败");
    }
  } else {
    ElMessage.error("昵称不符合要求");
  }
};
</script>

<style scoped lang="less">
.person {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  min-width: 890px;
  height: 100%;
  overflow: auto;

  .left {
    margin-right: 10px;

    .panel {
      display: flex;
      padding: 15px;
      min-width: 250px;
      max-width: 350px;
      height: 180px;
      background-color: #fff;
      border-radius: 5px;

      .avatar {
        margin-right: 15px;
      }

      .info {
        position: relative;
        flex: 1;

        .edit {
          position: absolute;
          top: 75px;
          right: 35px;
          cursor: pointer;
        }
      }
    }

    .menu {
      display: grid;
      grid-template-columns: repeat(auto-fill, 100px);
      gap: 25px;
      margin-top: 10px;
      width: 350px;
    }
  }


}
</style>
