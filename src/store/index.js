import Vue from 'vue';
import Vuex from 'vuex';

import $apis from './modules/$apis';
import app from './modules/app';
import user from './modules/user';
import login from './modules/login';
import register from './modules/register';
import shelf from './modules/shelf';
import laundry from './modules/laundry';
import category from './modules/category';
import brand from './modules/brand';
import orderIndex from './modules/order_index';
import orderClothes from './modules/order_clothes';
import orderLaundry from './modules/order_laundry';
import orderPacking from './modules/order_packing';
import orderPacked from './modules/order_packed';
import orderMoney from './modules/order_Money';
import sort from './modules/sort';
import packSign from './modules/pack_sign';
import packDelivery from './modules/pack_delivery';
import quality from './modules/quality';
import orderQuality from './modules/order_quality';
import priceMy from './modules/price_my';

import present from './modules/present';
import presentAdd from './modules/present-add';
import ownSpace from './modules/own-space';
import history from './modules/history';
import main from './modules/main';
import editUser from './modules/edit-user';
import permissionIndex from './modules/permission-index';
import permissionRole from './modules/permission-role';
import permissionResource from './modules/permission-resource';
import presentArea from './modules/present-area';
import presentBigArea from './modules/present-big-area';
import washerBatch from './modules/washer-batch';
import washerSingle from './modules/washer-single';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        main,
        user,
        $apis,
        login,
        register,
        shelf,
        packSign,
        packDelivery,
        orderQuality,
        laundry,
        quality,
        priceMy,
        category,
        brand,
        ownSpace,
        sort,
        orderIndex,
        orderClothes,
        orderPacking,
        orderPacked,
        orderLaundry,
        orderMoney,
        present,
        presentAdd,
        history,
        editUser,
        permissionIndex,
        permissionRole,
        permissionResource,
        presentBigArea,
        presentArea,
        washerBatch,
        washerSingle
    }
});

export default store;
