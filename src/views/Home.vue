<template>
  <div class="home">
    <div v-if="error">{{ error }}</div>
    <Search :posts="posts" @searchData="change" />
    <div v-if="posts.length" class="layout">
      <div class="post-list">
        <div v-for="post in postsWithTag" :key="post.id">
          <div class="post">
            <router-link :to="{ name: 'Details', params: { id: post.id }}">
              <h3>{{ post.title }}</h3>
            </router-link>
            <!--p>{{ post.body }}</p-->
            <Snippet :post="post" />
            <span v-for="tag in post.tags" :key="tag">
              #{{ tag }}
            </span>
            <router-link :to="{ name: 'Edit', params: { id: post.id }}">
              <br><div class="GoToButton">Edit Article</div>
            </router-link>
            <div @click="removeArticle(post.id)" class="GoToButton">Remove Article</div>
          </div>
        </div>
      </div>
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <div>No articles available</div>
    </div>
  </div>
</template>

<script>
import { computed, ref, shallowRef } from 'vue'
import getPosts from '../composables/getPosts'

// component imports
import Spinner from '../components/Spinner.vue'
import TagCloud from '../components/TagCloud.vue'
import Snippet from '../components/Snippet.vue'
import Search from '../components/Search.vue'
import { useRoute } from 'vue-router'
import useTags from '../composables/useTags'

export default {
  name: 'Home',
  components: { Spinner, TagCloud, Snippet, Search },
  setup() {
    const tagsChildRef = ref()
    const route = useRoute()
    const { posts, originalPosts, error, load } = getPosts()

    load()

    //search function
    function change(searchValue) {
      console.log(posts)
      console.log(originalPosts)

      if(searchValue != null && searchValue != "") {
        posts.value = originalPosts.value.filter(function (item) {
          return (item.title.toLowerCase().includes(searchValue.toLowerCase()) || item.body.toLowerCase().includes(searchValue.toLowerCase()))
        })
      }
      else {
        posts.value = originalPosts.value
      }
    }

    // playing with routes for the tags browsing/filtering
    const postsWithTag = computed(() => {
      return (route.params.tag != null) ? posts.value.filter(p => p.tags.includes(route.params.tag)) : posts.value
    })

    // remove article function
    async function removeArticle (id) {
      if(confirm('Are you sure or are you certain ?'))
      {
        try {
          let data = await fetch(process.env.VUE_APP_ENV_VARIABLE + '/posts/' + id, {
            method: 'DELETE'
          })
          
          if(data.status == 200) 
          {
            posts.value = posts.value.filter((item) =>{
              return id !== item.id
            })
            
            // update tags !
            useTags(posts.value)

          } else{
            alert('Error deleting task')
          } 
        }
        catch(err) {
          //error.value = err.message
          console.log(err.message)
        }
      }
    }

    return { posts, postsWithTag, error, removeArticle, computed, change }
  }
}
</script>

<style>
  .home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
  }
  .tag {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }

  .post {
    margin: 0 40px 30px;
    padding-bottom: 30px;
    border-bottom: 1px dashed #e7e7e7;
  }
  .post h3 {
    display: inline-block;
    position: relative;
    font-size: 26px;
    color: white;
    margin-bottom: 10px;
    max-width: 400px;
  }
  .post h3::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1deg);
  }
  .GoToButton
  {
    margin-top: 55px;
    display: inline-block;
    color: black;
    font-size: 11px;
    font-style: italic;
    margin-right:20px;
    cursor: pointer;
  }

  .post {
    margin: 0 40px 30px;
    padding-bottom: 30px;
    border-bottom: 1px dashed #e7e7e7;
  }
  .post h3 {
    display: inline-block;
    position: relative;
    font-size: 26px;
    color: white;
    margin-bottom: 10px;
    max-width: 400px;
  }
  .post h3::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1deg);
  }
  .GoToButton
  {
    margin-top: 55px;
    display: inline-block;
    color: black;
    font-size: 11px;
    font-style: italic;
    margin-right:20px;
    cursor: pointer;
  }
</style>
