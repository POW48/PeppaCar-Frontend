<template>
  <div id="app">
    <Layout>
      <Header style="color:white;text-align:center;font-size:24px">
        小車佩奇
      </Header>
      <Content style="height:calc(100vh - 133px)">
      </Content>
      <Footer style="text-align:center">
        Peppa Car © POW48
      </Footer>
    </Layout>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
</style>
