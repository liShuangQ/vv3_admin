import {Col,Input,Select,CheckBox} from './Item'
interface FormItem extends Input,Select,CheckBox{
    col:number,
    /**
     * 表单项类型
     */
    type:string
    /**
      * 表单项的key
      * 对应name
      * 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
    */
    key:string
    /**
     * 表单初始时候的默认值
     * 注意：实际并非是model的绑定值，获取值请用组件内方法获取
     */
    defaultValue:any
    /**
     * label 标签的文本
     */
    label:string|any
    /**
    *  Default：'right'
    *label 标签的文本对齐方式
    */
    itemLabelAlign?:'left' | 'right'
    /**
     * label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
     */
    labelCol?: Col | string
    /**
     * 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
     */
    wrapperCol?: Col 
    /**
     * 表单验证规则
     */
    rules?:{ required: boolean, message: string }[]
    /**
     * Default：true
     * 是否自动关联表单域，对于大部分情况都可以使用自动关联，如果不满足自动关联的条件，可以手动关联，参见下方注意事项
     * Form.Item 会对唯一子元素进行劫持，并监听blur和change事件，来达到自动校验的目的，所以请确保表单域没有其它元素包裹。如果有多个子元素，将只会监听第一个子元素的变化。
     * 如果要监听的表单域不满足自动监听的条件，可以通过如下方式关联表单域：
    * ```html
    * <a-form-item name="form.name"
    *  ref="name" :autoLink="false">
    *<a-input v-model:value="other" />
    *<span>hahha</span>
    *<div>
    * <a-input
    *  v-model:value="form.name"
    *  @blur="() => 
    * {$refs.name.onFieldBlur()}"
    *  @change="() => 
    * {$refs.name.onFieldChange()}"/>
    *</div>
    *</a-form-item>
    * ```
     */
    autoLink?:boolean
    /**
     * Default：true
     * 配合 label 属性使用，表示是否显示 label 后面的冒号
     */
    colon?:boolean
    /**
     *  Default：undefined
     *  string|slot
     * 	额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
     */
    extra?:string|any
    /**
     * Default：false
     * 	配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用
     */
    hasFeedback?:boolean
    /**
     * Default：''
     * 提示信息，如不设置，则会根据校验规则自动生成
     * string|slot
     */
    help?:string|any
    /**
     * Default：undefined
     * 设置子元素 label htmlFor 属性
     * string|slot
     */
    htmlFor?:string
    /**
     * Default：false
     * 是否必填，如不设置，则会根据校验规则自动生成
     */
    required?:string
    /**
     * Default：false
     * 当某一规则校验不通过时，是否停止剩下的规则的校验。
     */
    validateFirst?:boolean
    /**
     * Default：undefined
     * 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'
     */
    validateStatus?:string
    /**
     * Default：undefined
     * 设置字段校验的时机
     */
    validateTrigger?:string | string[]

}
export interface FormConfig {
    name:string
    /**
     * ```js
     * const labelCol = (d: Col | string | undefined) => {
     * if (!d) {
     *  return undefined;
     * }
     * if (typeof d === "string") {
     * return { style: { width: d } };
     * } else {
     *  return { span: d.span, offset: d.offset };
     * }
     *};
     * ```
     */
    labelCol:Col | string
    wrapperCol:Col
     /**
     * Default：'default'
     */
    itemSize:'large'| 'default'| 'small'
    autocomplete?:string | 'off'
    /**
     * Default：[16, 8]
     * 栅格布局参数
     */
    gutter?:[number,number]
    /**
     * Default：true
    * 配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效)
    */
    colon?:boolean
    /**
     * Default：false
    * 隐藏所有表单项的必选标记
    */
    hideRequiredMark?:boolean
    /**
     *  Default：'right'
    *label 标签的文本对齐方式
    */
    labelAlign?:'left' | 'right'
    /**
     *  Default：false
    *label 标签的文本换行方式
    */
    labelWrap?:boolean
    /**
     * Default：'horizontal'
    *表单布局
    */
    layout?:'horizontal'|'vertical'|'inline'
    /**
     * Default：false
    *为 true 时不带样式，作为纯字段控件使用
    */
    noStyle?:boolean
    /**
     * Default：true
    *是否在 rules 属性改变后立即触发一次验证
    */
    validateOnRuleChange?:boolean
    // //表单验证规则 
    // rules?:object
    // //提交失败自动滚动到第一个错误字段 options
    // scrollToFirstError?:boolean | any
    // //统一设置字段校验规则
    // validateTrigger?:string | string[]
    // ----------------------------------
    /**
    * 配置表单的类型
    */
    formItems:FormItem[][]
}
