<template>
    <div class="price-my-list">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Button type="primary"
                            size="default"
                            @click="printCode()">打印</Button>
                </div>

                <div id="print-code"
                     style="width: 100%;">
                    <div>
                        <div>
                            <img src="./assets/logo.png"
                                 alt=""
                                 style="width: 2.5cm;">
                        </div>
                        <div>
                            <img :src="mainBarCode ? mainBarCode.data.url : ''"
                                 style="width: 2.3cm; height: 2.3cm; margin-left: 1.2cm"
                                 alt="">
                        </div>
                        <p style="margin-left: 0.8cm">{{code}}</p>
                    </div>
                </div>
            </Card>
            </Col>
        </Row>

    </div>
</template>

<style lang="less" src="./index.less"></style>

<script src="./index.js"></script>
