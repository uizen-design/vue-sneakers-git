<script setup>
    import axios from 'axios';
    import { reactive, inject, watch, ref, onMounted } from 'vue';
    import CardList from '../components/CardList.vue'
    import debounce from "lodash.debounce";
    const { cart, addToCart,removeToCart } = inject('cart')

    const items = ref([])
    const filters = reactive({
        sortBy: 'title',
        searchQuery: '',
    })
    const onChangeSelect = event => {filters.sortBy = event.target.value;}
    const onChangeSearchInput = debounce(event => {filters.searchQuery = event.target.value;}, 500)
    const addToFavorite = async (item) => {
        try {
            if(!item.isFavorite) {
                const obj = {
                    item_id: item.id
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
    const axiosItemsFavorites = async () => {
        try {
            const {data: favorites} = await axios.get('https://da34eb04df96eb4e.mokky.dev/favorites')
            items.value = items.value.map(item => {
                const favorite = favorites.find(favorite => favorite.item_id === item.id)
                if(!favorite) {
                    return item
                }
                return {
                    ...item,
                    isFavorite: true,
                    favoriteId: favorite.id
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    const axiosItems = async () => {
        try {
            const params = {
                sortBy: filters.sortBy,
            }

            if(filters.searchQuery) {
                params.title = `*${filters.searchQuery}*`;
            }

            const {data} = await axios.get('https://da34eb04df96eb4e.mokky.dev/items', {params})
            items.value = data.map(obj => ({
                ...obj,
                isFavorite: false,
                favoriteId: null,
                isAdded: false
            }))
        } catch (err) {
            console.log(err)
        }
    }

    onMounted(async () => {
        const localCart = localStorage.getItem('cart')
        cart.value = localCart ? JSON.parse(localCart) : []

        await axiosItems()
        await axiosItemsFavorites()

        items.value = items.value.map(item => ({
            ...item,
            isAdded: cart.value.some(cartItem => cartItem.id == item.id)
        }))
    });
    watch(cart, () => {
        items.value = items.value.map(item => ({
            ...item,
            isAdded: false
        }))
    })
    watch(cart, () => {
        localStorage.setItem('cart', JSON.stringify(cart.value))    
    },{deep: true})

    watch(filters, axiosItems);
</script>

<template>
    <div class="flex flex-col sm:flex-row justify-start sm:justify-between items-baseline lg:items-center mb-8">
        <h2 class="text-3xl font-medium mb-6 sm:mb-0">Все крософки</h2>

        <div class="flex gap-4 flex-col lg:flex-row">
            <select @change="onChangeSelect" class="py-1.5 px-3 border focus:border-gray-400 border-gray-200 rounded-md outline-none" name="" id="">
                <option value="title">По названию</option>
                <option value="price">По цене (дешевые)</option>
                <option value="-price">По цене (дорогие)</option>
            </select>
            <div class="relative">
                <img class="absolute left-3 top-2.5" src="/search.svg" alt="">
                <input @input="onChangeSearchInput" class="border focus:border-gray-400 border-gray-200 rounded-md py-1.5 pl-10 pr-4 outline-none" type="text" placeholder="Поиск...">
            </div>
        </div>

    </div>

    <CardList :items="items" @addToFavorite="addToFavorite" @addToCart="onClickAddCart"/>
</template>