<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px;">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/user1.jpg" alt="">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录的时间：<span>2021-7-19</span></p>
                    <p>上次登录的地点：<span>武汉</span></p>
                </div>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px;height: 360px">
                <template>
                    <!-- <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="name" label="课程" width="180">
                        </el-table-column>
                        <el-table-column prop="todayBuy" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="monthBuy" label="地址">
                        </el-table-column>
                        <el-table-column prop="totalBuy" label="总购买">
                        </el-table-column>
                    </el-table> -->
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val" />
                    </el-table>
                </template>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px;">
            <div class="num">
                <el-card class="box-card" :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData"
                    :key="item.name">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="price">￥{{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card class="box-card" style="height: 280px">
                <!-- 折线图 -->
                <div ref="echarts1" style="height: 280px"></div>
            </el-card>
            <div class="graph">
                <el-card class="box-card">
                    <div ref="echarts2" style="height: 260px"></div>
                </el-card>
                <el-card class="box-card">
                    <div ref="echarts3" style="height: 210px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from '@/api';
import * as echarts from 'echarts'
export default {
    data() {
        return {
            tableLabel: {
                name: "课程",
                todayBuy: "今日购买",
                monthBuy: "本月购买",
                totalBuy: "总购买"
            },
            tableData: [
                // 下面写死的数据不需要了，现在这个数组为空，由axios传mock模拟的数据过来
                // {
                //     name: 'oppo',
                //     todayBuy: 1,
                //     monthBuy: 2,
                //     totalBuy: 3
                // },
                // {
                //     name: 'vivo',
                //     todayBuy: 22,
                //     monthBuy: 33,
                //     totalBuy: 44
                // },
                // {
                //     name: '苹果',
                //     todayBuy: 22,
                //     monthBuy: 333,
                //     totalBuy: 8400
                // },
                // {
                //     name: '小米',
                //     todayBuy: 55,
                //     monthBuy: 22,
                //     totalBuy: 444
                // },
                // {
                //     name: '三星',
                //     todayBuy: 123,
                //     monthBuy: 133,
                //     totalBuy: 144
                // },
                // {
                //     name: '魅族',
                //     todayBuy: 123,
                //     monthBuy: 444,
                //     totalBuy: 555
                // }
            ],
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ]
        }
    },
    //只有tableData是可以写在created周期里的，但是之后的需要创建在DOM元素上，所以要在mounted里，避免同样的部分写两次，就直接都写mounted里了
    mounted() {
        // 解构，{data}带括号的是已经拿到结果下的data那一层了
        getData().then(({ data }) => {

            // ————————————————————————————————————————————————————————
            // ***第一部分tableData表单。用的是elementUI自带的Table表格UI组件(找官网的Table)直接显示
            // console.log(data.data.tableData)
            // 解构，下面（应该是)直接拿到data.data下的tableData一层了,并直接命为可以直接用的tableData
            const { tableData, orderData, userData, videoData } = data.data
            this.tableData = tableData

            // ————————————————————————————————————————————————————————
            // ***第二部分orderData折线图。用的是echarts的方法显示
            // 基于准备好的dom，初始化echarts实例
            const echarts1 = echarts.init(this.$refs.echarts1)
            // 指定图表的配置项和数据
            const echarts1Option = {}
            // 处理数据xAxis
            // console.log(data.data)
            // const { orderData } = data.data
            const xAxis = Object.keys(orderData.data[0])
            // console.log(xAxis)
            const xAxisData = {
                data: xAxis
            }
            // xAxis：x轴
            echarts1Option.xAxis = xAxisData
            echarts1Option.yAxis = {}
            // legend图例
            echarts1Option.legend = xAxisData
            // tooltip提示框
            echarts1Option.tooltip = {}
            echarts1Option.title = { text: '第一数据折线图' }

            // series数据
            echarts1Option.series = []
            xAxis.forEach(key => {
                echarts1Option.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    // line折线图
                    type: 'line'
                })
            })
            // console.log(echarts1Option.series)
            // 使用刚指定的配置项和数据显示图表。
            echarts1.setOption(echarts1Option);

            // ————————————————————————————————————————————————————————
            // ***第三部分userData柱状图。echarts
            // 基于准备好的dom，初始化echarts实例
            const echarts2 = echarts.init(this.$refs.echarts2)
            // 指定图表的配置项和数据
            // console.log(userData)
            const echarts2Option = {
                title: {
                    text: '第二柱状图',
                },
                //提示框
                tooltip: {
                    //有一个竖着的线来引导提示框的显示了
                    trigger: "axis",
                },
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                    data: ['新增用户', '活跃用户']
                },
                //离左侧距离，图表缩小在右边80%里
                grid: {
                    left: "20%",
                },
                xAxis: {
                    type: "category", // 类目轴。但好像默认就是这个
                    data: userData.map(item => item.date),
                    // 图表横轴的颜色改了
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    // 字体颜色又改回黑色
                    axisLabel: {
                        // 每格的宽度。默认为0，图没放大调大这个会出现问题
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: {
                    // y轴也改个颜色，默认type就是value（数值）
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                },
                // 设置了一下柱体的颜色，其实只用到了前两个，后面的是如果加一组数据备用的颜色
                color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                series: [
                    {
                        name: '新增用户',
                        type: 'bar',
                        data: userData.map(item => item.new)
                    },
                    {
                        name: '活跃用户',
                        type: 'bar',
                        data: userData.map(item => item.active)
                    }
                ]
            }
            // 使用刚指定的配置项和数据显示图表。
            echarts2.setOption(echarts2Option);

            // ————————————————————————————————————————————————————————
            // ***第三部分userData柱状图。echarts
            // 基于准备好的dom，初始化echarts实例
            const echarts3 = echarts.init(this.$refs.echarts3)
            // console.log(videoData)
            const echarts3Option = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    },
                ],
            }
            // 使用刚指定的配置项和数据显示图表。
            echarts3.setOption(echarts3Option);
        })
    },
}
</script>
<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 30px;
        color: #fff;
    }

    .detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;

        .price {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }

        .desc {
            font-size: 14px;
            color: #999999;
            text-align: center;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;

    }
}

.graph {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .el-card {
        height: 260px;
        width: 48%;
    }
}
</style>