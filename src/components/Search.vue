<template>
<div class="searchContainer">
    <input v-model="searchArticles" :placeholder="'Search articles'" v-on:keyup="changeSearch($event)"  />
</div>
</template>

<script>
export default {
    props: ['posts'],
    name: 'Search',
    setup(props, context) {
        const changeSearch = (event) => {
            context.emit('searchData', event.target.value)
        }
        
        return { changeSearch }
    }
}
</script>

<style>
    .searchContainer
    {
        position:absolute;
        left:50%;
        width:200px;
        margin-left:-100px;
        top:50px;
    }
</style>