<style lang="less">
@import "../../styles/common.less";
@import "./index.less";



</style>
<template>
    <div class="price-my-list" v-if="priceMyData && priceMyData.data && priceMyData.data.pageData">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Form inline ref="search" :model="search">
                        <FormItem>
                            <Input type="text"
                                   v-model="search.categoryName"
                                   placeholder="衣物类别">
                            <span slot="prepend">衣物类别</span>
                            </Input>
                        </FormItem>
                        <FormItem>
                        <Button type="primary"
                                size="default"
                                @click="handleSearch()">查询</Button>
                        </FormItem>
                        <Button type="primary"
                                size="default"
                                @click="handleReset()">重置</Button>
                        </FormItem>
                    </Form>
                </div>
                <Table :columns="columns"
                        size="large"
                        no-data-text="暂无数据"
                        no-filtered-data-text="没有符合条件的数据"
                       :data="priceMyData.data.pageData.list"></Table>
                <Page :total="priceMyData.data.pageData.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{priceMyData.data.pageData.total}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script src="./index.js">
</script>
