<style lang="less">
@import "../../styles/common.less";
@import "./index.less";





</style>
<template>
    <div class="shelf-list" v-if="orderQualityData && orderQualityData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Form inline ref="search" :model="search">
                        <FormItem>
                            <Input type="text"
                                   v-model="search.orderNum"
                                   placeholder="订单编号">
                            <span slot="prepend">订单编号</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.washNo"
                                   placeholder="水洗码">
                            <span slot="prepend">水洗码</span>
                            </Input>
                        </FormItem>
                        <!-- <FormItem>
                            <Input type="text"
                                   v-model="search.factoryOrderId"
                                   placeholder="订单id">
                            <span slot="prepend">订单id</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.referId"
                                   placeholder="衣服id">
                            <span slot="prepend">衣服id</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.referId"
                                   placeholder="衣服id">
                            <span slot="prepend">衣服id</span>
                            </Input>
                        </FormItem> -->
                        <FormItem>
                            <Input type="text"
                                   v-model="search.location"
                                   placeholder="货架位置">
                            <span slot="prepend">货架位置</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Select v-model="search.checkResult" style="width:200px" placeholder="请选择质检状态">
                                <Option value="99">所有质检状态</Option>
                                <Option value="0">质检合格</Option>
                                <Option value="1">质检不合格</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Select v-model="search.status" style="width:200px" placeholder="请选择衣服状态">
                                <Option value="99">所有衣服状态</Option>
                                <Option :value="index" :key="index"  v-for="(item, index) in clothStatusArr">{{item}}</Option>
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
                </div>
                <Table :columns="columns"
                        size="large"
                        no-data-text="暂无数据"
                        no-filtered-data-text="没有符合条件的数据"
                       :data="orderQualityData.data.list"></Table>
                <Page :total="orderQualityData.data.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{orderQualityData.data.total}}</span>条数据</span>      
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
