<style lang="less">
@import "../../styles/common.less";
@import "./index.less";




</style>
<template>
    <div class="orderLaundry-list" v-if="orderLaundryData && orderLaundryData.data">
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
                                   v-model="search.packageNo"
                                   placeholder="条形码">
                            <span slot="prepend">袋子条形码</span>
                            </Input>
                        </FormItem>
                        <!-- <FormItem>
                            <Input type="text"
                                   v-model="search.userPhone"
                                   placeholder="用户手机号">
                            <span slot="prepend">用户手机号</span>
                            </Input>
                        </FormItem> -->
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
                       :data="orderLaundryData.data.pageData.list"></Table>
                <Page :total="orderLaundryData.data.pageData.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{orderLaundryData.data.pageData.total}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
        <Modal v-model="clothesModal"
               width="900">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>衣物详情</span>
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

        <Modal v-model="backWashModal2"
               class="back_wash_modal2"
               :mask-closable="true"
               v-if="orderIndexReturn && orderIndexReturn.data"
               width="900">
            <p slot="header"
               style="color:#f60; font-size: 18px; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>返洗详情</span>
            </p>
            <Table :columns="backWashColumns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="orderIndexReturn.data"></Table>
        </Modal>
        <Modal v-model="bigModal"
               class="big_modal"
               :mask-closable="true"
               width="900">
            <p slot="header"
               style="color:#f60; font-size: 18px; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>查看大图</span>
            </p>
            <div class="big-back-pic">
                <img :src="bigUrl" alt="">
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js">
</script>

<style>
