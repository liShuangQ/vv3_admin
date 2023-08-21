const vue = `<template>
<div class="BOX">
  <div style="width: 100%">
    <ElementForm :option=" ListForm " @ChangeElem=" changeElem " @ButtonFunc=" FormButtonFunc " ref="forms">
    </ElementForm>
  </div>
  <div class="table-box">
    <ElementTable :options=" ListTable " @HandleFunc=" HandleFunc " @ButtonFunc=" TableButtonFunc ">
      <template slot="operate" slot-scope="listData">
        <el-button type="text" size="mini" @click=" routerPage ">操作</el-button>
      </template>
    </ElementTable>
  </div>
</div>
</template>
<script>
import { formData, tableData } from "./config";

export default {
components: {
  ElementForm: () => import( "@/components/ElementForm" ),
  ElementTable: () => import( "@/components/ElementTable" ),
},
created () {
  this.ListForm = formData();
  this.ListTable = tableData();
},
mounted () { },
data () {
  return {
    ListForm: {},
    ListTable: {},
  };
},
methods: {
  recPage () {
    this.$nextTick( () => {
      setTimeout( () => {
        this.ListTable.pagination.pageIndex = 1;
        this.ListTable.pagination.pageRowSize = 10;

        this.$refs[ "forms" ].resetForm();

        this.queryListTableData();
      }, 500 );
    } );
  },
  HandleFunc ( type, val ) {
    if ( type == "handleSelectionChange" ) {
      console.log( this.ListTable.selectOption );
    }
    if ( type == "handleSizeChange" ) {
      this.ListTable.pagination.pageRowSize = val;
      this.queryListTableData();
    }
    if ( type == "handleCurrentChange" ) {
      this.ListTable.pagination.pageIndex = val;
      this.queryListTableData();
    }
  },
  TableButtonFunc ( id ) {
    if ( id === "exp" ) {
      this.exportExcel();
    }
  },
  changeElem ( id, val, elemOption, other ) {
    console.log( id );
  },
  FormButtonFunc ( id ) {
    if ( id === "rec" ) {
      this.$refs[ "forms" ].resetForm();
    }
    if ( id === "sub" ) {
      this.ListTable.pagination.pageIndex = 1;
      this.ListTable.pagination.pageRowSize = 10;
      this.queryListTableData();
    }
  },
  queryListTableData () {
    this.$refs[ "forms" ].validForm( true ).then( ( res ) => {
      if ( res ) {
        let sendData = this.$refs[ "forms" ].QueryFormData();
        this.$https
          .requestServer( "/boardCardAnalyse/queryList", {
            ...sendData,
            pageIndex: this.ListTable.pagination.pageIndex,
            pageRowSize: this.ListTable.pagination.pageRowSize,
          } )
          .then( ( res ) => {
            if ( res.success ) {
              this.ListTable.pagination.total = res.total;
              this.ListTable.data = res.list;
            }
          } )
          .catch( ( err ) => {
            this.$message.error( "查询失败" );
            console.log( err );
          } );
      } else {
      }
    } );
  },
  // 导出方法
  exportExcel () {
    let headerstring = "";
    this.ListTable.header.forEach( ( ele ) => {
      headerstring = headerstring + ele.key + "&" + ele.name + ",";
    } );
    let sendData = this.$refs[ "forms" ].QueryFormData();
    this.$https
      .requestServerExportExcel(
        "/boardCardAnalyse/exportList",
        sendData,
        "导出文件",
        headerstring,
        {}
      )
      .then( ( res ) => { } )
      .catch( ( err ) => {
        console.log( err );
      } );
  },
},
};
</script>
<style scoped>
.BOX {
box-sizing: border-box;
padding: 20px;
}

.table-box {
width: 100%;
height: calc(100% - 70px);
}

.btn {
box-sizing: border-box;
padding-right: 40px;
float: right;
}
</style>
`
const config = `let formData = () => {
    return
    
    ;
  };
  let tableData = () => {
    return
    
    ;
  };
  
  export { formData, tableData };
  `
const form = `<template>
<div class="ElementForm">
  <el-form
    ref="ElementForm"
    class="demo-form-inline form-container"
    :label-width="ListForm.option.labelWidth + 'px'"
    :label-position="ListForm.option.labelPosition"
    size="small"
    :model="ListModelForm"
    :rules="{ ...ListForm.rules }"
  >
    <el-row v-for="(rowItem, rowIndex) in ListForm.row" :key="rowIndex">
      <el-col
        v-for="item in rowItem"
        :span="item.col"
        :key="item.id"
        :offset="item.offset"
      >
        <el-form-item
          :label="item.name"
          v-if="
            !(
              item.elem == 'button' ||
              (item.elem == 'custom' && item.labelhidden)
            )
          "
          :label-width="
            (item.labelWidth || ListForm.option.labelWidth) + 'px'
          "
          :prop="item.id"
        >
          <!-- input 输入框 -->
          <el-input
            v-if="item.elem == 'input' && item.type != 'autocomplete'"
            :type="item.type || 'text'"
            v-model="item.value"
            :style="{ width: item.width ? item.width + 'px' : '100%' }"
            :maxlength="255 || item.maxlength"
            :show-word-limit="item.showWordLimit"
            :autosize="item.autosize || true"
            :disabled="item.disabled || ListForm.option.disabled"
            :placeholder="item.placeholder || '请输入' + item.name"
            :clearable="item.clearable === false ? false : true"
            :show-password="item.password"
            @change="(val) => ChangeElem(item.id, val, item)"
          ></el-input>
          <!-- input 输入框 -->

          <!-- input 输入框 -->
          <el-autocomplete
            v-if="item.elem == 'input' && item.type == 'autocomplete'"
            :type="item.type || 'text'"
            v-model="item.value"
            :style="{ width: item.width ? item.width + 'px' : '100%' }"
            :fetch-suggestions="
              (val, cb) => ChangeElem(item.id, val, item, cb)
            "
            :disabled="item.disabled || ListForm.option.disabled"
            :placeholder="item.placeholder || '请输入' + item.name"
            :popper-class="item.popperClass"
            :clearable="item.clearable === false ? false : true"
            @select="(val) => ChangeElem(item.id, val, item)"
            :trigger-on-focus="false"
          ></el-autocomplete>
          <!-- input 输入框 -->

          <!-- select 输入框 -->
          <el-select
            v-if="item.elem == 'select'"
            v-model="item.value"
            :style="{ width: item.width ? item.width + 'px' : '100%' }"
            :disabled="item.disabled || ListForm.option.disabled"
            :multiple="item.multiple"
            :filterable="item.filterable"
            :remote="item.remote"
            :placeholder="item.placeholder || '请输入' + item.name"
            :remote-method="
              (query) => ChangeElem(item.id, query, item, 'remote')
            "
            @change="(val) => ChangeElem(item.id, val, item)"
            collapse-tags
            :clearable="item.clearable === false ? false : true"
          >
            <!-- :remote-method="item.remote ? query => ChangeElem(item.id,val,item,'remote') : null " -->
            <!-- :filterable="item.filterable" -->
            <el-option
              v-for="selectItem in item.option"
              :key="selectItem.value"
              :label="selectItem.name"
              :value="selectItem.value"
            ></el-option>
          </el-select>
          <!-- select 输入框 -->

          <!-- date-picker 输入框 -->
          <el-date-picker
            v-if="item.elem == 'datePicker'"
            :type="item.type || 'date'"
            v-model="item.value"
            :style="{ width: item.width ? item.width + 'px' : '100%' }"
            :disabled="item.disabled || ListForm.option.disabled"
            :placeholder="item.placeholder || '请选择日期'"
            :value-format="item.valueFormat || 'yyyy-MM-dd'"
            :start-placeholder="item.startPlaceholder || '开始时间'"
            :end-placeholder="item.endPlaceholder || '结束时间'"
            :clearable="item.clearable === false ? false : true"
            @change="(val) => ChangeElem(item.id, val, item)"
            :picker-options="item.pickerOptions"
          ></el-date-picker>
          <!-- date-picker 输入框 -->

          <!-- switch 开关 -->
          <el-switch
            v-if="item.elem == 'switch'"
            v-model="item.value"
            :style="{ width: item.width ? item.width + 'px' : '100%' }"
            :disabled="item.disabled || ListForm.option.disabled"
            @change="(val) => ChangeElem(item.id, val, item)"
          ></el-switch>
          <!-- switch 开关 -->

          <!-- checkbox 选择框 -->
          <el-checkbox-group
            v-if="item.elem == 'checkbox'"
            v-model="item.value"
            :style="{ width: item.width ? item.width + 'px' : '100%' }"
            :disabled="item.disabled || ListForm.option.disabled"
            @change="(val) => ChangeElem(item.id, val, item)"
          >
            <el-checkbox
              v-for="checkboxItem in item.option"
              :label="checkboxItem.name"
              :key="checkboxItem.name"
            ></el-checkbox>
          </el-checkbox-group>
          <!-- checkbox 选择框 -->

          <!-- radio 选择框 -->
          <el-radio-group
            v-if="item.elem == 'radio'"
            v-model="item.value"
            :style="{ width: item.width ? item.width + 'px' : '100%' }"
            :disabled="item.disabled || ListForm.option.disabled"
            @change="(val) => ChangeElem(item.id, val, item)"
          >
            <el-radio
              v-for="radioItem in item.option"
              :label="radioItem.name"
              :key="radioItem.name"
            ></el-radio>
          </el-radio-group>
          <!-- radio 选择框 -->

          <!-- 自定义插槽 -->

          <slot :name="item.id"></slot>

          <!-- 自定义插槽 -->
        </el-form-item>

        <div v-if="item.elem == 'button'" class="buttonGroup">
          <el-button
            v-for="buttonItem in item.option"
            :key="buttonItem.id"
            :type="buttonItem.themeType || 'primary'"
            size="mini"
            @click="ButtonFunc(buttonItem.id, buttonItem)"
            >{{ buttonItem.name }}</el-button
          >
        </div>

        <div v-if="item.elem == 'custom' && item.labelhidden">
          <slot :name="item.id"></slot>
        </div>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>


<script>
import { cloneDeep } from "lodash";

export default {
data() {
  return {
    ListForm: {
      option: {
        labelWidth: 80,
        labelPosition: "left",
      },
      row: [],
      rules: {},
    },
    ListModelForm: {},
  };
},
model: {
  prop: "option",
  event: "ChangeElem",
},
props: {
  option: {
    default: () => ({
      option: {
        labelWidth: 80,
        labelPosition: "left",
      },
      row: [],
      rules: {},
    }),
  },
  value: "",
},
methods: {
  formatOption() {
    this.ListForm = cloneDeep(this.option);

    this.renderFormModel();

    // this.$emit("RenderEnd",true);
  },
  ChangeElem(id, val, elemOption, other) {
    //console.log(id,val,elemOption)

    this.$emit("ChangeElem", id, val, elemOption, other);
  },
  ButtonFunc(id, buttonOption) {
    // if(buttonOption.buttonType == "search"){

    //    this.QueryFormData();

    // }

    this.$emit("ButtonFunc", id);
  },
  QueryFormData() {
    let option = {};

    this.ListForm.row.forEach((row, index) => {
      row.forEach((item, i) => {
        let val = item.value || "";

        if (
          item.elem == "datePicker" &&
          (item.type == "daterange" || item.type == "datetimerange") &&
          (item.value == null || item.value == "")
        ) {
          val = ["", ""];
        }

        if (item.elem == "select") {
          if (!item.multiple) {
            let defaultOption = (item.option || []).filter(
              (v) => v.value == item.value
            );

            val = defaultOption.length == 0 ? "" : defaultOption[0].value;
          } else {
            let defaultOption = (item.option || []).filter(
              (v) => item.value.indexOf(v.value) >= 0
            );

            val =
              defaultOption.length == 0
                ? []
                : defaultOption.map((item) => item.value);
          }
        }

        option[item.id] = val;
      });
    });

    return option;

    //this.$emit("QueryFormData",option);
  },
  querySelectOption(id) {
    let obj = [];

    this.ListForm.row.forEach((row, index) => {
      row.forEach((item, i) => {
        if (item.elem == "select" && item.id == id) {
          if (!item.multiple) {
            obj = item.option.filter((v) => v.value == item.value);
          } else {
            obj = item.option.filter((v) => item.value.indexOf(v.value) >= 0);
          }
        }
      });
    });

    return obj;
  },
  renderFormModel() {
    let model = {};

    //if(!this.ListForm.row) return;

    let row = Array.from(this.ListForm.row || []);

    row.forEach((item, index) => {
      item.forEach((v, i) => {
        model[v.id] = v.value || "";
      });
    });

    this.ListModelForm = model;
  },
  setFormOption(option) {
    ///[{id:id,value:value}] 异步

    //console.log("渲染子组件",option)

    let opt = [...option];

    this.ListForm.row = this.ListForm.row.map((item, index) => {
      item = item.map((v, i) => {
        let filterObj = opt.filter((f) => f.id == v.id);

        let arr = { ...v };

        if (filterObj.length > 0) {
          filterObj.forEach((fv, fi) => {
            arr = Object.assign(v, filterObj[fi]);
          });
        }

        return arr;
      });

      return item;
    });
  },
  validForm(check = true) {
    //check false 不检验

    if (check) {
      return new Promise((resolve, reject) => {
        this.$refs["ElementForm"].validate((valid) => {
          if (valid) {
            resolve(true);
          } else {
            reject(false);
            return false;
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
  },
  resetForm() {
    this.$refs["ElementForm"].resetFields();

    this.ListForm.row = this.ListForm.row.map((item, index) => {
      item = item.map((v, i) => {
        if (v.elem == "date" && v.type == "daterange") {
          v.value = [];
        } else if (v.elem == "checkbox") {
          v.value = [];
        } else if (v.elem == "radio") {
          v.value = v.option[0].name;
        } else {
          v.value = "";
        }

        return v;
      });

      return item;
    });
  },
},
mounted() {
  this.formatOption();
},
watch: {
  option: {
    handler(val, oldVal) {
      this.formatOption();
    },
    deep: true,
  },
  ListForm: {
    handler(val, oldVal) {
      this.renderFormModel();
    },
    deep: true,
  },
},
};
</script>

<!-- 
<style lang="less" scoped>
.ElementForm {
width: 100%;
height: 100%;
position: relative;

.form-container {
  /deep/ .el-form-item__content {
    padding-right: 15px;
  }

  /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: auto;
  }

  .buttonGroup {
    text-align: right;
  }
}
}
</style> -->
`
const table = `<template>
<div class="component-ElementTable" style="width: 100%; height: 100%">
  <el-row class="page-table">
    <el-table
      :data="tableData"
      @selection-change="List_handleSelectionChange"
      ref="multipleTable"
      height="100%"
      :span-method="arraySpanMethod"
      @sort-change="sortchange"
      :border="listTable.border"
      :row-style="(listTable.style && listTable.style.rowStyle) || {}"
      :cell-style="(listTable.style && listTable.style.cellStyle) || {}"
      :class="[
        listTable.option && listTable.option.rowExpand
          ? 'row-expand'
          : 'row-expand-close',
      ]"
      :row-key="null || options.rowKey"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      >
      <!-- :row-style="listTable.style.rowStyle||{}"
              :cell-style="listTable.style.cellStyle||{}" -->
      <!-- 序号列 -->

      <el-table-column
        v-if="listTable.hasIndex"
        :label="
          listTable.indexColumnOpt
            ? listTable.indexColumnOpt.label || '序号'
            : '#'
        "
        min-width="80"
        :fixed="
          listTable.indexColumnOpt ? listTable.indexColumnOpt.fixed : false
        "
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.$index +
            (listTable.pagination.pageIndex - 1) *
              listTable.pagination.pageRowSize +
            1
          }}
        </template>
      </el-table-column>

      <!-- 选择列 -->

      <el-table-column
        v-if="listTable.hasSelect"
        width="60"
        align="center"
        type="selection"
      ></el-table-column>

      <!-- 普通列,钻取列,自定义列 -->

      <el-table-column
        v-for="(item, index) in listTable.header"
        :property="item.key"
        :prop="item.key"
        :label="item.name"
        :key="item.key"
        :align="item.align ? item.align : 'center'"
        :min-width="item.width ? item.width : 150"
        :fixed="item.fixed ? item.fixed : false"
        v-if="!item.hidden"
        show-overflow-tooltip
        :sortable="item.sort ? 'custom' : false"
      >
        <template
          v-if="item.headerformatter"
          :slot="item.headerformatter ? 'header' : ''"
          slot-scope="scope"
        >
          <slot
            :name="'header-' + item.key"
            :scope="scope"
            :row="scope.row"
          ></slot>
        </template>

        <template slot-scope="scope">
          <template v-if="!item.formatter">
            <template v-if="!item.isDrill">
              {{ scope.row[item.key] }}
            </template>
            <template v-else>
              <el-button
                v-if="!item.text"
                type="text"
                size="mini"
                @click="CellClick(item.key, scope.row)"
                >{{ listTable.data[scope.$index][item.key] }}</el-button
              >
              <el-button
                v-else
                type="text"
                size="mini"
                @click="CellClick(item.key, scope.row)"
                >{{ item.text }}</el-button
              >
            </template>
          </template>
          <template v-else>
            <slot :name="item.key" :scope="scope" :row="scope.row"></slot>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <el-row class="page-function">
    <el-pagination
      background
      v-if="!(listTable.pagination.show == false)"
      :style="{
        float: listTable.pagination.position == 'right' ? 'right' : 'left',
      }"
      @size-change="List_handleSizeChange"
      @current-change="List_handleCurrentChange"
      :current-page="listTable.pagination.pageIndex"
      :page-sizes="[5, 10, 20, 30, 50, 100, 200]"
      :pager-count="5"
      :page-size="listTable.pagination.pageRowSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listTable.pagination.total"
    >
    </el-pagination>
    <div class="function-button">
      <el-button
        v-for="item in listTable.button"
        :key="item.id"
        type="primary"
        size="mini"
        @click="ButtonFunc(item.id, item.export)"
        >{{ item.name }}</el-button
      >
    </div>
  </el-row>
</div>
</template>





<script>
import { cloneDeep, defaultsDeep } from "lodash";

export default {
data() {
  let data = {
    listTable: {
      cellSpan: false,
      client: false,
      hasIndex: false,
      hasSelect: false,
      border: true,
      rowKey: null,
      header: [
        //    {
        //         name:"",        表头显示值
        //         key:"",
        //         isDrill:false,  是否钻取
        //         width:150,      宽度
        //         text:false,     钻取显示文本
        //         fixed:false,    左右对其
        //         hidden:false    是否隐藏
        //         sort:false      是否排序
        //         exporthidden:false    导出隐藏
        //    }
      ],
      data: [],
      pagination: {
        pageIndex: 1,
        pageRowSize: 10,
        total: 0,
      },
      button: [
        //  {
        //    id:"",
        //    name:"",
        //    export:false,
        //    option:{
        //        url:"",
        //        params:{},
        //        fileName:""
        //    }
        //   }
      ],
      selectOption: [],
      style: {
        rowStyle: null,
        cellStyle: null,
      },
    },
  };

  return data;
},
model: {
  prop: "options",
  event: "ModelValue",
},
props: {
  options: {
    type: Object,
    default: () => ({
      hasIndex: false,
      hasSelect: false,
      header: [],
      data: [],
      border: true,
      rowKey: null,
      pagination: {
        pageIndex: 1,
        pageRowSize: 10,
        total: 0,
      },
      button: [],
      selectOption: [],
      option: {},
    }),
  },
  value: "",
},
computed: {
  tableData() {
    let { data, client, pagination } = this.listTable;

    let { pageIndex, pageRowSize } = pagination;

    let tableData = !client
      ? data
      : data.slice((pageIndex - 1) * pageRowSize, pageIndex * pageRowSize);

    return tableData;
  },
},
methods: {
  formatTableData() {
    this.listTable = cloneDeep(this.options);

    this.doLayout();
  },
  updateTableOption() {
    let cw = document.body.clientWidth;

    // this.listTable.option = Object.assign({
    //     rowExpand: cw < 1400 ? false : true
    // },{...this.options.option||{}});

    if (this.options.option && this.options.option.rowExpand) {
      this.listTable.option = Object.assign(
        {
          rowExpand: cw < 1400 ? false : true,
        },
        { ...this.options.option }
      );
    } else {
      this.listTable.option.rowExpand = cw < 1400 ? false : true;
    }

    this.doLayout();
  },

  List_handleSelectionChange(val) {
    this.listTable.selectOption = val;
    this.HandleFunc("handleSelectionChange", val);
  },
  List_handleSizeChange(val) {
    this.listTable.pagination.pageRowSize = val;
    this.HandleFunc("handleSizeChange", val);
  },
  List_handleCurrentChange(val) {
    this.listTable.pagination.pageIndex = val;
    this.HandleFunc("handleCurrentChange", val);
  },
  ListExportAllData() {},
  HandleFunc(type, val) {
    this.ModelValue();
    this.$emit("HandleFunc", type, val);
  },
  CellClick(type, val) {
    this.ModelValue();
    this.$emit("CellClick", type, val);
  },
  ButtonFunc(id, isexport = false) {
    this.ModelValue();
    this.$emit("ButtonFunc", id, isexport);
  },
  doLayout() {
    this.$nextTick(() => {
      if (this.$refs["multipleTable"]) {
        this.$refs["multipleTable"].doLayout();
      }
    });
  },
  ModelValue() {
    this.$emit("ModelValue", cloneDeep(this.listTable));
  },
  sortchange({ column, prop, order }) {
    let sort = order == "ascending" ? "asc" : "desc";
    let colname = prop;

    this.$emit("cell-click", "sortChange", { colname, sort });
  },
  arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    /////合并单元格

    if (!this.listTable.cellspan) return "";
    ///////////
    else {
      let total = this.listTable.data.length;

      let row_total = new Set(
        this.listTable.data.map((param) => param.ROWNUM)
      );

      let row_index = [];

      row_total.forEach((elem) => {
        row_index.push({
          number: this.listTable.data.filter((param) => param.ROWNUM == elem)
            .length,
        });
      });

      let row_total_index = 0;
      ///row_index [10, 3, 11, 13]
      row_index = row_index.map((param) => {
        param.index = row_total_index;
        row_total_index += param.number;

        return param;
      });

      if (columnIndex < 6) {
        if (row_index.filter((param) => param.index == rowIndex).length > 0) {
          //0,10,13,24  //10,13,24,37

          return {
            rowspan:
              row_index.filter((param) => param.index == rowIndex)[0].number *
              1,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    }

    ////////
  },
},
mounted() {
  this.formatTableData();

  this.updateTableOption();

  window.addEventListener("resize", () => {
    this.formatTableData();

    this.doLayout();
  });
},
watch: {
  "options.data": {
    handler(val, oldVal) {
      if (JSON.stringify(val) == JSON.stringify(oldVal)) return;

      this.formatTableData();
    },
    deep: true,
  },
  "options.option": {
    handler(val, oldVal) {
      this.listTable.option = Object.assign(
        this.listTable.option,
        this.options.option
      );

      this.doLayout();
    },
    deep: true,
  },
  "options.header": {
    handler(val, oldVal) {
      this.listTable.header = this.options.header;

      this.doLayout();
    },
    deep: true,
  },
  "options.pagination": {
    handler(val, oldVal) {
      this.listTable.pagination = this.options.pagination;

      this.doLayout();
    },
    deep: true,
  },
},
};
</script>


<!-- <style  lang="less"  scoped>
.component-ElementTable {
.page-table {
  height: calc(100% - 40px);
}
.page-function {
  height: 40px;
  margin-top: 10px;
  padding: 10px 0;

  .function-button {
    float: right;
  }
}

/deep/ .el-table {
  height: 100% !important;
  .el-table__header {
    th {
      background-color: #f4f5f8;
    }
  }

  .el-table__body-wrapper {
    tr:nth-child(2n) {
      background-color: #f8f9fa;
    }
  }

  .el-table__fixed-body-wrapper {
    tr:nth-child(2n) {
      background-color: #f8f9fa;
    }
  }

  th {
    color: rgba(0, 0, 0, 0.7);
    //font-weight:normal;
  }

  tr {
    color: rgba(0, 0, 0, 0.7);
    font-weight: normal;
  }
}

/deep/ .row-expand {
  td,
  th {
    padding: 8px 0px;
  }
}

/deep/ .row-expand-close {
  td,
  th {
    padding: 4px 0px;
  }
}
}
</style> -->
`
const readme = `1.补丁号： 
2.发布现场:  
3.发布时间： 
4.问题描述：  
5.禅道编号： 
6.bug号：
7.制作人: 
8.现场人员：
9.适用现场：
10.升级步骤：
**********请将升级相关文件做好备份**********

(0)注意备份

(1)打开补丁文件至 xxxxxx  下添加  yyy 

(2)将 xxxxxx 替换至 yyyyyyy下

(??)清除缓存并刷新页面

-----------------------------------------------------------------------------------------------	
  ps:注意备份 
  部署完请在一周内回复，没部署也要回复	
  升级完成后请回复邮件，填写如下内容：
 	升级状态：成功/失败
  	升级时长：xx分钟
  	返测次数：xx次
  	返测说明：
  		1)...
  		2)...
  		3)…
------------------------------------------------------------------------------------------------`

const menu = `INSERT INTO T_OS_RIGHT (RIGHT_ID, RIGHT_NAME, PARENT_ID, URL, LCON, REMARK, STATUS, TYPE, MENU_LEVEL, MENU_ORDER) VALUES ('tomp_OtnLedger', 'OTN波道台账', '/tomp_otnNetwork', null, null, null, 2, 0, null, null);

INSERT INTO T_OS_ROLE_REL_RIGHT (ID, ROLE_ID, RIGHT_ID) VALUES ('tomp_OtnLedger_1000', '1000', 'tomp_OtnLedger');
INSERT INTO T_OS_ROLE_REL_RIGHT (ID, ROLE_ID, RIGHT_ID) VALUES ('tomp_OtnLedger_1001',  '1001', 'tomp_OtnLedger');
INSERT INTO T_OS_ROLE_REL_RIGHT (ID, ROLE_ID, RIGHT_ID) VALUES ('tomp_OtnLedger_1002', '1002', 'tomp_OtnLedger');
INSERT INTO T_OS_ROLE_REL_RIGHT (ID, ROLE_ID, RIGHT_ID) VALUES ('tomp_OtnLedger_1005', '1005', 'tomp_OtnLedger');

STATUS 工作台2  运维1
操作会重置菜单权限,如需操作请重复设置

 /tomp_OtnLedger
菜单路径：专题分析-网络结构安全分析- OTN网络分析- OTN波道台账

                  {
                    "uid": "d12f1235-aff9-4983-80a7-43812420d0f0",
                    "type": "iframe",
                    "id": "tomp_OtnLedger",
                    "env": "",
                    "icon": "",
                    "title": "OTN波道台账",
                    "meta": {
                      "icon": "",
                      "title": "OTN波道台账"
                    },
                    "componentUrl": null,
                    "url": "/tomp_OtnLedger",
                    "path": "/tomp_OtnLedger",
                    "moduleName": "FRAME_TCOAMP_TCCPAP",
                    "routerPath": null,
                    "children": [],
                    "hidden": false,
					"contact": false,
                    "parentId": "tomp_otnNetwork"
                  }



修改菜单id  权限表直接新增就行
update t_os_right set RIGHT_ID= 'fjoltBasicInformation' where RIGHT_ID='oltBasicInformation'
update t_os_right set RIGHT_ID= 'fjoltUplinkLink'  where  RIGHT_ID='oltUplinkLink'
update t_os_right set URL = 'fjoltBasicInformation' where  URL ='oltBasicInformation'
update t_os_right set URL = 'fjoltUplinkLink'  where  URL ='oltUplinkLink'`

const allData = {vue,config,form,table,readme,menu}

export const getData = (t:string) => {
    return allData[t]
}