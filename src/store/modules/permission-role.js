import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 角色列表
     * @type {Object}
     */
    data: '',
    allocate: '', // 角色分配权限
    add: '', // 新增、修改角色结果
    del: '', // 删除角色
};

const PERMISSION_ROLE_SET_DATA = 'PERMISSION_ROLE_SET_DATA';
const PERMISSION_ROLE_SET_ALLOCATE = 'PERMISSION_ROLE_SET_ALLOCATE';
const PERMISSION_ROLE_SET_ADD = 'PERMISSION_ROLE_SET_ADD';
const PERMISSION_ROLE_SET_DEL = 'PERMISSION_ROLE_SET_DEL';

const mutations = {

    /**
     * 设置角色列表数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_ROLE_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 角色分配权限
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_ROLE_SET_ALLOCATE](state, mutation) {
        state.allocate = mutation.payload;
    },

    /**
     * 新增、编辑角色数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_ROLE_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 删除角色数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_ROLE_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    }
};

const actions = {
    /**
     * 调用角色列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionRoleGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_USER_LIST_ROLE,
                params: params
            });

            commit({
                type: PERMISSION_ROLE_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取角色列表数据失败:${error.code}`);
        }
    },

      /**
     * 调用分配权限接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionRoleGetAllocate({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_ALLOCATE_PERMISSION,
                params: params
            });

            commit({
                type: PERMISSION_ROLE_SET_ALLOCATE,
                payload: response
            });
        } catch (error) {
            console.log(`角色分配权限失败:${error.code}`);
        }
    },

    /**
     * 调用新增/编辑角色接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionRoleGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_MODIFY_ROLE,
                params: params
            });

            commit({
                type: PERMISSION_ROLE_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`新增/编辑角色失败:${error.code}`);
        }
    },

    /**
     * 调用删除角色接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionRoleGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_DELETE_ROLE,
                params: params
            });

            commit({
                type: PERMISSION_ROLE_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除角色失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 角色列表数据
     * @param {Object} state state
     * @return {Object} data 角色列表数据
     */
    permissionRoleData(state) {
        return state.data;
    },

    /**
     * 获取角色分配权限
     * @param {Object} state state
     * @return {Object} allocate 角色分配权限
     */
    permissionRoleAllocate(state) {
        return state.allocate;
    },


    /**
     * 新增角色
     * @param {Object} state state
     * @return {Object} add 新增
     */
    permissionRoleAdd(state) {
        return state.add;
    },

    /**
     * 获取删除分配权限
     * @param {Object} state state
     * @return {Object} del 删除分配权限
     */
    permissionRoleDel(state) {
        return state.del;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
