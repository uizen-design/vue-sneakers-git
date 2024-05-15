<script setup>
    import { inject } from 'vue'
    const { draverFn } = inject('cart')
</script>
<template>
    <div class="flex flex-col items-center gap-2">
        <img class="w-28" src="/package-icon.png">
        <h2 class="text-2xl font-medium">Корзина пустая</h2>
        <p class="text-center">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
        <button @click="draverFn()" class="mt-2 disabled:bg-slate-300 bg-lime-500 hover:bg-lime-600 active:bg-lime-700 transition text-white w-full rounded-xl text-center py-3 font-medium">Вернуться назад</button>
    </div>
</template>