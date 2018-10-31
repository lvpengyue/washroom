import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 注册
     * @type {Object}
     */
    data: ''
};

const REGISTER_SET_DATA = 'REGISTER_SET_DATA';

const mutations = {

    /**
     * 设置注册数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [REGISTER_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用注册接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async registerGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_REGISTRY,
                params: params
            });

            commit({
                type: REGISTER_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`注册失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取注册数据
     * @param {Object} state state
     * @return {Object} data 注册数据
     */
    registerData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
