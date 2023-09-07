import { Button } from "ant-design-vue";

export default defineComponent({
    props: {
        tsxText: {
            type: String,
        },
    },
    emits: ["FafaNumAdd"],
    setup(props, { emit, expose, attrs, slots }) {
        const showMe = () => {
            alert("tsx组件触发了：我是tsx组件的子组件");
        };
        expose({ showMe });
        return () => (
            <div class="bg-lime-200">
                <h1>tsx的子组件:</h1>
                <div>
                    {slots.node1 && slots.node1()}
                    {slots.node2 && slots.node2()}
                </div>
                <h1>{props.tsxText}</h1>
                <Button type={'primary'} size={'small'} onClick={() => emit("FafaNumAdd")}>按钮</Button>
            </div>
        );
    },
});
