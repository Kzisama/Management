<template>
  <el-scrollbar>
    <div class="settlement">
      <el-input v-model.number="goodsNum" placeholder="商品编号" @keyup.enter="pushGoods" />
      <div class="list">
        <el-table :data="goodsList" stripe style="width: 100%" height="480">
          <el-table-column align="center" prop="product_num" label="商品编号" width="180" />
          <el-table-column align="center" prop="product_name" label="商品名称" />
          <el-table-column align="center" label="商品单价">
            <template #default="scope">
              <div style="color: red">￥{{ scope.row.product_price }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="product_quantity" label="商品数量" />
          <el-table-column align="center" label="商品总计">
            <template #default="scope">
              <div style="color: red">￥{{ scope.row.product_total }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template #default="scope">
              <div>
                <el-button type="danger" @click="delGoods(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operations">
        <div></div>
        <div>总计: <span v-if="goodsList.length > 0" style="font-size: 20px;color: red">￥ {{ goodsTotal }}</span></div>
        <el-button type="primary" style="height: 100%;" @click="settle">结算</el-button>
      </div>
    </div>
  </el-scrollbar>

</template>

<!-- 给组件添加名称,方便进行缓存 -->
<script lang="ts">
export default {
  name: "GoodsSettlement"
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import useStore from "@/store";

type GoodsSettlement = {
  product_num: number;
  product_name: string;
  product_price: number;
  product_quantity: number;
  product_total: number
}

const goodsNum = ref<number | null>(); // 商品编号
const goodsList = ref<GoodsSettlement[]>([]); // 结算列表

// 添加商品至列表中
const pushGoods = () => {
  // 商品列表中有该商品了，数量 +1
  if ( goodsList.value.some(item => item.product_num === goodsNum.value) ) {
    const singleGoods = (goodsList.value.find(v => v.product_num === goodsNum.value) as GoodsSettlement);
    singleGoods.product_quantity++; // 数量 +1
    singleGoods.product_total = computed<number>(() => singleGoods.product_price * singleGoods.product_quantity).value; // 重新计算金额
  } else {
    // 需要先打开商品总览页面，不然pinia中没有数据
    const { goodsStore } = useStore();
    const single = goodsStore.singleGoodsInfo(goodsNum.value as number); // 取出商品的信息
    if ( single ) {
      const quantity = ref<number>(1);
      const total = computed<number>(() => quantity.value * single.product_price);
      // 添加结算商品的数据
      goodsList.value.push({
        product_num: goodsNum.value as number,
        product_name: single.product_name,
        product_price: single.product_price,
        product_quantity: quantity.value,
        product_total: total.value
      });
    } else {
      ElMessage.error("没有该商品");
    }
  }
  goodsNum.value = null; // 重置输入框
};

// 删除该商品
const delGoods = (goods: GoodsSettlement) => {
  goodsList.value = goodsList.value.filter(item => item !== goods);
};

// 商品总计
const goodsTotal = computed(() => {
  const money = goodsList.value.reduce((prev, next) => prev += next.product_total, 0);
  return Number(money.toFixed(2));
});

// 商品结算
const settle = () => {
  if ( goodsList.value.length === 0 ) {
    ElMessage.error("没有商品需要结算");
    return;
  }
  // 成功结算
  console.log(goodsList.value);
  goodsList.value = [];
};
</script>

<style scoped lang="less">
.settlement {
  padding: 10px;

  .el-input {
    margin-bottom: 10px;
    width: 200px;
  }

  .operations {
    margin-top: 10px;
    padding-left: 200px;
    display: grid;
    grid-template-columns: 1fr 200px 200px;
    align-items: center;
    height: 50px;
    border-radius: 5px;
  }
}
</style>
