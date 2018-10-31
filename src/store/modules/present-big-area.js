import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 大区备案
     * @type {Object}
     */
    data: '',
};

const PRESENT_BIG_AREA_SET_DATA = 'PRESENT_BIG_AREA_SET_DATA';

const mutations = {

    /**
     * 设置大区备案数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_BIG_AREA_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用大区备案接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentBigAreaGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_MAIN_DISTRICT_SCHOOL,
                params: params
            });

            commit({
                type: PRESENT_BIG_AREA_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取大区备案列表失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取大区备案数据
     * @param {Object} state state
     * @return {Object} data 申请退款
     */
    presentBigAreaData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
