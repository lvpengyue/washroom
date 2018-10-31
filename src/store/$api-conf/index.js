import conf from '../conf';
const baseUrl = conf.baseUrl;

export default {
    /*
        登陆接口
    */
    LOGIN: {
        name: 'LOGIN',

        proxy: {
            url: `${baseUrl}/api/login`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        退出
    */
    LOGOUT: {
        name: 'LOGOUT',

        proxy: {
            url: `${baseUrl}/api/logout`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        修改密码
    */
    API_USER_UPDATE_PASSWORD: {
        name: 'API_USER_UPDATE_PASSWORD',

        proxy: {
            url: `${baseUrl}/api/user/update/password`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        图片上传
    */
    FILE_UPLOAD_BASE64: {
        name: 'FILE_UPLOAD_BASE64',

        proxy: {
            url: `${baseUrl}/fileupload/base64`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        基础数据列表
    */
    API_LAUNDRY_DATA: {
        name: 'API_LAUNDRY_DATA',

        proxy: {
            url: `${baseUrl}/api/laundry-data`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // ----------------------------------------------- 权限模块 ----------------------------------

    /*
        所有人员列表
    */
    API_USER_LIST: {
        name: 'API_USER_LIST',

        proxy: {
            url: `${baseUrl}/api/user/list`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // /*
    //     人员详情
    // */
    // ERP_USER_DETAIL_BY_ADMIN: {
    //     name: 'ERP_USER_DETAIL_BY_ADMIN',

    //     proxy: {
    //         url: `${baseUrl}/api/factory/userDetailByAdmin`,
    //         method: 'POST',
    //         dataType: 'json',
    //         xhrFields: {
    //             withCredentials: true
    //         }
    //     }
    // },

    /*
        增加/修改管理员（人员）
    */
    API_USER_UPDATE: {
        name: 'API_USER_UPDATE',

        proxy: {
            url: `${baseUrl}/api/user/update`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        管理员重置密码
    */
    API_USER_RESET_PWD: {
        name: 'API_USER_RESET_PWD',

        proxy: {
            url: `${baseUrl}/api/user/reset-pwd`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        管理员启用、禁用用户
    */
    API_USER_DISABLE: {
        name: 'API_USER_DISABLE',

        proxy: {
            url: `${baseUrl}/api/user/disable`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        分配权限
    */
    ERP_ALLOCATE_PERMISSION: {
        name: 'ERP_ALLOCATE_PERMISSION',

        proxy: {
            url: `${baseUrl}/api/factory/allocatePermission`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        添加和修改角色
    */
    ERP_MODIFY_ROLE: {
        name: 'ERP_MODIFY_ROLE',

        proxy: {
            url: `${baseUrl}/api/factory/modifyRole`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除角色
    */
    ERP_DELETE_ROLE: {
        name: 'ERP_DELETE_ROLE',

        proxy: {
            url: `${baseUrl}/api/factory/deleteRole`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        角色列表
    */
    API_USER_LIST_ROLE: {
        name: 'API_USER_LIST_ROLE',

        proxy: {
            url: `${baseUrl}/api/factory/roleList`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        权限列表
    */
    ERP_PERMISSION_LIST: {
        name: 'ERP_PERMISSION_LIST',

        proxy: {
            url: `${baseUrl}/api/factory/permissionList`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        增加/修改权限资源
    */
    ERP_ADD_PERMISSION: {
        name: 'ERP_ADD_PERMISSION',

        proxy: {
            url: `${baseUrl}/api/factory/addPermission`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除权限资源
    */
    ERP_DELETE_PERMISSION: {
        name: 'ERP_DELETE_PERMISSION',

        proxy: {
            url: `${baseUrl}/api/factory/deletePermission`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // -------------------------  操作记录    ---------------------------

    /*
        操作记录
    */
    API_USER_LIST_OP_RECORD: {
        name: 'API_USER_LIST_OP_RECORD',

        proxy: {
            url: `${baseUrl}/api/user/list/op-record`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // -------------------------- 管理员订单管理 ------------------

    /*
        订单列表
    */
    API_QUALITY_ORDER_LIST: {
        name: 'API_QUALITY_ORDER_LIST',

        proxy: {
            url: `${baseUrl}/api/quality/orderList`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // ---------------------- 货架接口 ------------

    /*
        货架列表
    */
    API_SHELF_LIST: {
        name: 'API_SHELF_LIST',

        proxy: {
            url: `${baseUrl}/api/shelf/list`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增、修改货架
    */
    API_SHELF_UPDATE: {
        name: 'API_SHELF_UPDATE',

        proxy: {
            url: `${baseUrl}/api/shelf/update`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除货架
    */
    API_SHELF_DELETE: {
        name: 'API_SHELF_DELETE',

        proxy: {
            url: `${baseUrl}/api/shelf/delete`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // ---------------------- 品牌接口 ------------

    /*
        品牌列表
    */
    API_BRAND_LIST: {
        name: 'API_BRAND_LIST',

        proxy: {
            url: `${baseUrl}/api/brand/list`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增、修改品牌
    */
    API_BRAND_UPDATE: {
        name: 'API_BRAND_UPDATE',

        proxy: {
            url: `${baseUrl}/api/brand/update`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除品牌
    */
    API_BRAND_DELETE: {
        name: 'API_BRAND_DELETE',

        proxy: {
            url: `${baseUrl}/api/brand/delete`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // ---------------------- 品类接口 ------------

    /*
        货架列表
    */
    API_CATEGORY_LIST: {
        name: 'API_CATEGORY_LIST',

        proxy: {
            url: `${baseUrl}/api/category/list`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增、修改货架
    */
    API_CATEGORY_UPDATE: {
        name: 'API_CATEGORY_UPDATE',

        proxy: {
            url: `${baseUrl}/api/category/update`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除货架
    */
    API_CATEGORY_DELETE: {
        name: 'API_CATEGORY_DELETE',

        proxy: {
            url: `${baseUrl}/api/category/delete`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // ---------------------- 工厂接口 ------------

    /*
        工厂列表
    */
    API_LAUNDRY_LIST: {
        name: 'API_LAUNDRY_LIST',

        proxy: {
            url: `${baseUrl}/api/laundry/list`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增、修改工厂
    */
    API_LAUNDRY_UPDATE: {
        name: 'API_LAUNDRY_UPDATE',

        proxy: {
            url: `${baseUrl}/api/laundry/update`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除工厂
    */
    API_LAUNDRY_DELETE: {
        name: 'API_LAUNDRY_DELETE',

        proxy: {
            url: `${baseUrl}/api/laundry/delete`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        获取工厂衣物类别价格
    */
    API_LAUNDRY_GET_CATEGORYS: {
        name: 'API_LAUNDRY_GET_CATEGORYS',

        proxy: {
            url: `${baseUrl}/api/laundry/get-categorys`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        提交--设置工厂加工价格
    */
    API_LAUNDRY_SET_PROCESS_PRICE: {
        name: 'API_LAUNDRY_SET_PROCESS_PRICE',

        proxy: {
            url: `${baseUrl}/api/laundry/set-process-price`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charseT=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // ---------------------- 分拣接口 ------------

    /*
        分拣订单列表
    */
    API_SORT_ORDER_LIST: {
        name: 'API_SORT_ORDER_LIST',

        proxy: {
            url: `${baseUrl}/api/sort/order/list`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        扫袋子码分拣（里面包含了已添加的衣服列表）
    */
    API_SORT_ORDER_DETAILS: {
        name: 'API_SORT_ORDER_DETAILS',

        proxy: {
            url: `${baseUrl}/api/sort/order/details`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        扫完袋子码后新增衣物
    */
    API_SORT_CLOTHES_ADD: {
        name: 'API_SORT_CLOTHES_ADD',

        proxy: {
            url: `${baseUrl}/api/sort/clothes/add`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除衣物
    */
    API_SORT_ORDER_DELETE_CLOTHES: {
        name: 'API_SORT_ORDER_DELETE_CLOTHES',

        proxy: {
            url: `${baseUrl}/api/sort/order/delete-clothes`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        检验完成，开始下一单(该袋子再次扫描就会code为0，并给用户弹出信息)
    */
    API_SORT_ORDER_TEST_COMPLETE: {
        name: 'API_SORT_ORDER_TEST_COMPLETE',

        proxy: {
            url: `${baseUrl}/api/sort/order/test-complete`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        衣物列表
    */
    API_SORT_CLOTHES_LIST: {
        name: 'API_SORT_CLOTHES_LIST',

        proxy: {
            url: `${baseUrl}/api/sort/clothes/list`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        查询订单中的衣物
    */
    API_PACKING_ORDER_CLOTHES: {
        name: 'API_PACKING_ORDER_CLOTHES',

        proxy: {
            url: `${baseUrl}/api/packing/order/clothes`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        查询返洗衣物列表
    */
    API_SORT_ORDER_LIST_RETURN_CLOTHES: {
        name: 'API_SORT_ORDER_LIST_RETURN_CLOTHES',

        proxy: {
            url: `${baseUrl}/api/sort/order/list/return-clothes`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        收银
    */
    API_SORT_ORDER_COLLECT_MONEY: {
        name: 'API_SORT_ORDER_COLLECT_MONEY',

        proxy: {
            url: `${baseUrl}/api/sort/order/collect-money`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /* ----------------------------    仓管员     ----------------------- */
    /*
        订单签收
    */
    API_PACKING_ORDER_SIGN: {
        name: 'API_PACKING_ORDER_SIGN',

        proxy: {
            url: `${baseUrl}/api/packing/order/sign`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        订单发货
    */
    API_PACKING_ORDER_DELIVERY: {
        name: 'API_PACKING_ORDER_DELIVERY',

        proxy: {
            url: `${baseUrl}/api/packing/order/delivery`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        在厂订单
    */
    API_ORDER_LAUNDRY_LIST: {
        name: 'API_ORDER_LAUNDRY_LIST',

        proxy: {
            url: `${baseUrl}/api/packing/order/laundry-list`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // ----------------------------------------------质检--------------------------------------

    /*
        开始扫码质检
    */
    API_QUALITY_GET_CLOTH_BY_SCAN: {
        name: 'API_QUALITY_GET_CLOTH_BY_SCAN',

        proxy: {
            url: `${baseUrl}/api/quality/getClothByScan`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        衣服质检
    */
    API_QUALITY_CHECK: {
        name: 'API_QUALITY_CHECK',

        proxy: {
            url: `${baseUrl}/api/quality/qualityCheck`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        我质检的衣物列表
    */
    API_QUALITY_CLOTH_LIST: {
        name: 'API_QUALITY_CLOTH_LIST',

        proxy: {
            url: `${baseUrl}/api/quality/clothList`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // -------------------------------- 包装员  ---------------------------------

    /*
        待打包列表
    */
    API_PACKING_WAIT_FOR_PACKING_LIST: {
        name: 'API_PACKING_WAIT_FOR_PACKING_LIST',

        proxy: {
            url: `${baseUrl}/api/packing/waitForPackingList`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        已打包列表
    */
    API_PACKING_PACKED_LIST: {
        name: 'API_PACKING_PACKED_LIST',

        proxy: {
            url: `${baseUrl}/api/packing/packedList`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        打包
    */
    API_PACKING_PACKING_ORDER: {
        name: 'API_PACKING_PACKING_ORDER',

        proxy: {
            url: `${baseUrl}/api/packing/packingOrder`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        生成二维码接口
    */
    GEN_QR_CODE: {
        name: 'GEN_QR_CODE',

        proxy: {
            url: `${baseUrl}/gen/qr-code`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // --------------------------------------------------------------------加工费----------------------

    /*
        我的工厂加工费
    */
    API_LAUNDRY_LIST_CATEGORY_PRICE: {
        name: 'API_LAUNDRY_LIST_CATEGORY_PRICE',

        proxy: {
            url: `${baseUrl}/api/laundry/list/category-price`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // --------------------------------------------------------------------加工费结算列表----------------------

    /*
        加工费结算列表
    */
    API_LAUNDRY_LIST_PROCESS_PRICE: {
        name: 'API_LAUNDRY_LIST_PROCESS_PRICE',

        proxy: {
            url: `${baseUrl}/api/laundry/list/process-price`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    }
};
