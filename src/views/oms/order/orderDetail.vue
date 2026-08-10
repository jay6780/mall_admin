<template>
  <div class="detail-container">
    <div>
      <el-steps
        :active="formatStepStatus(order.status)"
        finish-status="success"
        align-center
      >
        <el-step
          :title="$t('oms.order.submitOrder')"
          :description="formatTime(order.createTime)"
        ></el-step>
        <el-step
          :title="$t('oms.order.payOrder')"
          :description="formatTime(order.paymentTime)"
        ></el-step>
        <el-step
          :title="$t('oms.order.shipOrder')"
          :description="formatTime(order.deliveryTime)"
        ></el-step>
        <el-step
          :title="$t('oms.order.confirmReceipt')"
          :description="formatTime(order.receiveTime)"
        ></el-step>
        <el-step
          :title="$t('oms.order.comment')"
          :description="formatTime(order.commentTime)"
        ></el-step>
      </el-steps>
    </div>
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger"
          >{{ $t("oms.order.currentStatus") }}：{{
            order.status | formatStatus
          }}</span
        >
        <div class="operate-button-container" v-show="order.status === 0">
          <el-button size="mini" @click="showUpdateReceiverDialog">{{
            $t("oms.order.updateReceiver")
          }}</el-button>
          <el-button size="mini" @click="showUpdateMoneyDialog">{{
            $t("oms.order.updateFee")
          }}</el-button>
          <el-button size="mini" @click="showMessageDialog">{{
            $t("oms.order.sendMessage")
          }}</el-button>
          <el-button size="mini" @click="showCloseOrderDialog">{{
            $t("oms.order.close")
          }}</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">{{
            $t("oms.order.markOrder")
          }}</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status === 1">
          <el-button size="mini" @click="showUpdateReceiverDialog">{{
            $t("oms.order.updateReceiver")
          }}</el-button>
          <el-button size="mini" @click="showMessageDialog">{{
            $t("oms.order.sendMessage")
          }}</el-button>
          <el-button size="mini">{{ $t("oms.order.cancelOrder") }}</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">{{
            $t("oms.order.markOrder")
          }}</el-button>
        </div>
        <div
          class="operate-button-container"
          v-show="order.status === 2 || order.status === 3"
        >
          <el-button size="mini" @click="showLogisticsDialog">{{
            $t("oms.order.tracking")
          }}</el-button>
          <el-button size="mini" @click="showMessageDialog">{{
            $t("oms.order.sendMessage")
          }}</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">{{
            $t("oms.order.markOrder")
          }}</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status === 4">
          <el-button size="mini" @click="handleDeleteOrder">{{
            $t("oms.order.delete")
          }}</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">{{
            $t("oms.order.markOrder")
          }}</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">{{ $t("oms.order.baseInfo") }}</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.orderSn")
          }}</el-col>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.deliverySn")
          }}</el-col>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.member")
          }}</el-col>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.payType")
          }}</el-col>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.source")
          }}</el-col>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.orderType")
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ order.orderSn }}</el-col>
          <el-col :span="4" class="table-cell">暂无</el-col>
          <el-col :span="4" class="table-cell">{{
            order.memberUsername
          }}</el-col>
          <el-col :span="4" class="table-cell">{{
            order.payType | formatPayType
          }}</el-col>
          <el-col :span="4" class="table-cell">{{
            order.sourceType | formatSourceType
          }}</el-col>
          <el-col :span="4" class="table-cell">{{
            order.orderType | formatOrderType
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.deliveryMethod")
          }}</el-col>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.logisticsNo")
          }}</el-col>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.autoConfirm")
          }}</el-col>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.integration")
          }}</el-col>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.growth")
          }}</el-col>
          <el-col :span="4" class="table-cell-title">{{
            $t("oms.order.promotionInfo")
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{
            order.deliveryCompany | formatNull
          }}</el-col>
          <el-col :span="4" class="table-cell">{{
            order.deliverySn | formatNull
          }}</el-col>
          <el-col :span="4" class="table-cell"
            >{{ order.autoConfirmDay }}天</el-col
          >
          <el-col :span="4" class="table-cell">{{ order.integration }}</el-col>
          <el-col :span="4" class="table-cell">{{ order.growth }}</el-col>
          <el-col :span="4" class="table-cell">
            <el-popover
              placement="top-start"
              :title="$t('oms.order.promotionInfo')"
              width="200"
              trigger="hover"
              :content="order.promotionInfo"
            >
              <span slot="reference">{{
                order.promotionInfo | formatLongText
              }}</span>
            </el-popover>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">{{ $t("oms.order.receiverInfo") }}</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">{{
            $t("oms.order.receiver")
          }}</el-col>
          <el-col :span="6" class="table-cell-title">{{
            $t("oms.order.phone")
          }}</el-col>
          <el-col :span="6" class="table-cell-title">{{
            $t("oms.order.postcode")
          }}</el-col>
          <el-col :span="6" class="table-cell-title">{{
            $t("oms.order.address")
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{ order.receiverName }}</el-col>
          <el-col :span="6" class="table-cell">{{
            order.receiverPhone
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            order.receiverPostCode
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            order | formatAddress
          }}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">{{ $t("oms.order.productInfo") }}</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="order.orderItemList"
        style="width: 100%;margin-top: 20px"
        border
      >
        <el-table-column
          :label="$t('oms.order.productImage')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="scope.row.productPic" style="height: 80px" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('oms.order.productName')" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.productName }}</p>
            <p>{{ $t("oms.order.brand") }}：{{ scope.row.productBrand }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.priceSn')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{ $t("oms.order.price") }}：￥{{ scope.row.productPrice }}</p>
            <p>{{ $t("oms.order.sku") }}：{{ scope.row.productSn }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.attr')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.productAttr | formatProductAttr }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.quantity')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.productQuantity }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.subtotal')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            ￥{{ scope.row.productPrice * scope.row.productQuantity }}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin: 20px">
        {{ $t("oms.order.totalAmount") }}：<span class="color-danger"
          >￥{{ order.totalAmount }}</span
        >
      </div>
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">{{ $t("oms.order.feeInfo") }}</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >￥{{ order.totalAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >￥{{ order.freightAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.couponAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.integrationAmount }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >-￥{{ order.promotionAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.discountAmount }}</el-col
          >
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{ order.totalAmount + order.freightAmount }}</span
            >
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{
                order.payAmount + order.freightAmount - order.discountAmount
              }}</span
            >
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">{{ $t("oms.order.operationInfo") }}</span>
      </div>
      <el-table
        style="margin-top: 20px;width: 100%"
        ref="orderHistoryTable"
        :data="order.historyList"
        border
      >
        <el-table-column
          :label="$t('oms.order.operator')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.operateMan }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.actionTime')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            {{ formatTime(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.status')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.orderStatus | formatStatus }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.paymentStatus')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.orderStatus | formatPayStatus }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('oms.order.deliveryStatus')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.orderStatus | formatDeliverStatus }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('oms.order.note')" align="center">
          <template slot-scope="scope">
            {{ scope.row.note }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="$t('oms.order.updateReceiver')"
      :visible.sync="receiverDialogVisible"
      width="40%"
    >
      <el-form :model="receiverInfo" ref="receiverInfoForm" label-width="150px">
        <el-form-item :label="$t('oms.order.receiverName') + '：'">
          <el-input
            v-model="receiverInfo.receiverName"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('oms.order.phone') + '：'">
          <el-input v-model="receiverInfo.receiverPhone" style="width: 200px">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('oms.order.postcode') + '：'">
          <el-input
            v-model="receiverInfo.receiverPostCode"
            style="width: 200px"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('oms.order.region') + '：'">
          <v-distpicker
            :province="receiverInfo.receiverProvince"
            :city="receiverInfo.receiverCity"
            :area="receiverInfo.receiverRegion"
            @selected="onSelectRegion"
          ></v-distpicker>
        </el-form-item>
        <el-form-item :label="$t('oms.order.detailAddress') + '：'">
          <el-input
            v-model="receiverInfo.receiverDetailAddress"
            type="textarea"
            rows="3"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="receiverDialogVisible = false">{{
          $t("common.cancel")
        }}</el-button>
        <el-button type="primary" @click="handleUpdateReceiverInfo">{{
          $t("common.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('oms.order.updateFee')"
      :visible.sync="moneyDialogVisible"
      width="40%"
    >
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >￥{{ order.totalAmount }}</el-col
          >
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.freightAmount" size="mini"
              ><template slot="prepend">￥</template></el-input
            >
          </el-col>
          <el-col :span="6" class="table-cell"
            >-￥{{ order.couponAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.integrationAmount }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >-￥{{ order.promotionAmount }}</el-col
          >
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.discountAmount" size="mini"
              ><template slot="prepend">-￥</template></el-input
            >
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{ order.totalAmount + moneyInfo.freightAmount }}</span
            >
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{
                order.payAmount +
                  moneyInfo.freightAmount -
                  moneyInfo.discountAmount
              }}</span
            >
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="moneyDialogVisible = false">{{
          $t("common.cancel")
        }}</el-button>
        <el-button type="primary" @click="handleUpdateMoneyInfo">{{
          $t("common.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('oms.order.sendMessage')"
      :visible.sync="messageDialogVisible"
      width="40%"
    >
      <el-form :model="message" ref="receiverInfoForm" label-width="150px">
        <el-form-item :label="$t('oms.order.title') + '：'">
          <el-input v-model="message.title" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item :label="$t('oms.order.content') + '：'">
          <el-input v-model="message.content" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">{{
          $t("common.cancel")
        }}</el-button>
        <el-button type="primary" @click="handleSendMessage">{{
          $t("common.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('oms.order.closeTitle')"
      :visible.sync="closeDialogVisible"
      width="40%"
    >
      <el-form :model="closeInfo" label-width="150px">
        <el-form-item :label="$t('oms.order.operationNote') + '：'">
          <el-input v-model="closeInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible = false">{{
          $t("common.cancel")
        }}</el-button>
        <el-button type="primary" @click="handleCloseOrder">{{
          $t("common.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('oms.order.markOrder')"
      :visible.sync="markOrderDialogVisible"
      width="40%"
    >
      <el-form :model="markInfo" label-width="150px">
        <el-form-item :label="$t('oms.order.operationNote') + '：'">
          <el-input v-model="markInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">{{
          $t("common.cancel")
        }}</el-button>
        <el-button type="primary" @click="handleMarkOrder">{{
          $t("common.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>
<script>
import {
  getOrderDetail,
  updateReceiverInfo,
  updateMoneyInfo,
  closeOrder,
  updateOrderNote,
  deleteOrder
} from "@/api/order";
import LogisticsDialog from "@/views/oms/order/components/logisticsDialog";
import { formatDate } from "@/utils/date";
import VDistpicker from "v-distpicker";
const defaultReceiverInfo = {
  orderId: null,
  receiverName: null,
  receiverPhone: null,
  receiverPostCode: null,
  receiverDetailAddress: null,
  receiverProvince: null,
  receiverCity: null,
  receiverRegion: null,
  status: null
};
export default {
  name: "orderDetail",
  components: { VDistpicker, LogisticsDialog },
  data() {
    return {
      id: null,
      order: {},
      receiverDialogVisible: false,
      receiverInfo: Object.assign({}, defaultReceiverInfo),
      moneyDialogVisible: false,
      moneyInfo: {
        orderId: null,
        freightAmount: 0,
        discountAmount: 0,
        status: null
      },
      messageDialogVisible: false,
      message: { title: null, content: null },
      closeDialogVisible: false,
      closeInfo: { note: null, id: null },
      markOrderDialogVisible: false,
      markInfo: { note: null },
      logisticsDialogVisible: false
    };
  },
  created() {
    this.id = this.list = this.$route.query.id;
    getOrderDetail(this.id).then(response => {
      this.order = response.data;
    });
  },
  filters: {
    formatNull(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else {
        return value;
      }
    },
    formatLongText(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else if (value.length > 8) {
        return value.substr(0, 8) + "...";
      } else {
        return value;
      }
    },
    formatPayType(value) {
      if (value === 1) {
        return "支付宝";
      } else if (value === 2) {
        return "微信";
      } else {
        return "未支付";
      }
    },
    formatSourceType(value) {
      if (value === 1) {
        return "APP订单";
      } else {
        return "PC订单";
      }
    },
    formatOrderType(value) {
      if (value === 1) {
        return "秒杀订单";
      } else {
        return "正常订单";
      }
    },
    formatAddress(order) {
      let str = order.receiverProvince;
      if (order.receiverCity != null) {
        str += "  " + order.receiverCity;
      }
      str += "  " + order.receiverRegion;
      str += "  " + order.receiverDetailAddress;
      return str;
    },
    formatStatus(value) {
      if (value === 1) {
        return "待发货";
      } else if (value === 2) {
        return "已发货";
      } else if (value === 3) {
        return "已完成";
      } else if (value === 4) {
        return "已关闭";
      } else if (value === 5) {
        return "无效订单";
      } else {
        return "待付款";
      }
    },
    formatPayStatus(value) {
      if (value === 0) {
        return "未支付";
      } else if (value === 4) {
        return "已退款";
      } else {
        return "已支付";
      }
    },
    formatDeliverStatus(value) {
      if (value === 0 || value === 1) {
        return "未发货";
      } else {
        return "已发货";
      }
    },
    formatProductAttr(value) {
      if (value == null) {
        return "";
      } else {
        let attr = JSON.parse(value);
        let result = "";
        for (let i = 0; i < attr.length; i++) {
          result += attr[i].key;
          result += ":";
          result += attr[i].value;
          result += ";";
        }
        return result;
      }
    }
  },
  methods: {
    onSelectRegion(data) {
      this.receiverInfo.receiverProvince = data.province.value;
      this.receiverInfo.receiverCity = data.city.value;
      this.receiverInfo.receiverRegion = data.area.value;
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatStepStatus(value) {
      if (value === 1) {
        //待发货
        return 2;
      } else if (value === 2) {
        //已发货
        return 3;
      } else if (value === 3) {
        //已完成
        return 4;
      } else {
        //待付款、已关闭、无限订单
        return 1;
      }
    },
    showUpdateReceiverDialog() {
      this.receiverDialogVisible = true;
      this.receiverInfo = {
        orderId: this.order.id,
        receiverName: this.order.receiverName,
        receiverPhone: this.order.receiverPhone,
        receiverPostCode: this.order.receiverPostCode,
        receiverDetailAddress: this.order.receiverDetailAddress,
        receiverProvince: this.order.receiverProvince,
        receiverCity: this.order.receiverCity,
        receiverRegion: this.order.receiverRegion,
        status: this.order.status
      };
    },
    handleUpdateReceiverInfo() {
      this.$confirm(
        this.$t("oms.order.updateReceiver"),
        this.$t("common.prompt"),
        {
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning"
        }
      ).then(() => {
        updateReceiverInfo(this.receiverInfo).then(response => {
          this.receiverDialogVisible = false;
          this.$message({
            type: "success",
            message: this.$t("common.updateSuccess")
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    showUpdateMoneyDialog() {
      this.moneyDialogVisible = true;
      this.moneyInfo.orderId = this.order.id;
      this.moneyInfo.freightAmount = this.order.freightAmount;
      this.moneyInfo.discountAmount = this.order.discountAmount;
      this.moneyInfo.status = this.order.status;
    },
    handleUpdateMoneyInfo() {
      this.$confirm(this.$t("oms.order.updateFee"), this.$t("common.prompt"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning"
      }).then(() => {
        updateMoneyInfo(this.moneyInfo).then(response => {
          this.moneyDialogVisible = false;
          this.$message({
            type: "success",
            message: this.$t("common.updateSuccess")
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    showMessageDialog() {
      this.messageDialogVisible = true;
      this.message.title = null;
      this.message.content = null;
    },
    handleSendMessage() {
      this.$confirm(
        this.$t("oms.order.sendMessage"),
        this.$t("common.prompt"),
        {
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning"
        }
      ).then(() => {
        this.messageDialogVisible = false;
        this.$message({
          type: "success",
          message: this.$t("common.updateSuccess")
        });
      });
    },
    showCloseOrderDialog() {
      this.closeDialogVisible = true;
      this.closeInfo.note = null;
      this.closeInfo.id = this.id;
    },
    handleCloseOrder() {
      this.$confirm(this.$t("oms.order.closeTitle"), this.$t("common.prompt"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning"
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", [this.closeInfo.id]);
        params.append("note", this.closeInfo.note);
        closeOrder(params).then(response => {
          this.closeDialogVisible = false;
          this.$message({
            type: "success",
            message: this.$t("oms.order.closeSuccess")
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    showMarkOrderDialog() {
      this.markOrderDialogVisible = true;
      this.markInfo.id = this.id;
      this.closeOrder.note = null;
    },
    handleMarkOrder() {
      this.$confirm(this.$t("oms.order.markOrder"), this.$t("common.prompt"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning"
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id", this.markInfo.id);
        params.append("note", this.markInfo.note);
        params.append("status", this.order.status);
        updateOrderNote(params).then(response => {
          this.markOrderDialogVisible = false;
          this.$message({
            type: "success",
            message: this.$t("common.updateSuccess")
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    handleDeleteOrder() {
      this.$confirm(this.$t("oms.order.delete"), this.$t("common.prompt"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning"
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", [this.id]);
        deleteOrder(params).then(response => {
          this.$message({
            message: this.$t("oms.order.deleteSuccess"),
            type: "success",
            duration: 1000
          });
          this.$router.back();
        });
      });
    },
    showLogisticsDialog() {
      this.logisticsDialogVisible = true;
    }
  }
};
</script>
<style scoped>
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>
