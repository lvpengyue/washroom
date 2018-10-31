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
    // 定义所有按钮的名称，与权限挂钩
    // const showDel = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'shelf_del') ? 'inline-block' : 'none';
    // const showEditUser= Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'edit-user') ? 'inline-block' : 'none';
    // const showEditPassword = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'shelf_editPassword') ? 'inline-block' : 'none';
    // const showValid = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'shelf_valid') ? 'inline-block' : 'none';

    const statusArr = [
      '空闲',
      '已占用'
    ]
    return {
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
        name: '',  // 货架名称
        laundryId: '99',
        status: '99' // 货架状态 0 1
      },
      columns: [
        {
          title: '货架名称',
          key: 'name'
        },
        {
          title: '工厂',
          key: 'laundryName'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('div', statusArr[params.row.status])
          }
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
                  // display: showDel
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
                  // display: showEditUser
                },
                on: {
                  click: () => {
                    this.edit(params.row);
                  }
                }
              }, '修改')
            ]); 
          }
        }  
      ]
    };
  },
  computed: {
    ...mapGetters([
      'shelfData',
      'shelfEdit',
      'shelfDelete'
    ])
  },
  methods: {
    ...mapActions([
      'shelfGetData',
      'shelfGetEdit',
      'shelfGetDelete'
    ]),

    edit(row) {
      this.formValidate.name = row.name;
      this.formValidate.laundryId = row.laundryId;
      this.editShelf = true;
    },

    handleAdd() {
      this.formValidate.name = '';
      this.formValidate.laundryId = '';
      this.editShelf = true;
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

    // 禁用启用
    async del(shelfId) {
       const params = {
          id: shelfId
       }

       this.$Modal.confirm({
          title: '确认删除吗',
          content: '<p>确认删除此货架吗</p>',
          onOk: async () => {
            await this.shelfGetDelete(params);
            if (this.shelfDelete && this.shelfDelete.code == 0) {
              this.$Notice.warning({
                title: this.shelfDelete.info
              });
            } else {
              this.$Message.success('删除成功');
              await this.getData();
            }
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
      const newobj = {
        status: this.search.status,
        laundryId: this.search.laundryId
      }
      if (this.search.status == 99) {
         newobj.status = '';
      }
      if (this.search.laundryId == 99) {
         newobj.laundryId = '';
      }
      await this.shelfGetData(Object.assign({}, this.search, this.page, newobj));
      if (this.shelfData && this.shelfData.code == 0) {
        this.$Notice.warning({
          title: this.shelfData.info
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
        name: '',  // 货架名称
        laundryId: '99',
        status: '99' // 货架状态 0 1
      }
      this.page.pageNum = 1;
      await this.getData();
    }
  },

  components: {
    tableExpand,
    alCascader
  }
};
