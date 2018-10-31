import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    await this.permissionRoleGetData();
    await this.laundryGetData();
    await this.getData();
  },
  data() {
    return {
      userData: null,
      page: {
        pageNum: 1,
        pageSize: 10
      },
      search: {
        userName: '',
        laundryId: '',
        roleId: '',
        referType: ''
      },
      columns: [
        {
          title: '操作描述',
          key: 'des'
        },
        {
          title: '姓名',
          key: 'userName'
        },
        {
          title: '工厂',
          key: 'laundryName'
        },
        {
          title: '订单号',
          key: 'factoryOrderNum'
        },
        {
          title: '类型',
          key: 'referType',
          render: (h, params) => {
            return h('div', ['', '衣服', '订单'][params.row.referType])
          }
        },
        {
          title: '操作时间',
          key: 'createTime',
          // render: (h, params) => {
          //   return h('div', new Date(parseInt(params.row.updateTime)).toLocaleString())
          // }
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'historyData',
      'laundryData',
      'permissionRoleData'
    ])
  },
  methods: {
    ...mapActions([
      'historyGetData',
      'laundryGetData',
      'permissionRoleGetData'
    ]),

    handleReset() {
      this.search = {
        userName: '',
        laundryId: '',
        roleId: '',
        referType: ''
      }
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
      await this.historyGetData(Object.assign({
        userId: this.userData.id,
        phone: this.userData.phone
      }, this.page, this.search));
      if (this.historyData && this.historyData.code == 0) {
        this.$Notice.warning({
          title: this.historyData.info
        })
      }
    },

    handleSearch() {
      // 进行搜索操作
      this.getData();
    }
  },
};
