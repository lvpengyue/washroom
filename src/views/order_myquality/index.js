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
    this.userData = JSON.parse(Cookies.get('user'));
    this.search.userId = this.userData.id;
    await this.getData();
  },
  data() {
    // 定义所有按钮的名称，与权限挂钩
    const showOrder = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'order_myquality_order') ? 'inline-block' : 'none';

    const clothStatusArr = [
      '正常未洗',
      '异常无法洗',
      '异常暂挂中',
      '返洗',
      '已质检合格',
      '已打包',
      '已出货'
    ];

    const qualityStateArr = [
      '质检不合格',
      '质检合格'
    ];
    return {
      clothStatusArr: [
        '正常未洗',
        '异常无法洗',
        '异常暂挂中',
        '返洗',
        '已质检合格',
        '已打包',
        '已出货'
      ],
      qualityStateArr: [
        '质检不合格',
        '质检合格'
      ],
      editShelf: false,
      formValidate: {
          name: '',
          laundryId: ''
      },
      ruleValidate: {
          name: [
              { required: true, message: '请输入货架名称', trigger: 'blur' },
              { min: 1, message: '请至少输入1个字符', trigger: 'blur' },
              { max: 32, message: '最多输入32个字符', trigger: 'blur' }
          ]
      },
      modal_loading: false,
      userData: null,
      page: {
        pageNum: 1,
        pageSize: 10
      },
      search: {
        orderNum: '', // 订单编号
        location: '',
        checkResult: '99', // 质检结果
        referType: 1, // 衣服 1 订单 2
        userId: 0, // 当前用户id
        status: '99',  // 0 质检合格 1 质检不合格
        washNo: '' // 水洗码
      },
      columns: [
        {
          title: '订单编号',
          key: 'orderNum',
          width: '300px',
          render: (h, params) => {
            return h('div', [
              h('p', {
                style: {
                  display: 'inline-block'
                }
              }, params.row.orderNum),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: showOrder
                },
                on: {
                  click: () => {
                    this.getDetail(params.row.orderNum);
                  }
                }
              }, '查看')
            ])
          }
        },
        {
          title: '水洗码号',
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
          title: '货架/位置',
          key: 'location'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('div', clothStatusArr[params.row.status])
          }
        },
        {
          title: '质检结果',
          key: 'state',
          render: (h, params) => {
            return h('div', {
              style: {
                color: params.row.checkResult ? '#333' : 'red'
                // display: showDel
              },
            } ,qualityStateArr[params.row.checkResult])
          }
        },
        {
          title: '时间',
          key: 'createTime'
        },
        // {
        //   title: '操作',
        //   key: 'action',
        //   width: 300,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'warning',
        //           size: 'default'
        //         },
        //         style: {
        //           marginRight: '5px',
        //           // display: showDel
        //         },
        //         on: {
        //           click: () => {
        //             this.del(params.row.id);
        //           }
        //         }
        //       }, '删除'),
        //       h('Button', {
        //         props: {
        //           type: 'success',
        //           size: 'default'
        //         },
        //         style: {
        //           marginRight: '5px',
        //           // display: showEditUser
        //         },
        //         on: {
        //           click: () => {
        //             this.edit(params.row);
        //           }
        //         }
        //       }, '修改')
        //     ]); 
        //   }
        // }  
      ]
    };
  },
  computed: {
    ...mapGetters([
      'orderQualityData'
    ])
  },
  methods: {
    ...mapActions([
      'orderQualityGetData'
    ]),

    /**
     * 跳往订单列表查看具体的订单详情
     *
     * @param {String} orderNumber 订单编号
     */
    getDetail(orderNumber) {
      this.$router.push({
        path: '/order/index',
          query: {
            orderNum: orderNumber ? orderNumber : ''
          }
        })
    },

    saveEdit (name) {
      this.$refs[name].validate(async (valid) => {
          if (valid) {
              this.modal_loading = true;
              await this.shelfGetEdit(this.formValidate);

              if (this.shelfEdit && this.shelfEdit.code == 0) {
                  this.$Notice.warning({
                      title: this.shelfEdit.info
                  });
                  this.modal_loading = false;
              } else {
                  this.modal_loading = false;
                  this.editShelf = false;
                  this.$Message.success('新增/编辑货架成功');
                  await this.getData();
              }
          }
      });
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
        status: this.search.status,
        checkResult: this.search.checkResult
      }
      if (this.search.status == 99) {
         newobj.status = '';
      }
      if (this.search.checkResult == 99) {
         newobj.checkResult = '';
      }
      await this.orderQualityGetData(Object.assign({}, this.search, this.page, newobj));
      if (this.orderQualityData && this.orderQualityData.code == 0) {
        this.$Notice.warning({
          title: this.orderQualityData.info
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
        orderNum: '',
        location: '',
        checkResult: '99', // 质检结果
        referType: 1, // 衣服 1 订单 2
        userId: this.userData.id, // 当前用户id
        status: '99',  // 0 质检合格 1 质检不合格
        washNo: '' // 水洗码
      },
      this.page.pageNum = 1;
      await this.getData();
    }
  },

  components: {
    tableExpand,
    alCascader
  }
};
