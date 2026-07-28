<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">{{ $t("home.guide") }}</div>
            <div class="color-main address-content">
              <a href="https://www.macrozheng.com" target="_blank">{{
                $t("home.mallGuide")
              }}</a>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">{{ $t("home.videoGuide") }}</div>
            <div class="color-main address-content">
              <a
                href="https://www.macrozheng.com/mall/catalog/mall_video.html"
                target="_blank"
                >{{ $t("home.mallVideoGuide") }}</a
              >
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">{{ $t("home.supportProject") }}</div>
            <div class="color-main address-content">
              <a href="https://github.com/macrozheng/mall" target="_blank">{{
                $t("home.mallProject")
              }}</a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon" />
            <div class="total-title">{{ $t("home.todayOrders") }}</div>
            <div class="total-value">200</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon" />
            <div class="total-title">{{ $t("home.todaySales") }}</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_yesterday_amount" class="total-icon" />
            <div class="total-title">{{ $t("home.yesterdaySales") }}</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>
        <!--<el-col :span="6">-->
        <!--<div class="total-frame">-->
        <!--<svg-icon icon-class="total-week" class="total-icon">-->
        <!--</svg-icon>-->
        <!--<div class="total-title">近7天销售总额</div>-->
        <!--<div class="total-value">￥50000.00</div>-->
        <!--</div>-->
        <!--</el-col>-->
      </el-row>
    </div>
    <el-card class="mine-layout">
      <div style="text-align: center">
        <img
          width="150px"
          height="150px"
          src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/banner/qrcode_for_macrozheng_258.jpg"
        />
      </div>
      <div style="text-align: center">{{ $t("home.learningSeries") }}</div>
      <div style="text-align: center;margin-top: 5px">
        <span class="color-main">{{ $t("home.followPublic") }}</span
        >{{ $t("home.getFirst") }}
      </div>
    </el-card>
    <div class="un-handle-layout">
      <div class="layout-title">{{ $t("home.pendingTasks") }}</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">{{ $t("home.pendingPayment") }}</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">{{ $t("home.completedOrders") }}</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">{{ $t("home.pendingReceive") }}</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">{{ $t("home.pendingDelivery") }}</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">{{ $t("home.outOfStock") }}</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">{{ $t("home.pendingRefund") }}</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">{{ $t("home.shippedOrders") }}</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">{{ $t("home.returnOrders") }}</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">{{ $t("home.adExpiry") }}</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">{{ $t("home.productOverview") }}</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value"
                  >100</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >400</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >50</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >500</el-col
                >
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">{{
                  $t("home.offShelf")
                }}</el-col>
                <el-col :span="6" class="overview-item-title">{{
                  $t("home.onShelf")
                }}</el-col>
                <el-col :span="6" class="overview-item-title">{{
                  $t("home.lowStock")
                }}</el-col>
                <el-col :span="6" class="overview-item-title">{{
                  $t("home.allProducts")
                }}</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">{{ $t("home.userOverview") }}</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value"
                  >100</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >200</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >1000</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >5000</el-col
                >
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">{{
                  $t("home.todayNew")
                }}</el-col>
                <el-col :span="6" class="overview-item-title">{{
                  $t("home.yesterdayNew")
                }}</el-col>
                <el-col :span="6" class="overview-item-title">{{
                  $t("home.monthNew")
                }}</el-col>
                <el-col :span="6" class="overview-item-title">{{
                  $t("home.memberTotal")
                }}</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-layout">
      <div class="layout-title">{{ $t("home.orderStats") }}</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">
                {{ $t("home.monthOrderCount") }}
              </div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">
                10000
              </div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">
                {{ $t("home.weekOrderCount") }}
              </div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">
                1000
              </div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">
                {{ $t("home.monthSales") }}
              </div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">
                100000
              </div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">
                {{ $t("home.weekSales") }}
              </div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">
                50000
              </div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
              style="float: right;z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              :range-separator="$t('home.to')"
              :start-placeholder="$t('home.startDate')"
              :end-placeholder="$t('home.endDate')"
              @change="handleDateChange"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="false"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"
              ></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { str2Date } from "@/utils/date";
import img_home_order from "@/assets/images/home_order.png";
import img_home_today_amount from "@/assets/images/home_today_amount.png";
import img_home_yesterday_amount from "@/assets/images/home_yesterday_amount.png";
const DATA_FROM_BACKEND = {
  columns: ["date", "orderCount", "orderAmount"],
  rows: [
    { date: "2018-11-01", orderCount: 10, orderAmount: 1093 },
    { date: "2018-11-02", orderCount: 20, orderAmount: 2230 },
    { date: "2018-11-03", orderCount: 33, orderAmount: 3623 },
    { date: "2018-11-04", orderCount: 50, orderAmount: 6423 },
    { date: "2018-11-05", orderCount: 80, orderAmount: 8492 },
    { date: "2018-11-06", orderCount: 60, orderAmount: 6293 },
    { date: "2018-11-07", orderCount: 20, orderAmount: 2293 },
    { date: "2018-11-08", orderCount: 60, orderAmount: 6293 },
    { date: "2018-11-09", orderCount: 50, orderAmount: 5293 },
    { date: "2018-11-10", orderCount: 30, orderAmount: 3293 },
    { date: "2018-11-11", orderCount: 20, orderAmount: 2293 },
    { date: "2018-11-12", orderCount: 80, orderAmount: 8293 },
    { date: "2018-11-13", orderCount: 100, orderAmount: 10293 },
    { date: "2018-11-14", orderCount: 10, orderAmount: 1293 },
    { date: "2018-11-15", orderCount: 40, orderAmount: 4293 }
  ]
};
export default {
  name: "home",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t ? this.$t("home.lastWeek") : "Last week",
            onClick(picker) {
              let start = new Date(2018, 10, 1);
              const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t ? this.$t("home.lastMonth") : "Last month",
            onClick(picker) {
              let start = new Date(2018, 10, 1);
              const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      orderCountDate: "",
      chartSettings: {
        xAxisType: "time",
        area: true,
        axisSite: { right: ["orderAmount"] },
        labelMap: {
          orderCount: this.$t ? this.$t("home.orderCount") : "Order count",
          orderAmount: this.$t ? this.$t("home.orderAmount") : "Order amount"
        }
      },
      chartData: {
        columns: [],
        rows: []
      },
      loading: false,
      dataEmpty: false,
      img_home_order,
      img_home_today_amount,
      img_home_yesterday_amount
    };
  },
  created() {
    this.initOrderCountDate();
    this.getData();
  },
  methods: {
    handleDateChange() {
      this.getData();
    },
    initOrderCountDate() {
      let start = new Date(2018, 10, 1);
      const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 7);
      this.orderCountDate = [start, end];
    },
    getData() {
      setTimeout(() => {
        this.chartData = {
          columns: ["date", "orderCount", "orderAmount"],
          rows: []
        };
        for (let i = 0; i < DATA_FROM_BACKEND.rows.length; i++) {
          let item = DATA_FROM_BACKEND.rows[i];
          let currDate = str2Date(item.date);
          let start = this.orderCountDate[0];
          let end = this.orderCountDate[1];
          if (
            currDate.getTime() >= start.getTime() &&
            currDate.getTime() <= end.getTime()
          ) {
            this.chartData.rows.push(item);
          }
        }
        this.dataEmpty = false;
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}

.address-layout {
}

.total-layout {
  margin-top: 20px;
}

.total-frame {
  border: 1px solid #dcdfe6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409eff;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #dcdfe6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}
.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}
.address-content {
  padding: 20px;
  font-size: 18px;
}
</style>
