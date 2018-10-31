<template>
    <div class="register">
        <div class="header">悠生活ERP系统</div>
        <div class="content-wrap">
            <div class="to-login">如您已有账号，可点击此处
                <a href=""
                   @click.prevent="toLogin">登陆</a>
            </div>
            <div class="form-wrap">
                <Form ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      :label-width="120">
                    <FormItem label="个人照片">
                        <div class="user-img">
                            <img :src="formValidate.fullPic+'?x-oss-process=image/resize,m_fill,h_240,w_240'"
                                 alt=""
                                 v-if="formValidate.fullPic">
                            <span v-else>暂无图片</span>
                        </div>
                        <Upload :action="`${baseUrl}/ajaxfileupload`"
                                :max-size="3072"
                                :format="['jpg','jpeg','png']"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :on-success="handleSuccess"
                                :show-upload-list="false">
                            <Button type="ghost"
                                    icon="ios-cloud-upload-outline">上传照片</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="姓名"
                              prop="name">
                        <Input v-model="formValidate.name"
                               placeholder="请输入您的姓名"></Input>
                    </FormItem>
                    <FormItem label="年龄"
                              prop="age">
                        <Input v-model="formValidate.age"
                               placeholder="请输入您的年龄"></Input>
                    </FormItem>
                    <FormItem label="性别"
                              prop="sex">
                        <RadioGroup v-model="formValidate.sex">
                            <Radio label="0">男</Radio>
                            <Radio label="1">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="身份证号"
                              prop="personId">
                        <Input v-model="formValidate.personId"
                               placeholder="请输入身份证号"></Input>
                    </FormItem>
                    <FormItem label="手机号"
                              prop="phone">
                        <Input v-model="formValidate.phone"
                               placeholder="请输入手机号"
                               @on-keydown="hasChangePhone"></Input>
                        <!-- <div style="display: inline-block">
                            <Input v-model="formValidate.phone"
                                   @on-keydown="hasChangePhone"></Input>
                        </div> -->
                        <!-- <div style="display:inline-block;position:relative;">
                            <Button @click="getIdentifyCode('formValidate')"
                                    :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                            <div class="own-space-input-identifycode-con"
                                 v-if="inputCodeVisible">
                                <div style="background-color:white;z-index:110;margin:10px;">
                                    <Input v-model="securityCode"
                                           placeholder="请填写短信验证码"></Input>
                                    <div style="margin-top:10px;text-align:right">
                                        <Button type="ghost"
                                                @click="cancelInputCodeBox">取消</Button>
                                        <Button type="primary"
                                                @click="submitCode"
                                                :loading="checkIdentifyCodeLoading">确定</Button>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </FormItem>
                    <FormItem label="引荐人"
                              prop="introducer">
                        <Input v-model="formValidate.introducer"
                               placeholder="请输入引荐人"></Input>
                    </FormItem>
                    <FormItem label="所在企业">
                        <Input v-model="formValidate.company"
                               placeholder="请输入您所在企业"></Input>
                    </FormItem>
                    <FormItem label="所在地区"
                              prop="res1"
                              class="area-wrap">
                        <al-cascader v-model="formValidate.res1"
                                     data-type="name"
                                     level="2" />
                    </FormItem>
                    <FormItem label="注册邮箱"
                              prop="email">
                        <Input v-model="formValidate.email"
                               placeholder="请输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="设置密码"
                              prop="password">
                        <Input v-model="formValidate.password"
                               type="password"
                               placeholder="请设置密码"></Input>
                    </FormItem>
                    <FormItem label="确认密码"
                              prop="repassword">
                        <Input v-model="formValidate.repassword"
                               type="password"
                               placeholder="请确认密码"></Input>
                    </FormItem>
                    <FormItem label="申请角色">
                        <Select v-model="formValidate.roleId">
                            <Option v-for="(item, index) in permissionRoleData.data"
                                    v-if="item.id > 0"
                                    :value="item.id"
                                    :key="index">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary"
                                :loading="save_loading"
                                @click="handleSubmit('formValidate')">申请注册</Button>
                        <Button type="ghost"
                                @click="handleReset('formValidate')"
                                style="margin-left: 8px">Reset</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<style lang="less">
@import "./index.less";






</style>

<script src="./index.js"></script>

