<script setup>
    import axios from 'axios';
    import { onMounted, ref, inject } from 'vue';
    import CardList from '../components/CardList.vue'
    const { addToCart, removeToCart } = inject('cart')
    const favorites = ref([])

    const addToFavorite = async (item) => {
        try {
            if(!item.isFavorite) {
                const obj = {
                    parentId: item.id
                }
                const {data} = await axios.post('https://da34eb04df96eb4e.mokky.dev/favorites', obj)
                item.isFavorite = true
                item.favoriteId = data.id
            } else {
                await axios.delete(`https://da34eb04df96eb4e.mokky.dev/favorites/${item.favoriteId}`)
                item.isFavorite = false
                item.favoriteId = null
            }
        } catch(err) {
            console.log(err)
        }
    }
    const onClickAddCart = (item) => {
        if(!item.isAdded) {
            addToCart(item)
        } else {
            removeToCart(item)
        }
    }

    onMounted( async() => {
        try {
            const {data : favorite} = await axios.get('https://da34eb04df96eb4e.mokky.dev/favorites?_relations=items')
            favorites.value = favorite.map(obj => obj.item)
        } catch (err) {
            console.log(err)
        }
    })
    console.log(favorites)
</script>
<template>
    <h2 class="text-3xl font-medium mb-6">Закладки</h2>
    <CardList :items="favorites" isFavorites/>
</template>