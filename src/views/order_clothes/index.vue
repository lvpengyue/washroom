<style lang="less">
@import "../../styles/common.less";
@import "./index.less";








</style>
<template>
    <div class="orderClothes-list" v-if="orderClothesData && orderClothesData.data">
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
                        <FormItem>
                            <Input type="text"
                                   v-model="search.location"
                                   placeholder="货架位置">
                            <span slot="prepend">货架位置</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Select v-model="search.status" style="width:200px" placeholder="请选择状态">
                                <Option value="99">所有</Option>
                                <Option :value="index" :key="index" v-for="(item, index) in statusArr">{{item}}</Option>
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
                       :data="orderClothesData.data.pageData.list"></Table>
                <Page :total="orderClothesData.data.pageData.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{orderClothesData.data.pageData.total}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script src="./index.js">
</script>

<style>
