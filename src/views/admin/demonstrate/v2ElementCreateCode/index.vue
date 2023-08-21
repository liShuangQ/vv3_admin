<!--
* @Description: vue2配合组件代码生成
* @note: 由之前js,html版本迁移而来，不注意类型等写法。
* @Author: shuangqi.li
* @Email: li_shuangq@foxmail.com
* @Date: 2023-06-29 19:07:17
-->
<template>
  <div>
    <div class="bg-purple-100 box-border pb-2">
      <div class="overflow-hidden">
        项目名 :
        <a-input
          size="small"
          class="w-1/5 mt-2 pr-200"
          v-model:value="datadata.n"
        />
        <span class="text-red-600">{{ nData }}</span>
      </div>
      <div>
        分割符 :
        <a-input size="small" class="w-10 mt-2" v-model:value="datadata.s" />
      </div>
      <div>
        表单 :
        <a-input size="small" class="w-4/5 mt-2" v-model:value="datadata.f" />
      </div>
      <div>
        表单类型 :
        <a-input size="small" class="w-4/5 mt-2" v-model:value="datadata.f_t" />
        <div class="flex justify-around">
          <div>i -- 文本</div>
          <div>s -- 选择</div>
          <div>im -- 模糊文本</div>
          <div>sm -- 模糊选择</div>
          <div>t -- 时间</div>
          <div>sw -- 开关</div>
          <div>c -- 复选</div>
          <div>r -- 单选</div>
        </div>
      </div>

      <div>
        表格 :
        <a-input size="small" class="w-4/5 mt-2" v-model:value="datadata.t" />
      </div>
      <a-button type="primary" size="small" class="mt-4" @click="submit()"
        >提交</a-button
      >
    </div>

    <div class="bg-green-50 flex h-6">
      <div class="flex-1 bg-green-200 text-center">
        <a-button
          class="text-lg p-0 h-6 leading-6"
          type="text"
          @click="openModel('vue')"
          >vue</a-button
        >
      </div>
      <div class="flex-1 bg-green-100 text-center">
        <a-button
          class="text-lg p-0 h-6 leading-6"
          type="text"
          @click="openModel('config')"
          >config</a-button
        >
      </div>
      <div class="flex-1 bg-green-200 text-center">
        <a-button
          class="text-lg p-0 h-6 leading-6"
          type="text"
          @click="openModel('form')"
          >form</a-button
        >
      </div>
      <div class="flex-1 bg-green-100 text-center">
        <a-button
          class="text-lg p-0 h-6 leading-6"
          type="text"
          @click="openModel('table')"
          >table</a-button
        >
      </div>
      <div class="flex-1 bg-green-200 text-center">
        <a-button
          class="text-lg p-0 h-6 leading-6"
          type="text"
          @click="openModel('readme')"
          >readme</a-button
        >
      </div>
      <div class="flex-1 bg-green-100 text-center">
        <a-button
          class="text-lg p-0 h-6 leading-6"
          type="text"
          @click="openModel('menu')"
          >menu</a-button
        >
      </div>
    </div>

    <div class="overflow-hidden">
      <div class="float-left w-1/2 bg-red-50">
        <div class="bg-red-200 text-center">
          表单
          <span
            class="float-right cursor-pointer text-blue-600"
            @click="copyFunction('fData')"
            >复制代码</span
          >
        </div>
        <pre id="fData">
            {{ fData }}
          </pre
        >
      </div>

      <div class="float-left w-1/2 bg-blue-50">
        <div class="bg-blue-200 text-center">
          表格
          <span
            class="float-right cursor-pointer text-blue-600"
            @click="copyFunction('tData')"
            >复制代码</span
          >
        </div>
        <pre id="tData">
            {{ tData }}
          </pre
        >
      </div>
    </div>

    <div class="bg-yellow-50">
      <div class="bg-yellow-200 text-center">
        接口文档
        <span
          class="float-right cursor-pointer text-blue-600"
          @click="copyFunction('doc')"
          >复制代码</span
        >
      </div>
      <pre id="doc">
          {{ doc }}
        </pre
      >
    </div>

    <div class="bg-red-50">
      <div class="bg-red-200 text-center">表单补充</div>
      <div class="flex overflow-x-auto">
        <div class="flex-1 bg-gray-100">
          <div class="text-center text-red-600">选择</div>
          <pre>
              {{ formDlc.select }}
            </pre
          >
        </div>
        <div class="flex-1 bg-gray-300">
          <div class="text-center text-red-600">模糊搜索选择</div>
          <pre>
              {{ formDlc.mSelect }}
            </pre
          >
        </div>

        <div class="flex-1 bg-gray-100">
          <div class="text-center text-red-600">模糊搜索input</div>
          <pre>
              {{ formDlc.autocomplete }}
            </pre
          >
        </div>

        <div class="flex-1 bg-gray-300">
          <div class="text-center text-red-600">时间</div>
          <pre>
              {{ formDlc.time }}
            </pre
          >
        </div>

        <div class="flex-1 bg-gray-100">
          <div class="text-center text-red-600">开关</div>
          <pre>
              {{ formDlc.switch }}
            </pre
          >
        </div>

        <div class="flex-1 bg-gray-300">
          <div class="text-center text-red-600">复选</div>
          <pre>
              {{ formDlc.checkbox }}
            </pre
          >
        </div>
        <div class="flex-1 bg-gray-100">
          <div class="text-center text-red-600">单选</div>
          <pre>
              {{ formDlc.radio }}
            </pre
          >
        </div>
        <div class="flex-1 bg-gray-300">
          <div class="text-center text-red-600">方法</div>
          <pre>
              this.$refs["forms"].querySelectOption("yyy")
              this.$refs["forms"].setFormOption([  ])
              let{ {{ send }} } = this.$refs["forms"].QueryFormData();
            </pre
          >
        </div>
      </div>
    </div>
    <div>
      <a-modal
        v-model:visible="visible"
        :width="800"
        title="Code"
        :footer="null"
      >
        <div style="height: 600px" class="box-border pb-4 pl-4">
          <span
            class="float-right cursor-pointer text-blue-600 mr-6"
            @click="copyFunction('modelText')"
            >复制代码</span
          >
          <pre class="w-full h-full" id="modelText">
          {{ modelText }}
        </pre
          >
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { http } from "@/plugins/axios";
import { appid, key } from "./userConfig";
import { Md5 } from "ts-md5";
import { message } from "ant-design-vue";
import { getData } from "./text";
let visible = ref(false);
let nData = ref("");
let fData = ref({
  option: {
    labelWidth: 100,
    labelPosition: "left",
  },
  row: [[]],
  rules: {
    demo: [{ required: true, message: "请选择", trigger: "change" }],
    demo2: [{ required: true, message: "请输入", trigger: "blur" }],
  },
});
let tData = ref({
  cellSpan: false,
  client: false, ///前端分页
  hasIndex: false,
  hasSelect: true,
  indexColumnOpt: {
    fixed: "left",
  },
  selectOption: [],
  option: {
    rowExpand: false,
  },
  header: [],
  data: [],
  pagination: {
    pageIndex: 1,
    pageRowSize: 10,
    total: 0,
  },
  button: [
    {
      id: "exp",
      name: "导 出",
      type: "primary",
    },
  ],
});
let doc = ref({
  in: {},
  out: [{}],
});
let fanyi = (query: any, t: any) => {
  var salt = new Date().getTime();
  var from = "zh";
  var to = "en";
  var str1 = appid + query + salt + key;
  var sign = Md5.hashStr(str1);
  http
    .jsonp("http://api.fanyi.baidu.com/api/trans/vip/translate", {
      q: query,
      appid: appid,
      salt: salt,
      from: from,
      to: to,
      sign: sign,
    })
    .then((r: any) => {
      if (r.error_code) {
        let t = "";
        r.error_code === "52001" && (t = "请求超时请重试");
        r.error_code === "52002" && (t = "系统错误请重试");
        r.error_code === "52003 " &&
          (t = "未授权用户,请检查appid是否正确或者服务是否开通");
        r.error_code === "54000" && (t = "必填参数为空,请检查是否少传参数 ");
        r.error_code === "54001" && (t = "签名错误,请检查您的签名生成方法");
        r.error_code === "54003" && (t = "访问频率受限");
        r.error_code === "54004" && (t = "账户余额不足 ");
        r.error_code === "54005" && (t = "长query请求频繁");
        r.error_code === "58000" && (t = "客户端IP非法");
        r.error_code === "58001" && (t = "译文语言方向不支持");
        r.error_code === "58002" && (t = "服务当前已关闭");
        r.error_code === "90107" && (t = "认证未通过或未生效");
        message.error(t);
      }
      if (!r.error_code && t === "n") {
        nData.value = r.trans_result[0].dst
          .replace(/\s/g, "_")
          .replace(/^./, (L: any) => L.toLowerCase());
      }
      if (!r.error_code && t === "f") {
        fData.value.row[0] = r.trans_result.map((e: any) => {
          let tt = (datadata.f_t_arr as any).find((v: any) => {
            return v.n === e.src;
          }).t;
          if (
            tt !== "s" &&
            tt !== "sm" &&
            tt !== "im" &&
            tt !== "t" &&
            tt !== "sw" &&
            tt !== "c" &&
            tt !== "r"
          ) {
            tt = "i";
          }
          if (tt === "i") {
            return {
              name: e.src,
              id: toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
                L.toLowerCase()
              ),
              col: 6,
              placeholder: "",
              value: "",
              clearable: true,
              disabled: false,
              elem: "input",
            };
          }
          if (tt === "s") {
            return {
              name: e.src,
              id: toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
                L.toLowerCase()
              ),
              col: 6,
              placeholder: "",
              value: "",
              clearable: true,
              disabled: false,
              elem: "select",
              option: [
                {
                  value: "1",
                  name: "yiyi",
                },
              ],
              multiple: false,
            };
          }
          if (tt === "sm") {
            return {
              name: e.src,
              id: toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
                L.toLowerCase()
              ),
              col: 6,
              placeholder: "",
              value: "",
              clearable: true,
              disabled: false,
              elem: "select",
              option: [
                {
                  value: "1",
                  name: "yiyi",
                },
              ],
              multiple: false,
              filterable: true,
              remote: true,
            };
          }
          if (tt === "im") {
            return {
              name: e.src,
              id: toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
                L.toLowerCase()
              ),
              col: 6,
              placeholder: "",
              value: "",
              clearable: true,
              disabled: false,
              elem: "input",
              type: "autocomplete",
            };
          }
          if (tt === "t") {
            return {
              name: e.src,
              id: toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
                L.toLowerCase()
              ),
              col: 6,
              placeholder: "",
              value: "",
              clearable: true,
              disabled: false,
              elem: "datePicker",
              type: "date",
              valueFormat: "yyyy-MM-dd",
            };
          }
          if (tt === "sw") {
            return {
              name: e.src,
              id: toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
                L.toLowerCase()
              ),
              col: 6,
              placeholder: "",
              value: "",
              clearable: true,
              disabled: false,
              elem: "switch",
            };
          }
          if (tt === "c") {
            return {
              name: e.src,
              id: toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
                L.toLowerCase()
              ),
              col: 6,
              placeholder: "",
              clearable: true,
              disabled: false,
              elem: "checkbox",
              value: [],
              option: [
                {
                  name: "11",
                  id: 1,
                },
                {
                  name: "22",
                  id: 2,
                },
              ],
            };
          }
          if (tt === "r") {
            return {
              name: e.src,
              id: toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
                L.toLowerCase()
              ),
              col: 6,
              placeholder: "",
              value: "",
              clearable: true,
              disabled: false,
              elem: "radio",
              option: [
                {
                  name: "11",
                  value: 1,
                },
                {
                  name: "22",
                  value: 2,
                },
              ],
            };
          }
        });
        (fData.value.row[0] as any).push({
          elem: "button",
          option: [
            { id: "sub", themeType: "primary", name: "查询" },
            { id: "rec", themeType: "default", name: "重置" },
          ],
          col: 6,
        });
        r.trans_result.forEach((e: any) => {
          doc.value.in[
            toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
              L.toLowerCase()
            )
          ] = e.src;
        });
      }
      if (!r.error_code && t === "t") {
        tData.value.header = r.trans_result.map((e: any) => {
          return {
            name: e.src,
            key: toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
              L.toLowerCase()
            ),
          };
        });
        (tData.value.header as any).push({
          name: "操作",
          key: "operate",
          formatter: true,
        });
        r.trans_result.forEach((e: any) => {
          doc.value.out[0][
            toHump(e.dst.replace(/\s/g, "_")).replace(/^./, (L: any) =>
              L.toLowerCase()
            )
          ] = e.src;
        });
      }
      return;
    });
};
let datadata = reactive({
  n: "",
  s: "",
  f: "",
  t: "",
  f_t: "",
  f_t_arr: [],
});
let toHump = (name: any) => {
  return name
    .replace(/\_(\w)/g, function (all: any, letter: any) {
      return letter.toUpperCase();
    })
    .replace(/\_/g, "");
};
let submit = () => {
  if (datadata.n.length !== 0) {
    fanyi(datadata.n, "n");
  }
  if (
    (datadata.s.length === 0 && datadata.f.length > 0) ||
    (datadata.s.length === 0 && datadata.t.length > 0)
  ) {
    message.info("确认分隔符");
    return;
  }

  if (datadata.f.length !== 0 || datadata.t.length !== 0) {
    message.info(
      "wait a little time , now finding code , the 过程 need 5s 左右"
    );
  }
  let f = datadata.f.split(datadata.s).join("\n");
  let t = datadata.t.split(datadata.s).join("\n");
  let ff = datadata.f.split(datadata.s);
  let f_t = datadata.f_t.split(datadata.s);
  if (f_t.length !== 0) {
    (datadata.f_t_arr as any) = ff.map((e, i) => {
      return { n: e, t: f_t[i] };
    });
  }
  if (f.length !== 0) {
    setTimeout(() => {
      fanyi(f, "f");
    }, 3000);
  }
  if (t.length !== 0) {
    setTimeout(() => {
      fanyi(t, "t");
    }, 5000);
  }
};
let copyFunction = (id: any) => {
  const copyText = document?.getElementById(id)?.textContent;
  setTimeout(() => {
    navigator.clipboard.writeText(copyText || "").then(
      function () {
        message.info("复制成功");
      },
      function () {
        message.warn("复制失败");
      }
    );
  }, 500);
};
let formDlc = {
  select: {
    elem: "select",
    option: [{ value: "1", name: "yiyi" }],
    multiple: false,
  },
  mSelect: {
    elem: "select",
    option: [
      { value: "1", name: "yiyi" },
      { value: "2", name: "erer" },
    ],
    multiple: false,
    filterable: true,
    remote: true,
  },
  autocomplete: {
    elem: "input",
    type: "autocomplete",
  },
  time: {
    elem: "datePicker",
    type: "date",
    valueFormat: "yyyy-MM-dd",
  },
  switch: {
    elem: "switch",
  },
  checkbox: {
    elem: "checkbox",
    value: [],
    option: [
      { name: "11", id: 1 },
      { name: "22", id: 2 },
    ],
  },
  radio: {
    elem: "radio",
    option: [
      { name: "11", id: 1 },
      { name: "22", id: 2 },
    ],
  },
};
let send = computed(() => {
  return Object.keys(doc.value.in).toString();
});

let modelText = ref("");
let openModel = (t: string) => {
  modelText.value = getData(t);
  visible.value = true;
};
</script>
