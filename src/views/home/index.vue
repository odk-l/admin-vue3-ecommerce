<template>
    <div>
        <p>{{ userStore.username }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/users';

const userStore = useUserStore()

onMounted(() => {
    userStore.userInfo()
})

</script>

<style scoped></style>