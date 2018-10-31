import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () =>
        import ('@/views/login.vue')
};

// export const registerRouter = {
//     path: '/register',
//     name: 'register',
//     meta: {
//         title: 'register - 注册'
//     },
//     component: () =>
//         import ('@/views/register/index.vue')
// };

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () =>
        import ('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: 'home',
            title: {
                i18n: 'home'
            },
            name: 'home_index',
            component: () =>
                import ('@/views/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            // access: '0',
            name: 'ownspace_index',
            component: () =>
                import ('@/views/own-space/own-space.vue')
        },
        {
            path: 'edit-user/:agentId',
            title: '查看修改信息',
            // access: '0',
            name: 'edit-user',
            component: () =>
                import ('@/views/edit-user/index.vue')
        },
        // { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        // { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        // { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: '/permission',
        icon: 'ios-cog',
        name: 'permission',
        title: '权限管理',
        access: 0,
        component: Main,
        children: [{
                path: 'index',
                title: '人员列表',
                access: 0,
                name: 'permission_index',
                component: () =>
                    import ('@/views/permission-index/index.vue')
            },
            {
                path: 'role',
                title: '角色列表',
                access: 0,
                name: 'permission_role',
                component: () =>
                    import ('@/views/permission-role/index.vue')
            },
            {
                path: 'resource',
                title: '资源列表',
                access: 0,
                name: 'permission_resource',
                component: () =>
                    import ('@/views/permission-resource/index.vue')
            }
        ]
    },
    {
        path: '/shelf',
        icon: 'ios-body',
        name: 'shelf',
        title: '货架管理',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '货架管理',
            access: 0,
            name: 'shelf_index',
            component: () =>
                import ('@/views/shelf/index.vue')
        }]
    },
    {
        path: '/laundry',
        icon: 'ios-body',
        name: 'laundry',
        title: '工厂管理',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '工厂管理',
            access: 0,
            name: 'laundry_index',
            component: () =>
                import ('@/views/laundry/index.vue')
        }]
    },
    {
        path: '/brand',
        icon: 'ios-body',
        name: 'brand',
        title: '品牌管理',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '品牌管理',
            access: 0,
            name: 'brand_index',
            component: () =>
                import ('@/views/brand/index.vue')
        }]
    },
    {
        path: '/category',
        icon: 'ios-body',
        name: 'category',
        title: '品类管理',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '品类管理',
            access: 0,
            name: 'category_index',
            component: () =>
                import ('@/views/category/index.vue')
        }]
    },
    {
        path: '/sort',
        icon: 'ios-body',
        name: 'sort',
        title: '分拣',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '分拣',
            access: 0,
            name: 'sort_index',
            component: () =>
                import ('@/views/sort/index.vue')
        }]
    },
    {
        path: '/quality',
        icon: 'ios-body',
        name: 'quality',
        title: '质检',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '开始质检',
            access: 0,
            name: 'quality_index',
            component: () =>
                import ('@/views/quality/index.vue')
        }]
    },
    {
        path: '/pack',
        icon: 'ios-navigate',
        name: 'pack',
        title: '签收发货管理',
        access: 0,
        component: Main,
        children: [{
                path: 'sign',
                title: '订单签收',
                name: 'pack_sign',
                access: 0,
                component: () =>
                    import ('@/views/pack_sign/index.vue')
            },
            {
                path: 'delivery',
                title: '订单发货',
                name: 'pack_delivery',
                access: 0,
                component: () =>
                    import ('@/views/pack_delivery/index.vue')
            }
        ]
    },
    {
        path: '/order',
        icon: 'ios-navigate',
        name: 'order',
        title: '订单管理',
        access: 0,
        component: Main,
        children: [{
                path: 'index',
                title: '订单列表',
                name: 'order_index',
                access: 0,
                component: () =>
                    import ('@/views/order_index/index.vue')
            },
            {
                path: 'return',
                title: '返洗订单列表',
                name: 'order_return',
                access: 0,
                component: () =>
                    import ('@/views/order_return/index.vue')
            },
            {
                path: 'clothes',
                title: '衣物列表',
                name: 'order_clothes',
                access: 0,
                component: () =>
                    import ('@/views/order_clothes/index.vue')
            },
            {
                path: 'myquality',
                title: '我质检的衣物',
                name: 'order_myquality',
                access: 0,
                component: () =>
                    import ('@/views/order_myquality/index.vue')
            },
            // {
            //     path: 'qualityerror',
            //     title: '质检不合格的衣物',
            //     name: 'order_qualityerror',
            //     // access: 0,
            //     component: () =>
            //         import ('@/views/order_qualityerror/index.vue')
            // },
            {
                path: 'laundry',
                title: '在厂订单',
                name: 'order_laundry',
                access: 0,
                component: () =>
                    import ('@/views/order_laundry/index.vue')
            },
            {
                path: 'packing',
                title: '待打包订单',
                name: 'order_packing',
                access: 0,
                component: () =>
                    import ('@/views/order_packing/index.vue')
            },
            {
                path: 'packed',
                title: '已打包订单',
                name: 'order_packed',
                access: 0,
                component: () =>
                    import ('@/views/order_packed/index.vue')
            },
            {
                path: 'money',
                title: '加工费结算列表',
                name: 'order_money',
                access: 0,
                component: () =>
                    import ('@/views/order_money/index.vue')
            }
        ]
    },
    {
        path: '/price',
        icon: 'ios-photos',
        name: 'price',
        title: '加工费',
        access: 0,
        component: Main,
        children: [{
            path: 'my',
            title: '我的加工费',
            name: 'price_my',
            access: 0,
            component: () =>
                import ('@/views/price_my/index.vue')
        }]
    },
    {
        path: '/history',
        icon: 'ios-photos',
        name: 'history',
        title: '操作记录',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '操作记录',
            name: 'history_index',
            access: 0,
            component: () =>
                import ('@/views/history/index.vue')
        }]
    },
    // {
    //     path: '/print',
    //     icon: 'ios-photos',
    //     name: 'print',
    //     title: '条码打印',
    //     // access: 0,
    //     component: Main,
    //     children: [{
    //         path: 'code',
    //         title: '条码打印',
    //         name: 'print_code',
    //         // access: 0,
    //         component: () =>
    //             import ('@/views/print-code/index.vue')
    //     }]
    // },
    // {
    //     path: '/washer',
    //     icon: 'ios-cog',
    //     name: 'washer',
    //     // access: 0,
    //     title: '洗衣机更新',
    //     component: Main,
    //     children: [{
    //             path: 'batch',
    //             title: '批量更新',
    //             // access: 0,
    //             name: 'washer_batch',
    //             component: () =>
    //                 import ('@/views/washer-batch/index.vue')
    //         },
    //         {
    //             path: 'single',
    //             title: '单台更新',
    //             // access: 0,
    //             name: 'washer_single',
    //             component: () =>
    //                 import ('@/views/washer-single/index.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: () => import('@/views/international/international.vue') }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'scroll-bar',
    //             icon: 'android-upload',
    //             name: 'scroll-bar',
    //             title: '滚动条',
    //             component: () => import('@/views/my-components/scroll-bar/scroll-bar-page.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
    //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }

    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
    //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
    //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
    //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
    //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];