<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login" @keydown.enter="handleLogin">
    <div class="login-con">
      <Card icon="log-in" title="DA 管理平台" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip" >{{message}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import {filterRoutersByAccess} from '@/libs/routerHelp'
import router from './../../router/index'

export default {
  components: {
    LoginForm
  },
  data () {
    return {
      message: '',
      vmRouter: undefined
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.generateDynamicRouter()
        let userId = this.$store.state.user.userId
        if (userId === '') {
          this.message = this.$store.state.user.msg
        } else {
        }
      })
    },
    generateDynamicRouter () {
      let showRouter = filterRoutersByAccess()
      router.addRoutes(showRouter)
      router.options.routes = showRouter.concat(router.options.routes)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style>

</style>
