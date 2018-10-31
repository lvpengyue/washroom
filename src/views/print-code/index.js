import {
    mapActions,
    mapGetters
  } from 'vuex';
  import printJS from 'print-js';


export default {
    data() {
        return {
            code: '123456789',
            timer: '' // 定时任务
        }
    },
    computed: {
        ...mapGetters([
            'mainBarCode'
        ])
    },
    methods: {
        ...mapActions([
            'mainGetBarCode'
        ]),

        async printCode() {
             // 开始生成二维码，并打印条码
            this.code = `${Math.floor(Math.random() * 8 + 1)}${+new Date()}`;
            await this.mainGetBarCode({
                codeStr: this.code
            });
    
            if (this.mainBarCode && this.mainBarCode.code != 1) {
                this.$Notice.warning({
                    title: this.mainBarCode.info
                })
    
                return false;
            }
            setTimeout(() => {
                printJS({
                    printable: 'print-code',
                    type: 'html'
                });
            }, 700);
        }
    }
}
;
