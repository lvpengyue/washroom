import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 订单列表
     * @type {Object}
     */
    data: '',
    pack: '', // 打包详情
};

const ORDER_PACKED_SET_DATA = 'ORDER_PACKED_SET_DATA';
const ORDER_PACKED_SET_PACK = 'ORDER_PACKED_SET_PACK';

const mutations = {

    /**
     * 设置订单列表数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ORDER_PACKED_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置衣物详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ORDER_PACKED_SET_PACK](state, mutation) {
        state.pack = mutation.payload;
    }
};

const actions = {
    /**
     * 调用订单列表列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async orderPackedGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_PACKING_PACKED_LIST,
                params
            });

            commit({
                type: ORDER_PACKED_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取已打包订单列表失败:${error.code}`);
        }
    },

    /**
     * 调用衣物详情
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async orderPackedGetPack({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_PACKED_PACKED_ORDER,
                params
            });

            commit({
                type: ORDER_PACKED_SET_PACK,
                payload: response
            });
        } catch (error) {
            console.log(`获取待打包订单列表失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取订单列表数据
     * @param {Object} state state
     * @return {Object} data 订单列表数据
     */
    orderPackedData(state) {
        return state.data;
    },

    /**
     * 衣物详情
     * @param {Object} state state
     * @return {Object} valid 审核数据
     */
    orderPackedPack(state) {
        return state.pack;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
