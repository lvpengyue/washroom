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
  },
  data() {
    // 定义所有按钮的名称，与权限挂钩
    // const showDel = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'laundry_del') ? 'inline-block' : 'none';

    return {
      page: {
        pageNum: 1,
        pageSize: 10
      },
      search: {
        categoryName: ''  // 类别名称
      },
      columns: [
        {
          title: '类别名称',
          key: 'categoryName'
        },
        {
          title: '加工费',
          key: 'price',
          render: (h, params) => {
            return h('div', (params.row.price / 100).toFixed(2))
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'priceMyData'
    ])
  },
  methods: {
    ...mapActions([
      'priceMyGetData'
    ]),

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
      await this.priceMyGetData(Object.assign({}, this.search, this.page));
      if (this.priceMyData && this.priceMyData.code == 0) {
        this.$Notice.warning({
          title: this.priceMyData.info
        })
      }
    },

    handleSearch() {
      // 进行搜索操作
      this.getData();
    },

    async handleReset() {
      this.search = {
        categoryName: ''
      }

      this.page.pageNum = 1;
      await this.getData();
    }
  }
};
