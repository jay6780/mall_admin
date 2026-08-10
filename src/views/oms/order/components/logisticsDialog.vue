<template>
  <el-dialog
    :title="$t('oms.order.trackingTitle')"
    :visible.sync="visible"
    :before-close="handleClose"
    width="40%"
  >
    <el-steps
      direction="vertical"
      :active="6"
      finish-status="success"
      space="50px"
    >
      <el-step
        v-for="item in logisticsList"
        :key="item.name"
        :title="item.name"
        :description="item.time"
      ></el-step>
    </el-steps>
  </el-dialog>
</template>
<script>
const defaultLogisticsList = [
  { nameKey: "oms.order.logisticsSubmitted", time: "2017-04-01 12:00:00 " },
  {
    nameKey: "oms.order.logisticsPaymentSuccess",
    time: "2017-04-01 12:00:00 "
  },
  {
    nameKey: "oms.order.logisticsScanningBeijing",
    time: "2017-04-01 12:00:00 "
  },
  {
    nameKey: "oms.order.logisticsScanningShenzhen",
    time: "2017-04-01 12:00:00 "
  },
  {
    nameKey: "oms.order.logisticsDepartedShenzhen",
    time: "2017-04-01 12:00:00 "
  },
  {
    nameKey: "oms.order.logisticsArrivedShenzhen",
    time: "2017-04-01 12:00:00 "
  },
  { nameKey: "oms.order.logisticsSigned", time: "2017-04-01 12:00:00 " }
];
export default {
  name: "logisticsDialog",
  props: {
    value: Boolean
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(visible) {
        this.value = visible;
      }
    }
  },
  data() {
    return {
      logisticsList: defaultLogisticsList.map(item => ({
        ...item,
        name: this.$t(item.nameKey)
      }))
    };
  },
  methods: {
    emitInput(val) {
      this.$emit("input", val);
    },
    handleClose() {
      this.emitInput(false);
    }
  }
};
</script>
<style></style>
