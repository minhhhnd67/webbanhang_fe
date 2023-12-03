<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col style="background-color: #f0e7e3; border-radius: 20px" :span="22">
          <el-row style="padding: 10px" type="flex" justify="center" :gutter="30">
            <el-col :span="3">
              <p><b>Mã đơn hàng</b></p>
            </el-col>
            <el-col :span="6">
              <p><b>Tên sản phẩm</b></p>
            </el-col>
            <el-col :span="3">
              <p><b>Giá</b></p>
            </el-col>
            <el-col :span="2">
              <p><b>Số lượng</b></p>
            </el-col>
            <el-col :span="3">
              <p><b>Tổng tiền</b></p>
            </el-col>
            <el-col :span="3">
              <p><b>Trạng thái</b></p>
            </el-col>
            <el-col :span="1">
              <el-link></el-link>
            </el-col>
          </el-row>
          <el-row style="padding: 10px" type="flex" justify="center" :gutter="30">
            <el-col :span="3">
              <p>OD123456</p>
            </el-col>
            <el-col :span="6">
              <p>Điện thoại iPhone 15 Promax 256GB</p>
              <p>Điện thoại iPhone 15 Promax 256GB</p>
              <p>Điện thoại iPhone 15 Promax 256GB</p>
            </el-col>
            <el-col :span="3">
              <p>32.000.000 đ</p>
              <p>32.000.000 đ</p>
              <p>32.000.000 đ</p>
            </el-col>
            <el-col :span="2">
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </el-col>
            <el-col :span="3">
              <p>68.000.000 đ</p>
            </el-col>
            <el-col :span="3">
              <p>Đang vận chuyển</p>
            </el-col>
            <el-col :span="1">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-edit"
                circle
              ></el-button>
            </el-col>
          </el-row>
          <el-row style="padding: 10px" type="flex" justify="center" :gutter="30">
            <el-col :span="3">
              <p>OD123456</p>
            </el-col>
            <el-col :span="6">
              <p>Điện thoại iPhone 15 Promax 256GB</p>
              <p>Điện thoại iPhone 15 Promax 256GB</p>
              <p>Điện thoại iPhone 15 Promax 256GB</p>
            </el-col>
            <el-col :span="3">
              <p>32.000.000 đ</p>
              <p>32.000.000 đ</p>
              <p>32.000.000 đ</p>
            </el-col>
            <el-col :span="2">
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </el-col>
            <el-col :span="3">
              <p>68.000.000 đ</p>
            </el-col>
            <el-col :span="3">
              <p>Hoàn thành</p>
            </el-col>
            <el-col :span="1">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-edit"
                circle
              ></el-button>
            </el-col>
          </el-row>
          <el-row style="padding: 10px" type="flex" justify="center" :gutter="30">
            <el-col :span="3">
              <p>OD123456</p>
            </el-col>
            <el-col :span="6">
              <p>Điện thoại iPhone 15 Promax 256GB</p>
              <p>Điện thoại iPhone 15 Promax 256GB</p>
              <p>Điện thoại iPhone 15 Promax 256GB</p>
            </el-col>
            <el-col :span="3">
              <p>32.000.000 đ</p>
              <p>32.000.000 đ</p>
              <p>32.000.000 đ</p>
            </el-col>
            <el-col :span="2">
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </el-col>
            <el-col :span="3">
              <p>68.000.000 đ</p>
            </el-col>
            <el-col :span="3">
              <p>Hoàn thành</p>
            </el-col>
            <el-col :span="1">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-edit"
                circle
              ></el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "C-Cart",
};
</script>
