<template>
    <div class="template-dashboard">
        <div class="page-header">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 class="page-title">
                        Overview
                    </h2>
                </div>
            </div>
            <div class="row row-dashboard">
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="box-dashboard">
                        <div class="box-content">
                            <div class="img-icon">
                                <img
                                    src="/images/img-article.svg"
                                    alt="dashboard"
                                    class="box-img"
                                >
                            </div>
                            <h3 class="box-title">
                                Post
                            </h3>
                            <p class="box-info">
                                {{ totalPosts }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="box-dashboard">
                        <div class="box-content">
                            <div class="img-icon">
                                <img
                                    src="/images/img-product.svg"
                                    alt="dashboard"
                                    class="box-img"
                                >
                            </div>
                            <h3 class="box-title">
                                Product
                            </h3>
                            <p class="box-info">
                                {{ totalProducts }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="box-dashboard">
                        <div class="box-content">
                            <div class="img-icon">
                                <img
                                    src="/images/img-product.svg"
                                    alt="dashboard"
                                    class="box-img"
                                >
                            </div>
                            <h3 class="box-title">
                                Provider
                            </h3>
                            <p class="box-info">
                                {{ totalProviders }}
                            </p>
                        </div>
                    </div>
                </div> -->
                <!-- <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="box-dashboard">
                        <div class="box-content">
                            <div class="img-icon">
                                <img
                                    src="/images/img-member.svg"
                                    alt="dashboard"
                                    class="box-img"
                                >
                            </div>
                            <h3 class="box-title">
                                User
                            </h3>
                            <p class="box-info">
                                20 Users
                            </p>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <!-- <div class="page-body">
            <div class="title-page">
                <h3 class="chart-title">
                    Site Analytics
                </h3>
            </div>
            <div class="box-chart">
                <div class="row align-items-center mb-4">
                    <div class="col-lg-4 col-md-4 col-sm-12">
                        <h3 class="chart-info">
                            Vist site last 30 days
                        </h3>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-12 text-right">
                        <ul class="tab-select">
                            <li class="tab-option active">
                                30 Days
                            </li>
                            <li class="tab-option">
                                60 Days
                            </li>
                            <li
                                class="tab-option"
                            >
                                90 Days
                            </li>
                        </ul>
                    </div>
                </div>
                <no-ssr>
                    <line-chart
                        ref="chartDashboard"
                        :height="342"
                        :data="lineData"
                        :options="options"
                    />
                </no-ssr>
            </div>
        </div> -->
    </div>
</template>

<script>
import{mapGetters, mapActions}from"vuex";

export default{
    middleware:['authentication'],
    data() {
        return{
            lineData:{},
            options:{},
            totalPosts:0,
            totalProducts:0,
            totalProviders:0
        };
    },
    async created() {
    },
    mounted() {
        this.lineData = {
            labels:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets:[
                {
                    label:"Data",
                    backgroundColor:"linear-gradient(135deg, #1145c9 0%, #3bab9a 56%, #f2ffe3 100%)",
                    borderColor:"#80b6f4",
                    pointBorderColor:"transparent",
                    pointBackgroundColor:"transparent",
                    pointHoverBackgroundColor:"#1145c9",
                    pointHoverBorderColor:"#fff",
                    pointHoverBorderWidth:2,
                    pointHoverRadius:10,
                    pointRadius:3,
                    borderWidth:4,
                    data:[100, 70, 150, 100, 180, 120, 160]
                }
            ]
        },
        this.options = {
            responsive:true,
            maintainAspectRatio:false,
            legend:{
                labels:{
                    fontColor:'#4c4e51',
                    padding:20,
                    usePointStyle:false,
                    fontSize:12,
                }
            },
            scales:{
                xAxes:[{
                    gridLines:{
                        display:true,
                        offsetGridLines:true,
                    },
                }],
                yAxes:[{
                    gridLines:{
                        drawBorder:true,
                        zeroLineColor:'#dadada',
                    },
                    ticks:{
                        fontColor:'#485465',
                        fontSize:13,
                        fontStyle:'bold',
                        suggestedMin:0,
                        callback:function(value, index, values) {
                            return value.toString().split(/(?=(?:...)*$)/).join(',');
                        }
                    },
                }]
            },
            tooltips:{
                displayColors:false,
                xPadding:20,
                yPadding:10,
                backgroundColor:'#4a5d6e',
                titleFontSize:14,
                titleFontStyle:'normal',
                titleFontColor:'rgba(255, 255, 255, 0.9)',
                bodyFontSize:14,
                bodyFontStyle:'normal',
                bodyFontColor:'rgba(255, 255, 255, 0.9)',
                callbacks:{
                    title:function(tooltipItem, data) {
                        return'Date: ' + data.datasets[tooltipItem[0].datasetIndex].label;
                    },
                    label:function(tooltipItem, data) {
                        return'Visitor: ' + tooltipItem.yLabel.toString().split(/(?=(?:...)*$)/).join(',');
                    }
                },
            }
        };
    },
    methods:{
        ...mapActions('blog',['findBlogs'])
    }
};
</script>

