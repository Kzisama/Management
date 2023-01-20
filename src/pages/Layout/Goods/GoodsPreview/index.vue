<template>
  <el-container class="goods-contain">
    <el-main>
      <!--   筛选商品   -->
      <div class="selectors">
        <el-select v-model="goodsType" class="select" placeholder="商品分类" size="small" @change="filterGoods">
          <el-option
              v-for="(item,index) in typeOptions"
              :key="index"
              :label="item"
              :value="item"
          />
        </el-select>
      </div>
      <el-table :data="tableData" border class="table">
        <el-table-column prop="product_num" label="商品编号" width="150" />
        <el-table-column prop="product_name" label="商品名称" width="150" />
        <el-table-column prop="product_pic" label="商品图片" width="150">
          <template #default="scope">
            <el-image style="width: 60px; height: 60px" :src="scope.row.product_pic" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="product_type" label="商品类别" width="150">
          <template #default="scope">
            <el-tag type="success">
              {{ scope.row.product_type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="product_sale" label="在售数量" width="150" />
      </el-table>
      <el-pagination background layout="prev, pager, next" small
                     :total="goodsNum"
                     :page-size="pageSize"
                     :current-page="pageNo"
                     hide-on-single-page
                     @current-change="renderFn" />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import GoodsData from "@/MockData/goodsList.json";

type Goods = {
  product_num: number;
  product_name: string;
  product_pic: string;
  product_type: string;
  product_sale: number;
}
const goodsType = ref<string>("全部"); // 商品分类类别
const typeOptions = ref<string[]>(["全部", "食品", "服饰", "文体用具", "日用百货"]);
const tableData = ref<Goods[]>([]); // 表格展示的数据
const goods = ref<Goods[]>([]); // 所有商品数据
const goodsNum = ref<number>(0); // 总条目数
const pageNo = ref<number>(1); // 当前页数
const pageSize = ref<number>(6); // 每一页展示项的个数

onMounted(() => {
  goods.value = GoodsData.data;
  goodsNum.value = goods.value.length;
  tableData.value = goods.value.slice(0, pageSize.value);
});

// 商品分类筛选
const filterGoods = (val: string) => {
  // TODO：根据选择值筛选对应的商品
  console.log(val);
};

// 切换页码时触发
const renderFn = (val: number) => {
  // val 点击的页码
  pageNo.value = val;
  tableData.value = goods.value.slice((pageNo.value - 1) * pageSize.value, pageNo.value * pageSize.value);
};
</script>

<style scoped lang="less">
.goods-contain {
  width: 100%;
  height: 100%;

  .el-main {
    padding: 5px;

    .selectors {
      display: flex;
      margin: 0 auto;
      width: 750px;

      .select {
        width: 125px;
      }
    }

    .table {
      margin: 5px auto;
      width: 750px;
    }

    .el-pagination {
      justify-content: center;
    }
  }

}
</style>
