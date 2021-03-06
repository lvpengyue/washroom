import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import tableExpand from '../widgets/table-expand/index.vue';
import conf from '../../store/conf';
import Util from '../../libs/util';

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    await this.getData();
  },
  data() {
    // 定义所有按钮的名称，与权限挂钩
    // 新增、编辑权限
    const showEdit = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'brand_index_edit') ? 'inline-block' : 'none';
    // 删除权限
    const showDel= Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'brand_index_del') ? 'inline-block' : 'none';

    return {
      showEdit, // 新增权限
      baseUrl: conf.baseUrl,
      editCategory: false,
      formValidate: {
          id: '',
          name: '',
          icon: ''
      },
      ruleValidate: {
          name: [
              { required: true, message: '请输入品类名称', trigger: 'blur' },
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
        name: '',  // 品类名称
      },
      columns: [
        {
          title: '品类名称',
          key: 'name'
        },
        {
          title: '示意图',
          key: 'icon',
          render: (h, params) => {
            if (params.row.icon) {
              return h('Avatar', {
                props: {
                  src: params.row.icon
                }
              })
            }
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
              }, '修改')
            ]); 
          }
        }  
      ]
    };
  },
  computed: {
    ...mapGetters([
      'categoryData',
      'categoryEdit',
      'categoryDelete'
    ])
  },
  methods: {
    ...mapActions([
      'categoryGetData',
      'categoryGetEdit',
      'categoryGetDelete'
    ]),

    // ------ 图片上传
    handleSuccess (res, file) {
      this.formValidate.icon = res.data.url;
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件格式应为图片：jpg or png.'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: '文件超出最大限制',
            desc: '上传图片最大不得超过3M'
        });
    },
    // ---  图片上传结束 ----

    edit(row) {
      this.formValidate.id = row.id;
      this.formValidate.name = row.name;
      this.formValidate.icon = row.icon;
      this.editCategory = true;
    },

    handleAdd() {
      this.formValidate.id = '';
      this.formValidate.name = '';
      this.formValidate.icon = '';
      this.editCategory = true;
    },

    saveEdit (name) {
      this.$refs[name].validate(async (valid) => {
          if (valid) {
              this.modal_loading = true;
              await this.categoryGetEdit(this.formValidate);

              if (this.categoryEdit && this.categoryEdit.code == 0) {
                  this.$Notice.warning({
                      title: this.categoryEdit.info
                  });
                  this.modal_loading = false;
              } else {
                  this.modal_loading = false;
                  this.editCategory = false;
                  this.$Message.success('新增/编辑品类成功');
                  await this.getData();
              }
          }
      });
  },

    // 禁用启用
    async del(categoryId) {
       const params = {
          id: categoryId
       }

       this.$Modal.confirm({
          title: '确认删除吗',
          content: '<p>确认删除此品类吗</p>',
          onOk: async () => {
            await this.categoryGetDelete(params);
            if (this.categoryDelete && this.categoryDelete.code == 0) {
              this.$Notice.warning({
                title: this.categoryDelete.info
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
      await this.categoryGetData(Object.assign({}, this.search, this.page));
      if (this.categoryData && this.categoryData.code == 0) {
        this.$Notice.warning({
          title: this.categoryData.info
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
        name: '',  // 品类名称
      }
      this.page.pageNum = 1;
      await this.getData();
    }
  }
};
