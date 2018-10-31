<style lang="less">
@import "../../styles/common.less";
@import "./index.less";


</style>
<template>
    <div class="order-packing-list" v-if="orderPackingData && orderPackingData.data">
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
                       :data="orderPackingData.data.list"></Table>
                <Page :total="orderPackingData.data.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{orderPackingData.data.total}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
        <div id="printPack" style="width: 100%;">
            <div style="display: flex; align-items:center; font-size: 10px;" v-if="packOrder">
                <div style="border-right: 1px #000 solid; width: 300px;">
                    <div style="border-bottom: 1px #000 solid;">
                        <img src="./assets/logo.png" alt="" style="height: 12px;">
                        <div style="margin: 8px 0;">订单件数：{{packOrder.clothNum}}（件）</div>
                    </div>
                    <div style="display: flex; margin-top: 6px;">
                        <img src="./assets/address.png" alt="" style="display: block; height: 12px; margin-right: 5px;">
                        <div style="line-height: 16px;">
                            <p style="margin: 4px 0;">
                                {{packOrder.receiveUserName}}  {{packOrder.receiveUserPhone}}
                            </p>
                            <br>
                            <p>
                                {{packOrder.receiveUserAddress}}
                            </p>
                        </div>
                    </div>
                </div>

                <div style="padding: 10px 6px 12px 6px; text-align: center; width: 200px;">
                    <div style="width: 100%; text-align: center; margin: 10px;">
                         <img :src="mainBarCode ? mainBarCode.data.url : ''" alt="" style="width: 40px; height: 40px;">
                    </div>
                   
                    <p style="text-align:left; width: 100%; line-height: 28px;">物流编号：</p>
                    <p style="text-align:left; width: 100%; line-height: 28px; word-wrap: break;">{{packOrder.orderNum}}</p>
                </div>
                
            </div>
        </div>
        <!-- <Modal v-model="editShelf"
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
        </Modal> -->
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
                <Button type="primary" @click.prevent="toPack" v-show="showDo">确定打包</Button>
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
