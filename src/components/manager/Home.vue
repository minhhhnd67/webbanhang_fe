<template>
  <el-container>
    <el-main style="color: #606266;">
      <el-row>
        <el-col :span="6">
          <div class="block">
            <span class="demonstration">Từ ngày</span>
            <el-date-picker
              v-model="start_date"
              type="date"
              placeholder="Pick a day">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="block">
            <span class="demonstration">Đến ngày</span>
            <el-date-picker
              v-model="end_date"
              type="date"
              placeholder="Pick a day">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="5" style="text-align: center;">
          <h3>Tổng số đơn hàng</h3> 
          <h2>{{ dataTotal.total_orders }}</h2>
        </el-col>
        <el-col :span="5" style="text-align: center;">
          <h3>Đơn hàng online</h3>
          <h2>{{ dataTotal.total_order_online }}</h2>
        </el-col>
        <el-col :span="5" style="text-align: center;">
          <h3>Đơn hàng offline</h3>
          <h2>{{ dataTotal.total_order_offline }}</h2>
        </el-col>
      </el-row> 
      <!-- <LineChart/> -->
      <LineChartGenerator
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
    </el-main>
  </el-container>
</template>

<script>
// import LineChart from '@/components/manager/charts/Line.vue';
import { getTotalOrderByDate, getDataForLineChart } from '@/api/manager/statistic.js';
import { Line as LineChartGenerator } from 'vue-chartjs/legacy';
import store from "@/store";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: "M-Helloword",
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      store_id: "",
      start_date: "",
      end_date: "",
      dataTotal: {
        total_orders: 0,
        total_order_offline: 0,
        total_order_online: 0,
      },
      datasets: [],
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: "Tổng số đơn hàng",
            backgroundColor: '#11ff00',
            borderColor: "#11ff00",
            data: [40, 39, 50, 40, 39, 80, 40]
          },
          {
            label: "Đơn hàng online",
            backgroundColor: '#ffe100',
            borderColor: "#ffe100",
            data: [14, 24, 24, 36, 22, 55, 16]
          },
          {
            label: "Đơn hàng offline",
            backgroundColor: '#ff4000',
            borderColor: "#ff4000",
            data: [26, 15, 16, 16, 18, 35, 24]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  watch: {
    "start_date": {
      handler: function () {
        this.totalOrderByDate();
        this.dataForLineChart();
      },
      deep: false,
    },
    "end_date": {
      handler: function () {
        this.totalOrderByDate();
        this.dataForLineChart();
      },
      deep: false,
    },
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  created() {
    this.store_id = store.state.mUser.store_id;

    // get end date
    let currentDate = new Date();
    this.end_date = currentDate.toISOString().slice(0, 10);

    // get start date
    const today = new Date();
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(today.getDate() - 20);
    this.start_date = fourDaysAgo.toISOString().slice(0, 10);

    // get data total
    this.totalOrderByDate();

    // get data for line chart
    this.dataForLineChart();
  },
  methods: {
    async totalOrderByDate() {
      let parameters = {
        store_id: this.store_id,
        start_date: new Date(this.start_date).toISOString().slice(0, 10),
        end_date: new Date(this.end_date).toISOString().slice(0, 10),
      };
      const response = await getTotalOrderByDate(parameters);
      if (response.data.code == 200) {
        this.dataTotal.total_orders = response.data.data.total_orders;
        this.dataTotal.total_order_offline = response.data.data.total_order_offline;
        this.dataTotal.total_order_online = response.data.data.total_order_online;
      }
    },
    async dataForLineChart() {
      let parameters = {
        store_id: this.store_id,
        start_date: new Date(this.start_date).toISOString().slice(0, 10),
        end_date: new Date(this.end_date).toISOString().slice(0, 10),
      };
      const response = await getDataForLineChart(parameters);
      if (response.data.code == 200) {
        this.chartData.labels = response.data.data.labels;
        this.chartData.datasets[0].data = response.data.data.data_total_order;
        this.chartData.datasets[1].data = response.data.data.data_order_online;
        this.chartData.datasets[2].data = response.data.data.data_order_offline;

      }
    },

  },
};
</script>
