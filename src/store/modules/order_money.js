import util from 'util';
import $apiConf from '../$api-conf';

const state = {

    /**
     * 工厂加工费
     * @type {Object}
     */
    data: ''
};

const ORDER_MONEY_SET_DATA = 'ORDER_MONEY_SET_DATA';

const mutations = {

    /**
     * 设置我的工厂加工费
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ORDER_MONEY_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用工厂列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async orderMoneyGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_LAUNDRY_LIST_PROCESS_PRICE,
                params
            });

            commit({
                type: ORDER_MONEY_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取加工费列表失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取我的工厂加工费
     * @param {Object} state state
     * @return {Object} data 我的工厂加工费
     */
    orderMoneyData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
