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
    await this.orderClothesGetData({
      pageNum: 1,
      pageSize: 10
    })
  },
  data() {
    // 定义所有按钮的名称，与权限挂钩
    // 查看衣物所在订单详情
    const showOrder = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'order_clothes_order') ? 'inline-block' : 'none';

    const statusArr = [
      '正常 未洗',
      '异常无法洗',
      '异常暂挂中',
      '返洗',
      '已质检合格',
      '已打包',
      '已出货'
    ];
    
    return {
      userData: null,
      page: {
        pageNum: 1,
        pageSize: 10
      },
      search: {
        orderNum: '',  // 订单编号
        location: '',
        washNo: '', // 水洗码
        status: '99'
      },
      statusArr: [
        '正常 未洗',
        '异常无法洗',
        '异常暂挂中',
        '返洗',
        '已质检合格',
        '已打包',
        '已出货'
      ],
      columns: [
        {
          title: '订单编号',
          key: 'orderNum',
          width: '300px',
          render: (h, params) => {
            return h('div', [
              h('div', {
                style: {
                  width: '200px',
                  display: 'inline-block'
                  // display: showDel
                },
              }, params.row.orderNum ? params.row.orderNum : ''),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                style: {
                  display: showOrder
                },
                on: {
                  click: () => {
                    this.showOrder(params.row.orderNum);
                  }
                }
              }, '查看')
            ]); 
          }
        },
        {
          title: '水洗码',
          key: 'washNo'
        },
        {
          title: '品牌',
          key: 'brandName'
        },
        {
          title: '类别',
          key: 'categoryName'
        },
        {
          title: '货架位置',
          key: 'location'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('div', statusArr[params.row.status])
          }
        },
        {
          title: '备注',
          key: 'remarks'
        },
        {
          title: '录入时间',
          key: 'createTime'
        }
      ] 
    };
  },
  computed: {
    ...mapGetters([
      'orderClothesData'
    ])
  },
  methods: {
    ...mapActions([
      'orderClothesGetData'
    ]),

    // 跳转到订单列表
    showOrder(orderNum) {
      this.$router.push({
        path: '/order/index',
        query: {
          orderNum: orderNum ? orderNum : ''
        }
      })
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
      const newobj = {
        status: this.search.status
      }
      if (this.search.status == 99) {
         newobj.status = '';
      }

      await this.orderClothesGetData(Object.assign({}, this.search, this.page, newobj));
      if (this.orderClothesData && this.orderClothesData.code == 0) {
        this.$Notice.warning({
          title: this.orderClothesData.info
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
        location: '',
        washNo: '', // 水洗码
        status: '99'
      },
      this.page.pageNum = 1;
      await this.getData();
    }
  },
};
