import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 质检列表
     * @type {Object}
     */
    data: ''
};

const ORDER_QUALITY_SET_DATA = 'ORDER_QUALITY_SET_DATA';

const mutations = {

    /**
     * 设置质检列表数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ORDER_QUALITY_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用质检列表列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async orderQualityGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_QUALITY_CLOTH_LIST,
                params
            });

            commit({
                type: ORDER_QUALITY_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取质检列表数据失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取质检列表数据
     * @param {Object} state state
     * @return {Object} data 质检列表数据
     */
    orderQualityData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
