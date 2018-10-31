import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import Util from '../../libs/util';
import printJS from 'print-js';

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    this.search.userId = this.userData.id;
    await this.getData();
  },
  data() {
    // 定义所有按钮的名称，与权限挂钩
    const showClothes = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'order_packed_clothes') ? 'inline-block' : 'none';
    const showReturn = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'order_packed_Return');

    const statusArr = [
      '已签收',
      '第1次分拣完成',
      '已质检',
      '已打包',
      '已出货',
    ];

    const typeArr = [
        '正常洗',
        '返洗单',
        '小袋洗',
        '大袋洗',
        '件洗',
        '索赔退款'
    ];

    const resultArr = [
      '不合格',
      '合格'
    ];

    const sortArr = [
      '不合格',
      '合格'
    ];

    return {
      clothesModal: false,
      modal_loading: false,
      backWashModal: false,
      bigModal: false,
      bigUrl: '',
      userData: null,
      page: {
        pageNum: 1,
        pageSize: 10
      },
      search: {
        referType: 2,
        status: 3,
        userId: ''
      },
      packOrder: '', // 要打包的订单数据
      columns: [
        {
          title: '订单编号',
          key: 'orderNum'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('div', statusArr[params.row.factoryStatus])
          }
        },
        {
          title: '类型',
          key: 'washType',
          render: (h, params) => {
            return h('div', [
              h('div', {
                style: {
                  display: 'inline-block',
                  marginRight: '6px'
                  // display: showDel
                },
              }, typeArr[params.row.washType]),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                style: {
                  // display: showEditUser
                  display: params.row.washType == 1 && showReturn ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.showReturnClothes(params.row.id);
                  }
                }
              }, '查看返洗')
            ])  
          }
        },
        // {
        //   title: '收货地址',
        //   key: 'receiveUserAddress'
        // },
        // {
        //   title: '用户手机号',
        //   key: 'receiveUserPhone'
        // },
        {
          title: '件数',
          key: 'clothNum',
          render: (h, params) => {
            return h('div', [
              h('div', {
                style: {
                  display: 'inline-block',
                  marginRight: '6px'
                  // display: showDel
                },
              }, params.row.clothNum),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                style: {
                  display: showClothes
                },
                on: {
                  click: () => {
                    this.showClothes(params.row.id);
                  }
                }
              }, '查看')
            ])  
          }
        },
        {
          title: '订单备注',
          key: 'riderDesc'
        },
        {
          title: '订单时间',
          key: 'createTime'
        },
        {
          title: '操作',
          key: 'id',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                on: {
                  click: () => {
                    this.rePrint(params.row);
                  }
                }
              }, '重新打印')
            ])  
          }
        },
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
                // display: showDel
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
                // display: showDel
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
                // display: showDel
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
                // display: showDel
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
                // display: showDel
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
                // display: showDel
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
                // display: showDel
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
                // display: showDel
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
      'orderPackedData',
      'orderPackedPack',
      'orderIndexDetail',
      'orderIndexReturn',
      'mainBarCode'
    ])
  },
  methods: {
    ...mapActions([
      'orderPackedGetData',
      'orderPackedGetPack',
      'orderIndexGetDetail',
      'orderIndexGetReturn',
      'mainGetBarCode'
    ]),

    /**
     * 重新打印条码
     * @param {Object} row 
     */
    async rePrint(row) {
      this.packOrder= row;
      // 开始生成二维码，并打印条码
      await this.mainGetBarCode({
        codeStr: this.packOrder.orderNum
      });

      if (this.mainBarCode && this.mainBarCode.code != 1) {
          this.$Notice.warning({
              title: this.mainBarCode.info
          })

          return false;
      }
      setTimeout(() => {
          printJS({
              printable: 'printPacked',
              type: 'html'
          });
      }, 700);
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

    async showClothes(id) {
      this.$Spin.show();
      await this.orderIndexGetDetail({
        factoryOrderId: id
      });
      if (this.orderIndexDetail && this.orderIndexDetail.code == 1) {
        this.clothesModal = true;
      } else {
        this.$Message.error({
          content: this.orderIndexDetail.info,
          duration: 1.5
        })
      }
      this.$Spin.hide();
    },

    // 页数改变重新获取
    async pageNumChange(pageNum) {
      this.page.pageNum = pageNum;
      this.getData();
    },

    // 每页大小改变，要手动去改变页面大小参数
    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      if (this.page.pageNum === 1) {
        this.getData();
      }
    },

    // 获取数据的统一方法
    async getData() {
      await this.orderPackedGetData(Object.assign({}, this.search, this.page));
      if (this.orderPackedData && this.orderPackedData.code == 0) {
        this.$Notice.warning({
          title: this.orderPackedData.info
        })
      }
    },

    handleSearch() {
      this.page.pageNum = 1;
      // 进行搜索操作
      this.getData();
    },

    async handleReset() {
      this.search = {
        referType: 2,
        status: 3,
        userId: this.userData.id
      },
      this.page.pageNum = 1;
      await this.getData();
    }
  }
};
