<style lang="less">
@import "../../styles/common.less";
@import "./index.less";



</style>
<template>
    <div class="category-list" v-if="categoryData && categoryData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Form inline ref="search" :model="search">
                        <FormItem>
                            <Input type="text"
                                   v-model="search.name"
                                   placeholder="姓名">
                            <span slot="prepend">品类名称</span>
                            </Input>
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
                        <FormItem>
                            <Button type="primary"
                                    size="default"
                                    v-show="showEdit"
                                    @click="handleAdd()">添加品类</Button>
                        </FormItem>
                    </Form>
                </div>
                <Table :columns="columns"
                        size="large"
                        no-data-text="暂无数据"
                        no-filtered-data-text="没有符合条件的数据"
                       :data="categoryData.data.pageData.list"></Table>
                <Page :total="categoryData.data.pageData.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{categoryData.data.pageData.total}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
        <Modal v-model="editCategory"
               class="edit_category"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/修改品类</span>
            </p>
            <div>
                <Form :model="formValidate"
                      ref="editCategory"
                      :rules="ruleValidate"
                      :label-width="180">
                    <FormItem label="品类名称" prop="name">
                        <Input type="text" v-model="formValidate.name"></Input>
                    </FormItem>
                    <FormItem label="图标" prop="icon">
                        <div class="user-img">
                            <img :src="formValidate.icon+'?x-oss-process=image/resize,m_fill,h_240,w_240'"
                                 alt=""
                                 v-if="formValidate.icon">
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
                </Form>
            </div>
            <div slot="footer">
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="saveEdit('editCategory')">确定提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js">
</script>

<style>
