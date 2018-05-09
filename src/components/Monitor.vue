<template>
  <div class="peppa-monitor">
    <p class="hMid" style="font-size:16px">传感器状态</p>
    <p class="monitor-status" v-for="monitor in moniList">
      <Icon :type="monitor.status ? 'close-circled': 'checkmark-circled'" :color="monitor.status? '#ff9900': '#19be6b'"></Icon>
      <span>传感器{{ monitor.index }}:</span>
      <span v-if="monitor.status">错误&lt;{{ monitor.status }}&gt;</span>
      <span v-else>{{ monitor.data }}</span>
    </p>
    <p class="hMid" style="color:#ff9900" v-if="moniList.length == 0">未找到传感器数据</p>
  </div>
</template>

<script>
export default {
  name: 'monitor',
  data() {
    return {
      moniList: [{
        status: 0,
        index: 1,
        data: 0.235789
      },
      {
        status: 404,
        index: 2,
        data: null
      }]
    }
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
