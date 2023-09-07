import { message } from "ant-design-vue";

export default function setAntVueConfig():void {
    message.config({
        maxCount: 5,
    });
}