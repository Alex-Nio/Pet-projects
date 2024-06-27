<template>
  <div>
    <p>Loading...</p>
    <div>{{ data }}</div>
  </div>
</template>

<script setup>
  import { reactive, ref } from "vue";
  import axios from "axios";

  const data = ref(null);

  const state = reactive({
    loading: false,
    data: null,
  });

  const fetchData = async () => {
    state.loading = true;
    try {
      const UID = 707439558;
      const response = await axios.get(`https://enka.network/api/uid/${UID}/?info`);
      state.data = response.data;
      data.value = state.data;
    } catch (error) {
      console.log(error);
    } finally {
      state.loading = false;
      console.log(data.value);
    }
  };

  fetchData();
</script>
