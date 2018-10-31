import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 订单
     * @type {Object}
     */
    data: '',
    next: '' // 确认进行下一单
};

const QUALITY_SET_DATA = 'QUALITY_SET_DATA';
const QUALITY_SET_NEXT= 'QUALITY_SET_NEXT';

const mutations = {

    /**
     * 设置订单数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [QUALITY_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置下一步数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [QUALITY_SET_NEXT](state, mutation) {
        state.next = mutation.payload;
    }
};

const actions = {
    /**
     * 调用订单列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async qualityGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_QUALITY_GET_CLOTH_BY_SCAN,
                params
            });

            commit({
                type: QUALITY_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取质检衣服信息失败:${error.code}`);
        }
    },

    /**
     * 调用下一步接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async qualityGetNext({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_QUALITY_CHECK,
                params
            });

            commit({
                type: QUALITY_SET_NEXT,
                payload: response
            });
        } catch (error) {
            console.log(`质检衣物失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取订单数据
     * @param {Object} state state
     * @return {Object} data 订单数据
     */
    qualityData(state) {
        return state.data;
    },

    /**
     * 获取下一步
     * @param {Object} state state
     * @return {Object} edit 启用、禁用
     */
    qualityNext(state) {
        return state.next;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
