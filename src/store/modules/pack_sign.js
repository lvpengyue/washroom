import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 货架
     * @type {Object}
     */
    data: '',
};

const PACK_SIGN_SET_DATA = 'PACK_SIGN_SET_DATA';

const mutations = {

    /**
     * 设置货架数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PACK_SIGN_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用货架列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async packSignGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_PACKING_ORDER_SIGN,
                params
            });

            commit({
                type: PACK_SIGN_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取货架数据失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取货架数据
     * @param {Object} state state
     * @return {Object} data 货架数据
     */
    packSignData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
