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
    await this.getData();
  },
  data() {
    // 定义所有按钮的名称，与权限挂钩.
    // 是否有删除权限
    const showDel = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'laundry_index_del') ? 'inline-block' : 'none';
    // 是否有编辑权限
    const showEdit= Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'laundry_index_edit') ? 'inline-block' : 'none';
    // 是否有设置价格权限
    const showPrice = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'laundry_index_price') ? 'inline-block' : 'none';
  
    const statusArr = [
      '空闲',
      '已占用'
    ];

    const validePhone = (rule, value, callback) => {
        var re = /^1[0-9]{10}$/;
        if (!re.test(value)) {
            callback(new Error('请输入正确格式的手机号'));
        } else {
            callback();
        }
    };
    return {
      showEdit, // 新增的权限
      editLaundry: false, // 控制新增、修改工厂弹框
      setPrice: false, // 控制设置价格弹框 
      formValidate: {
          id: '',
          name: '',
          address: '',
          leaderName: '',
          leaderPhone: ''
      },
      priceArr: '', // 复制出来的价格数组
      editLaundryId: '', // 设置价格的工厂id
      ruleValidate: {
          name: [
              { required: true, message: '请输入工厂名称', trigger: 'blur' },
              { min: 1, message: '请至少输入1个字符', trigger: 'blur' },
              { max: 32, message: '最多输入32个字符', trigger: 'blur' }
          ],
          address: [
              { required: true, message: '请输入工厂地址', trigger: 'blur' },
              { min: 1, message: '请至少输入1个字符', trigger: 'blur' },
              { max: 32, message: '最多输入32个字符', trigger: 'blur' }
          ],
          leaderName: [
              { required: true, message: '请输入负责人姓名', trigger: 'blur' },
              { min: 1, message: '请至少输入1个字符', trigger: 'blur' },
              { max: 32, message: '最多输入32个字符', trigger: 'blur' }
          ],
          leaderPhone: [
              { required: true, message: '请输入负责人手机号', trigger: 'blur' },
              { validator: validePhone }
          ]
      },
      modal_loading: false,
      userData: null,
      page: {
        pageNum: 1,
        pageSize: 10
      },
      search: {
        name: '',  // 工厂名称
        address: '',
        leaderName: ''
      },
      columns: [
        {
          title: '工厂名称',
          key: 'name'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '负责人',
          key: 'leaderName'
        },
        {
          title: '手机号',
          key: 'leaderPhone'
        },
        {
          title: '创建时间',
          key: 'createTime'
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
                  display: showDel
                },
                on: {
                  click: () => {
                    this.del(params.row.id);
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
                  display: showEdit
                },
                on: {
                  click: () => {
                    this.edit(params.row);
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: showPrice
                },
                on: {
                  click: () => {
                    this.priceSet(params.row.id);
                  }
                }
              }, '设置加工价格')
            ]); 
          }
        }  
      ]
    };
  },
  computed: {
    ...mapGetters([
      'laundryData',
      'laundryEdit',
      'laundryDelete',
      'laundryPrice',
      'laundryEditPrice'
    ])
  },
  methods: {
    ...mapActions([
      'laundryGetData',
      'laundryGetEdit',
      'laundryGetDelete',
      'laundryGetPrice',
      'laundryGetEditPrice'
    ]),

    /**
     * 显示设置价格的弹框--首先要获取价格结果
     *
     * @param {Number} id 工厂id
     */
    async priceSet(id) {
      this.editLaundryId = id; // 保存工厂id,后面提交要用
      await this.laundryGetPrice({
        laundryId: id
      });

      if (this.laundryPrice && this.laundryPrice.code != 1) {
        this.$Notice.warning({
          title: this.laundryPrice.info
        });

        return false;
      } else {
        this.priceArr = [];
        this.laundryPrice.data.forEach((item) => {
          this.priceArr.push({
            name: item.name,
            categoryId: item.id,
            realProcessPrice: item.realProcessPrice
          })
        })
      }

      this.setPrice = true;
    },

    /**
     * 保存设置价格
     *
     */
    async saveEditPrice() {
      this.modal_loading = true;
      await this.laundryGetEditPrice({
        laundryId: this.editLaundryId,
        clothesList: this.priceArr
      });

      if (this.laundryEditPrice && this.laundryEditPrice.code != 1) {
        this.modal_loading = false;
        this.$Notice.warning({
          title: this.laundryEditPrice.info
        })
      } else {
        // 成功,提示
        this.$Message.success('设置成功');
        this.modal_loading = false;
        this.setPrice = false;
      }
    },  

    edit(row) {
      this.formValidate = {
          id: row.id,
          name: row.name,
          address: row.address,
          leaderName: row.leaderName,
          leaderPhone: row.leaderPhone
      }
      this.editLaundry = true;
    },

    handleAdd() {
      this.formValidate = {
          id: '',
          name: '',
          address: '',
          leaderName: '',
          leaderPhone: ''
      }
      this.editLaundry = true;
    },

    saveEdit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
            this.modal_loading = true;
            await this.laundryGetEdit(this.formValidate);

            if (this.laundryEdit && this.laundryEdit.code == 0) {
                this.$Notice.warning({
                    title: this.laundryEdit.info
                });
                this.modal_loading = false;
            } else {
                this.modal_loading = false;
                this.editLaundry = false;
                this.$Message.success('新增/编辑工厂成功');
                await this.getData();
            }
        }
    });
  },

    // 禁用启用
    async del(laundryId) {
       const params = {
          id: laundryId
       }

       this.$Modal.confirm({
          title: '确认删除吗',
          content: '<p>确认删除此工厂吗</p>',
          onOk: async () => {
            await this.laundryGetDelete(params);
            if (this.laundryDelete && this.laundryDelete.code == 0) {
              this.$Notice.warning({
                title: this.laundryDelete.info
              });
            } else {
              this.$Message.success('删除成功');
            }
            await this.getData();
          },
          onCancel: () => {
              
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
      await this.laundryGetData(Object.assign({}, this.search, this.page));
      if (this.laundryData && this.laundryData.code == 0) {
        this.$Notice.warning({
          title: this.laundryData.info
        })
      }
    },

    handleSearch() {
      // 进行搜索操作
      this.getData();
    },

    async handleReset() {
      this.search = {
        name: '',  // 工厂名称
        address: '',
        leaderName: ''
      }
      await this.getData();
    }
  },

  components: {
    tableExpand,
    alCascader
  }
};
