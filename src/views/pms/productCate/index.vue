<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">{{ $t("common.list") }}</span>
      <el-button class="btn-add" @click="handleAddProductCate()" size="mini">
        {{ $t("common.add") }}
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productCateTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <el-table-column :label="$t('common.no')" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('productCate.name')" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('productCate.level')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{
            getLevelLabel(scope.row.level)
          }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('productCate.productCount')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.productCount }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('productCate.unit')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.productUnit }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('productCate.nav')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="handleNavStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.navStatus"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('productCate.show')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('productCate.sort')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('productCate.setting')"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.level | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)"
              >{{ $t("productCate.viewNext") }}
            </el-button>
            <el-button
              size="mini"
              @click="handleTransferProduct(scope.$index, scope.row)"
              >{{ $t("productCate.transferProduct") }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('productCate.operate')"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)"
              >{{ $t("common.edit") }}
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >{{ $t("common.delete") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
import {
  fetchList,
  deleteProductCate,
  updateShowStatus,
  updateNavStatus
} from "@/api/productCate";

export default {
  name: "productCateList",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 5
      },
      parentId: 0
    };
  },
  created() {
    this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods: {
    resetParentId() {
      this.listQuery.pageNum = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleAddProductCate() {
      this.$router.push("/pms/addProductCate");
    },
    getList() {
      this.listLoading = true;
      fetchList(this.parentId, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
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
    handleNavStatusChange(index, row) {
      let data = new URLSearchParams();
      let ids = [];
      ids.push(row.id);
      data.append("ids", ids);
      data.append("navStatus", row.navStatus);
      updateNavStatus(data).then(response => {
        this.$message({
          message: this.$t
            ? this.$t("common.updateSuccess")
            : "Updated successfully",
          type: "success",
          duration: 1000
        });
      });
    },
    handleShowStatusChange(index, row) {
      let data = new URLSearchParams();
      let ids = [];
      ids.push(row.id);
      data.append("ids", ids);
      data.append("showStatus", row.showStatus);
      updateShowStatus(data).then(response => {
        this.$message({
          message: this.$t
            ? this.$t("common.updateSuccess")
            : "Updated successfully",
          type: "success",
          duration: 1000
        });
      });
    },
    handleShowNextLevel(index, row) {
      this.$router.push({
        path: "/pms/productCate",
        query: { parentId: row.id }
      });
    },
    handleTransferProduct(index, row) {
      console.log("handleAddProductCate");
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/pms/updateProductCate",
        query: { id: row.id }
      });
    },
    handleDelete(index, row) {
      this.$confirm(
        this.$t("productCate.confirmDelete"),
        this.$t("common.prompt"),
        {
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning"
        }
      ).then(() => {
        deleteProductCate(row.id).then(response => {
          this.$message({
            message: this.$t("productCate.deleteSuccess"),
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    }
  },
  methods: {
    getLevelLabel(value) {
      if (value === 0) {
        return this.$t("productCate.levelOne");
      } else if (value === 1) {
        return this.$t("productCate.levelTwo");
      }
      return "";
    }
  },
  filters: {
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped></style>
