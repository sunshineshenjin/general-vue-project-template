<template>
  <div>
    <base-table
      :showAddBtn="$hasBtnPermission('bi,bi-admin')"
      :defaultSearchBox="true"
      :defaultSearchBtn="true"
      :rowData="tableData"
      :columns="columns"
      :totalCount="totalCount"
      :pageIndex = "queryParams.pageIndex"
      :defaultPageSize = "queryParams.pageSize"
      :loading="loading"
      :queryDataCallBack="queryPageData"
      :beforeEditViewOpenCallback="getEditItem"
      :searchBtnClickCallBack="startSearchPageList"
      @on-rows-delete ="onRowsDelete($event)"
    >
      <product-add slot="addViewContent">
      </product-add>
      <product-edit slot="editViewContent" :oldItem="oldEditItem">
      </product-edit>
    </base-table>
  </div>
</template>

<script>
import BaseTable from 'dwui/packages/base-table/base-table'
import ProductEdit from './product-edit'
import ProductAdd from './product-add'

export default {
  name: 'product',
  components: {
    ProductAdd,
    ProductEdit,
    BaseTable
  },
  data () {
    return {
      columns: [
        { title: 'ID', key: 'id', sortable: true },
        { title: '产品名称', key: 'name' },
        { title: '产品描述', key: 'description' },
        {
          title: '操作',
          key: 'handle',
          options: [{ name: 'edit', permission: 'bi,bi-admin' }, { name: 'delete', permission: 'bi,bi-admin' }]
        }
      ],
      tableData: [],
      totalCount: 0,
      loading: false,
      oldEditItem: {},
      queryParams: {
        pageIndex: 1,
        pageSize: 20,
        name: ''
      }
    }
  },
  methods: {
    getEditItem (item) {
      this.oldEditItem = item
    },
    /** 事件方法start **/
    onRowsEdit (item) {
      this.oldEditItem = item.row
    },
    onRowsDelete (item) {
      this.delProduct({ id: item.row.id })
    },
    startSearchPageList: function (defaultSearch) {
      this.queryParams.name = defaultSearch
      this.refreshTable()
    },
    /** 事件方法end **/
    /* 核心接口方法start **/
    queryPageData (pageIndex, pageSize) {
      this.queryParams.pageIndex = pageIndex || this.queryParams.pageIndex
      this.queryParams.pageSize = pageSize || this.queryParams.pageSize
    },
    /* 核心接口方法 end **/
    refreshTable () {
      this.queryParams.pageIndex = 1
      this.queryPageData()
    }
  },
  created: function () {
    this.queryPageData()
  }
}
</script>

<style>

</style>
