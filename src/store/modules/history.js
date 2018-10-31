import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 操作记录
     * @type {Object}
     */
    data: ''
};

const HISTORY_SET_DATA = 'HISTORY_SET_DATA';

const mutations = {

    /**
     * 设置操作记录数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [HISTORY_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用操作记录接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async historyGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_USER_LIST_OP_RECORD,
                params: params
            });

            commit({
                type: HISTORY_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取操作记录失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取操作记录数据
     * @param {Object} state state
     * @return {Object} data 申请退款
     */
    historyData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
