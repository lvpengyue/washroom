import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 单台记录查询
     * @type {Object}
     */
    data: '',
    update: '' // 更新洗衣机的结果
};

const WASHER_SINGLE_SET_DATA = 'WASHER_SINGLE_SET_DATA';
const WASHER_SINGLE_SET_UPDATE = 'WASHER_SINGLE_SET_UPDATE';

const mutations = {

    /**
     * 设置单台记录查询数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [WASHER_SINGLE_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置更新洗衣机的结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [WASHER_SINGLE_SET_UPDATE](state, mutation) {
        state.update = mutation.payload;
    },
};

const actions = {
    /**
     * 调用单台记录查询接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async washerSingleGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_DEV_CONFIRM_WASHER,
                params: params
            });

            commit({
                type: WASHER_SINGLE_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取单台记录失败:${error.code}`);
        }
    },

    /**
     * 调用单台记录更新洗衣机接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async washerSingleGetUpdate({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_DEV_UPDATE_WASHER,
                params: params
            });

            commit({
                type: WASHER_SINGLE_SET_UPDATE,
                payload: response
            });
        } catch (error) {
            console.log(`更新洗衣机失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取单台记录查询数据
     * @param {Object} state state
     * @return {Object} data 申请退款
     */
    washerSingleData(state) {
        return state.data;
    },

    /**
     * 获取单台记录查询数据
     * @param {Object} state state
     * @return {Object} data 申请退款
     */
    washerSingleUpdate(state) {
        return state.update;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
