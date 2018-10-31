import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import tableExpand from '../widgets/table-expand/index.vue';
import Util from '../../libs/util';
import alCascader from '../my-components/area-linkage/components/al-cascader.vue';

export default {
  async mounted() {
    // if (this.$route.query.orderNum) {
    //   this.search.orderNum = this.$route.query.orderNum;
    // }
    this.userData = JSON.parse(Cookies.get('user'));
    await this.getData();
  },
  data() {
    // 定义所有按钮的名称，与权限挂钩
    // 查看衣物列表权限
    const showClothes = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'order_laundry_clothes') ? 'inline-block' : 'none';
    // 查看返洗列表
    const showReturn = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'order_laundry_return');

    const resultArr = [
      '不合格',
      '合格'
    ];

    const sortArr = [
      '不合格',
      '合格'
    ];

    const washArr = [
      '正常洗',
      '返洗'
    ];
    const statusArr = [
      '已签收',
      '洗衣中',
      '已质检',
      '已打包',
      '已出货'
    ];

    const typeArr = [
      '正常洗',
      '返洗单',
      '小袋洗',
      '大袋洗',
      '件洗',
      '索赔退款'
    ];
    
    return {
      clothesModal: false,
      backWashModal2: false,
      bigModal: false,
      bigUrl: '',
      userData: null,
      page: {
        pageNum: 1,
        pageSize: 10
      },
      search: {
        orderNum: '',  // 订单编号
        packageNo: '',
        userPhone: ''
      },
      statusArr,
      washArr,
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
        {
          title: '状态',
          key: 'factoryStatus',
          render: (h, params) => {
            return h('div', statusArr[params.row.factoryStatus])
          }
        },
        {
          title: '返洗单',
          key: 'washType',
          render: (h, params) => {
            return h('div', [
              h('div', {
                style: {
                  width: '20px',
                  display: 'inline-block',
                  marginRight: '5px',
                  // display: showDel
                },
              }, params.row.washType == 1 ? '是' : '否'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                style: {
                  display: params.row.washType == 1 && showReturn ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.showReturnClothes(params.row.id);
                  }
                }
              }, '查看')
            ]); 
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
                  width: '20px',
                  display: 'inline-block',
                  marginRight: '5px',
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
            ]); 
          }
        },
        {
          title: '类型',
          key: 'packageType',
          render: (h, params) => {
            return h('div', typeArr[params.row.washType])
          }
        },
        {
          title: '备注',
          key: 'riderDesc'
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
            } ,params.row.returnReason)
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
      'orderLaundryData',
      'orderIndexDetail',
      'orderIndexReturn'
    ])
  },
  methods: {
    ...mapActions([
      'orderLaundryGetData',
      'orderIndexGetDetail',
      'orderIndexGetReturn'
    ]),

    async showReturnClothes(id) {
      this.$Spin.show();
      await this.orderIndexGetReturn({
        factoryOrderId: id
      });
      if (this.orderIndexReturn && this.orderIndexReturn.code == 1) {
        this.backWashModal2 = true;
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
      await this.orderLaundryGetData(Object.assign({}, this.search, this.page));
      if (this.orderLaundryData && this.orderLaundryData.code == 0) {
        this.$Notice.warning({
          title: this.orderLaundryData.info
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
        orderNum: '',  // 订单编号
        packageNo: '',
        userPhone: ''
      },
      this.page.pageNum = 1;
      await this.getData();
    }
  }
};
