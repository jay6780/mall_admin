<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
      <el-form-item :label="$t('pms.brand.brandName')" prop="name">
        <el-input v-model="brand.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('pms.brand.firstLetter') + '：'">
        <el-input v-model="brand.firstLetter"></el-input>
      </el-form-item>
      <el-form-item :label="$t('pms.brand.brandLogo')" prop="logo">
        <single-upload v-model="brand.logo"></single-upload>
      </el-form-item>
      <el-form-item :label="$t('pms.brand.bigPic')">
        <single-upload v-model="brand.bigPic"></single-upload>
      </el-form-item>
      <el-form-item :label="$t('pms.brand.brandStory')">
        <el-input
          :placeholder="$t('pms.brand.placeholderContent')"
          type="textarea"
          v-model="brand.brandStory"
          :autosize="true"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('pms.brand.sort') + '：'" prop="sort">
        <el-input v-model.number="brand.sort"></el-input>
      </el-form-item>
      <el-form-item :label="$t('pms.brand.show') + '：'">
        <el-radio-group v-model="brand.showStatus">
          <el-radio :label="1">{{ $t("common.yes") }}</el-radio>
          <el-radio :label="0">{{ $t("common.no") }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('pms.brand.factory') + '：'">
        <el-radio-group v-model="brand.factoryStatus">
          <el-radio :label="1">{{ $t("common.yes") }}</el-radio>
          <el-radio :label="0">{{ $t("common.no") }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandFrom')">{{
          $t("common.submit")
        }}</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandFrom')">{{
          $t("common.reset")
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { createBrand, getBrand, updateBrand } from "@/api/brand";
import SingleUpload from "@/components/Upload/singleUpload";
const defaultBrand = {
  bigPic: "",
  brandStory: "",
  factoryStatus: 0,
  firstLetter: "",
  logo: "",
  name: "",
  showStatus: 0,
  sort: 0
};
export default {
  name: "BrandDetail",
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      brand: Object.assign({}, defaultBrand),
      rules: {
        name: [
          {
            required: true,
            message: this.$t("pms.brand.nameRequired"),
            trigger: "blur"
          },
          {
            min: 2,
            max: 140,
            message: this.$t("pms.brand.nameLength"),
            trigger: "blur"
          }
        ],
        logo: [
          {
            required: true,
            message: this.$t("pms.brand.logoRequired"),
            trigger: "blur"
          }
        ],
        sort: [{ type: "number", message: this.$t("pms.brand.sortNumber") }]
      }
    };
  },
  created() {
    if (this.isEdit) {
      getBrand(this.$route.query.id).then(response => {
        this.brand = response.data;
      });
    } else {
      this.brand = Object.assign({}, defaultBrand);
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm(
            this.$t("pms.brand.submitConfirm"),
            this.$t("pms.brand.prompt"),
            {
              confirmButtonText: this.$t("common.confirm"),
              cancelButtonText: this.$t("common.cancel"),
              type: "warning"
            }
          ).then(() => {
            if (this.isEdit) {
              updateBrand(this.$route.query.id, this.brand).then(response => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: this.$t("pms.brand.updateSuccess"),
                  type: "success",
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createBrand(this.brand).then(response => {
                this.$refs[formName].resetFields();
                this.brand = Object.assign({}, defaultBrand);
                this.$message({
                  message: this.$t("pms.brand.submitSuccess"),
                  type: "success",
                  duration: 1000
                });
              });
            }
          });
        } else {
          this.$message({
            message: this.$t("pms.brand.validateFail"),
            type: "error",
            duration: 1000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.brand = Object.assign({}, defaultBrand);
    }
  }
};
</script>
<style></style>
