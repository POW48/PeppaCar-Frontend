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

export default {
  name: 'app',
  data() {
    return {
      videoReady: false,
      videoRes: 'about:blank',
      mobile: false,
      gamepad: false
    }
  },
  components: {
    Monitor,
    Nipple
  },
  mounted() {
    if (document.body.getBoundingClientRect().width < 700) {
      this.$set(this, 'mobile', true)
    }
    window.addEventListener('gamepaddisconnected', (e) => {
      this.$set(this, 'gamepad', false)
    })
    window.addEventListener('gamepadconnected', (e) => {
      this.$set(this, 'gamepad', true)
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
