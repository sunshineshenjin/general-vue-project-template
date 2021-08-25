<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login" @keydown.enter="handleLogin">
    <div class="login-con">
      <Card icon="log-in" title="XX 管理平台" :bordered="false">
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
import { filterRoutersByAccess } from '@/libs/routerHelp'
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
        let userName1 = this.$store.state.userName
        if (userName1 === '') {
          this.message = this.$store.state.user.msg
        } else {
          this.$router.push({
            name: 'home'
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
