import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 新增报备
     * @type {Object}
     */
    data: '',
    school: '', // 学校是否报备结果
    number: '', // 个人的学校报备数量
    detail: '' // 学校详情
};

const PRESENT_ADD_SET_DATA = 'PRESENT_ADD_SET_DATA';
const PRESENT_ADD_SET_SCHOOL = 'PRESENT_ADD_SET_SCHOOL';
const PRESENT_ADD_SET_NUMBER = 'PRESENT_ADD_SET_NUMBER';
const PRESENT_ADD_SET_DETAIL = 'PRESENT_ADD_SET_DETAIL';

const mutations = {

    /**
     * 设置新增报备数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_ADD_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置学校是否报备数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_ADD_SET_SCHOOL](state, mutation) {
        state.school = mutation.payload;
    },

    /**
     * 设置学校报备数量数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_ADD_SET_NUMBER](state, mutation) {
        state.number = mutation.payload;
    },

    /**
     * 设置学校详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_ADD_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    }
};

const actions = {
    /**
     * 调用新增报备接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentAddGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_SCHOLL_REGISTRY,
                params: params
            });

            commit({
                type: PRESENT_ADD_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取新增报备数据失败:${error.code}`);
        }
    },

    /**
     * 调用审核接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentAddGetSchool({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_FIND_BY_NAME,
                params: params
            });

            commit({
                type: PRESENT_ADD_SET_SCHOOL,
                payload: response
            });
        } catch (error) {
            console.log(`查询报备失败:${error.code}`);
        }
    },

    /**
     * 调用学校报备数量接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentAddGetNumber({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_FIND_SCHOOL_NUM_BY_ID,
                params: params
            });

            commit({
                type: PRESENT_ADD_SET_NUMBER,
                payload: response
            });
        } catch (error) {
            console.log(`学校报备数量失败:${error.code}`);
        }
    },

    /**
     * 调用学校详情
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentAddGetDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_SCHOOL_DETAIL,
                params: params
            });

            commit({
                type: PRESENT_ADD_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log(`获取学校详情失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取新增报备数据
     * @param {Object} state state
     * @return {Object} data 新增报备数据
     */
    presentAddData(state) {
        return state.data;
    },

    /**
     * 获取学校报备数量
     * @param {Object} state state
     * @return {Object} number 报备数量
     */
    presentAddNumber(state) {
        return state.number;
    },

    /**
     * 获取学校是否报备
     * @param {Object} state state
     * @return {Object} school 是否报备
     */
    presentAddSchool(state) {
        return state.school;
    },

    /**
     * 获取学校详情
     * @param {Object} state state
     * @return {Object} school 是否报备
     */
    presentAddDetail(state) {
        return state.detail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
