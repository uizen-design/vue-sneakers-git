<script setup>
    import { ref, provide, computed } from 'vue';
    import axios from 'axios';
    import AppHeader from './components/Header.vue'
    import Draver from './components/Draver.vue'

    const cart = ref([])

    const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
    const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

    const addToCart = (item) => {
        cart.value.push(item)
        item.isAdded = true
    }
    const removeToCart = (item) => {
        cart.value.splice(cart.value.indexOf(item), 1)
        item.isAdded = false
    }
    const onClickAddCart = (item) => {
        if(!item.isAdded) {
            addToCart(item)
        } else {
            removeToCart(item)
        }
    }
    const createOrder = async () => {
        try {
            const {data} = await axios.post('https://da34eb04df96eb4e.mokky.dev/orders', {
                items: cart.value,
                totalPrice: totalPrice.value
            })
            cart.value = []
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const drawerBool = ref(false)
    const draverFn = () => {drawerBool.value = !drawerBool.value}

    provide('cart', {
        cart,
        onClickAddCart,
        addToCart,
        removeToCart,
        draverFn
    })

</script>

<template>
    <div class="bg-white w-11/12 md:w-4/5 m-auto rounded-lg shadow-xl mt-14 mb-14">
        <Draver :totalPrice="totalPrice" :vatPrice="vatPrice" v-if="drawerBool" @closeDrawer="draverFn" @createOrder="createOrder"/>
        <AppHeader :totalPrice="totalPrice" @openDrawer="draverFn"/>

        <div class="p-10">
            <RouterView />  
        </div>
    </div>
</template>
