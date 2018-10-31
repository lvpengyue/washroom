<style lang="less">
@import "../../styles/common.less";
@import "./index.less";




</style>
<template>
    <div class="shelf-list" v-if="shelfData && shelfData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Form inline ref="search" :model="search">
                        <FormItem>
                            <Input type="text"
                                   v-model="search.name"
                                   placeholder="姓名">
                            <span slot="prepend">货架名称</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Select v-model="search.laundryId" style="width:200px" placeholder="请选择工厂">
                                <Option value="99">所有</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Select v-model="search.status" style="width:200px" placeholder="请选择状态">
                                <Option value="99">所有</Option>
                                <Option value="0">空闲</Option>
                                <Option value="1">已占用</Option>
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
                        <FormItem>
                            <Button type="primary"
                                    size="default"
                                    @click="handleAdd()">添加货架</Button>
                        </FormItem>
                    </Form>
                </div>
                <Table :columns="columns"
                        size="large"
                        no-data-text="暂无数据"
                        no-filtered-data-text="没有符合条件的数据"
                       :data="shelfData.data.pageData.list"></Table>
                <Page :total="shelfData.data.pageData.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{shelfData.data.pageData.total}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
        <Modal v-model="editShelf"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/修改货架</span>
            </p>
            <div>
                <Form :model="formValidate"
                      ref="editShelf"
                      :rules="ruleValidate"
                      :label-width="180">
                    <FormItem label="货架名称" prop="name">
                        <Input type="text" v-model="formValidate.name"></Input>
                    </FormItem>
                    <FormItem label="工厂" prop="laundryId">
                        <Select v-model="formValidate.laundryId" style="width:200px" placeholder="请选择工厂">
                            <Option value="99">所有</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="saveEdit('editShelf')">确定提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js">
</script>

<style>
