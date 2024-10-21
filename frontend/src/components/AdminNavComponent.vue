<script setup>
  const props = defineProps({
    objType: {
      type: String,
      required: true
    }
  });
</script>

<template>
  <div class="container">
    <div class="sidenav">
      <a :href="`#add-${objType}`">Add new {{ objType }}</a>
      <a :href="`#delete-${objType}`">Delete {{ objType }}</a>
      <a :href="`#change-${objType}`">Change {{ objType }}</a>
    </div>
  </div>
</template>