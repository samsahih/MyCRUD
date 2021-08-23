import { ref, shallowRef } from 'vue'

const getPosts = () => {

  const posts = ref([])
  const originalPosts = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      let data = await fetch(process.env.VUE_APP_ENV_VARIABLE + '/posts')
      if(!data.ok) {
        throw Error('no available data')
      }
      originalPosts.value = posts.value = await data.json()
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { posts, originalPosts, error, load }
}

export default getPosts