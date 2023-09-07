import { Button } from 'ant-design-vue';

const Component1 = () => <div>Component1</div>;
const tsxChildren = defineAsyncComponent(() =>
    import('./tsxChildren'),
)
const tsxFunChildren = defineAsyncComponent(() =>
    import('./tsxFunChildren'),
)
export default defineComponent({
    props: {
        msg: {
            type: String,
        },
        num: {
            type: Number,
        },
    },
    emits: ["FaNumAdd"],
    components: { 
        tsxChildren,tsxFunChildren
    },
    setup(props, { emit, expose, attrs, slots }) {
        let tsxText = ref<string>("给tsx的函数子组件");
        let tsxText2 = ref<string>("给tsx的子组件");
        const showMe = (text:string):void => {
            alert(text)
        };
        expose({ showMe });
        const tsxChildrenRef = ref();
        const FafaNumAdd= ()=> {
            emit("FaNumAdd", 2)
        }
    
        return () => (
            <div class="bg-fuchsia-200">
                <h1>TSX组件:</h1>
                {slots.default && slots?.default()}
                <Component1></Component1>
                <h1>{props.msg}</h1>
                <h1>{props.num}</h1>
                <div class=" box-border p-10">
                    <tsxFunChildren
                        tsxText={tsxText.value}
                        onFafaNumAdd={() => emit("FaNumAdd", 1)}
                    ></tsxFunChildren>
                </div>
                <div class=" box-border p-10">
                    <tsxChildren
                        ref={tsxChildrenRef}
                        tsxText={tsxText2.value}
                        onFafaNumAdd={() => emit("FaNumAdd", 1)}
                    >
                        {{
                            node1:()=><div>node1 插槽</div>,
                            node2:()=><div>node2 插槽</div>
                        }}
                    </tsxChildren>
                </div>
                <Button type={'primary'} size={'small'} onClick={FafaNumAdd}>按钮</Button>
                <Button type={'primary'} size={'small'} onClick={() => tsxChildrenRef.value.showMe()}>按钮2</Button>
            </div>
        );
    },
});
