<template>
    <div class="login"
         @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录 悠洗线下洗衣房系统
                </p>
                <div class="form-con">
                    <Form ref="loginForm"
                          :model="form"
                          :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName"
                                   placeholder="请输入手机号">
                            <span slot="prepend">
                                <Icon :size="16"
                                      type="person"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password"
                                   v-model="form.password"
                                   placeholder="请输入密码">
                            <span slot="prepend">
                                <Icon :size="14"
                                      type="locked"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit"
                                    type="primary"
                                    long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">还没有账号？
                        <a @click.prevent="toRegister">去注册</a>
                    </p>
                </div>
            </Card>
        </div>
    </div>
</template>

<style lang="less">
@import "./login.less";




</style>

<script>
import Cookies from "js-cookie";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions([
      "loginGetData",
      "loginGetPermission"
    ]),
    toRegister() {
      this.$router.push({
        name: "register"
      });
    },
    handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 验证通过，登录
          await this.loginGetData({
            phone: this.form.userName,
            password: this.form.password
          });

          if (this.loginData.code !== 1) {
            this.$Message.warning(this.loginData.info);
          } else {
            Cookies.set("user", this.loginData.data.user);
            Cookies.set("userRole", this.loginData.data.userRole);
            Cookies.set('laundry', this.loginData.data.laundry);
            

            /* 权限控制的代码，后期放开 */
            const arr = [];
            this.loginData.data.permission.forEach((item) => {
              arr.push(item.url);
            });
            await this.loginGetPermission(arr);
            Cookies.set("permission", arr);
    
            this.$router.push({
              name: 'home_index'
            })
          }
        }
      });
    }
  },

  computed: {
    ...mapGetters([
      "loginData",
      "loginPermission"
    ])
  }
};
</script>
