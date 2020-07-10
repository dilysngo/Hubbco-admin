import Vue from'vue';
import{Line}from'vue-chartjs';
Vue.component('line-chart', {
    extends:Line,
    props:{
        data:{
            type:Object,
            default:null
        },
        options:{
            type:Object,
            default:null
        },
        colorGradient:{
            type:Boolean,
            default:false
        }
    },
    mounted() {
        if(!this.colorGradient) {
            let gradientStroke = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 1500, 0);
            gradientStroke.addColorStop(0, "#0052fb");
            gradientStroke.addColorStop(0.5, "#469dc1");
            gradientStroke.addColorStop(1, "#a3ff75");
            let gradientBg = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 1500, 0);
            gradientBg.addColorStop(0, "rgba(17, 69, 201, 0.5)");
            gradientBg.addColorStop(0.5, "rgba(59, 171, 154, 0.5)");
            gradientBg.addColorStop(1, "rgba(242, 255, 227, 0.5)");
            this.data.datasets = this.data.datasets.map( item=>{
                item.borderColor = gradientStroke;
                item.backgroundColor = gradientBg;
                return item;
            });
        };
        this.renderChart(this.data, this.options);
    },
    watch:{
        data:function() {
            this.renderChart(this.data, this.options);
        }
    },
    methods:{
        update() {
            this.$data._chart.update();
        }
    }
});