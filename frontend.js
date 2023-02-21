<template>
  <div>
    <h1>IP-Kameras</h1>
    <ul>
      <li v-for="camera in cameras" :key="camera.id">
        <div>{{ camera.name }}</div>
        <div>{{ camera.url }}</div>
        <button @click="editCamera(camera)">Bearbeiten</button>
        <button @click="deleteCamera(camera)">Löschen</button>
      </li>
    </ul>
    <h2>Kamera hinzufügen</h2>
    <form @submit.prevent="addCamera">
      <div>
        <label>Name:</label>
        <input type="text" v-model="newCamera.name">
      </div>
      <div>
        <label>URL:</label>
        <input type="text" v-model="newCamera.url">
      </div>
      <button type="submit">Hinzufügen</button>
    </form>
    <h2>Kamera bearbeiten</h2>
    <form v-if="selectedCamera" @submit.prevent="updateCamera">
      <div>
        <label>Name:</label>
        <input type="text" v-model="selectedCamera.name">
      </div>
      <div>
        <label>URL:</label>
        <input type="text" v-model="selectedCamera.url">
      </div>
      <button type="submit">Aktualisieren</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cameras: [],
      newCamera: {
        name: '',
        url: ''
      },
      selectedCamera: null
    };
  },
  created() {
    this.fetchCameras();
  },
  methods: {
    fetchCameras() {
      axios.get('/api/cameras')
        .then(response => {
          this.cameras = response.data.cameras;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addCamera() {
      axios.post('/api/cameras', this.newCamera)
        .then(response => {
          this.newCamera.name = '';
          this.newCamera.url = '';
          this.fetchCameras();
        })
        .catch(error => {
          console.log(error);
        });
    },
    editCamera(camera) {
      this.selectedCamera = camera;
    },
    updateCamera() {
      axios.put(`/api/cameras/${this.selectedCamera.id}`, this.selectedCamera)
        .then(response => {
          this.selectedCamera = null;
          this.fetchCameras();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteCamera(camera) {
      axios.delete(`/api/cameras/${camera.id}`)
        .then(response => {
          this.fetchCameras();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>
