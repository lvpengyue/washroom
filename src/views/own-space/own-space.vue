<style lang="less">
@import "./own-space.less";






</style>

<template>
    <div class="own-space">
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <ul>
                <li>
                    <span class="title">账号：</span>
                    <span class="value">{{userData.phone}}</span>
                </li>
                <li>
                    <span class="title">姓名：</span>
                    <span class="value">{{userData.name}}</span>
                </li>
                <li>
                    <span class="title">工厂：</span>
                    <span class="value">{{laundry.name}}</span>
                </li>
                <li>
                    <span class="title">角色：</span>
                    <span class="value">{{userRole.name}}</span>
                </li>
                <li>
                    <span class="title">注册时间：</span>
                    <span class="value">{{userData.createTime}}</span>
                </li>
            </ul>
        </Card>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Util from '../../libs/util.js';

export default {
    name: 'ownspace_index',
    data () {
        return {
            userData: '',
            userRole: '',
            laundry: ''
        };
    },
    methods: {
    },
    mounted () {
        this.userData = JSON.parse(Cookies.get('user'));
        this.userRole = JSON.parse(Cookies.get('userRole'));
        this.laundry = JSON.parse(Cookies.get('laundry'));
    },
    computed: {
    },
};
</script>
