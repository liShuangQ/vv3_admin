import { Button } from "ant-design-vue";

export default function MyComponent(props: any, { slots, emit, attrs }: any) {
  return (
    <div class="bg-orange-200">
      <h1>tsx的函数组件:</h1>

      <h1>{props.tsxText}</h1>
      <Button type={'primary'} size={'small'} onClick={() => emit("FafaNumAdd")}>按钮</Button>
    </div>
  );
}