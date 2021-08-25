<template>
  <div>
      <Form ref="product" :model="product" :rules="ruleInline" :label-width="80">
        <FormItem prop="name" label="产品名称">
          <Input type="text"  v-model="product.name" placeholder="请输入产品名称"></Input>
        </FormItem>
        <FormItem label="产品描述">
          <Input type="text" v-model="product.description" placeholder="请输入产品描述"></Input>
        </FormItem>
        <FormItem v-if="$hasBtnPermission('bi-admin')" label="菜单配置">
          <Checkbox v-model="product.showOnWeb" :true-value="1" :false-value="0" >在Web打点显示</Checkbox>
          <Checkbox v-model="product.showOnApp" :true-value="1" :false-value="0" >在App打点显示</Checkbox>
          <Checkbox v-model="product.showOnServer" :true-value="1" :false-value="0" >在Server打点显示</Checkbox>
        </FormItem>
      </Form>
  </div>
</template>

<script>
export default {
  name: 'product-edit',
  props: {
    oldItem: {
      type: Object
    }
  },
  data () {
    return {
      product: {
        name: '',
        description: '',
        showOnWeb: 0,
        showOnApp: 0,
        showOnServer: 0
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      let validate = false
      this.$refs.product.validate((valid) => {
        validate = valid
        if (validate) {
          this.axios.post('productApi/save', this.product, res => {
            if (res.data.flag) {
              this.$parent.$emit('on-save-item-success', true)
              this.$Message.success('保存成功')
            } else {
              this.$parent.$emit('on-save-item-success', false)
            }
          })
        }
      })
      return validate
    }
  },
  watch: {
    oldItem: function (val) {
      this.product = val
    }
  }
}
</script>

<style scoped>

</style>
