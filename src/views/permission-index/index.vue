<style lang="less">
@import "../../styles/common.less";
@import "./index.less";


</style>
<template>
    <div class="permission-index"
         v-if="permissionIndexData && permissionIndexData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title"
                     class="card-title">
                    <Form inline>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.name"
                                   placeholder="姓名">
                            <Icon type="ios-person-outline"
                                  slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.phone"
                                   placeholder="账号">
                            <Icon type="ios-person-outline"
                                  slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem v-if="laundryData && laundryData.data">
                            <Select placeholder="请选择工厂" v-model="search.laundryId" style="width: 200px;">
                                <Option v-for="item in laundryData.data" :key="item.id" :value="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem v-if="permissionRoleData && permissionRoleData.data">
                            <Select placeholder="请选择角色" v-model="search.roleId" style="width: 200px;">
                                <Option v-for="item in permissionRoleData.data" :key="item.id" :value="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Select placeholder="请选择状态" v-model="search.state" style="width: 200px;">
                                <Option value="0">正常</Option>
                                <Option value="1">已禁用</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    size="default"
                                    @click="handleSearch()">搜索</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="default"
                                    size="default"
                                    @click="handleReset()">重置</Button>
                        </FormItem>
                    </Form>
                    <Button type="primary"
                            v-show="showEdit"
                            size="default"
                            @click="handleAdd()">新增人员</Button>
                </div>
                <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="permissionIndexData.data.pageData.list"></Table>
                <Page :total="permissionIndexData.data.pageData.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{permissionIndexData.data.totalNum}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
        <Modal v-model="addOrEdit"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/编辑人员信息</span>
            </p>
            <div>
                <Form ref="userForm"
                      :model="formValidate1"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidate1">
                    <FormItem label="姓名"
                              prop="name">
                        <Input v-model="formValidate1.name"
                               placeholder="请输入您的姓名"></Input>
                    </FormItem>
                    <FormItem label="手机号(账号)"
                              prop="phone">
                        <Input v-model="formValidate1.phone" :disabled="formValidate1.id ? true : false"></Input>
                    </FormItem>
                    <FormItem prop="laundryId" label="请选择工厂：">
                        <Select v-model="formValidate1.laundryId" style="width: 200px;" placeholder="请选择工厂：">
                            <Option v-for="item in laundryData.data" :key="item.id" :value="`${item.id}`">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="请选择角色：" prop="roleId">
                        <Select placeholder="请选择角色" v-model="formValidate1.roleId" style="width: 200px;">
                            <Option v-for="sitem in permissionRoleData.data" :value="`${sitem.id}`" :key="sitem.id">{{ sitem.name }}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" v-show="showEdit">
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="saveUser('userForm')">确定提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js">
</script>

<style>
