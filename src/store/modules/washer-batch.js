import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 批量记录查询
     * @type {Object}
     */
    data: '',
    add: '' // 加入定时任务的结果
};

const WASHER_BATCH_SET_DATA = 'WASHER_BATCH_SET_DATA';
const WASHER_BATCH_SET_ADD = 'WASHER_BATCH_SET_ADD';

const mutations = {

    /**
     * 设置批量记录查询数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [WASHER_BATCH_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置加入定时任务的结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [WASHER_BATCH_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },
};

const actions = {
    /**
     * 调用批量记录查询接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async washerBatchGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_DEV_CONFIRM_WASHERS,
                params: params
            });

            commit({
                type: WASHER_BATCH_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取批量记录失败:${error.code}`);
        }
    },

    /**
     * 调用批量记录加入定时任务接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async washerBatchGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_DEV_ADD_BUSCONF,
                params: params
            });

            commit({
                type: WASHER_BATCH_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`加入定时任务失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取批量记录查询数据
     * @param {Object} state state
     * @return {Object} data 申请退款
     */
    washerBatchData(state) {
        return state.data;
    },

    /**
     * 获取批量记录查询数据
     * @param {Object} state state
     * @return {Object} data 申请退款
     */
    washerBatchAdd(state) {
        return state.add;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
