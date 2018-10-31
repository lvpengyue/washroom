import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import tableExpand from '../widgets/table-expand/index.vue';
import $ from 'jquery';
import Util from '../../libs/util';

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    await this.permissionResourceGetData();
    await this.getData();
  },
  
  data() {
    // 删除角色
    const showDel = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'permission_role_del') ? 'inline-block' : 'none';
    // 是否显示新增按钮、编辑按钮
    const showEdit= Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'permission_role_edit') ? 'inline-block' : 'none';
    // 是否显示分配权限按钮
    const showAllocate = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'permission_role_allocate') ? 'inline-block' : 'none';
    
    const expandObject = [
        {
          title: '省',
          key: 'province'
        },
        {
          title: '市',
          key: 'city'
        },
        {
          title: '区县',
          key: 'county'
        },
        {
          title: '所在公司',
          key: 'company'
        },
        {
          title: '性别',
          key: 'sex',
          arr: [
             '男',
             '女'
          ]
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '是否审核通过',
          key: 'isValid',
          arr: [
             '未审核',
             '审核通过'
          ]
        },
        {
          title: '是否禁用',
          key: 'isDel',
          arr: [
             '正常',
             '禁用'
          ]
        },
        {
          title: '角色',
          key: 'userType',
          arr: [
             '管理员',
             '代理商'
          ]
        }
    ];
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.formValidate.newPassword) {
          callback(new Error('两次输入密码不一致'));
      } else {
          callback();
      }
  };
    return {
      showEdit, // 是否显示新增编辑按钮的权限控制
      canNotSave: true, // 分配权限未操作不得提交
      roleList:  [],
      allocateParams: {
        roleId: 0,
        permissionids: []
      },
      allocateList: [], // 分配权限的集合
      editAllocate: false, // 分配权限弹框
      editRole: false, // 新增、修改角色框是否出现
      formValidate: {
          name: '',
          code: '',
          id: ''
      },
      ruleValidate: {
          name: [
              { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          code: [
              { required: true, message: '请输入代号', trigger: 'blur' }
          ]
      },
      modal_loading: false,
      userData: null,
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
          title: '角色名称',
          key: 'name'
        },
        {
          title: '代号',
          key: 'code'
        },
        {
          title: '创建时间',
          key: 'createTime',
          render: (h, params) => {
            return h('div', new Date(parseInt(params.row.createTime)).toLocaleString())
          }
        },
        {
          title: '更新时间',
          key: 'updateTime',
          render: (h, params) => {
            return h('div', new Date(parseInt(params.row.updateTime)).toLocaleString())
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render: (h, params) => {
            if (params.row.code != 'SADMIN') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'default'
                  },
                  style: {
                    marginRight: '5px',
                    display: showEdit
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
                    display: showAllocate
                  },
                  on: {
                    click: () => {
                      this.allocate(params.row);
                    }
                  }
                }, '配置权限'),
                h('Button', {
                  props: {
                    type: 'error',
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
                }, '删除')
              ]);
            }
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'permissionRoleData',
      'permissionRoleAdd',
      'permissionRoleAllocate',
      'permissionRoleDel',
      'permissionResourceData'
    ]),
  },
  methods: {
    ...mapActions([
      'permissionRoleGetData',
      'permissionRoleGetAdd',
      'permissionRoleGetAllocate',
      'permissionRoleGetDel',
      'permissionResourceGetData'
    ]),

    getNodes(nodeList) {
      this.allocateList = nodeList;
      this.canNotSave = false;
    },

    allocate(row) {
      this.canNotSave = true;
      const allocateArr = [];
      row.list.forEach(item => {
        if (item.parentId != 0) {
          allocateArr.push(item.url);
        }
      });
      this.allocateParams.roleId = row.id;
      this.editAllocate = true;
      this.allocateList = [];
      const arr = [];
      if (this.permissionResourceData && this.permissionResourceData.data && this.permissionResourceData.data.length > 0) {
        this.permissionResourceData.data.forEach((item, index) => {
          const eachObj = Object.assign({}, {
            title: item.name,
            expand: true,
            id: item.id,
            parentId: item.parentId,
            children: [],
          });
          item.list.forEach((sitem, sindex) => {
            eachObj.children.push({
              title: sitem.name,
              id: sitem.id,
              parentId: sitem.parentId,
              checked: allocateArr.indexOf(sitem.url) >= 0 ? true : false,
            })
          });
          arr[index] = eachObj;
        })
      };

      this.roleList = [];
      this.roleList[0] = {
        title: '所有权限',
        expand: true,
        selected: true,
        children: arr,
      }
    },

    async saveAllocate() {
      this.modal_loading = true;
      // 对选中权限进行处理
      const arr = [];
      this.allocateList.forEach(item => {
        if (item.nodeKey !== 0) {
          arr.push(item.id);
          arr.push(item.parentId);
        }
      });
      // 去重
      const obj = new Set(arr);
      const newArr = [];
      // 去掉id为0
      obj.forEach(item => {
        if (item !== 0) {
          newArr.push(item);
        }
      });
      this.allocateParams.permissionids = newArr;
      await this.permissionRoleGetAllocate(this.allocateParams);
      if (this.permissionRoleAllocate && this.permissionRoleAllocate.code == 0) {
        this.$Notice.warning({
            title: this.permissionRoleAllocate.info
        });
        this.modal_loading = false;
      } else {
          this.modal_loading = false;
          this.editAllocate = false;
          this.$Message.success('分配权限成功');
          await this.getData();
      }
    },

    handleAdd() {
      this.formValidate.id = '';
      this.formValidate.name = '';
      this.formValidate.code = '';
      this.editRole = true;
    },

    saveEdit (name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                this.modal_loading = true;
                await this.permissionRoleGetAdd(this.formValidate);

                if (this.permissionRoleAdd && this.permissionRoleAdd.code == 0) {
                    this.$Notice.warning({
                        title: this.permissionRoleAdd.info
                    });
                    this.modal_loading = false;
                } else {
                    this.modal_loading = false;
                    this.editRole = false;
                    this.$Message.success('编辑角色成功');
                    await this.getData();
                }
            }
        });
    },

    // 删除
    async del(agentId) {
       const params = {
          id: agentId
       }
       this.$Modal.confirm({
        title: '确定删除',
        content: '确定删除这个角色吗？',
        okText: '确定',
        onOk: async () => {
          await this.permissionRoleGetDel(params);
         if (this.permissionRoleDel && this.permissionRoleDel.code == 1) {
           this.$Message.success('删除成功');
           await this.getData();
         } else {
            this.$Notice.warning({
              title: '删除失败'
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

    // 查看修改角色信息
    showAndEdit(row) {
      this.formValidate = {
        id: row.id,
        code: row.code,
        name: row.name
      },
      this.editRole = true;
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
      await this.permissionRoleGetData();
      if (this.permissionRoleData && this.permissionRoleData.code == 0) {
        this.$Notice.warning({
          title: this.permissionRoleData.info
        })
      }
    }
  },

  components: {
    tableExpand
  }
};
