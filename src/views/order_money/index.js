import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import tableExpand from '../widgets/table-expand/index.vue';
import Util from '../../libs/util';

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    await this.getData();
    await this.permissionIndexGetData({
      laundryId: this.userData.laundryId
    })
  },
  data() {
    // 定义所有按钮的名称，与权限挂钩
    const showDetail = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'order_money_detail') ? 'inline-block' : 'none';
    
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
      page: {
        pageNum: 1,
        pageSize: 10
      },
      search: {
        factoryOrderNum: '',  // 订单编号
        factoryUserId: ''
      },
      columns: [
        {
          title: '订单编号',
          key: 'factoryOrderNum'
        },
        {
          title: '结算时间',
          key: 'createTime'
        },
        {
          title: '操作人',
          key: 'factoryUserName'
        },
        {
          title: '衣物件数',
          key: 'clothesCount'
        },
        {
          title: '结算件数',
          key: 'settleCount'
        },
        {
          title: '结算总价格',
          key: 'price',
          render: (h, params) => {
            return h('div', (params.row.price / 100).toFixed(2))
          }
        },
        {
          title: '操作',
          key: 'price',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                style: {
                  display: showDetail
                },
                on: {
                  click: () => {
                    this.showClothes(params.row.factoryOrderId);
                  }
                }
              }, '查看')
            ])
          }
        }
      ],

      // 订单衣物列表
      clothesColumns: [
        {
          title: '衣物品牌',
          key: 'brandName',
          render: (h, params) => {
            return h('div', {
              style: {
                color: params.row.sortResult ? '#333' : 'red'
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
                color: params.row.sortResult ? '#333' : 'red'
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
                color: params.row.sortResult ? '#333' : 'red'
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
                color: params.row.sortResult ? '#333' : 'red'
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
                color: params.row.sortResult ? '#333' : 'red'
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
                color: params.row.sortResult ? '#333' : 'red'
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
                color: params.row.sortResult ? '#333' : 'red'
                // display: showDel
              },
            }, params.row.returnReason)
          }
        },
        {
          title: '结算价格',
          key: 'processPrice',
          render: (h, params) => {
            return h('div', (params.row.processPrice / 100).toFixed(2))
          }
        },
        {
          title: '备注',
          key: 'remarks',
          render: (h, params) => {
            return h('div', {
              style: {
                color: params.row.sortResult ? '#333' : 'red'
                // display: showDel
              },
            } ,params.row.remarks)
          }
        }
      ],
    };
  },
  computed: {
    ...mapGetters([
      'orderMoneyData',
      'orderIndexDetail',
      'permissionIndexData'
    ])
  },
  methods: {
    ...mapActions([
      'orderMoneyGetData',
      'orderIndexGetDetail',
      'permissionIndexGetData'
    ]),

    async reset() {
      this.search = {
        factoryOrderNum: '',  // 订单编号
        factoryUserId: ''
      }

      this.page.pageNum = 1;
      await this.getData();
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
      await this.orderMoneyGetData(Object.assign({}, this.search, this.page));
      if (this.orderMoneyData && this.orderMoneyData.code == 0) {
        this.$Notice.warning({
          title: this.orderMoneyData.info
        })
      }
    },

    handleSearch() {
      this.page.pageNum = 1;
      // 进行搜索操作
      this.getData();
    },
  }
};
