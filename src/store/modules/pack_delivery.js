import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 发货
     * @type {Object}
     */
    data: '',
};

const PACK_DELIVERYSET_DATA = 'PACK_DELIVERYSET_DATA';

const mutations = {

    /**
     * 设置发货数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PACK_DELIVERYSET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用发货列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async packDeliveryGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_PACKING_ORDER_DELIVERY,
                params
            });

            commit({
                type: PACK_DELIVERYSET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取发货数据失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取发货数据
     * @param {Object} state state
     * @return {Object} data 发货数据
     */
    packDeliveryData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
