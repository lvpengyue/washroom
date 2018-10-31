import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 货架
     * @type {Object}
     */
    data: '',
    edit: '', // 新增/编辑
    delete: '', // 删除
};

const SHELF_SET_DATA = 'SHELF_SET_DATA';
const SHELF_SET_EDIT = 'SHELF_SET_EDIT';
const SHELF_SET_DELETE = 'SHELF_SET_DELETE';

const mutations = {

    /**
     * 设置货架数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SHELF_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置启用/禁用数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SHELF_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },

    /**
     * 设置删除数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SHELF_SET_DELETE](state, mutation) {
        state.delete = mutation.payload;
    }
};

const actions = {
    /**
     * 调用货架列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async shelfGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_SHELF_LIST,
                params
            });

            commit({
                type: SHELF_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取货架数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增、编辑接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async shelfGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_SHELF_UPDATE,
                params
            });

            commit({
                type: SHELF_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`新增、编辑货架:${error.code}`);
        }
    },

    /**
     * 调用删除接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async shelfGetDelete({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_SHELF_DELETE,
                params
            });

            commit({
                type: SHELF_SET_DELETE,
                payload: response
            });
        } catch (error) {
            console.log(`删除货架失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取货架数据
     * @param {Object} state state
     * @return {Object} data 货架数据
     */
    shelfData(state) {
        return state.data;
    },

    /**
     * 新增、编辑货架
     * @param {Object} state state
     * @return {Object} valid 审核数据
     */
    shelfEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除
     * @param {Object} state state
     * @return {Object} edit 启用、禁用
     */
    shelfDelete(state) {
        return state.delete;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
