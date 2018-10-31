import {mapGetters, mapActions} from 'vuex';
import conf from '../../store/conf';
import alCascader from '../my-components/area-linkage/components/al-cascader.vue';

export default {
    name: 'register',
    components: {
        alCascader
    },
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };

        const validePersonId = (rule, value, callback) => {
            var re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!re.test(value)) {
                callback(new Error('请输入正确的身份证号'));
            } else {
                callback();
            }
        };

        const valideRePassword = (rule, value, callback) => {
            if (value !== this.formValidate.password) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            baseUrl: conf.baseUrl,
            securityCode: '', // 验证码
            phoneHasChanged: false, // 是否编辑了手机
            save_loading: false,
            identifyError: '', // 验证码错误
            identifyCodeRight: false, // 验证码是否正确
            hasGetIdentifyCode: false, // 是否点了获取验证码
            canGetIdentifyCode: false, // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码', // “获取验证码”按钮的文字
            formValidate: {
                fullPic: '',
                pic: '',
                name: '',
                email: '',
                province: '',
                city: '',
                county: '',
                sex: '0',
                age: '',
                introducer: '',
                company: '',
                password: '',
                repassword: '',
                phone: '',
                res1: ['北京市', '市辖区', '东城区'],
                personId: '',
                roleId: 1,
                roleName: ''
            },
            ruleValidate: {
                age: [
                    { required: true, message: '请填写年龄', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '姓名不得为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不得为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不对', trigger: 'blur' }
                ],
                introducer: [
                    { required: true, message: '引荐人不得为空', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                res1: [
                    { required: true, type: 'array', min: 3, message: '请选择所在地区', trigger: 'change' },
                    { type: 'array', max: 3, message: '请选择所在地区', trigger: 'change' }
                ],
                personId: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { validator: validePersonId }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                repassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: validePhone }
                ]
            }
        };
    },
    async mounted () {
        await this.permissionRoleGetData();
    },
    computed: {
        ...mapGetters([
            'registerData',
            'permissionRoleData'
        ])
    },
    methods: {
        ...mapActions([
            'registerGetData',
            'permissionRoleGetData'
        ]),
        handleSuccess (res, file) {
            this.formValidate.fullPic = res.url;
            this.formValidate.pic = res.name;
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件格式应为图片：jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '文件超出最大限制',
                desc: '上传图片最大不得超过3M'
            });
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 先判断头像是否上传

                    if (!this.formValidate.pic.trim()) {
                        this.$Notice.warning({
                            title: '头像必须上传',
                            desc: '请上传头像'
                        });
                    } else {
                        this.saveInfoAjax();
                    }
                    // else if (this.phoneHasChanged && this.userForm.cellphone !== this.initPhone) { // 手机号码修改过了而且修改之后的手机号和原来的不一样
                    //     if (this.hasGetIdentifyCode) { // 判断是否点了获取验证码
                    //         if (this.identifyCodeRight) { // 判断验证码是否正确
                    //             this.saveInfoAjax();
                    //         } else {
                    //             this.$Message.error('验证码错误，请重新输入');
                    //         }
                    //     } else {
                    //         this.$Message.warning('请先点击获取验证码');
                    //     }
                    // } else {
                    //     this.saveInfoAjax();
                    // }
                }
            });
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },

        toLogin () {
            this.$router.push({
                name: 'login'
            });
        },

        getIdentifyCode (name) {
            this.hasGetIdentifyCode = true;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.canGetIdentifyCode = true;
                    let timeLast = 60;
                    let timer = setInterval(() => {
                        if (timeLast >= 0) {
                            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                            timeLast -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '获取验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.inputCodeVisible = true;
                    // you can write ajax request here
                }
            });
        },

        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },
        submitCode () {
            let vm = this;
            vm.checkIdentifyCodeLoading = true;
            if (this.securityCode.length === 0) {
                this.$Message.error('请填写短信验证码');
            } else {
                setTimeout(() => {
                    this.$Message.success('验证码正确');
                    this.inputCodeVisible = false;
                    this.checkIdentifyCodeLoading = false;
                }, 1000);
            }
        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        },
        async saveInfoAjax () {
            this.permissionRoleData.data.forEach(item => {
                if (item.id == this.formValidate.roleId) {
                    this.formValidate.roleName = item.name;
                }
            })
            this.save_loading = true;
            // 判断省市区是否选择
            if (this.formValidate.res1.length === 3) {
                this.formValidate.province = this.formValidate.res1[0];
                this.formValidate.city = this.formValidate.res1[1];
                this.formValidate.county = this.formValidate.res1[2];
            };

            await this.registerGetData(this.formValidate);
            if (this.registerData.code === 1) {
                this.save_loading = false;
                this.$Modal.success({
                    title: '注册成功',
                    content: '注册成功后需要管理员审核通过才能登录',
                    onOk: () => {
                        this.$router.push({
                            name: 'login'
                        })
                    }
                })
            } else {
                this.$Message.warning(this.registerData.info);
                this.save_loading = false;
            }
        }
    }
}
;
