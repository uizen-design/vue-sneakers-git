<script setup>
    import { inject } from 'vue'
    import DraverCard from './DraverCard.vue';

    const { cart, removeToCart } = inject('cart')

</script>

<template>
    <div class="flex flex-col gap-4 flex-1" v-auto-animate>
        <DraverCard 
            v-for="item in cart" 
            :key="item.id"
            :imageUrl="item.imageUrl"
            :title="item.title"
            :price="item.price"
            @removeToCart="() => removeToCart(item)"
        />
    </div>
</template>