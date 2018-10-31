import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 报备学校
     * @type {Object}
     */
    data: '',
    school: '', // 学校是否报备结果
    number: '', // 个人的学校报备数量
    modify: '', // 修改备案变更
    users: '', // 所有用户列表
    finished: '', // 报备学校业务完成
    log: '', // 日志
    search: '', // 保存的搜索条件对象
    allData: '' // 所有报备学校
};

const PRESENT_SET_DATA = 'PRESENT_SET_DATA';
const PRESENT_SET_SCHOOL = 'PRESENT_SET_SCHOOL';
const PRESENT_SET_NUMBER = 'PRESENT_SET_NUMBER';
const PRESENT_SET_MODIFY = 'PRESENT_SET_MODIFY';
const PRESENT_SET_USERS = 'PRESENT_SET_USERS';
const PRESENT_SET_FINISHED = 'PRESENT_SET_FINISHED';
const PRESENT_SET_LOG = 'PRESENT_SET_LOG';
const PRESENT_SET_SEARCH = 'PRESENT_SET_SEARCH';
const PRESENT_SET_ALL_DATA = 'PRESENT_SET_ALL_DATA';

const mutations = {

    /**
     * 设置报备学校数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置学校是否报备数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_SET_SCHOOL](state, mutation) {
        state.school = mutation.payload;
    },

    /**
     * 设置学校报备数量数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_SET_NUMBER](state, mutation) {
        state.number = mutation.payload;
    },

    /**
     * 设置修改备案
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_SET_MODIFY](state, mutation) {
        state.modify = mutation.payload;
    },

    /**
     * 设置所有用户
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_SET_USERS](state, mutation) {
        state.users = mutation.payload;
    },

    /**
     * 设置新增日志
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_SET_LOG](state, mutation) {
        state.log = mutation.payload;
    },

    /**
     * 设置完成
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_SET_FINISHED](state, mutation) {
        state.finished = mutation.payload;
    },

    /**
     * 设置搜索条件
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_SET_SEARCH](state, mutation) {
        state.search = mutation.payload;
    },


    /**
     * 设置所有报备学校
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PRESENT_SET_ALL_DATA](state, mutation) {
        state.allData = mutation.payload;
    }
};

const actions = {
    /**
     * 调用报备学校接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_SCHOLL_REGISTRY_LIST,
                params: params
            });

            commit({
                type: PRESENT_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取报备学校数据失败:${error.code}`);
        }
    },

    /**
     * 调用学校是否报备接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentGetSchool({
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
                type: PRESENT_SET_SCHOOL,
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
    async presentGetNumber({
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
                type: PRESENT_SET_NUMBER,
                payload: response
            });
        } catch (error) {
            console.log(`查询学校报备数量失败:${error.code}`);
        }
    },

    /**
     * 调用报备修改接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentGetModify({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_MODIFY_SCHOOL_REGISTRY,
                params: params
            });

            commit({
                type: PRESENT_SET_MODIFY,
                payload: response
            });
        } catch (error) {
            console.log(`学校报备修改失败:${error.code}`);
        }
    },

    /**
     * 调用获取所有用户接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentGetUsers({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_ALL_USERS,
                params: params
            });

            commit({
                type: PRESENT_SET_USERS,
                payload: response
            });
        } catch (error) {
            console.log(`查询所有用户失败:${error.code}`);
        }
    },

    /**
     * 调用新增日志接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentGetLog({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_ADD_LOG,
                params: params
            });

            commit({
                type: PRESENT_SET_LOG,
                payload: response
            });
        } catch (error) {
            console.log(`新增日志失败:${error.code}`);
        }
    },

    /**
     * 调用完成接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentGetFinished({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_FINISHED,
                params: params
            });

            commit({
                type: PRESENT_SET_FINISHED,
                payload: response
            });
        } catch (error) {
            console.log(`修改完成状态失败:${error.code}`);
        }
    },

    /**
     * 调用完成接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentSetSearch({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: PRESENT_SET_SEARCH,
            payload: params
        });
    },

    /**
     * 调用所有报备学校接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async presentGetAllData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_SCHO0L_ID_LIST,
                params: params
            });

            commit({
                type: PRESENT_SET_ALL_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取所有报备学校数据失败:${error.code}`);
        }
    },
};

const getters = {

    /**
     * 获取报备学校数据
     * @param {Object} state state
     * @return {Object} data 报备学校数据
     */
    presentData(state) {
        return state.data;
    },

    /**
     * 获取学校报备数量
     * @param {Object} state state
     * @return {Object} number 报备数量
     */
    presentNumber(state) {
        return state.number;
    },

    /**
     * 获取学校是否报备
     * @param {Object} state state
     * @return {Object} school 是否报备
     */
    presentSchool(state) {
        return state.school;
    },

    /**
     * 获取修改报备
     * @param {Object} state state
     * @return {Object} modify 是否报备
     */
    presentModify(state) {
        return state.modify;
    },

    /**
     * 获取所有用户
     * @param {Object} state state
     * @return {Object} users 所有用户
     */
    presentUsers(state) {
        return state.users;
    },

    /**
     * 获取新增日志
     * @param {Object} state state
     * @return {Object} log 日志
     */
    presentLog(state) {
        return state.log;
    },

    /**
     * 获取完成
     * @param {Object} state state
     * @return {Object} log 日志
     */
    presentFinished(state) {
        return state.finished;
    },

    /**
     * 获取搜索条件
     * @param {Object} state state
     * @return {Object} search search
     */
    presentSearch(state) {
        return state.search;
    },

    /**
     * 获取所有报备学校
     * @param {Object} state state
     * @return {Object} log 日志
     */
    presentAllData(state) {
        return state.allData;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
