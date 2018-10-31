import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 品类
     * @type {Object}
     */
    data: '',
    edit: '', // 新增/编辑
    delete: '', // 删除
};

const CATEGORY_SET_DATA = 'CATEGORY_SET_DATA';
const CATEGORY_SET_EDIT = 'CATEGORY_SET_EDIT';
const CATEGORY_SET_DELETE = 'CATEGORY_SET_DELETE';

const mutations = {

    /**
     * 设置品类数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CATEGORY_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置启用/禁用数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CATEGORY_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },

    /**
     * 设置删除数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CATEGORY_SET_DELETE](state, mutation) {
        state.delete = mutation.payload;
    }
};

const actions = {
    /**
     * 调用品类列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async categoryGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_CATEGORY_LIST,
                params
            });

            commit({
                type: CATEGORY_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取品类数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增、编辑接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async categoryGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_CATEGORY_UPDATE,
                params
            });

            commit({
                type: CATEGORY_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`新增、编辑品类:${error.code}`);
        }
    },

    /**
     * 调用删除接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async categoryGetDelete({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_CATEGORY_DELETE,
                params
            });

            commit({
                type: CATEGORY_SET_DELETE,
                payload: response
            });
        } catch (error) {
            console.log(`删除品类失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取品类数据
     * @param {Object} state state
     * @return {Object} data 品类数据
     */
    categoryData(state) {
        return state.data;
    },

    /**
     * 新增、编辑品类
     * @param {Object} state state
     * @return {Object} valid 审核数据
     */
    categoryEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除
     * @param {Object} state state
     * @return {Object} edit 启用、禁用
     */
    categoryDelete(state) {
        return state.delete;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
