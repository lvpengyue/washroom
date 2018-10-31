import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 货架
     * @type {Object}
     */
    data: ''
};

const ORDER_LAUNDRY_SET_DATA = 'ORDER_LAUNDRY_SET_DATA';

const mutations = {

    /**
     * 设置在厂订单数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ORDER_LAUNDRY_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用货架列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async orderLaundryGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_ORDER_LAUNDRY_LIST,
                params
            });

            commit({
                type: ORDER_LAUNDRY_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取在厂订单失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取货架数据
     * @param {Object} state state
     * @return {Object} data 货架数据
     */
    orderLaundryData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
