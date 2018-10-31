import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import tableExpand from '../widgets/table-expand/index.vue';
import alCascader from '../my-components/area-linkage/components/al-cascader.vue';
import Util from '../../libs/util';

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    await this.getData();
    await this.permissionRoleGetData();
    await this.laundryGetData();
  },
  data() {
    // 权限名称对应操作按钮，与数据库中资源名称一致
    // 是否显示启用、禁用
    const showDel = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'permission_index_del');
    // 是否显示新增按钮、编辑提交按钮
    const showEdit= Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'permission_index_edit');
    // 是否显示重置密码弹框
    const showEditPassword = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'permission_index_edit_password') ? 'inline-block' : 'none';
   
   
    const stateArr = [
      '正常',
      '禁用'
    ];
    const valideRePassword = (rule, value, callback) => {
        if (value !== this.formValidate.newPassword) {
            callback(new Error('两次输入密码不一致'));
        } else {
            callback();
        }
    };
    const validePhone = (rule, value, callback) => {
        var re = /^1[0-9]{10}$/;
        if (!re.test(value)) {
            callback(new Error('请输入正确格式的手机号'));
        } else {
            callback();
        }
    };

    const validePersonId = (rule, value, callback) => {
        var re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!re.test(value)) {
            callback(new Error('请输入正确的身份证号'));
        } else {
            callback();
        }
    };
    return {
        showEdit, // 是否显示新增按钮、编辑提交按钮

        formValidate1: {
          name: '',
          phone: '',
          roleId: '',
          laundryId: '',
          id: '',
      },

      ruleValidate1: {
          name: [
              { required: true, message: '姓名不得为空', trigger: 'blur' }
          ],
          phone: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { validator: validePhone }
          ],
          laundryId: [
            { required: true, message: '请选择工厂', trigger: 'change' }
          ],
          roleId: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ]
      },
      addOrEdit: false, // 新增或编辑框是否出现
      modal_loading: false,
      userData: null,
      page: {
        pageNum: 1,
        pageSize: 10
      },
      search: {
        name: '',
        phone: '',
        laundryId: '',
        roleId: '',
        state: ''
      },
      columns: [
        // {
        //   type: 'expand',
        //   width: 50,
        //   render: (h, params) => {
        //     return h(tableExpand, {
        //       props: {
        //         row: params.row,
        //         expandObj: expandObject
        //       }
        //     });
        //   }
        // },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '账号',
          key: 'phone'
        },
        {
          title: '工厂名称',
          key: 'laundryName'
        },
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '工厂名称',
          key: 'laundryName'
        },
        {
          title: '最后登录时间',
          key: 'lastLogTime',
          // render: (h, params) => {
          //   return h('div', new Date(parseInt(params.row.createTime)).toLocaleString())
          // }
        },
        {
          title: '最后登录ip',
          key: 'ip',
          // render: (h, params) => {
          //   return h('div', new Date(parseInt(params.row.updateTime)).toLocaleString())
          // }
        },
        {
          title: '状态',
          key: 'state',
          render: (h, params) => {
            return h('div', {
              style: {
                color: params.row.state ? 'red' : '#333'
              }
            }, stateArr[params.row.state])
          }
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
                  type: 'primary',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: showEdit ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.showAndEdit(params.row);
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: showEditPassword
                },
                on: {
                  click: () => {
                    this.editPassword(params.row);
                  }
                }
              }, '重置密码'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.state && showDel ? 'none' : 'inline-block'
                  // display: showDel
                },
                on: {
                  click: () => {
                    this.del(params.row.id, 1);
                  }
                }
              }, '禁用'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  // display: showDel
                  display: params.row.state && showDel ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.del(params.row.id, 0);
                  }
                }
              }, '启用')
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'permissionIndexData',
      'permissionIndexAdd',
      'permissionIndexDel',
      'permissionIndexModifyPass',

      'permissionRoleData',
      'laundryData'
    ])
  },
  methods: {
    ...mapActions([
      'permissionIndexGetData',
      'permissionIndexGetAdd',
      'permissionIndexGetDel',
      'permissionIndexGetModifyPass',

      'permissionRoleGetData',
      'laundryGetData'
    ]),

    handleAdd() {
      this.userFormInit();
      this.addOrEdit = true;
    },

    userFormInit() {
      this.formValidate1 = {
        name: '',
        phone: '',
        roleId: '',
        laundryId: '',
        id: ''
      }
    },

    editPassword(row) {
      this.$Modal.confirm({
          title: '确定重置密码？',
          content: '<p>确定重置密码为初始密码吗？</p>',
          onOk: async () => {
              // 进行重置密码的操作
              await this.permissionIndexGetModifyPass({
                id: row.id
              })

              if (this.permissionIndexModifyPass && this.permissionIndexModifyPass.code == 1) {
                this.$Notice.success({
                  title: this.permissionIndexModifyPass.info
                })
              } else {
                this.$Notice.warning({
                  title: this.permissionIndexModifyPass.info
                })
              }
          },
          onCancel: () => {
              this.$Message.info('取消重置密码');
          }
      });
    },

    saveEdit (name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                this.modal_loading = true;
                await this.permissionIndexGetModifyPass({
                    password: this.formValidate.newPassword,
                    id: this.formValidate.id
                })

                if (this.permissionIndexModifyPass && this.permissionIndexModifyPass.code == 0) {
                    this.$Notice.warning({
                        title: this.permissionIndexModifyPass.info
                    });
                    this.modal_loading = false;
                } else {
                    this.modal_loading = false;
                    this.editPass = false;
                    this.$Message.success('修改密码成功');
                }
            }
        });
    },

    saveUser (name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                this.modal_loading = true;
                
                // 新增、编辑
                await this.permissionIndexGetAdd(this.formValidate1);

                if (this.permissionIndexAdd && this.permissionIndexAdd.code == 0) {
                    this.$Notice.warning({
                        title: this.permissionIndexAdd.info
                    });
                    this.modal_loading = false;
                } else {
                    this.modal_loading = false;
                    this.addOrEdit = false;
                    this.$Notice.success({
                      title: '新增/编辑成功',
                      desc: this.permissionIndexAdd.info
                    });
                    this.getData();
                }
            }
        });
    },

    // 删除
    async del(id, state) {
       const params = {
          id,
          state
       }
       this.$Modal.confirm({
         title: `确定${state ? '禁用' : '启用'}该账号吗？`,
         content: '请想清楚再操作哦',
         okText: '确定',
         onOk: async () => {
          await this.permissionIndexGetDel(params);
          if (this.permissionIndexDel && this.permissionIndexDel.code == 1) {
            this.$Message.success(this.permissionIndexDel.info);
            await this.getData();
          } else {
             this.$Notice.warning({
               title: this.permissionIndexDel.info
             })
          }
         }
       })
    },

    // 页数改变重新获取
    async pageNumChange(pageNum) {
      this.page.pageNum = pageNum;
      this.getData();
    },

    // 查看修改用户信息
    async showAndEdit(row) {
      this.userFormInit();
      this.formValidate1 = {
          name: row.name,
          phone: row.phone,
          roleId: `${row.roleId}`,
          laundryId: `${row.laundryId}`,
          id: row.id
      };
      this.addOrEdit = true;
      setTimeout(() => {
        this.$refs['userForm'].validate();
      }, 200)
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
      await this.permissionIndexGetData(Object.assign({}, this.page, this.search));
      if (this.permissionIndexData && this.permissionIndexData.code == 0) {
        this.$Notice.warning({
          title: this.permissionIndexData.info
        })
      }
    },

    handleReset() {
      this.search = {
        name: '',
        phone: '',
        laundryId: '',
        roleId: '',
        state: ''
      }
      this.page.pageNum = 1;
    },

    handleSearch() {
      // 进行搜索操作
      this.getData();
    }
  },

  components: {
    tableExpand,
    alCascader
  }
};
