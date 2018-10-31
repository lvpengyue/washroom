<style lang="less">
@import "../../styles/common.less";
@import "./index.less";







</style>
<template>
    <div class="order-money-list" v-if="orderMoneyData && orderMoneyData.data && orderMoneyData.data.pageData">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Form inline ref="search" :model="search">
                        <FormItem>
                            <Input type="text"
                                   v-model="search.factoryOrderNum"
                                   placeholder="订单编号">
                            <span slot="prepend">订单编号</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Select v-model="search.factoryUserId" style="width:200px" placeholder="请选择操作人" v-if="permissionIndexData && permissionIndexData.data">
                                <Option :value="item.id" :key="item.id" v-for="(item, index) in permissionIndexData.data">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                        <Button type="primary"
                                size="default"
                                @click="handleSearch()">查询</Button>
                        </FormItem>
                        <Button type="primary"
                                size="default"
                                @click="reset()">重置</Button>
                        </FormItem>
                    </Form>
                </div>
                <Table :columns="columns"
                        size="large"
                        no-data-text="暂无数据"
                        no-filtered-data-text="没有符合条件的数据"
                       :data="orderMoneyData.data.pageData.list"></Table>
                <Page :total="orderMoneyData.data.pageData.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{orderMoneyData.data.pageData.total}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
        <Modal v-model="clothesModal"
               width="900">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>结算详情</span>
            </p>
            <div>
                <Table :columns="clothesColumns"
                        size="large"
                        no-data-text="暂无数据"
                        no-filtered-data-text="没有符合条件的数据"
                       :data="orderIndexDetail.data"></Table>
            </div>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js">
</script>
