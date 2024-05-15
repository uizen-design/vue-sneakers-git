<script setup>
    import CardItemList from './CardItemList.vue';
    import infoBlock from './infoBlock.vue';
    const emit = defineEmits(['closeDrawer, createOrder'])
    defineProps({
        totalPrice: Number,
        vatPrice: Number
    })
</script>

<template>
    <div @click="emit('closeDrawer')" class="fixed top-0 left-0 w-full h-full z-10 bg-black opacity-30"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 overflow-y-auto">
        <div v-if="totalPrice" class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-medium">Корзина</h2>
            <img @click="emit('closeDrawer')" class="w-7 cursor-pointer opacity-30 transition hover:opacity-100" src="/close_black.svg">
        </div>

        <div v-if="!totalPrice" class="flex h-full items-center">
            <infoBlock/>
        </div>
        
        <CardItemList v-if="totalPrice"/>

        <div v-if="totalPrice" class="flex flex-col gap-2 mt-8">
            <div class="flex gap-2">
                <span>Итого:</span>
                <div class="flex-1 border-b border-dashed mb-1"></div>
                <b>{{ totalPrice }} руб</b>
            </div>
            <div class="flex gap-2">
                <span>налог 5%:</span>
                <div class="flex-1 border-b border-dashed mb-1"></div>
                <b>{{ vatPrice }} руб</b>
            </div>
            <button :disabled="totalPrice ? false : true" @click="() => emit('createOrder')" class="disabled:bg-slate-300 bg-lime-500 hover:bg-lime-600 active:bg-lime-700 transition text-white w-full rounded-xl text-center py-3 font-medium mt-2" href="#">Оформить заказ</button>
        </div>
    </div>
</template>