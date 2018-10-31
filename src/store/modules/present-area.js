import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 区域备案
     * @type {Object}
     */
    data: '',
};

const PRESENT_AREA_SET_DATA = 'PRESENT_AREA_SET_DATA';

const mutations = {

    /**
     * 设置区域备案数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_AREA_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用区域备案接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentAreaGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_DISTRICT_SCHOOL,
                params: params
            });

            commit({
                type: PRESENT_AREA_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取区域备案列表失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取区域备案数据
     * @param {Object} state state
     * @return {Object} data 申请退款
     */
    presentAreaData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
