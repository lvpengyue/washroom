import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 订单列表
     * @type {Object}
     */
    data: '',
    detail: '', // 衣物详情
};

const ORDER_CLOTHES_SET_DATA = 'ORDER_CLOTHES_SET_DATA';
const ORDER_CLOTHES_SET_DETAIL = 'ORDER_CLOTHES_SET_DETAIL';

const mutations = {

    /**
     * 设置订单列表数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ORDER_CLOTHES_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置衣物详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ORDER_CLOTHES_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    }
};

const actions = {
    /**
     * 调用订单列表列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async orderClothesGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_SORT_CLOTHES_LIST,
                params
            });

            commit({
                type: ORDER_CLOTHES_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取订单列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用衣物详情
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async orderClothesGetDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_PACKING_ORDER_CLOTHES,
                params
            });

            commit({
                type: ORDER_CLOTHES_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log(`获取订单衣物列表失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取订单列表数据
     * @param {Object} state state
     * @return {Object} data 订单列表数据
     */
    orderClothesData(state) {
        return state.data;
    },

    /**
     * 衣物详情
     * @param {Object} state state
     * @return {Object} valid 审核数据
     */
    orderClothesDetail(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
