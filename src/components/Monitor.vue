<template>
  <div class="peppa-monitor">
    <p class="hMid" style="font-size:16px">传感器状态</p>
    <p class="monitor-status" v-for="monitor in Object.keys(moniList)">
      <Icon :type="moniList[monitor] !== undefined? 'checkmark-circled': 'close-circled'" :color="moniList[monitor] !== undefined? '#19be6b': '#ff9900'"></Icon>
      <span>{{ monitor }}:</span>
      <span v-if="moniList[monitor] === undefined">错误&lt;404&gt;</span>
      <span v-else>{{ moniList[monitor] }}</span>
    </p>
    <p class="hMid" style="color:#ff9900" v-if="Object.keys(moniList).length == 0">未找到传感器数据</p>
  </div>
</template>

<script>
export default {
  name: 'monitor',
  data() {
    return {
      moniList: {
        WebSocket: undefined
      }
    }
  },
  mounted() {
    this.$store.watch(_ => this.$store.state.recMsg, v => {
      try {
        let obj = JSON.parse(v)
        if (obj.type === 'sensor') {
          this.$set(this, 'moniList', { ...this.moniList, ...obj.data })
        }
      } catch (e) { }
    })
  }
}
</script>

<style>
.peppa-monitor {
  border: 1px solid grey;
  overflow: auto;
}

.monitor-status {
  padding-left: 10px;
}
</style>
