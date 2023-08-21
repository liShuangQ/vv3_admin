<template>
  <div>
    <!-- :model="formState"
    @finishFailed="onFinishFailed"
    @finishFailed="onFinishFailed" -->
    <a-form
      ref="formRef"
      :size="'small'"
      :model="ListModelForm"
      :name="config.name"
      :labelCol="labelCol(config.labelCol)"
      :wrapperCol="config.wrapperCol"
      :autocomplete="config.autocomplete || 'off'"
      :colon="config?.colon || true"
      :hideRequiredMark="config?.hideRequiredMark || false"
      :labelAlign="config?.labelAlign || 'right'"
      :labelWrap="config?.labelWrap || false"
      :layout="config?.layout || 'horizontal'"
      :noStyle="config?.noStyle || false"
      :validateOnRuleChange="config?.validateOnRuleChange || true"
    >
      <a-row
        v-for="(row, index) in config.formItems"
        :key="index"
        class="w-full"
        :gutter="config?.gutter || [16, 8]"
      >
        <a-col
          v-for="formItem in row"
          :key="formItem.key"
          :span="formItem.col"
          class="mb-4"
        >
          <a-form-item
            :label="formItem.label"
            :name="formItem.key"
            :labelAlign="
              formItem?.itemLabelAlign || config?.labelAlign || 'right'
            "
            :labelCol="labelCol(formItem.labelCol)"
            :wrapperCol="formItem.wrapperCol || undefined"
            :rules="formItem.rules || []"
            :autoLink="formItem.autoLink || true"
            :colon="formItem.colon || true"
            :extra="formItem.extra || undefined"
            :hasFeedback="formItem.hasFeedback || false"
            :validateStatus="formItem.validateStatus || undefined"
            :help="formItem.help || undefined"
            :htmlFor="formItem.htmlFor || undefined"
            :required="formItem.required || false"
            :validateFirst="formItem.validateFirst || false"
            :validateTrigger="formItem.validateTrigger || undefined"
          >
            <a-input
              v-if="formItem.type === 'input' && formItem.elem !== 'textarea'"
              :disabled="formItem.disabled || false"
              :placeholder="formItem.placeholder || '请输入' + formItem.label"
              :size="formItem.size || config.itemSize"
              :allowClear="formItem.allowClear || true"
              :prefix="formItem.prefix || ''"
              :suffix="formItem.suffix || ''"
              v-model:value="ListModelForm[formItem.key]"
            />
            <a-textarea
              v-if="formItem.type === 'input' && formItem.elem === 'textarea'"
              :disabled="formItem.disabled || false"
              :placeholder="formItem.placeholder || '请输入' + formItem.label"
              :size="formItem.size || config.itemSize"
              :autoSize="formItem.autoSize || false"
              :showCount="formItem.showCount || false"
              v-model:value="ListModelForm[formItem.key]"
            />
            <a-select
              v-if="formItem.type === 'select'"
              v-model:value="ListModelForm[formItem.key]"
              :disabled="formItem.disabled || false"
              :placeholder="formItem.placeholder || '请输入' + formItem.label"
              :size="formItem.size || config.itemSize"
              :allowClear="formItem.allowClear || true"
              :mode="formItem.mode || undefined"
            >
              <a-select-option
                v-for="optionItem in formItem.option"
                :key="optionItem.value"
                :value="optionItem.value"
                :disabled="optionItem.disabled || false"
                >{{ optionItem.label }}</a-select-option
              >
            </a-select>
            <a-checkbox-group
              v-if="formItem.type === 'checkbox'"
              v-model:value="ListModelForm[formItem.key]"
              :disabled="formItem.disabled || false"
              :placeholder="formItem.placeholder || '请输入' + formItem.label"
              :size="formItem.size || config.itemSize"
              :allowClear="formItem.allowClear || true"
              :name="formItem.key"
              :options="formItem.option"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-button style="margin: 0 8px" @click="resetFields()"
        >resetFields</a-button
      >
      <a-button style="margin: 0 8px" @click="validate()">validate</a-button>
      <a-button style="margin: 0 8px" @click="clearValidate()"
        >clearValidate</a-button
      >
    </a-form>
  </div>
  {{ config }}
</template>

<script setup lang="ts">
import { Col } from "./Item";
import { FormConfig } from "./Form";
import type { FormInstance } from "ant-design-vue";
const props = defineProps<{
  config: FormConfig;
}>();
let ListModelForm = ref();
const renderFormModel = (): void => {
  let model = {};
  let formItems = Array.from(props.config.formItems || []);
  formItems.forEach((item) => {
    item.forEach((e) => {
      model[e.key] = e.defaultValue;
    });
  });
  ListModelForm.value = model;
};
renderFormModel();
const formRef = ref<FormInstance>();
const resetFields = (): void => {
  formRef.value?.resetFields();
};
const labelCol = (d: Col | string | undefined) => {
  if (!d) {
    return undefined;
  }
  if (typeof d === "string") {
    return { style: { width: d } };
  } else {
    return { span: d.span, offset: d.offset };
  }
};

// ---------------------------------------------------
const validate = () => {
  formRef.value?.validate().then((res) => {
    console.log(res, "处理前");
    Object.keys(res).forEach((e) => {
      res[e] = toRaw(res[e]);
    });
    console.log(res, "处理后");
  });
};
const clearValidate = () => {
  formRef.value?.clearValidate();
};
</script>

<style lang="scss" scoped>
.ant-form-inline .ant-form-item-with-help {
  margin-bottom: 0;
}
</style>
