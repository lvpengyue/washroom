<template>
    <div class="pack-sign">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    签收
                </div>
                <template>
                    <Row>
                        <Col span="12" offset="6">
                            <div class="scan">
                                <div>
                                    扫描结果：
                                    <Input type="text"
                                        style="width: 300px;"
                                        v-model="barCode"></Input>
                                </div>
                                <div class="start-scan">
                                    开始扫描条形码
                                    <Icon type="ios-search-strong"
                                        :size="50"></Icon>
                                </div>
                                <div class="desc">
                                    <p>注：请扫描小票上的条形码/二维码</p>
                                    <p>功能描述： 进入此页面，点击开始扫码，监听到扫码数据后直接开始：签收订单。签收成功反馈，并展示订单在列表上</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </template>

                <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="dataList"></Table>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<style lang="less" src="./index.less"></style>

<script src="./index.js"></script>
