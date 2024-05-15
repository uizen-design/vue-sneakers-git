<script setup>

    const emit = defineEmits(['removeToCart'])

    defineProps({
        id: Number,
        imageUrl: String,
        title: String,
        price: Number,
        isAdded: Boolean,
        onClickAdd: Function
    })
</script>
<template>
    <div class="flex justify-between border border-slate-100 p-4 rounded-lg">
        <div class="flex gap-4">
            <img class="w-20" :src="imageUrl" :alt="title">
            <div class="flex flex-col justify-center">
                <p>{{ title }}</p>
                <b>{{ price }} руб</b>
            </div>
        </div>
        <img @click="emit('removeToCart')" class="opacity-40 hover:opacity-100 cursor-pointer" src="/close.svg" alt="plus">
    </div>
</template>