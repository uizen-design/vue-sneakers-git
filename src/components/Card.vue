<script setup>
    defineProps({
        id: Number,
        imageUrl: String,
        title: String,
        price: Number,
        isFavorite: Boolean,
        isAdded: Boolean,
        onClickFavorite: Function,
        onClickAdd: Function
    })
    const a = true
</script>


<template>
    <div class="relative bg-white hover:-translate-y-2 hover:shadow-lg transition border border-slate-100 rounded-xl p-6 cursor-pointer">
        <img v-if="onClickFavorite" class="absolute top-6 left-6" @click="onClickFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="like">
        <img class="m-auto" :src="imageUrl" alt="{{ title }}">
        <p class="mt-2">{{ title }}</p>

        <div class="flex justify-between items-center mt-4">
            <div class="flex flex-col">
                <span class="text-slate-400">Цена:</span>
                <b>{{ price }} руб</b>
            </div>
            <img v-if="onClickAdd" @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="plus">
        </div>
    </div>
</template>
