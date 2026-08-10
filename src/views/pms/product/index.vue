<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div class="filter-header">
        <div class="filter-title">
          <i class="el-icon-search"></i>
          <span>{{ $t("pms.product.filterSearch") }}</span>
        </div>
        <div class="filter-actions">
          <el-button @click="handleResetSearch()" size="small">
            {{ $t("pms.product.reset") }}
          </el-button>
          <el-button @click="handleSearchList()" type="primary" size="small">
            {{ $t("pms.product.search") }}
          </el-button>
        </div>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item :label="$t('pms.product.inputSearch')">
            <el-input
              style="width: 203px"
              v-model="listQuery.keyword"
              :placeholder="$t('pms.product.namePlaceholder')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('pms.product.productSn') + '：'">
            <el-input
              style="width: 203px"
              v-model="listQuery.productSn"
              :placeholder="$t('pms.product.searchPlaceholder')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('pms.product.productCategory') + '：'">
            <el-cascader
              clearable
              v-model="selectProductCateValue"
              :options="productCateOptions"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item :label="$t('pms.product.productBrand') + '：'">
            <el-select
              v-model="listQuery.brandId"
              :placeholder="$t('pms.product.chooseBrand')"
              clearable
            >
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('pms.product.publishStatusLabel')">
            <el-select
              v-model="listQuery.publishStatus"
              :placeholder="$t('common.all')"
              clearable
            >
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('pms.product.verifyStatus') + '：'">
            <el-select
              v-model="listQuery.verifyStatus"
              :placeholder="$t('common.all')"
              clearable
            >
              <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>{{ $t("pms.product.dataList") }}</span>
      <el-button class="btn-add" @click="handleAddProduct()" size="mini">
        {{ $t("pms.product.add") }}
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('pms.product.no')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.image')"
          width="120"
          align="center"
        >
          <template slot-scope="scope"
            ><img style="height: 80px" :src="scope.row.pic"
          /></template>
        </el-table-column>
        <el-table-column :label="$t('pms.product.name')" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
            <p>{{ $t("pms.product.brand") }}：{{ scope.row.brandName }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.priceSn')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{ $t("pms.product.price") }}：￥{{ scope.row.price }}</p>
            <p>{{ $t("pms.product.productSn") }}：{{ scope.row.productSn }}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.tag')"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            <p>
              {{ $t("pms.product.publish") }}：
              <el-switch
                @change="handlePublishStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.publishStatus"
              >
              </el-switch>
            </p>
            <p>
              {{ $t("pms.product.new") }}：
              <el-switch
                @change="handleNewStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.newStatus"
              >
              </el-switch>
            </p>
            <p>
              {{ $t("pms.product.recommend") }}：
              <el-switch
                @change="handleRecommendStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.recommandStatus"
              >
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.sort')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.stock')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleShowSkuEditDialog(scope.$index, scope.row)"
              circle
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.sales')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.sale }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.verifyStatus')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{ verifyStatusText(scope.row.verifyStatus) }}</p>
            <p>
              <el-button
                type="text"
                @click="handleShowVerifyDetail(scope.$index, scope.row)"
                >{{ $t("pms.product.verifyDetail") }}
              </el-button>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.operate')"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShowProduct(scope.$index, scope.row)"
                >{{ $t("pms.product.view") }}
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)"
                >{{ $t("pms.product.edit") }}
              </el-button>
            </p>
            <p>
              <el-button
                size="mini"
                @click="handleShowLog(scope.$index, scope.row)"
                >{{ $t("pms.product.log") }}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >{{ $t("pms.product.delete") }}
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType"
        :placeholder="$t('pms.product.batch')"
      >
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >
        {{ $t("pms.product.confirm") }}
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="$t('pms.product.skuTitle')"
      :visible.sync="editSkuInfo.dialogVisible"
      width="40%"
    >
      <span>{{ $t("pms.product.productSn") }}：</span>
      <span>{{ editSkuInfo.productSn }}</span>
      <el-input
        :placeholder="$t('pms.product.skuSearchPlaceholder')"
        v-model="editSkuInfo.keyword"
        size="small"
        style="width: 50%;margin-left: 20px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearchEditSku"
        ></el-button>
      </el-input>
      <el-table
        style="width: 100%;margin-top: 20px"
        :data="editSkuInfo.stockList"
        border
      >
        <el-table-column :label="$t('pms.product.skuCode')" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in editSkuInfo.productAttr"
          :label="item.name"
          :key="item.id"
          align="center"
        >
          <template slot-scope="scope">
            {{ getProductSkuSp(scope.row, index) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.salesPrice')"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.stockQty')"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('pms.product.lowStock')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">{{
          $t("common.cancel")
        }}</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm">{{
          $t("common.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  updateDeleteStatus,
  updateNewStatus,
  updateRecommendStatus,
  updatePublishStatus
} from "@/api/product";
import {
  fetchList as fetchSkuStockList,
  update as updateSkuStockList
} from "@/api/skuStock";
import { fetchList as fetchProductAttrList } from "@/api/productAttr";
import { fetchList as fetchBrandList } from "@/api/brand";
import { fetchListWithChildren } from "@/api/productCate";

const defaultListQuery = {
  keyword: null,
  pageNum: 1,
  pageSize: 5,
  publishStatus: null,
  verifyStatus: null,
  productSn: null,
  productCategoryId: null,
  brandId: null
};
export default {
  name: "productList",
  data() {
    return {
      editSkuInfo: {
        dialogVisible: false,
        productId: null,
        productSn: "",
        productAttributeCategoryId: null,
        stockList: [],
        productAttr: [],
        keyword: null
      },
      operates: [
        {
          label: this.$t("pms.product.publishOn"),
          value: "publishOn"
        },
        {
          label: this.$t("pms.product.publishOff"),
          value: "publishOff"
        },
        {
          label: this.$t("pms.product.recommendOn"),
          value: "recommendOn"
        },
        {
          label: this.$t("pms.product.recommendOff"),
          value: "recommendOff"
        },
        {
          label: this.$t("pms.product.newOn"),
          value: "newOn"
        },
        {
          label: this.$t("pms.product.newOff"),
          value: "newOff"
        },
        {
          label: this.$t("pms.product.transferCategory"),
          value: "transferCategory"
        },
        {
          label: this.$t("pms.product.recycle"),
          value: "recycle"
        }
      ],
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      selectProductCateValue: null,
      multipleSelection: [],
      productCateOptions: [],
      brandOptions: [],
      publishStatusOptions: [
        {
          value: 1,
          label: this.$t("pms.product.onShelf")
        },
        {
          value: 0,
          label: this.$t("pms.product.offShelf")
        }
      ],
      verifyStatusOptions: [
        {
          value: 1,
          label: this.$t("pms.product.verified")
        },
        {
          value: 0,
          label: this.$t("pms.product.unverified")
        }
      ]
    };
  },
  created() {
    this.getList();
    this.getBrandList();
    this.getProductCateList();
  },
  watch: {
    selectProductCateValue: function(newValue) {
      if (newValue != null && newValue.length == 2) {
        this.listQuery.productCategoryId = newValue[1];
      } else {
        this.listQuery.productCategoryId = null;
      }
    }
  },
  methods: {
    verifyStatusText(value) {
      if (value === 1) {
        return this.$t("pms.product.verified");
      } else {
        return this.$t("pms.product.unverified");
      }
    },
    getProductSkuSp(row, index) {
      let spData = JSON.parse(row.spData);
      if (spData != null && index < spData.length) {
        return spData[index].value;
      } else {
        return null;
      }
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    getBrandList() {
      fetchBrandList({ pageNum: 1, pageSize: 100 }).then(response => {
        this.brandOptions = [];
        let brandList = response.data.list;
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({
            label: brandList[i].name,
            value: brandList[i].id
          });
        }
      });
    },
    getProductCateList() {
      fetchListWithChildren().then(response => {
        let list = response.data;
        this.productCateOptions = [];
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({
                label: list[i].children[j].name,
                value: list[i].children[j].id
              });
            }
          }
          this.productCateOptions.push({
            label: list[i].name,
            value: list[i].id,
            children: children
          });
        }
      });
    },
    handleShowSkuEditDialog(index, row) {
      this.editSkuInfo.dialogVisible = true;
      this.editSkuInfo.productId = row.id;
      this.editSkuInfo.productSn = row.productSn;
      this.editSkuInfo.productAttributeCategoryId =
        row.productAttributeCategoryId;
      this.editSkuInfo.keyword = null;
      fetchSkuStockList(row.id, { keyword: this.editSkuInfo.keyword }).then(
        response => {
          this.editSkuInfo.stockList = response.data;
        }
      );
      if (row.productAttributeCategoryId != null) {
        fetchProductAttrList(row.productAttributeCategoryId, { type: 0 }).then(
          response => {
            this.editSkuInfo.productAttr = response.data.list;
          }
        );
      }
    },
    handleSearchEditSku() {
      fetchSkuStockList(this.editSkuInfo.productId, {
        keyword: this.editSkuInfo.keyword
      }).then(response => {
        this.editSkuInfo.stockList = response.data;
      });
    },
    handleEditSkuConfirm() {
      if (
        this.editSkuInfo.stockList == null ||
        this.editSkuInfo.stockList.length <= 0
      ) {
        this.$message({
          message: this.$t("pms.product.noSkuInfo"),
          type: "warning",
          duration: 1000
        });
        return;
      }
      this.$confirm(
        this.$t("pms.product.modifyConfirm"),
        this.$t("common.prompt"),
        {
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning"
        }
      ).then(() => {
        updateSkuStockList(
          this.editSkuInfo.productId,
          this.editSkuInfo.stockList
        ).then(response => {
          this.$message({
            message: this.$t("common.updateSuccess"),
            type: "success",
            duration: 1000
          });
          this.editSkuInfo.dialogVisible = false;
        });
      });
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleAddProduct() {
      this.$router.push({ path: "/pms/addProduct" });
    },
    handleBatchOperate() {
      if (this.operateType == null) {
        this.$message({
          message: this.$t("pms.product.selectOperateType"),
          type: "warning",
          duration: 1000
        });
        return;
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: this.$t("pms.product.selectProductToOperate"),
          type: "warning",
          duration: 1000
        });
        return;
      }
      this.$confirm(
        this.$t("pms.product.batchConfirm"),
        this.$t("common.prompt"),
        {
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning"
        }
      ).then(() => {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.updatePublishStatus(1, ids);
            break;
          case this.operates[1].value:
            this.updatePublishStatus(0, ids);
            break;
          case this.operates[2].value:
            this.updateRecommendStatus(1, ids);
            break;
          case this.operates[3].value:
            this.updateRecommendStatus(0, ids);
            break;
          case this.operates[4].value:
            this.updateNewStatus(1, ids);
            break;
          case this.operates[5].value:
            this.updateNewStatus(0, ids);
            break;
          case this.operates[6].value:
            break;
          case this.operates[7].value:
            this.updateDeleteStatus(1, ids);
            break;
          default:
            break;
        }
        this.getList();
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePublishStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updatePublishStatus(row.publishStatus, ids);
    },
    handleNewStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateNewStatus(row.newStatus, ids);
    },
    handleRecommendStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateRecommendStatus(row.recommandStatus, ids);
    },
    handleResetSearch() {
      this.selectProductCateValue = [];
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleDelete(index, row) {
      this.$confirm(
        this.$t("pms.product.deleteConfirmProduct"),
        this.$t("common.prompt"),
        {
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning"
        }
      ).then(() => {
        let ids = [];
        ids.push(row.id);
        this.updateDeleteStatus(1, ids);
      });
    },
    handleUpdateProduct(index, row) {
      this.$router.push({ path: "/pms/updateProduct", query: { id: row.id } });
    },
    handleShowProduct(index, row) {
      console.log("handleShowProduct", row);
    },
    handleShowVerifyDetail(index, row) {
      console.log("handleShowVerifyDetail", row);
    },
    handleShowLog(index, row) {
      console.log("handleShowLog", row);
    },
    updatePublishStatus(publishStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("publishStatus", publishStatus);
      updatePublishStatus(params).then(response => {
        this.$message({
          message: this.$t("common.updateSuccess"),
          type: "success",
          duration: 1000
        });
      });
    },
    updateNewStatus(newStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("newStatus", newStatus);
      updateNewStatus(params).then(response => {
        this.$message({
          message: this.$t("common.updateSuccess"),
          type: "success",
          duration: 1000
        });
      });
    },
    updateRecommendStatus(recommendStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("recommendStatus", recommendStatus);
      updateRecommendStatus(params).then(response => {
        this.$message({
          message: this.$t("common.updateSuccess"),
          type: "success",
          duration: 1000
        });
      });
    },
    updateDeleteStatus(deleteStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("deleteStatus", deleteStatus);
      updateDeleteStatus(params).then(response => {
        this.$message({
          message: this.$t("common.deleteSuccess"),
          type: "success",
          duration: 1000
        });
      });
      this.getList();
    }
  }
};
</script>
<style scoped>
.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.filter-title {
  display: flex;
  align-items: center;
}
.filter-title span {
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
}
.filter-actions {
  display: flex;
  gap: 12px;
}
</style>
