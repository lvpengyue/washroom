<style lang="less">
@import "../../styles/common.less";
@import "./index.less";

















</style>
<template>
    <div class="order-packed-list" v-if="orderPackedData && orderPackedData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Form inline ref="search" :model="search">
                        <FormItem>
                            <Input type="text"
                                   v-model="search.orderNum"
                                   placeholder="订单号">
                            <span slot="prepend">订单号</span>
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
                       :data="orderPackedData.data.list"></Table>
                <Page :total="orderPackedData.data.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{orderPackedData.data.total}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
        <!--打印内容-->
        <div id="printPacked" style="width: 280px;">
            <div style="font-size: 10px; width: 100%;" v-if="packOrder && packOrderDetail">
                <div style="width: 100%;">
                    <div style="padding: 30px 0;">
                        <img src="./assets/logo.png" alt="" style="height: 36px; margin-left: 70px;">
                    </div>
                    <div style="padding: 20px 0; border-bottom: 1px #000 dashed;">
                        驿站名称：{{packOrder.postName}}
                    </div>
                    <div style="width: 100%; padding: 15px 0; border-bottom: 1px #000 dashed; line-height: 36px;">
                        <div style="display: flex;line-height: 36px; width: 100%; ">
                            <p style="width: 100px; text-align: justify;">收货人：</p>
                            <p style="width: 150px;">{{packOrder.receiveUserName}}</p>
                        </div>
                        <div style="display: flex;line-height: 36px; width: 100%; ">
                            <p style="width: 100px; text-align: justify;">电话：</p>
                            <p style="width: 150px;">{{packOrder.receiveUserPhone}}</p>
                        </div>
                        <div style="display: flex;line-height: 36px; width: 100%; ">
                            <p style="width: 100px; text-align: justify;">收货地址：</p>
                            <p style="width: 150px;">{{packOrder.receiveUserAddress}}</p>
                        </div>
                    </div>
                    <div style="display: flex; padding: 15px 0; border-bottom: 1px dashed #000;">
                        <p style="width: 180px;">衣物品类名称</p>
                        <p style="width: 100px;">数量</p>
                    </div>
                    <div style="display: flex; height: 46px; padding-top: 6px;" v-for="item in packOrderDetail">
                        <p style="width: 180px;">{{item.categoryName}}</p>
                        <p style="width: 100px;">1</p>
                    </div>
                    <div style="width: 100%; border-bottom: 1px #000 dashed; border-top: 1px dashed #000; padding: 15px 0; display: flex; justify-content: space-between;">
                        <p style="width: 180px;">订单件数：</p>
                        <p style="width: 100px;">{{packOrder.clothNum}}（件）</p>
                    </div>
                    <div style="padding: 30px 0; display: flex; width: 100%; line-height: 36px;">
                        <p style="width: 80px;">物流编号：</p>
                        <p style="width: 180px; word-wrap: break-all; line-height: 36px;">{{packOrder.orderNum}}</p>
                    </div>
                    <div style="width: 100%;">
                        <img :src="mainBarCode ? mainBarCode.data.url : ''" alt="" style="width: 90px; height: 90px; margin-left: 70px;">
                    </div>
                </div>
            </div>
        </div>
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

        <Modal v-model="backWashModal"
               class="back_wash_modal"
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
