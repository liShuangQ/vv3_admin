<template>
  <div>
    <AntdForm ref="AntdFormRef" :config="formConfig"></AntdForm>
    <a-button style="margin: 0 8px" @click="test()">test</a-button>
  </div>
</template>

<script setup lang="ts">
import { FormConfig } from "@/components/globalComponents/AntdForm/Form";
let formConfig = ref<FormConfig>();
const AntdFormRef = ref();
formConfig.value = {
    name: "demo",
    labelCol: { span: 0, offset: 0 },
    wrapperCol: { span: 0, offset: 0 },
    itemSize: "small",
    layout: "inline",
    labelAlign: "left",
    formItems: [
        [
            {
                col: 6,
                labelCol: "100px",
                type: "input",
                key: "111",
                defaultValue: "",
                label: "input",
                rules: [{ required: true, message: "请输入" }],
                disabled: false,
            },
            {
                col: 6,
                type: "select",
                key: "444",
                defaultValue: "",
                label: "select4",
                option: [
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3", disabled: true },
                ],
            },
            {
                col: 6,
                type: "checkbox",
                key: "555",
                defaultValue: [],
                label: "checkbox5",
                option: [
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3", disabled: true },
                ],
            },
        ],
        [
            {
                col: 6,
                type: "input",
                key: "333",
                size: "large",
                defaultValue: "",
                label: "input3",
            },
        ],
    ],
};
const test = () => {
    // formConfig.value!.formItems[0].disabled = true;
    (formConfig.value as any).formItems[0][2].option = [
        { label: "1", value: "1" },
    ];
    // AntdFormRef.value?.renderFormModel();
    return;
};
</script>

<style scoped></style>
