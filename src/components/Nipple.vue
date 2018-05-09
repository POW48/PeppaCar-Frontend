<template>
  <div id="nipple-ctner" :class="np && notMoved? 'nipple-ready': ''">
    <p v-if="np && notMoved">在此区域拖动遥控小車</p>
  </div>
</template>

<script>
import Nipple from 'nipplejs'

export default {
  name: 'nipple',
  data() {
    return {
      np: null,
      notMoved: true,
      gamepad: null
    }
  },
  mounted() {
    window.addEventListener('gamepaddisconnected', (e) => {
      if (!this.np) {
        let np = Nipple.create({
          zone: document.getElementById('nipple-ctner'),
          color: '#2d8cf0',
          mode: 'semi',
          catchDistance: 70
        })
        np.on('added', () => {
          this.$set(this, 'notMoved', false)
        })
        this.$set(this, 'np', np)
      }
    })
    window.dispatchEvent(new Event('gamepaddisconnected'))
    window.addEventListener('gamepadconnected', (e) => {
      if (this.np) {
        this.np.destroy()
        this.$set(this, 'np', null)
      }
      this.$set(this, 'gamepad', e.gamepad)
    })
  }
}
</script>

<style>
#nipple-ctner {
  position: relative;
}

.nipple-ready {
  background: #dddee1d2;
}
</style>
