<template>
  <div class="family-card">
    
    <!-- Display marriage information -->
    <div class="marriage-info">
      <div v-if="spouse">
        <strong>Spouse: </strong>
        <router-link :to="'search?id=' + spouse_id + '&pageNum=1&perPage=10'">{{ spouse }}</router-link>
      </div>
    </div>
    <div class="marriage-info">
      <div v-if="marriagepl">
        <strong>Marriage Place:</strong> {{ marriagepl }}
      </div>
      <div v-if="marriagedt">
        <strong>Marriage Date:</strong> {{ marriagedt }}
      </div>
    </div>

    <!-- Display children -->
    <div class="children">
      <div v-for="(child, index) in children" :key="index">
        <strong>Child: </strong>
        <router-link :to="'search?id=' + child.id + '&pageNum=1&perPage=10'">{{ child.givenname + ' ' + child.surname }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps([
	'marriagedt',
	'marriagepl',
	'spouse',
  'spouse_id',
	'children']);
</script>

<style scoped lang="scss">
.family-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
	max-width: 400px;
}

.marriage-info {
  margin-bottom: 10px;
}

.children {
  margin-top: 10px;
}
</style>
