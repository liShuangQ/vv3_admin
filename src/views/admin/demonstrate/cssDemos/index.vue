<template>
    <div class="BOX">
        <div class="one">
            <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41f5f3086ea04e6da0f43da59937a573~tplv-k3u1fbpfcp-watermark.image?"
                alt="Adam argyle">
            <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8adc909a7a6640f98a4f2f8a2a561f94~tplv-k3u1fbpfcp-watermark.image?"
                alt="Ahmed shadeed" style="--c:#efac27;--cb: #bbdeea">
            <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0734ec5bd1449d8933ce76fb4b9a700~tplv-k3u1fbpfcp-watermark.image?"
                alt="Kevin Powell" style="--c:#255b98;--cb:#f3bf99">
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.one {
    img {
        --s: 200px;
        /* image size */
        --b: 6px;
        /* border thickness */
        --c: #ae3ec9;
        /* border color */
        --cb: #e9ecef;
        /* background color */
        --f: 1;
        /* initial scale */

        width: var(--s);
        aspect-ratio: 1;
        padding-top: calc(var(--s)/5);
        cursor: pointer;
        // border-radius: 0 0 999px 999px;
        --_g: 50%/calc(100%/var(--f)) 100% no-repeat content-box;
        --_o: calc((1/var(--f) - 1)*var(--s)/2 - var(--b));
        // outline: var(--b) solid var(--c);
        // outline-offset: var(--_o);
        background:
            radial-gradient(circle closest-side,
                var(--cb) calc(99% - var(--b)), var(--c) calc(100% - var(--b)) 99%, #0000) var(--_g);
        -webkit-mask:
            linear-gradient(#000 0 0) no-repeat 50% calc(1px - var(--_o)) / calc(100%/var(--f) - 2*var(--b) - 2px) 50%,
            radial-gradient(circle closest-side, #000 99%, #0000) var(--_g);
        transform: scale(var(--f));
        transition: .5s;
    }

    img:hover {
        --f: 1.4;
        /* hover scale */
    }
}
</style>