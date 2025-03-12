<template>
  <div>
    <h1>File Manager</h1>
    <input type="file" @change="handleFileUpload" />
    <button @click="uploadFile">Upload</button>

    <ul>
      <li v-for="file in files" :key="file.name">
        {{ file.name }} - <a :href="file.url" target="_blank">Download</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiClient from '../utilities/githubUtil';

// Define the file type
interface FileItem {
  name: string;
  url: string;
}

// Reactive state
const files = ref<FileItem[]>([]);
const selectedFile = ref<File | null>(null);

// Fetch files from the API
const fetchFiles = async () => {
  try {
    const response = await apiClient.get('/vuefinder/v1/?branch=main&q=index'); // Replace with your API endpoint
    files.value = await response.data;
    console.log(files.value)
  } catch (error) {
    console.error('Failed to fetch files:', error);
  }
};

// Handle file input change
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
};

// Upload the selected file
const uploadFile = async () => {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      await fetchFiles(); // Refresh the file list after upload
    }
  } catch (error) {
    console.error('Failed to upload file:', error);
  }
};

// Fetch files when the component is mounted
onMounted(() => {
  fetchFiles();
});
</script>