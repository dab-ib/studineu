<template>
  <div>
    <h1>Kameras</h1>
    <ul>
      <li v-for="camera in cameras" :key="camera.id">
        {{ camera.name }} - {{ camera.url }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      cameras: []
    }
  },
  mounted() {
    this.loadCameras()
  },
  methods: {
    loadCameras() {
      axios.get('/api/cameras')
        .then(response => {
          this.cameras = response.data.cameras
        })
    }
  }
}
</script>
