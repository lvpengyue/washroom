import { mapGetters, mapActions } from 'vuex';
import Axocx from '../widgets/axocx/index.vue';
import $ from 'jquery';
import conf from '../../store/conf';
import Util from '../../libs/util';
import QRCode from 'qrcode';
import printJS from 'print-js';
import Cookies from 'js-cookie';


export default {
    async mounted () {
        // 判断sortData是否有数据，如有，则不显示扫码弹窗---暂不用
        // if (this.sortData && this.sortData.data) {
        //     this.sacnModal = false;
        // } else {
        //     this.scanModal = true;
        // }

        this.scanModal = true;
        
        // const that = this;
        // window.onload = function (e) {
        //     let code = '';
        //     let lastTime, nextTime;
        //     let lastCode, nextCode;

        //     document.onkeypress = function (e) {
        //         if (window.event) {
        //             // IE
        //             nextCode = e.keyCode;
        //         } else if (e.which) {
        //             // Netscape/Firefox/Opera
        //             nextCode = e.which;
        //         }

        //         nextTime = new Date().getTime();

        //         if (lastCode !== null && lastTime !== null && nextTime - lastTime <= 30) {
        //             code += String.fromCharCode(lastCode);
        //         } else if (lastCode !== null && lastTime !== null && nextTime - lastTime > 100) {
        //             code = '';
        //         }

        //         lastCode = nextCode;
        //         lastTime = nextTime;
        //     };

        //     this.onkeypress = async function (e) {
        //         // alert(333);
        //         if (e.which == 13) {
        //             if (code != '') {
        //                 that.scanModal = true;
        //                 that.barCode = code;
        //                 // await that.sortGetData({
        //                 //     barCode: code
        //                 // })
        //                 // if (that.sortData && that.sortData.code != 1) {
        //                 //     that.$Message.error({
        //                 //         content: that.sortData.info,
        //                 //         duration: 2
        //                 //     })
        //                 // }

        //                 // that.scanModal = false;
        //             }
        //             code = '';
        //         }
        //     };
        // };

        await this.mainGetBaseData();
    },

    watch: {
        async barCode(newV, oldV) {
            if (newV && newV.length > 8) {
                this.sortSetBarcode(newV);
                await this.sortGetData({
                    barCode: this.barCode
                })

                if (this.sortData && this.sortData.code == 1) {
                    this.scanModal = false;
                } else {
                    this.$Notice.warning({
                        title: this.sortData.info
                    })

                    setTimeout(() => {
                        this.barCode = '';
                    }, 500);
                }
            }
        },

        returnRemarks: {
            handler(newV, oldV) {
                if (newV.length  > 0) {
                    this.remarks = [];
                    this.qualifiedSubmit = false;
                } else {
                    this.qualifiedSubmit = true;
                }
            },

            deep: true
        },

        remarks: {
            handler(newV, oldV) {
                if (newV.length  > 0) {
                    this.returnRemarks = [];
                    this.qualifiedSubmit = true;
                }
            },

            deep: true
        }
    },

    data () {
        // 新增衣物
        const showEdit = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'sort_index_add_clothes');
        // 完成，开始下一单
        const showComplete= Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'sort_index_complete');
        // 删除衣物
        const showDel = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'sort_index_del');
        // 录入水洗码
        const showPrint= Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'sort_index_print_code') ? 'inline-block' : 'none';
        // 收银
        const showMoney = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'sort_index_money');

        const resultArr = [
            '不合格',
            '合格'
        ]
        return {
            showEdit, // 新增衣物权限
            showComplete, // 完成，开始下一单权限
            showMoney, // 收银权限
            baseUrl: conf.baseUrl,
            printCloth: '', // 要打印的衣服对象
            modal_loading: false,
            showCamera: false, // 是否显示高拍仪
            picList: [], // 图片列表
            barCode: '',
            scanModal: false,
            addModal: false, // 检验衣物的标识符
            backWashModal: false, // 返洗弹框标识符
            bigModal: false, // 大图弹框
            bigUrl: '', // 大图的url
            brandListShow: false,
            brandList: [],
            categoryList: [],
            categoryListShow: false,
            showUpload: false, // 告诉组件是否显示上传图片状态
            remarks: [], // 合格可洗备注
            returnRemarks: [], // 不合格返洗备注
            qualifiedSubmit: true, // 标识合格和不合格按钮哪个可以点击，默认不选合格可点击
            searchBrandName: '', // 搜索的品牌名称
            searchCategoryName: '',
            typeArr: [
                '正常洗',
                '返洗单',
                '小袋洗',
                '大袋洗',
                '件洗',
                '索赔退款'
            ],
            selectBrand: '',
            selectCategory: '',

            addClothesData: {
                brandId: '',
                categoryId: '',
                factoryOrderId: '',
                checkResult: 0, // 0 不合格 1 合格
                remarks: '', // 备注
                pic: '',
                washNo: ''
            },
            regetBarModal: false, // 录入水洗码弹框
            regetData: { // 录入水洗码接口的参数
                clothesId: '',
                factoryOrderId: '',
                washNo: ''
            },
            regetBar: '', // 绑定的水洗码
            totalPrice: 0, // 收银总价
            clothMoneyList: '', // 收银衣物列表


            // 订单衣物列表
            clothesColumns: [
                {
                    title: '衣物品牌',
                    key: 'brandName',
                    render: (h, params) => {
                        return h('div', {
                        style: {
                            color: params.row.sortResult ? '#333' : 'red'
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
                            color: params.row.sortResult ? '#333' : 'red'
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
                            color: params.row.sortResult ? '#333' : 'red'
                        },
                        } ,params.row.washNo)
                    }
                },
                {
                    title: '检验结果',
                    key: 'sortResult',
                    render: (h, params) => {
                        return h('div', {
                        style: {
                            color: params.row.sortResult ? '#333' : 'red'
                        },
                        }, resultArr[params.row.sortResult])
                    }
                },
                {
                    title: '货架',
                    key: 'location'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                      return h('div', [
                        h('Button', {
                          props: {
                            type: 'warning',
                            size: 'default'
                          },
                          style: {
                            marginRight: '5px',
                            display: this.sortData.data.order.factoryStatus == 0 && showDel ? 'inline-block' : 'none'
                            // display: showDel
                          },
                          on: {
                            click: () => {
                              this.del(params.row.id, params.row.factoryOrderId);
                            }
                          }
                        }, '删除'),
                        h('Button', {
                          props: {
                            type: 'success',
                            size: 'default'
                          },
                          style: {
                            marginRight: '5px',
                            display: showPrint
                          },
                          on: {
                            click: () => {
                              this.reGetBarcode(params.row);
                            }
                          }
                        }, '录入水洗码')
                      ]); 
                    }
                }  
            ],

            // 件洗列表
            pieceWashColumns: [
                {
                    title: '衣服名称',
                    key: 'clothName'
                },
                {
                    title: '数量',
                    key: 'buyNum'
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
            'sortData',
            'sortEdit',
            'sortDelete',
            'sortNext',
            'sortBarcode',
            'sortMoney',
            'sortEntryCode',
            'mainUpload',
            'mainBaseData',
            'mainBarCode',
            'orderIndexDetail',
            'loginData'
        ])
    },

    methods: {
        ...mapActions([
            'sortGetData',
            'sortGetEdit',
            'sortGetDelete',
            'sortGetNext',
            'sortSetBarcode',
            'sortGetMoney',
            'sortGetEntryCode',
            'mainGetUpload',
            'mainGetBaseData',
            'mainGetBarCode',
            'orderIndexGetDetail'
        ]),

        getPrice() {
            let clothNum = 0; // 订单总衣物数
            let clothGood = 0; // 检验合格的衣物数
            let clothBad = 0; // 检验不合格的衣物数

            clothNum = this.sortData.data.order.clothNum;

            this.sortData.data.clothesList.forEach(item => {
                if (item.sortResult == 1) {
                    clothGood += 1;
                } else {
                    clothBad += 1;
                }
            });

            this.$Modal.confirm({
                title: '收银',
                content: `<p style="font-size: 14px;">本单衣物共 ${clothNum} 件，合格 ${clothGood} 件，不合格 <span style="color: red">${clothBad}</span> 件，可结算加工费共 ${clothGood} 件，确定结算吗？</p>`,
                onOk: async () => {
                    await this.sortGetMoney({
                        factoryOrderId: this.sortData.data.order.id
                    });
        
                    if (this.sortMoney && this.sortMoney.code != 1) {
                        this.$Notice.warning({
                            title: this.sortMoney.info
                        });
                    }
        
                    if (this.sortMoney && this.sortMoney.code == 1) {
                        this.$Notice.success({
                            title: this.sortMoney.info
                        });

                        // 收银成功后，要打印收银小票
                        // 获取订单衣物详情
                        await this.orderIndexGetDetail({
                            factoryOrderId: this.sortData.data.order.id
                        });

                        if (this.orderIndexDetail && this.orderIndexDetail.code == 1) {
                            this.clothMoneyList = this.orderIndexDetail.data;
                        } else {
                            return false;
                        }

                        this.totalPrice = 0;
                        // 计算出总价，复制给一个变量
                        let total = 0;
                        this.orderIndexDetail.data.forEach(item => {
                            total += item.processPrice * 100;
                        });

                        this.totalPrice = (total / 100).toFixed(2);

                        setTimeout(() => {
                            printJS({
                                printable: 'print',
                                type: 'html'
                            });
                        }, 700);
                    }
                },
                onCancel: () => {}
            })
        },

        /**
         * 重新打印条码 --- 弃用
         *
         * @param {Object} row 要打印的衣服对象
         */
        async rePrint(row) {
            this.printCloth = Object.assign({}, row);
            await this.mainGetBarCode({
                codeStr: row.washNo
            });

            if (this.mainBarCode && this.mainBarCode.code != 1) {
                this.$Notice.warning({
                    title: this.mainBarCode.info
                })

                return false;
            }
            setTimeout(() => {
                printJS({
                    printable: 'print',
                    type: 'html',
                    scanStyles: false,
                    css: './assets/print.css'
                });
            }, 200);
        },

        /**
         * 重新录入水洗码
         *
         * @param {*} row
         */
        reGetBarcode(row) {
            this.regetData.clothesId = row.id;
            this.regetData.factoryOrderId = row.factoryOrderId;
            this.regetBar = '';
            this.regetData.washNo = '';
            this.regetBarModal = true;
            this.regetBar = '';
        },

        /**
         * 提交录入的水洗码
         *
         */
        async saveRegetBar() {
            if (!this.regetBar) {
                return false;
            }

            this.regetData.washNo = this.regetBar;

            this.modal_loading = true;
            await this.sortGetEntryCode(this.regetData);
            this.modal_loading = false;
            if (this.sortEntryCode && this.sortEntryCode.code == 1) {
                // 录入成功，收起弹框，刷新数据
                this.$Message.success('录入水洗码成功');
                this.regetBarModal = false;
                await this.sortGetData({
                    barCode: this.sortBarcode
                })
            } else {
                this.$Notice.warning({
                    title: this.sortEntryCode.info
                })
            }
        },
 
        // 弹出扫码框
        showScan() {
            this.scanModal = true;
            this.barCode = '';
        },

        // 展示返洗弹框
        showBackModal() {
            this.backWashModal = true;
        },

        // 删除新增的质检衣物
        async del(clothesId, factoryOrderId) {
            this.$Modal.confirm({
                title: '确认删除吗？',
                content: '<p>请确认删除的衣物是否正确！</p>',
                onOk: async () => {
                    await this.sortGetDelete({
                        clothesId,
                        factoryOrderId
                    });
        
                    if (this.sortDelete && this.sortDelete.code != 1) {
                        this.$Notice.warning({
                            title: this.sortDelete.info
                        });
                    }
        
                    if (this.sortDelete && this.sortDelete.code == 1) {
                        this.$Message.success('删除成功');
                        await this.sortGetData({
                            barCode: this.sortBarcode
                        })
                    }
                },
                onCancel: () => {}
            })
        },

        // 点击返洗图片，查看大图
        showBig(url) {
            this.bigUrl = url;
            this.bigModal = true;
        },

        // 检验完成进行下一单
        toNext(id) {
            this.$Modal.confirm({
                title: '确认进行下一单吗？',
                content: '<p>请确认分拣的衣物数量是否正确！</p>',
                onOk: async () => {
                    await this.sortGetNext({
                        factoryOrderId: id
                    });
        
                    if (this.sortNext && this.sortNext.code != 1) {
                        this.$Notice.warning({
                            title: this.sortNext.info
                        });
                    }
        
                    if (this.sortNext && this.sortNext.code == 1) {
                        await this.sortGetData({
                            barCode: this.sortBarcode
                        })
        
                        // this.scanModal = true; // 因为增加了收银功能，所以注释掉自动弹出
                        this.barCode = '';
                    }
                },
                onCancel: () => {}
            })
        },

        // 点击拍照，打开高拍仪
        getCamera() {
            this.showCamera = !this.showCamera;
        },

        // 打开新增衣物弹框
        toAddModal() {
            this.addClothesData = {
                brandId: '',
                categoryId: '',
                factoryOrderId: this.sortData.data.order.id,
                checkResult: 0, // 0 不合格 1 合格
                remarks: '', // 备注
                pic: '',
                washNo: ''
            },
            this.selectBrand = '';
            this.selectCategory = '';
            this.picList = [];
            this.remarks = [];
            this.returnRemarks = [];
            this.addModal = true;
        },

        // 关闭新增弹框
        closeAddModal(val) {
            if (!val) {
                this.showCamera = false;
            }
        },

        // 展示或隐藏品牌列表框
        showBrandList() {
            this.brandListShow = !this.brandListShow;
            this.categoryListShow = false;
            this.showCamera = false;
            this.searchBrandName = '';
            this.brandList = JSON.parse(JSON.stringify(this.mainBaseData)).data.brandList;
        },

        // 选择品牌列表
        chooseBrand(row) {
            this.selectBrand = row;
            this.addClothesData.brandId = row.id;
            this.brandListShow = false;
            this.searchBrandName = '';
            this.brandList = JSON.parse(JSON.stringify(this.mainBaseData)).data.brandList;
        },

        // 搜索品牌
        searchBrand() {
            if (this.searchBrandName) {
                const arr = [];
                // 通过判断每个图片名称是否包含搜索字段生成符合条件的数组
                JSON.parse(JSON.stringify(this.mainBaseData)).data.brandList.forEach((item, index) => {
                    if (item.name.includes(this.searchBrandName)) {
                        arr.push({
                            name: item.name,
                            icon: item.icon,
                            id: item.id
                        })
                    }
                });

                this.brandList = arr;
            } else {
                this.brandList = JSON.parse(JSON.stringify(this.mainBaseData)).data.brandList;
            }
        },

        // 选择品类
        chooseCategory(row) {
            this.selectCategory = row;
            this.addClothesData.categoryId = row.id;
            this.categoryListShow = false;
            this.searchCategoryName = '';
            this.categoryList = JSON.parse(JSON.stringify(this.mainBaseData)).data.categoryList;
        },

        // 展示或隐藏品类列表框
        showCategoryList() {
            this.categoryListShow = !this.categoryListShow;
            this.brandListShow = false;
            this.showCamera = false;
            this.searchCategoryName = '';
            this.categoryList = JSON.parse(JSON.stringify(this.mainBaseData)).data.categoryList;
        },

        // 搜索品类
        searchCategory() {
            if (this.searchCategoryName) {
                const arr = [];
                // 通过判断每个图片名称是否包含搜索字段生成符合条件的数组
                JSON.parse(JSON.stringify(this.mainBaseData)).data.categoryList.forEach((item, index) => {
                    if (item.name.includes(this.searchCategoryName)) {
                        arr.push({
                            name: item.name,
                            icon: item.icon,
                            id: item.id
                        })
                    }
                });

                this.categoryList = arr;
            } else {
                this.categoryList = JSON.parse(JSON.stringify(this.mainBaseData)).data.categoryList;
            }
        },

        /**
         * base64转二进制blob
         *
         * @param {String} dataURI 图片的base64完整格式
         * @returns
         */
        dataURItoBlob (dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            let ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: mimeString});
        },

        async uploadImg(base64) {
            if (this.picList.length >= 5) {
                this.$Notice.warning({
                    title: '最多上传5张，请删除后再拍照'
                })

                return false;
            }
            this.showUpload = true;
            let fd = new FormData();
            const blob = this.dataURItoBlob(`data:;base64,${base64}`);
            fd.append('file', blob);
            
            
            $.ajax({
                type: 'POST',
                url: `${this.baseUrl}/ajaxfileupload`,
                data: fd,
                processData: false, // 不会将 data 参数序列化字符串
                contentType: false, // 根据表单 input 提交的数据使用其默认的 contentType
                xhr: function() {
                    const xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt) {
                        if (evt.lengthComputable) {
                            const percentComplete = evt.loaded / evt.total;
                            console.log('进度', percentComplete);
                        }
                    }, false);
            
                    return xhr;
                },
                success: (res) => {
                    this.picList.push(JSON.parse(res).data.url);
                    this.showUpload = false;
                },
                error: (data) => {
                    this.$Notice.warning({
                        title: '上传失败，请重新尝试'
                    })
                    this.showUpload = false;
                }
            });
        },

        // 删除图片
        delImg(index) {
            this.picList.splice(index, 1);
        },

        //确认新增（点击合格或者不合格按钮）
        async saveEdit (name, checkResult) {
            if (!this.selectBrand) {
                this.$Notice.warning({
                    title: '请选择品牌'
                });

                return false;
            }

            if (!this.selectCategory) {
                this.$Notice.warning({
                    title: '请选择衣物类别'
                });

                return false;
            }

            if (!this.addClothesData.washNo) {
                this.$Notice.warning({
                    title: '水洗单号不得为空'
                });

                return false;
            }

            // 此处暂时不需要判断必须上传照片，故注释
            // if (this.picList.length < 1) {
            //     this.$Notice.warning({
            //         title: '请拍照上传'
            //     });

            //     return false;
            // }

            if (checkResult) {
                this.addClothesData.remarks = this.remarks.join(',')
            } else {
                this.addClothesData.remarks = this.returnRemarks.join(',')
            }
            this.addClothesData.pic = this.picList.join(',');
            this.addClothesData.checkResult = checkResult;
            this.modal_loading = true;
            await this.sortGetEdit(this.addClothesData);

            if (this.sortEdit && this.sortEdit.code == 0) {
                this.$Notice.warning({
                    title: this.sortEdit.info
                });
                this.modal_loading = false;
            } else {
                this.addModal = false;
                this.modal_loading = false;
                this.editCategory = false;
                // 将返回结果赋值给printCloth
                this.printCloth = Object.assign({}, this.sortEdit.data);
                this.$Message.success('检验衣服成功');
                await this.sortGetData({
                    barCode: this.sortBarcode
                });

                // 生成二维码
                // this.useqrcode(this.sortEdit.data.washNo);

                // await this.mainGetBarCode({
                //     codeStr: this.printCloth.washNo
                // });
    
                // if (this.mainBarCode && this.mainBarCode.code != 1) {
                //     this.$Notice.warning({
                //         title: this.mainBarCode.info
                //     })
    
                //     return false;
                // }
                // setTimeout(() => {
                //     printJS({
                //         printable: 'print',
                //         type: 'html'
                //     });
                // }, 700);
            }
        },

        print() {
            const myDoc = {
                settings : {  
                    portrait : true, // 纵向  
    
                    marginLeft : 5, //设置左边距，单位为mm  
    
                    marginTop : 5,  
    
                    marginRight : 5,  
    
                    marginBottom : 5  
                }, 
                documents : document, // 打印页面(div)们在本文档中
                copyrights : '杰创软件拥有版权  www.jatools.com' // 版权声明必须
            };
            const jcp = getJCP();

            jcp.printPreview(myDoc, false);

            // 调用打印方法
            // if (how == '打印预览')
            //     jcp.printPreview(myDoc, false);
            // else if (how == '弹出打印机选择对话框打印') {
            //     jcp.print(myDoc, true);
            // } else
            //     jcp.print(myDoc, false); // 不弹出对话框打印
        },

        //动态生成二维码
        useqrcode(washNo){ 
            //生成的二维码内容，可以添加变量
            const canvas = document.getElementById('canvas');
            QRCode.toCanvas(canvas, washNo, function (error) {
            if (error) console.error(error)
                console.log('success!');
            })
        }
    },

    components: {
        Axocx
    }
}
;
