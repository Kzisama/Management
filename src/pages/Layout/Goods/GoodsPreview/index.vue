<template>
  <el-container class="goods-contain">
    <el-main>
      <!--   筛选商品--根据种类   -->
      <div class="selectors">
        <el-select v-model="goodsType" class="select" placeholder="商品分类" size="small" @change="filterGoods">
          <el-option
              v-for="(item,index) in typeOptions"
              :key="index"
              :label="item"
              :value="item" />
        </el-select>
      </div>
      <el-table :data="tableData" border class="table" table-layout="auto">
        <el-table-column prop="product_num" label="商品编号" />
        <el-table-column prop="product_name" label="商品名称" />
        <el-table-column prop="product_pic" label="商品图片">
          <template #default="scope">
            <el-image style="width: 60px; height: 60px" :src="`http://127.0.0.1:3007${scope.row.product_pic}`"
                      fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="product_type" label="商品类别">
          <template #default="scope">
            <el-tag>
              {{ scope.row.product_type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="product_inv" label="商品库存" />
        <el-table-column prop="product_price" label="商品价格">
          <template #default="scope">
            <span style="color: red">￥{{ scope.row.product_price }}</span>
          </template>
        </el-table-column>
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
import useStore from "@/store";
import { getGoodsAPI } from "@/api";

type Goods = {
  product_num: number;
  product_name: string;
  product_pic: string;
  product_type: string;
  product_inv: number;
  product_price: number
}

const goodsType = ref<string>("全部"); // 商品分类类别
const typeOptions = ref<string[]>(["全部", "日用百货", "食品", "文体用具", "服饰", "厨房用具"]);
const goods = ref<Goods[]>([]); // 所有商品数据
const tableData = ref<Goods[]>([]); // 表格展示的数据
const goodsNum = ref<number>(0); // 总条目数
const pageNo = ref<number>(1); // 当前页数
const pageSize = ref<number>(6); // 每一页展示项的个数

const { goodsStore } = useStore();
onMounted(async () => {
  const res = await getGoodsAPI();
  goodsStore.setGoodsInfo([...res.data.data, ...res.data.data, ...res.data.data, ...res.data.data]);
  goods.value = goodsStore.goodsInfo;
  goodsNum.value = goods.value.length;
  tableData.value = goods.value.slice(0, pageSize.value);
});

// 商品分类筛选
const filterGoods = (val: string) => {
  // if ( val !== "全部" ) {
  //   tableData.value = goods.value.filter(item => item.product_type === val);
  // } else {
  //   tableData.value = goods.value;
  // }
  goods.value = goodsStore.filterGoods(val);
  goodsNum.value = goods.value.length;
  tableData.value = goods.value.slice(0, pageSize.value);
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

    .table {
      margin: 5px auto;
      width: 100%;
    }

    .el-pagination {
      justify-content: center;
    }
  }

}
</style>
