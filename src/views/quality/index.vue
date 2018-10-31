<template>
    <div class="quality">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    开始质检 
                    <Button type="primary"
                            v-if="qualityData && qualityData.data"
                            @click="getDetail(qualityData.data.order.id)"
                            v-show="showDetail"
                            class="toDetail">查看详情</Button>
                    <Button type="primary"
                            @click="showScanModal"
                            class="toDetail">扫码质检</Button>
                </div>
                <template v-if="qualityData && qualityData.data">
                    <Row :gutter="32">
                        <Col span="10">
                        <Card class="order-detail">
                            <p class="name"
                               slot="title">订单信息</p>
                            <div class="details">
                                <h3>衣物件数：{{qualityData.data.order.clothNum}}件</h3>
                                <p>订单编号：{{qualityData.data.order.orderNum}}</p>
                                <p>条形码号：{{qualityData.data.order.packageNo}}</p>
                                <p>订单类型：{{typeArr[qualityData.data.order.washType]}}</p>
                                <p>订单时间：{{qualityData.data.order.createTime}}</p>
                                <P>是否返洗：{{qualityData.data.order.washType == 1 ? '是' : '否'}}
                                    <Button type="primary" @click="showReturnClothes(qualityData.data.order.id)" v-show="qualityData.data.order.washType == 1 && showReturn">查看返洗衣物</Button>
                                </P>
                                <p>备注：{{qualityData.data.order.riderDesc}}</p>
                            </div>
                            <!-- <div class="user">
                                <div class="info">
                                    <p>收货人：{{qualityData.data.order.receiveUserName}}</p>
                                    <p>{{qualityData.data.order.receiveUserPhone}}</p>
                                </div>
                                <p class="addr">
                                    {{qualityData.data.order.receiveUserAddress}}
                                </p>
                            </div> -->
                        </Card>
                        </Col>
                        <Col span="12">
                        <Card class="order-detail cloth-detail">
                            <p class="name"
                               slot="title">衣服信息</p>
                            <div class="details">
                                
                                <p>水洗码：{{qualityData.data.cloth.washNo}}</p>
                                <p>衣服品牌：{{qualityData.data.cloth.brandName}}</p>
                                <p>衣服类型：{{qualityData.data.cloth.categoryName}}</p>
                                <p>质检结果：{{sortArr[qualityData.data.cloth.checkResult]}}</p>
                                <div class="cloth-imgs">
                                    <p>衣服照片：</p>
                                    <template v-if="qualityData.data.cloth.pic">
                                        <img :src="`${item}?x-oss-process=image/resize,m_fill,h_120,w_120`" @click="showBig(item)" v-for="item in qualityData.data.cloth.pic.split(',')" alt="">
                                    </template>
                                    
                                </div>
                                <p>备注：{{qualityData.data.cloth.remarks}}</p>
                                <h3>分配货架：{{qualityData.data.cloth.location}}</h3>
                            </div>
                        </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10" offset="7" v-show="qualityData.data.cloth.checkResult != 1 && showCheck">
                            <Button type="primary"
                            @click="toNext(qualityData.data.cloth.id, 1, 4)"
                            class="next">检验合格，继续</Button>
                            <Button type="error"
                            @click="toNext(qualityData.data.cloth.id, 0, 3)"
                            class="next">不合格，返洗</Button>
                        </Col>
                    </Row>
                </template>

                <!-- <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="qualityData.data.pageData.list"></Table>
                <Page :total="qualityData.data.pageData.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共
                        <span style="font-size: 20px; color: red; padding: 0 4px;">{{qualityData.data.pageData.total}}</span>条数据</span>
                </Page> -->
            </Card>
            </Col>
        </Row>
        <Modal v-model="scanModal"
               :mask-closable="false"
               :closable="true"
               :transfer="false"
               class="scan_modal"
               width="600">
            <p slot="header"
               style="color:#f60; font-size: 18px; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>扫码质检</span>
            </p>
            <div class="scan">
                <div>
                    扫描结果：
                    <Input type="text"
                           :autofocus="true"
                           style="width: 300px;"
                           v-model="washNo"></Input>
                </div>
                <div class="start-scan">
                    开始扫描条形码
                    <Icon type="ios-search-strong"
                          :size="50"></Icon>
                </div>
                <div class="desc">
                    <p>提示：</p>
                    <p>1.如果读取失败，请尝试鼠标点击输入框，获取光标后开始扫码，才可读取条形码/二维码</p>
                    <p>2.请使用扫码枪扫描袋子上的条码/二维码</p>
                </div>
            </div>
            <div slot="footer">
            </div>
        </Modal>

        <Modal v-model="bigModal"
               class="big_modal"
               width="600">
            <p slot="header"
               style="color:#f60; font-size: 18px; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>查看大图</span>
            </p>
            <div>
                <img :src="`${bigUrl}?x-oss-process=image/resize,m_fill,h_1000,w_750`" alt="">
            </div>
        </Modal>
        <Modal v-model="DetailModal"
               class="Detail_modal"
               width="900">
            <p slot="header"
               style="color:#f60; font-size: 18px; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>订单详情</span>
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
    </div>
</template>

<style lang="less" src="./index.less"></style>

<script src="./index.js"></script>
