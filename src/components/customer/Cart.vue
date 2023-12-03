<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col
          style="background-color: #f0e7e3; border-radius: 20px"
          :span="22"
        >
          <el-row style="padding: 10px" type="flex" justify="center" :gutter="30">
            <el-col :span="2">
              <p><b>Ảnh</b></p>
            </el-col>
            <el-col :span="3">
              <p><b>Mã sản phẩm</b></p>
            </el-col>
            <el-col :span="4">
              <p><b>Tên sản phẩm</b></p>
            </el-col>
            <el-col :span="4">
              <p><b>Sku</b></p>
            </el-col>
            <el-col :span="3">
              <p><b>Giá</b></p>
            </el-col>
            <el-col :span="4">
              <p><b>Số lượng</b></p>
            </el-col>
            <el-col :span="1">
              <el-link></el-link>
            </el-col>
          </el-row>
          <el-row style="padding: 10px" type="flex" justify="center" :gutter="20">
            <el-col :span="2">
              <img
                style="width: 100%"
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              />
            </el-col>
            <el-col :span="3"> VS022345 </el-col>
            <el-col :span="4"> Đồng hồ FOSSIL 40 mm Nam FS5919 </el-col>
            <el-col :span="4"> Màu: nâu, Loại dây: Dây da, </el-col>
            <el-col :span="3"> 13.000.000đ </el-col>
            <el-col :span="4">
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                :max="10"
              ></el-input-number>
            </el-col>
            <el-col :span="1">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-col>
          </el-row>
          <el-row style="padding: 10px" type="flex" justify="center" :gutter="20">
            <el-col :span="2">
              <img
                style="width: 100%"
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              />
            </el-col>
            <el-col :span="3"> VS022345 </el-col>
            <el-col :span="4"> Đồng hồ FOSSIL 40 mm Nam FS5919 </el-col>
            <el-col :span="4"> Màu: nâu, Loại dây: Dây da, </el-col>
            <el-col :span="3"> 13.000.000đ </el-col>
            <el-col :span="4">
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                :max="10"
              ></el-input-number>
            </el-col>
            <el-col :span="1">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-col>
          </el-row>
          <el-row style="padding: 10px" type="flex" justify="center" :gutter="20">
            <el-col :span="2">
              <img
                style="width: 100%"
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              />
            </el-col>
            <el-col :span="3"> VS022345 </el-col>
            <el-col :span="4"> Đồng hồ FOSSIL 40 mm Nam FS5919 </el-col>
            <el-col :span="4"> Màu: nâu, Loại dây: Dây da, </el-col>
            <el-col :span="3"> 13.000.000đ </el-col>
            <el-col :span="4">
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                :max="10"
              ></el-input-number>
            </el-col>
            <el-col :span="1">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-col>
          </el-row>

          <!-- total money -->
          <el-row
            style="padding: 20px 10px; margin-top: 0px"
            type="flex"
            justify="center"
            :gutter="20"
          >
            <el-col :span="2">
              <el-link></el-link>
            </el-col>
            <el-col :span="3">
              <el-link></el-link>
            </el-col>
            <el-col :span="4">
              <el-link></el-link>
            </el-col>
            <el-col :span="4">
              <p><b>Tổng tiền</b></p>
            </el-col>
            <el-col :span="3">
              <p style="color: #ff5100"><b>68.000.000đ</b></p>
            </el-col>
            <el-col :span="4">
              <el-link></el-link>
            </el-col>
          </el-row>

          <!-- customer info -->
          <el-row
            style="padding: 30px 10px; margin-top: 0px"
            type="flex"
            justify="center"
          >
            <el-col :span="6">
              <h3>Thông tin mua hàng</h3>
            </el-col>
            <el-col :span="16">
              <el-row style="margin-top: 20px;">
                <el-col :span="10">
                  <el-input placeholder="Họ tên" v-model="input1">
                    <template slot="prepend">Họ tên</template>
                  </el-input>
                </el-col>
                <el-col :span="1">
                  <el-link></el-link>
                </el-col>
                <el-col :span="10">
                  <el-input placeholder="Số điện thoại" v-model="input1">
                    <template slot="prepend">Số điện thoại</template>
                  </el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="21" style="width: 100%;">
                  <el-select v-model="value" filterable placeholder="Tỉnh / Thành phố">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="21" style="width: 100%;">
                  <el-select v-model="value" filterable placeholder="Quận / Huyện">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="21" style="width: 100%;">
                  <el-select v-model="value" filterable placeholder="Xã / Phường">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="21">
                  <el-input placeholder="Địa chỉ chi tiết" v-model="input1">
                    <template slot="prepend">Địa chỉ chi tiết</template>
                  </el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="21">
                  <el-input placeholder="Ghi chú (Nếu có)" v-model="input1">
                    <template slot="prepend">Ghi chú</template>
                  </el-input>
                </el-col>
              </el-row>

              <!-- Button buy -->
              <el-row style="margin-top: 50px;">
                <el-col :span="21">
                  <el-button style="width: 100%; background-color: #ff5100; color: #ffffff;">Đặt hàng</el-button>
                </el-col>
              </el-row>
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
  data() {
    return {
      src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      radio2: "",
      radio3: "",
      num: 1,
      options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: ''
    };
  },
};
</script>
