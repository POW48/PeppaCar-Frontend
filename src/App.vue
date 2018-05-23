<template>
  <div id="app">
    <Layout>
      <Header class="hMid" style="color:white;font-size:24px">
        <span class="vMid">小車佩奇</span>
        <img class="vMid" src="./assets/logo.png" style="height:48px;vertical-align:middle" >
        <span class="vMid">XIAO JU PEI QI</span>
      </Header>
      <Content style="height:calc(100vh - 133px);position:relative">
        <template v-if="mobile">
          <video class="video mobile">
            <source :src="videoRes">
          </video>
          <p v-if="!videoReady" class="hMid vMid video mobile">无视频信号</p>
          <nipple class="nipple mobile"></nipple>
        </template>
        <template v-else>
          <div class="leftPanel">
            <monitor class="monitor"></monitor>
            <nipple class="nipple" :class="gamepad? 'deactive' : ''"></nipple>
          </div>
          <video class="video">
            <source :src="videoRes">
          </video>
          <p v-if="!videoReady" class="hMid vMid video">无视频信号</p>
        </template>
      </Content>
      <Footer class="hMid">
        Peppa Car © POW48
      </Footer>
    </Layout>
  </div>
</template>

<script>
import Monitor from './components/Monitor'
import Nipple from './components/Nipple'
import { mapActions } from 'vuex'

let superSPD = 10
let lastTS = 0
let lockAX = -1

export default {
  name: 'app',
  data() {
    return {
      videoReady: false,
      videoRes: 'about:blank',
      mobile: false,
      gamepad: false,
      key: -1
    }
  },
  methods: {
    refreshGamepad() {
      let gamepad = navigator.getGamepads()[0]
      if (gamepad.timestamp === lastTS) return
      lastTS = gamepad.timestamp
      if (lockAX < 0) {
        for (let i in gamepad.axes) {
          if (Math.floor(Math.abs(gamepad.axes[i] * 10))) {
            lockAX = Math.floor(i / 2)
            break
          }
        }
      }
      if (lockAX >= 0) {
        let x = gamepad.axes[lockAX * 2]
        let y = gamepad.axes[lockAX * 2 + 1]
        if (Math.floor(Math.abs(x * 10)) === 0 && Math.floor(Math.abs(y * 10)) === 0) {
          lockAX = -1
          this.pushMsg({
            mode: 'custom',
            direction: 0,
            speed: 0
          })
        } else {
          // Temporary method for gamepad control.
          if (Math.abs(x) >= Math.abs(y)) {
            if (x > 0) {
              this.pushMsg({
                mode: 'custom',
                direction: 90,
                speed: Math.floor(x * 10)
              })
            } else {
              this.pushMsg({
                mode: 'custom',
                direction: 270,
                speed: Math.floor(-x * 10)
              })
            }
          } else {
            if (y > 0) {
              this.pushMsg({
                mode: 'custom',
                direction: 180,
                speed: Math.floor(y * 10)
              })
            } else {
              this.pushMsg({
                mode: 'custom',
                direction: 0,
                speed: Math.floor(-y * 10)
              })
            }
          }
          // Temporary method end.
        }
      }
    },
    ...mapActions(['setWS', 'pushMsg'])
  },
  components: {
    Monitor,
    Nipple
  },
  mounted() {
    if (document.body.getBoundingClientRect().width < 700) {
      this.$set(this, 'mobile', true)
    }
    let ws = new WebSocket(`ws://${window.location.hostname}:8000/chat`)
    this.setWS(ws)
    window.addEventListener('gamepaddisconnected', e => {
      if (this.gamepad) {
        clearInterval(this.gamepad)
      }
      lastTS = 0
      this.$set(this, 'gamepad', false)
    })
    window.addEventListener('gamepadconnected', e => {
      let int = setInterval(this.refreshGamepad, 50)
      this.$set(this, 'gamepad', int)
    })
    window.addEventListener('keydown', e => {
      // keyCode: 37 - 40 is Left, Up, Right, Down
      if (e.keyCode >= 37 && e.keyCode <= 40 && e.keyCode !== this.key) {
        this.$set(this, 'key', e.keyCode)
        let dir = (e.keyCode - 38) * 90
        if (dir < 0) dir += 360
        this.pushMsg({
          mode: 'custom',
          direction: dir,
          speed: superSPD
        })
      }
      // keyCode: 48 - 57 is numeric 0 - 9
      if (e.keyCode >= 48 && e.keyCode <= 57) {
        superSPD = e.keyCode - 48
        if (superSPD === 0) superSPD = 10
        if (this.key > 0) {
          let dir = (this.key - 38) * 90
          if (dir < 0) dir += 360
          this.pushMsg({
            mode: 'custom',
            direction: dir,
            speed: superSPD
          })
        }
      }
    })
    window.addEventListener('keyup', e => {
      if (e.keyCode === this.key) {
        this.$set(this, 'key', -1)
        this.pushMsg({
          mode: 'custom',
          direction: 0,
          speed: 0
        })
      }
    })
    this.pushMsg({
      mode: 'custom',
      direction: 0,
      speed: 0
    })
  }
}
</script>

<style>
.vMid {
  vertical-align: middle;
}

.hMid {
  text-align: center;
}

.video {
  background: black;
  color: white;
  position: absolute;
  right: 2%;
  top: 5%;
  width: 62%;
  height: 90%;
  font-size: 18px;
}

.leftPanel {
  position: absolute;
  left: 2%;
  top: 5%;
  height: 90%;
  width: 32%;
  display: flex;
  flex-direction: column;
}

.leftPanel > * {
  width: 100%;
  transition: 0.2s ease-in-out;
}

.monitor {
  flex-grow: 1;
  flex-shrink: 2;
}

.nipple {
  flex-grow: 2;
  flex-shrink: 1;
}

.nipple.deactive {
  flex-grow: 0;
  flex-shrink: 666;
}

.mobile {
  left: 0;
  right: 0;
  width: 100%;
  height: 90%;
}

.nipple.mobile {
  position: absolute;
  top: 5%;
}
</style>
