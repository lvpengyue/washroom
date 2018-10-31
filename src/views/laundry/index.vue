<style lang="less">
@import "../../styles/common.less";
@import "./index.less";



</style>
<template>
    <div class="laundry-list" v-if="laundryData && laundryData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Form inline ref="search" :model="search">
                        <FormItem>
                            <Input type="text"
                                   v-model="search.name"
                                   placeholder="名称">
                            <span slot="prepend">工厂名称</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.leaderName"
                                   placeholder="姓名">
                            <span slot="prepend">负责人姓名</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.address"
                                   placeholder="地址">
                            <span slot="prepend">地址</span>
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
                                    @click="handleAdd()">添加工厂</Button>
                        </FormItem>
                    </Form>
                </div>
                <Table :columns="columns"
                        size="large"
                        no-data-text="暂无数据"
                        no-filtered-data-text="没有符合条件的数据"
                       :data="laundryData.data.pageData.list"></Table>
                <Page :total="laundryData.data.pageData.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{laundryData.data.pageData.total}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
        <Modal v-model="editLaundry"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/修改工厂</span>
            </p>
            <div>
                <Form :model="formValidate"
                      ref="editPass"
                      :rules="ruleValidate"
                      :label-width="180">
                    <FormItem label="工厂名称" prop="name">
                        <Input type="text" v-model="formValidate.name"></Input>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                        <Input type="text" v-model="formValidate.address"></Input>
                    </FormItem>
                    <FormItem label="负责人姓名" prop="leaderName">
                        <Input type="text" v-model="formValidate.leaderName"></Input>
                    </FormItem>
                    <FormItem label="负责人手机" prop="leaderPhone">
                        <Input type="text" v-model="formValidate.leaderPhone"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="saveEdit('editPass')">确定提交</Button>
            </div>
        </Modal>

        <!-- 设置价格  -->
        <Modal v-model="setPrice"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>修改加工价格</span>
            </p>
            <div style="max-height: 600px; overflow-y: scroll;">
                <Form :label-width="100" label-position="left">
                    <FormItem :label="`${item.name}(元)`" v-for="(item, index) in priceArr" :key="index">
                        <Input type="text" v-model="priceArr[index].realProcessPrice"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="saveEditPrice()">确定提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js">
</script>
