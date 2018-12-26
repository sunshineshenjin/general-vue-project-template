import CommonIcon from '_c/common-icon'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      // 菜单改动，优先使用meta中的标题
      return this.$config.useI18n ? ((item.meta && item.meta.menuName) || this.$t(item.name)) : ((item.meta && item.meta.title) || item.name)
    },
    showChildren (item) {
      return item.children && item.children.length > 1
    }
  }
}
