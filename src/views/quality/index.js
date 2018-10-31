import { mapGetters, mapActions } from 'vuex';
import Cookies from 'js-cookie';
import Util from '../../libs/util';


export default {
    async mounted () {
        this.userData = JSON.parse(Cookies.get('user'));
        this.scanModal = true;
        const that = this;
        window.onload = function (e) {
            console.log('load');
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
                        that.scanModal = true;
                        that.washNo = code;
                        // await that.qualityGetData({
                        //     washNo: code
                        // })
                        // if (that.qualityData && that.qualityData.code != 1) {
                        //     that.$Message.error({
                        //         content: that.qualityData.info,
                        //         duration: 2
                        //     })
                        // }

                        // that.scanModal = false;
                    }
                    code = '';
                }
            };
        };

        await this.mainGetBaseData();
    },

    watch: {
        async washNo(newV, oldV) {
            if (newV && newV.length >= 8) {
                await this.qualityGetData({
                    washNo: this.washNo
                })

                if (this.qualityData && this.qualityData.code == 1) {
                    this.scanModal = false;
                } else {
                    this.$Notice.warning({
                        title: this.qualityData.info
                    })

                    setTimeout(() => {
                        this.washNo = '';
                    }, 500);
                }  
            }
        }
    },

    data () {
        // 质检是否合格的权限
        const showCheck = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'quality_index_check');
        // 查看订单详情
        const showDetail= Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'quality_index_detail');
        // 查看返洗订单权限
        const showReturn = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'quality_index_return');



        const resultArr = [
            '不合格',
            '合格'
        ];

        const sortArr = [
            '不合格',
            '合格'
        ];

        return {
            showCheck,
            showDetail,
            showReturn,
            userData: null,
            scanModal: '',
            bigUrl: '', // 大图url
            bigModal: false, // 是否展示大图
            DetailModal: false,
            washNo: '',
            backWashModal: false, // 返洗弹框

            sortArr: [
                '不合格',
                '合格'
            ],
            
            typeArr: [
                '正常洗',
                '返洗单',
                '小袋洗',
                '大袋洗',
                '件洗',
                '索赔退款'
            ],

            
            // 订单衣物列表
            clothesColumns: [
                {
                title: '衣物品牌',
                key: 'brandName',
                render: (h, params) => {
                    return h('div', {
                    style: {
                        color: params.row.checkResult ? '#333' : 'red'
                    },
                    } ,params.row.brandName)
                }
                },
                {
                title: '类别',
                key: 'categoryName',
                render: (h, params) => {
                    return h('div', {
                    style: {
                        color: params.row.checkResult ? '#333' : 'red'
                    },
                    } ,params.row.categoryName)
                }
                },
                {
                title: '水洗码',
                key: 'washNo',
                render: (h, params) => {
                    return h('div', {
                    style: {
                        color: params.row.checkResult ? '#333' : 'red'
                    },
                    } ,params.row.washNo)
                }
                },
                {
                    title: '分拣结果',
                    key: 'sortResult',
                    render: (h, params) => {
                        return h('div', {
                        style: {
                            color: params.row.checkResult ? '#333' : 'red'
                        },
                        }, sortArr[params.row.sortResult])
                    }
                },
                {
                    title: '质检结果',
                    key: 'checkResult',
                    render: (h, params) => {
                        return h('div', {
                        style: {
                            color: params.row.checkResult ? '#333' : 'red'
                        },
                        }, resultArr[params.row.checkResult])
                    }
                },
                {
                title: '货架',
                key: 'location',
                render: (h, params) => {
                    return h('div', {
                    style: {
                        color: params.row.checkResult ? '#333' : 'red'
                    },
                    } ,params.row.location)
                }
                },
                {
                title: '返洗原因',
                key: 'returnReason',
                render: (h, params) => {
                    return h('div', {
                    style: {
                        color: params.row.checkResult ? '#333' : 'red'
                    },
                    } ,params.row.returnReason)
                }
                },
                {
                title: '备注',
                key: 'remarks',
                render: (h, params) => {
                    return h('div', {
                    style: {
                        color: params.row.checkResult ? '#333' : 'red'
                    },
                    } ,params.row.remarks)
                }
                }
            ],

            // 返洗列表
            backWashColumns: [
                {
                    title: '品牌类别',
                    key: 'clothName'
                },
                {
                    title: '返洗原因',
                    key: 'serviceReason'
                },
                {
                    title: '返洗说明',
                    key: 'serviceDesc'
                },
                {
                    title: '凭证图片',
                    key: 'image',
                    render: (h, params) => {
                        const arr = params.row.image.split(',');
                        let avatarArr = [];

                        arr.forEach(item => {
                            avatarArr.push(
                                h('Avatar', {
                                    props: {
                                        size: 'large',
                                        shape: 'square',
                                        src: item
                                    },
                                    style: {
                                        display: 'inline-block',
                                        marginRight: '10px'
                                    },
                                    nativeOn: {
                                        click: () => {
                                        this.showBig(item);
                                        }
                                    }
                                })
                            )
                        })

                        return h('div', avatarArr);
                    }
                }
            ]
        };
    },

    computed: {
        ...mapGetters([
            'qualityData',
            'qualityNext',
            'mainBaseData',
            'orderIndexDetail',
            'orderIndexReturn'
        ])
    },

    methods: {
        ...mapActions([
            'qualityGetData',
            'qualityGetNext',
            'orderIndexGetDetail',
            'mainGetBaseData',
            'orderIndexGetReturn'
        ]),

        showScanModal() {
            this.scanModal = true;
            this.washNo = '';
        },

        async showReturnClothes(id) {
            this.$Spin.show();
            await this.orderIndexGetReturn({
                factoryOrderId: id
            });
            if (this.orderIndexReturn && this.orderIndexReturn.code == 1) {
                this.backWashModal = true;
            } else {
                this.$Message.error({
                content: this.orderIndexReturn.info,
                duration: 1.5
                })
            }
            this.$Spin.hide();
        },

        showBig(url) {
            this.bigUrl = url;
            this.bigModal = true;
        },

        async getDetail(id) {
            await this.orderIndexGetDetail({
                factoryOrderId: id
            });

            this.DetailModal = true;
        },

        /**
         * 质检按钮
         *
         * @param {Number} id 衣服id
         * @param {Number} checkResult 质检结果
         * @param {Number} status   衣服状态 合格时为4，不合格为3
         */
        async toNext(id, checkResult, status) {
            await this.qualityGetNext({
                id,
                checkResult,
                status,
                userId: this.userData.id
            });

            if (this.qualityNext && this.qualityNext.code != 1) {
                this.$Notice.warning({
                    title: this.qualityNext.info
                });
            }

            if (this.qualityNext && this.qualityNext.code == 1) {
                this.$Notice.success({
                    title: '质检操作完成'
                })
                await this.qualityGetData({
                    washNo: this.washNo
                })
            }
        }
    }
}
;
