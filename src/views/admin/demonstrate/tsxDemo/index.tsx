import tsx from "./tsx";
import {Button} from 'ant-design-vue' // 引入名称参考 components.d.ts
export default defineComponent({
  props: {},
  emits: [""],
  components: { tsx },
  setup(props, { emit, expose, attrs, slots }) {
    expose({});
    let num = ref<number>(0);
    let msg = ref<string>("我是父组件传的值");
    let tsxRef = ref();
    const test = (): void => {
      msg.value += "+";
      num.value += 1;
      tsxRef.value.showMe('我触发了子组件的方法');
    };
    const faNumAdd = (n: number): void => {
      console.log('NumAdd');
      num.value = num.value + n;
    };
    return () => (
      <div>
        <div class="bg-blue-200">
          <h1>最外层父组件VUE:</h1>
          <div class="box-border p-10">
            <tsx ref={tsxRef} msg={msg.value} num={num.value} onFaNumAdd={faNumAdd}>
              {()=><div>默认插槽</div>}
            </tsx>
          </div>
          <Button type={'primary'} size={'small'} onClick={test}>按钮</Button>
        </div>
      </div>
    );
  },
});
