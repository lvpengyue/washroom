import util from 'util';
import $apiConf from '../$api-conf';

const state = {

    /**
     * 工厂
     * @type {Object}
     */
    data: '',
    edit: '', // 新增/编辑
    delete: '', // 删除
    price: '', // 工厂加工价格
    editPrice: '' // 修改加工价格结果
};

const LAUNDRY_SET_DATA = 'LAUNDRY_SET_DATA';
const LAUNDRY_SET_EDIT = 'LAUNDRY_SET_EDIT';
const LAUNDRY_SET_DELETE = 'LAUNDRY_SET_DELETE';
const LAUNDRY_SET_PRICE = 'LAUNDRY_SET_PRICE';
const LAUNDRY_SET_EDIT_PRICE = 'LAUNDRY_SET_EDIT_PRICE';

const mutations = {

    /**
     * 设置工厂数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LAUNDRY_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置启用/禁用数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LAUNDRY_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },

    /**
     * 设置删除数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LAUNDRY_SET_DELETE](state, mutation) {
        state.delete = mutation.payload;
    },

    /**
     * 设置工厂加工价格数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LAUNDRY_SET_PRICE](state, mutation) {
        state.price = mutation.payload;
    },

    /**
     * 提交设置工厂价格结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LAUNDRY_SET_EDIT_PRICE](state, mutation) {
        state.editPrice = mutation.payload;
    }
};

const actions = {
    /**
     * 调用工厂列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async laundryGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_LAUNDRY_LIST,
                params
            });

            commit({
                type: LAUNDRY_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取工厂数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增、编辑接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async laundryGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_LAUNDRY_UPDATE,
                params
            });

            commit({
                type: LAUNDRY_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`新增、编辑工厂:${error.code}`);
        }
    },

    /**
     * 调用删除接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async laundryGetDelete({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_LAUNDRY_DELETE,
                params
            });

            commit({
                type: LAUNDRY_SET_DELETE,
                payload: response
            });
        } catch (error) {
            console.log(`删除工厂失败:${error.code}`);
        }
    },

    /**
     * 调用获取工厂加工价格接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async laundryGetPrice({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_LAUNDRY_GET_CATEGORYS,
                params
            });

            commit({
                type: LAUNDRY_SET_PRICE,
                payload: response
            });
        } catch (error) {
            console.log(`获取工厂加工价格失败:${error.code}`);
        }
    },

    /**
     * 调用提交设置工厂加工价格接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async laundryGetEditPrice({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_LAUNDRY_SET_PROCESS_PRICE,
                params: JSON.stringify(params)
            });

            commit({
                type: LAUNDRY_SET_EDIT_PRICE,
                payload: response
            });
        } catch (error) {
            console.log(`提交设置价格失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取工厂数据
     * @param {Object} state state
     * @return {Object} data 工厂数据
     */
    laundryData(state) {
        return state.data;
    },

    /**
     * 新增、编辑工厂
     * @param {Object} state state
     * @return {Object} valid 审核数据
     */
    laundryEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除
     * @param {Object} state state
     * @return {Object} edit 启用、禁用
     */
    laundryDelete(state) {
        return state.delete;
    },

    /**
     * 加工价格
     * @param {Object} state state
     * @return {Object} price 加工价格
     */
    laundryPrice(state) {
        return state.price;
    },

    /**
     * 设置价格
     * @param {Object} state state
     * @return {Object} editPrice 设置价格
     */
    laundryEditPrice(state) {
        return state.editPrice;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
