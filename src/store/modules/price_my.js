import util from 'util';
import $apiConf from '../$api-conf';

const state = {

    /**
     * 工厂加工费
     * @type {Object}
     */
    data: ''
};

const PRICE_MY_SET_DATA = 'PRICE_MY_SET_DATA';

const mutations = {

    /**
     * 设置我的工厂加工费
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRICE_MY_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用工厂列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async priceMyGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_LAUNDRY_LIST_CATEGORY_PRICE,
                params
            });

            commit({
                type: PRICE_MY_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取我的工厂加工费失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取我的工厂加工费
     * @param {Object} state state
     * @return {Object} data 我的工厂加工费
     */
    priceMyData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
