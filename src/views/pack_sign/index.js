import { mapGetters, mapActions } from 'vuex';
import Axocx from '../widgets/axocx/index.vue';

export default {
    async mounted () {
        const that = this;
        window.onload = function (e) {
            let code = '';
            let lastTime, nextTime;
            let lastCode, nextCode;

            document.onkeypress = function (e) {
                if (window.event) {
                    // IE
                    nextCode = e.keyCode;
                } else if (e.which) {
                    // Netscape/Firefox/Opera
                    nextCode = e.which;
                }

                nextTime = new Date().getTime();

                if (lastCode !== null && lastTime !== null && nextTime - lastTime <= 30) {
                    code += String.fromCharCode(lastCode);
                } else if (lastCode !== null && lastTime !== null && nextTime - lastTime > 100) {
                    code = '';
                }

                lastCode = nextCode;
                lastTime = nextTime;
            };

            this.onkeypress = async function (e) {
                // alert(333);
                if (e.which == 13) {
                    if (code != '') {
                        that.barCode = code;
                    }
                    code = '';
                }
            };
        };
    },

    watch: {
        async barCode(newV, oldV) {
            if (newV && newV.length > 8) {
                await this.packSignGetData({
                    barCode: this.barCode
                })

                if (this.packSignData && this.packSignData.code != 1) {
                    this.$Message.error({
                        content: this.packSignData.info,
                        duration: 2
                    })
                    setTimeout(() => {
                        this.barCode = '';
                    }, 500)
                } else {
                    this.dataList.push(this.packSignData.data);
                }
            }
        }
    },

    data () {
        const typeArr = [
            '正常洗',
            '返洗单',
            '小袋洗',
            '大袋洗',
            '件洗',
            '索赔退款'
        ];
        return {
            dataList: [],
            barCode: '',

            // 订单衣物列表
            columns: [
                {
                    title: '订单编号',
                    key: 'orderNum'
                },
                {
                    title: '条形码号',
                    key: 'packageNo'
                },
                {
                    title: '签收时间',
                    key: 'createTime'
                },
                // {
                //     title: '收货地址',
                //     key: 'receiveUserAddress'
                // },
                // {
                //     title: '用户手机号',
                //     key: 'receiveUserPhone'
                // },
                {
                    title: '件数',
                    key: 'clothNum'
                },
                {
                    title: '类型',
                    key: 'washType',
                    render: (h, params) => {
                    return h('div', typeArr[params.row.washType])
                    }
                },
                {
                    title: '备注',
                    key: 'riderDesc'
                }
            ]
    };
    },

    computed: {
        ...mapGetters([
            'packSignData'
        ])
    },

    methods: {
        ...mapActions([
            'packSignGetData'
        ]),
    },

    components: {
        Axocx
    }
}
;
