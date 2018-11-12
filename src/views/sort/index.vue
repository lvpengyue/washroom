<template>
    <div class="sort">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    分拣 
                    <Button type="primary"
                            v-show="sortData && sortData.data && sortData.data.order.factoryStatus == 0 && showComplete"
                            @click="toNext(sortData.data.order.id)"
                            class="next-order">检验完成，开始下一单</Button>
                    <Button type="primary"
                            @click="showScan"
                            class="">扫码分拣</Button>
                    <Button type="primary"
                            @click="getPrice"
                            v-show="sortData && sortData.data && sortData.data.order.factoryStatus != 0 && showMoney"
                            class="">收银</Button>
                </div>
                <template v-if="sortData && sortData.data">
                    <Row :gutter="32">
                        <Col span="8">
                        <Card class="order-detail">
                            <p class="name"
                               slot="title">订单信息</p>
                            <div class="details">
                                <h3>衣物件数：{{sortData.data.order.clothNum}}件</h3>
                                <p>订单编号：{{sortData.data.order.orderNum}}</p>
                                <p>条形码号：{{sortData.data.order.packageNo}}</p>
                                <p>订单类型：{{typeArr[sortData.data.order.washType]}}
                                    <Button @click.prevent="showBackModal" type="primary" v-show="sortData.data.order.washType == 1">查看返洗详情</Button>
                                </p>
                                <p>订单时间：{{sortData.data.order.createTime}}</p>
                                <p>备注：{{sortData.data.order.riderDesc}}</p>
                            </div>
                            <!-- <div class="user">
                                <div class="info">
                                    <p>收货人：{{sortData.data.order.receiveUserName}}</p>
                                    <p>{{sortData.data.order.receiveUserPhone}}</p>
                                </div>
                                <p class="addr">
                                    {{sortData.data.order.receiveUserAddress}}
                                </p>
                            </div> -->
                        </Card>
                        </Col>
                        <Col span="16">
                        <div class="clothes">
                            <div class="clothes-detail">
                                <p class="number">已检验：{{sortData.data.clothesList.length}}件，未检验：{{sortData.data.order.clothNum <= sortData.data.clothesList.length ? 0 : sortData.data.order.clothNum - sortData.data.clothesList.length}}件</p>
                                <Button type="default"
                                        size="large"
                                        v-show="sortData.data.order.factoryStatus == 0 && showEdit"
                                        @click="toAddModal">新增</Button>
                                <!-- <div class="tip">
                                <Icon type="ios-location" color="#2d8cf0" :size="40"></Icon>
                                <p class="tip-content">检验完成后每件衣服都有自己的状态，不合格无法洗的衣服会有不合格状态，等其他衣服洗完后会一起打包在一起，送回给用户
                                </p>
                            </div> -->
                            </div>
                            <Card>
                                <p class=""
                                   slot="title">衣物列表</p>
                            </Card>
                            <Table :columns="clothesColumns"
                                   size="large"
                                   no-data-text="暂无数据"
                                   no-filtered-data-text="没有符合条件的数据"
                                   :data="sortData.data.clothesList"></Table>
                        </div>
                        </Col>
                    </Row>
                </template>

                <!-- <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="sortData.data.pageData.list"></Table>
                <Page :total="sortData.data.pageData.total"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共
                        <span style="font-size: 20px; color: red; padding: 0 4px;">{{sortData.data.pageData.total}}</span>条数据</span>
                </Page> -->
            </Card>
            </Col>
            <Col span="12" style="margin-top: 20px;" v-if="sortData && sortData.data && sortData.data.order.washType == 4">
                <Card>
                    <p class=""
                        slot="title">件洗衣物信息</p>
                    <Table :columns="pieceWashColumns"
                        size="large"
                        no-data-text="暂无数据"
                        no-filtered-data-text="没有符合条件的数据"
                        :data="sortData.data.majorClothesList"></Table>
                </Card>
            </Col>
            
            <!--打印的数据-->
            <Col span="24">
                <div class="printBox" ref="print" id="print" style="width: 280px; font-size: 10px;" v-if="clothMoneyList && sortData">
                    <div style="margin: 10px 0;">加工商名称：{{loginData.data.laundry.name}}</div>
                    <div style="padding: 10px 0;">收银日期：{{new Date().toLocaleString()}}</div>
                    <div style="font-size: 12px; padding:20px 0; border-top: 1px dashed #000; border-bottom: 1px dashed #000;">
                        <p>订单号：</p>
                        <p>{{sortData.data.order.orderNum}}</p>
                    </div>
                    <div style="display: flex; padding: 15px 0; border-bottom: 1px dashed #000;">
                        <p style="width: 140px;">衣物品类名称</p>
                        <p style="width: 60px;">数量</p>
                        <p style="width: 80px;">价格</p>
                    </div>
                    <div style="display: flex; height: 46px; margin: 10px 0;" v-for="item in clothMoneyList">
                        <p style="width: 140px; overflow: hidden;">{{item.categoryName}}</p>
                        <p style="width: 60px;">1</p>
                        <p style="width: 80px;">{{item.processPrice === null ? '无' : item.processPrice.toFixed(2)}}</p>
                    </div>
                    <div style="display: flex; padding: 10px 0; border-top: 1px dashed #000;">
                        <p style="width: 200px">总价：</p>
                        <p style="width: 80px">{{totalPrice}}</p>
                    </div>
                </div>
            </Col>
        </Row>
        <Modal v-model="scanModal"
               class="scan_modal"
               :mask-closable="false"
               :closable="true"
               :transfer="false"
               width="600">
            <p slot="header"
               style="color:#f60; font-size: 18px; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>扫码分拣</span>
            </p>
            <div class="scan">
                <div>
                    扫描结果：
                    <Input type="text"
                           style="width: 300px;"
                           autofocus
                           v-model="barCode"></Input>
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
        <Modal v-model="addModal"
               class="add_modal"
               :mask-closable="false"
               @on-visible-change="closeAddModal"
               width="900">
            <p slot="header"
               style="color:#f60; font-size: 18px; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>衣物检验</span>
            </p>
            <div class="add-modal">
                <Form :model="addClothesData"
                      ref="add-clothes"
                      label-position="left"
                      :label-width="100">
                    <FormItem label="品牌：" prop="">
                         <Row>
                            <Col span="11">
                                <FormItem prop="">
                                    <div @click="showBrandList" class="brand-name">
                                        {{selectBrand.name ? selectBrand.name : '请点击此处选择品牌'}}
                                    </div>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>

                    <div class="brand-list" v-if="mainBaseData.data && brandListShow">
                        <Input v-model="searchBrandName" @on-keyup="searchBrand">
                            <span slot="prepend">
                                <Icon type="search" :size="16"></Icon>
                            </span>
                        </Input>
                        <div v-for="(item, index) in brandList" class="each-brand" :key="index" :class="{active: item.id == selectBrand.id}" @click="chooseBrand(item)">
                            <div class="img-wrap">
                                <img :src="item.icon" alt="暂无图片" v-if="item.icon">
                                <p v-else>
                                    暂无图片
                                </p>
                            </div>
                            <p class="img-name">{{item.name}}</p>
                        </div>
                    </div>

                    <FormItem label="衣物类别：" prop="">
                        <Row>
                            <Col span="11">
                                <FormItem prop="">
                                    <div @click="showCategoryList" class="brand-name">
                                        {{selectCategory.name ? selectCategory.name : '请点击此处选择衣物类别'}}
                                    </div>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>

                    <div class="brand-list" v-if="mainBaseData.data && categoryListShow">
                        <Input v-model="searchCategoryName" @on-keyup="searchCategory">
                            <span slot="prepend">
                                <Icon type="search" :size="16"></Icon>
                            </span>
                        </Input>
                        <div v-for="(item, index) in categoryList" :key="index" class="each-brand" :class="{active: item.id == selectCategory.id}" @click="chooseCategory(item)">
                            <div class="img-wrap">
                                <img :src="item.icon" alt="暂无图片" v-if="item.icon">
                                <p v-else>
                                    暂无图片
                                </p>
                            </div>
                            <p class="img-name">{{item.name}}</p>
                        </div>
                    </div>

                    <FormItem label="水洗单号：" prop="">
                        <Input placeholder="请用扫码枪扫描单号，或手动输入" v-model="addClothesData.washNo"></Input>
                    </FormItem>

                    <FormItem label="瑕疵(合格可洗类衣物请勾选)：" prop="">
                         <CheckboxGroup v-if="mainBaseData && mainBaseData.data" v-model="remarks">
                             <Checkbox :label="item.name" v-for="item in mainBaseData.data.remarksList" :key="item.id"></Checkbox>
                         </CheckboxGroup>
                    </FormItem>
                    <FormItem label="洗退回原因：" prop="">
                         <CheckboxGroup v-if="mainBaseData && mainBaseData.data" v-model="returnRemarks">
                             <Checkbox :label="item.name" v-for="item in mainBaseData.data.returnRemarksList" :key="item.id"></Checkbox>
                         </CheckboxGroup>
                    </FormItem>

                    <FormItem label="拍照：" prop="">
                        <div class="camera-list">
                            <div v-for="(item, index) in picList" class="camera-wrap" v-if="picList.length > 0">
                                <Icon type="ios-close" :size="30" class="close-btn" @click.native="delImg(index)"></Icon>
                                <img :src="item" alt="">
                            </div>
                            <div class="camera-wrap" @click="getCamera">
                                <Icon type="ios-camera" :size="50"></Icon>
                            </div>
                        </div>
                        
                    </FormItem>

                </Form>
                <div class="desc">
                    <axocx :showB = "showCamera" :showLoading="showUpload" @uploadImg="uploadImg"></axocx>
                </div>
                <!-- <div style="word-break: break-word;">{{base64}}</div> -->
            </div>
            <div slot="footer">
                <Button type="success"
                        size="large"
                        :loading="modal_loading"
                        :disabled="!qualifiedSubmit"
                        @click="saveEdit('add-clothes', 1)">合格</Button>
                <Button type="error"
                    size="large"
                    :loading="modal_loading"
                    :disabled="qualifiedSubmit"
                    @click="saveEdit('add-clothes', 0)">不合格</Button>
            </div>
        </Modal>
        <Modal v-model="backWashModal"
               class="back_wash_modal"
               :mask-closable="true"
               v-if="sortData && sortData.data && sortData.data.majorClothesList"
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
                       :data="sortData.data.majorClothesList"></Table>
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
        <Modal v-model="regetBarModal"
               class="reget_bar_modal"
               :mask-closable="false"
               :closable="true"
               :transfer="false"
               width="600">
            <p slot="header"
               style="color:#f60; font-size: 18px; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>录入水洗码</span>
            </p>
            <div class="scan">
                <div>
                    扫描结果：
                    <Input type="text"
                           style="width: 300px;"
                           autofocus
                           v-model="regetBar"></Input>
                </div>
                <div class="start-scan">
                    开始扫描条形码
                    <Icon type="ios-search-strong"
                          :size="50"></Icon>
                </div>
                <div class="desc">
                    <p>提示：</p>
                    <p>1.如果读取失败，请尝试鼠标点击输入框，获取光标后开始扫码，才可读取条形码/二维码</p>
                    <p>2.请使用扫码枪扫描水洗条码上的条码/二维码</p>
                </div>
            </div>
            <div slot="footer">
                <Button type="success"
                        size="large"
                        :loading="modal_loading"
                        @click="saveRegetBar()">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<style lang="less" src="./index.less"></style>

<script src="./index.js"></script>
