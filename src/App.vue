<template>
  <div id="app">
    <router-view/>

    <div class="version" v-show="isUpdateVersion">
        <div class="update">
            <div class="info">
                有最新版本，是否更新？
            </div>
            <button class="sure-update" @click="updateVersion">确定</button>
        </div>
    </div>
  </div>
</template>

<script>
import '@/assets/sass/common.sass'
import '@/assets/sass/iconfont.css'
import { mapGetters } from 'vuex'
export default {
    name: 'App',
    data () {
        return {}
    },
    created () {
        
        document.addEventListener('plusready', () => {
            var oldVersion = plus.runtime.version
            this.$store.dispatch('setOldVersion', oldVersion)
            this.$store.dispatch('getNewVersion')
            this.$store.dispatch('checkToken')
        });

        // var oldVersion = '0.0'
        // this.$store.dispatch('setOldVersion', oldVersion)
        // this.$store.dispatch('getNewVersion')
        // this.$store.dispatch('checkToken')
           
        
    },
    computed: {
        ...mapGetters({
            isUpdateVersion: 'isUpdateVersion'
        })
    },
    methods: {
        updateVersion () {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                plus.runtime.openURL('http://crm.tirecool.net/crm.apk')
            } else if (isiOS) {
                plus.runtime.openURL('https://www.pgyer.com/tirecoolwms')
            }
            
        }
    }
}
</script>
<style>
    #app{
        height: 100%;
    }
</style>

