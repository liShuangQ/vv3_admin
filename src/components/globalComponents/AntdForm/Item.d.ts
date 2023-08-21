import { Item } from "ant-design-vue/lib/menu"

export interface Col {
    span: number, offset: number 
}
// 每个item的公共配置
interface Item {
    elem?:string
    disabled?:boolean
    placeholder?:string
    size?:'large'| 'default'| 'small'
    allowClear?:boolean
}
// 针对带有选项的公共配置
interface Option {
    option?:{
        label:string,
        value:string,
        disabled?:boolean
    }[]
}


export interface Input extends Item{
    prefix?:string
    suffix?:string
    autoSize?:boolean|{ minRows: number, maxRows: number }
    showCount?:boolean
}

export interface Select extends Item,Option{
    mode?:'multiple' | 'tags' | 'combobox'
}
export interface CheckBox extends Item,Option{
    Checked?:{
        label:string,
        value:string,
    }[]
}

