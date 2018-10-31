import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 品牌
     * @type {Object}
     */
    data: '',
    edit: '', // 新增/编辑
    delete: '', // 删除
};

const BRAND_SET_DATA = 'BRAND_SET_DATA';
const BRAND_SET_EDIT = 'BRAND_SET_EDIT';
const BRAND_SET_DELETE = 'BRAND_SET_DELETE';

const mutations = {

    /**
     * 设置品牌数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [BRAND_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置启用/禁用数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [BRAND_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },

    /**
     * 设置删除数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [BRAND_SET_DELETE](state, mutation) {
        state.delete = mutation.payload;
    }
};

const actions = {
    /**
     * 调用品牌列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async brandGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_BRAND_LIST,
                params
            });

            commit({
                type: BRAND_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取品牌数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增、编辑接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async brandGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_BRAND_UPDATE,
                params
            });

            commit({
                type: BRAND_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`新增、编辑品牌:${error.code}`);
        }
    },

    /**
     * 调用删除接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async brandGetDelete({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_BRAND_DELETE,
                params
            });

            commit({
                type: BRAND_SET_DELETE,
                payload: response
            });
        } catch (error) {
            console.log(`删除品牌失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取品牌数据
     * @param {Object} state state
     * @return {Object} data 品牌数据
     */
    brandData(state) {
        return state.data;
    },

    /**
     * 新增、编辑品牌
     * @param {Object} state state
     * @return {Object} valid 审核数据
     */
    brandEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除
     * @param {Object} state state
     * @return {Object} edit 启用、禁用
     */
    brandDelete(state) {
        return state.delete;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
