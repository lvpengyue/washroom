import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 订单
     * @type {Object}
     */
    data: '',
    edit: '', // 新增/编辑
    delete: '', // 删除
    next: '', // 确认进行下一单
    barCode: '', // 当前的码号
    money: '', // 收银结果
};

const SORT_SET_DATA = 'SORT_SET_DATA';
const SORT_SET_EDIT = 'SORT_SET_EDIT';
const SORT_SET_DELETE = 'SORT_SET_DELETE';
const SORT_SET_NEXT = 'SORT_SET_NEXT';
const SORT_SET_BAR_CODE = 'SORT_SET_BAR_CODE';
const SORT_SET_MONEY = 'SORT_SET_MONEY';

const mutations = {

    /**
     * 设置订单数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SORT_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置启用/禁用数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SORT_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },

    /**
     * 设置删除数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SORT_SET_DELETE](state, mutation) {
        state.delete = mutation.payload;
    },

    /**
     * 设置下一步数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SORT_SET_NEXT](state, mutation) {
        state.next = mutation.payload;
    },

    /**
     * 设置码号
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SORT_SET_BAR_CODE](state, mutation) {
        state.barCode = mutation.payload;
    },

    /**
     * 设置收银结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [SORT_SET_MONEY](state, mutation) {
        state.money = mutation.payload;
    }
};

const actions = {
    /**
     * 调用订单列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async sortGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_SORT_ORDER_DETAILS,
                params
            });

            commit({
                type: SORT_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取订单数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async sortGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_SORT_CLOTHES_ADD,
                params
            });

            commit({
                type: SORT_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`新增、编辑订单:${error.code}`);
        }
    },

    /**
     * 调用删除接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async sortGetDelete({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_SORT_ORDER_DELETE_CLOTHES,
                params
            });

            commit({
                type: SORT_SET_DELETE,
                payload: response
            });
        } catch (error) {
            console.log(`删除订单失败:${error.code}`);
        }
    },

    /**
     * 调用下一步接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async sortGetNext({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_SORT_ORDER_TEST_COMPLETE,
                params
            });

            commit({
                type: SORT_SET_NEXT,
                payload: response
            });
        } catch (error) {
            console.log(`修改订单状态失败:${error.code}`);
        }
    },

    /**
     * 设置码号
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async sortSetBarcode({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: SORT_SET_BAR_CODE,
            payload: params
        });
    },

    /**
     * 收银
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async sortGetMoney({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_SORT_ORDER_COLLECT_MONEY,
                params
            });

            commit({
                type: SORT_SET_MONEY,
                payload: response
            });
        } catch (error) {
            console.log(`收银失败:${error.code}`);
        }
    },
};

const getters = {

    /**
     * 获取订单数据
     * @param {Object} state state
     * @return {Object} data 订单数据
     */
    sortData(state) {
        return state.data;
    },

    /**
     * 新增、编辑订单
     * @param {Object} state state
     * @return {Object} edit edit
     */
    sortEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除
     * @param {Object} state state
     * @return {Object} delete delete
     */
    sortDelete(state) {
        return state.delete;
    },

    /**
     * 获取下一步
     * @param {Object} state state
     * @return {Object} edit 启用、禁用
     */
    sortNext(state) {
        return state.next;
    },

     /**
     * 获取码号
     * @param {Object} state state
     * @return {Object} barCode 码号
     */
    sortBarcode(state) {
        return state.barCode;
    },

    /**
     * 获取收银结果
     * @param {Object} state state
     * @return {Object} price 收银
     */
    sortMoney(state) {
        return state.money;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};
