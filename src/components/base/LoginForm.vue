<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>

      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>

      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>

      <p class="g-form-error">{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      errorText: ''
    }
  },
  computed: {
    // 表单验证用户名检验
    userErrors () {
      let errorText, status

      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '不包含@'
      } else {
        status = true
        errorText = ''
      }

      // 解决第一次进入就报错
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }

      return {
        status,
        errorText
      }
    },
    // 表单验证密码检验
    passwordErrors () {
      let errorText, status

      if (!/^\w{6,16}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码不是6-16位'
      } else {
        status = true
        errorText = ''
      }

      // 解决第一次进入就报错
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }

      return {
        status,
        errorText
      }
    }
  },
  methods: {
    // 表单验证登录检验
    onLogin () {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '表单验证未通过，请检查！'
      } else {
        // console.log('登录成功！')
        this.errorText = ''

        this.$http.get('api/login').then((res) => {
          this.$emit('has-log', res.data)
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
