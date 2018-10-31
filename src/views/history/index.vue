<style lang="less">
@import "../../styles/common.less";
@import "./index.less";







</style>

<template>
    <div class="agent-list"
         v-if="historyData && historyData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Form inline>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.userName"
                                   placeholder="姓名">
                            <Icon type="ios-person-outline"
                                  slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem v-if="laundryData && laundryData.data">
                            <Select placeholder="请选择工厂" v-model="search.laundryId" style="width: 200px;">
                                <Option v-for="item in laundryData.data" :key="item.id" :value="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem v-if="permissionRoleData && permissionRoleData.data">
                            <Select placeholder="请选择角色" v-model="search.roleId" style="width: 200px;">
                                <Option v-for="item in permissionRoleData.data" :key="item.id" :value="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Select placeholder="请选择状态" v-model="search.referType" style="width: 200px;">
                                <Option value="1">衣服</Option>
                                <Option value="2">订单</Option>
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
                       :data="historyData.data.pageData.list"></Table>
                <Page :total="historyData.data.pageData.total"
                      :current="page.pageNum"
                      :page-size="page.pageSize"
                      show-total
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共<span style="font-size: 20px; color: red; padding: 0 4px;">{{historyData.data.pageData.total}}</span>条数据</span>      
                </Page>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script src="./index.js">
</script>
