<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>{{ $t("oms.order.deliverList") }}</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="deliverOrderTable"
        style="width: 100%;"
        :data="list"
        border
      >
        <el-table-column
          :label="$t('oms.order.orderSn')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.orderSn }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.receiver')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.receiverName }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.phone')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.receiverPhone }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.postcode')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.receiverPostCode
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('oms.order.address')" align="center">
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.deliveryMethod')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <el-select
              :placeholder="$t('oms.order.deliveryMethod')"
              v-model="scope.row.deliveryCompany"
              size="small"
            >
              <el-option
                v-for="item in companyOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.logisticsNo')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.deliverySn"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px;text-align: center">
        <el-button @click="cancel">{{ $t("common.cancel") }}</el-button>
        <el-button @click="confirm" type="primary">{{
          $t("common.confirm")
        }}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { deliveryOrder } from "@/api/order";
const defaultLogisticsCompanies = [
  "顺丰快递",
  "圆通快递",
  "中通快递",
  "韵达快递"
];
export default {
  name: "deliverOrderList",
  data() {
    return {
      list: [],
      companyOptions: defaultLogisticsCompanies
    };
  },
  created() {
    this.list = this.$route.query.list;
    //当list不为数组时转换为数组
    if (this.list instanceof Array === false) {
      this.list = [];
    }
  },
  methods: {
    cancel() {
      this.$router.back();
    },
    confirm() {
      this.$confirm(this.$t("oms.order.deliver"), this.$t("common.prompt"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning"
      })
        .then(() => {
          deliveryOrder(this.list).then(response => {
            this.$router.back();
            this.$message({
              type: "success",
              message:
                this.$t("oms.order.deliver") +
                " " +
                this.$t("common.saveSuccess")
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("oms.order.cancelDeliver")
          });
        });
    }
  }
};
</script>
<style></style>
