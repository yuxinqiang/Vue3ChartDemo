<div
    class="ScaleBox"
    ref="ScaleBox"
    :style="{
      width: width + 'px',
      height: height + 'px',
    }"
  >
    <slot></slot>
  </div>
</template>
 
<script>
export default {
  name: "ScaleBox",
  props: {},
  data() {
    return {
      scale: 0,
      width: 1920,
      height: 1080,
    };
  },
  mounted() {
    this.setScale();
    window.addEventListener("resize", this.debounce(this.setScale));
  },
  methods: {
    getScale() {
      // 固定好16：9的宽高比，计算出最合适的缩放比
      const { width, height } = this;
      const wh = window.innerHeight / height;
      const ww = window.innerWidth / width;
      console.log(ww < wh ? ww : wh);
      return ww < wh ? ww : wh;
    },
    setScale() {
      // 获取到缩放比例，设置它
      this.scale = this.getScale();
      if (this.$refs.ScaleBox) {
        this.$refs.ScaleBox.style.setProperty("--scale", this.scale);
      }
    },
    debounce(fn, delay) {
      const delays = delay || 500;
      let timer;
      return function () {
        const th = this;
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          timer = null;
          fn.apply(th, args);
        }, delays);
      };
    },
  },
};
</script>
 
<style lang="scss">
#ScaleBox {
  --scale: 1;
}

.ScaleBox {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  transform: scale(var(--scale)) translate(-50%, -50%);
  transform-origin: 0 0;

  // background: rgba(255, 0, 0, 0.3);
}
</style>
 