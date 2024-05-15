<script setup>
    const emit = defineEmits(['openDrawer'])
    defineProps({
        totalPrice: Number
    })
</script>
<template>
    <header class="flex justify-between border-b px-8 py-4">

        <RouterLink to="/">
            <div class="flex items-center gap-3">
                <img src="/logo.png" alt="logo" class="w-10">
                <div>
                    <h2 class="font-bold uppercase">Vue Sneakers</h2>
                    <p class="text-slate-500">Магазин кросовок</p>
                </div>
            </div>
        </RouterLink>


        <ul class="flex items-center gap-6">
            <li @click="emit('openDrawer')"
                class="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-black">
                <img src="/cart.svg" alt="cart">
                <p class="font-medium">{{ totalPrice }} руб</p>
            </li>
            <RouterLink to="/favorites">
                <li class="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-black">
                    <img src="/heart.svg" alt="heart">
                    <p class="font-medium">Закладки</p>
                </li>
            </RouterLink>
            <li class="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-black">
                <img src="/profile.svg" alt="profile">
                <p class="font-medium">Профиль</p>
            </li>
        </ul>
    </header>
</template>