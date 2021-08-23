<template>
  <div class="edit" v-if="post !== null">
    <form @submit.prevent="handleSubmit">
      <label>Title:</label>
      <!--input id="title" name="title" type="text" :value="post.title" @input="updateTitle" /-->
      <input v-model="title" type="text"  />
      <label>Content:</label>
      <textarea v-model="body" required></textarea>
      <label>Tags (hit enter to add a tag):</label>
      <input 
        @keydown.enter.prevent="handleKeydown" 
        v-model="tag" 
        type="text"
      >
      <div @click="deleteSkill(tag)" v-for="tag in tags" :key="tag" class="pill">
        #{{ tag }}
      </div>
      <button>Save Article</button>
    </form>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import axios from 'axios'

// component imports
import Spinner from '../components/Spinner.vue'

export default {
  props: ['id'],
  components: { Spinner },
  setup(props, context) {
    const title = ref('')
    const body = ref('')
    const tags = ref([])
    const tag = ref('')

    const router = useRouter()
    const route = useRoute()


    // I can delete a skill by clicking on it if I added it by mistake
    const deleteSkill = (tag) => {
      tags.value = tags.value.filter((item) =>{
        return tag !== item
      })
    }

    // This is for making sure I don't add the same tag twice
    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g,'') // remove all whitespace
        tags.value.push(tag.value)
      }
      tag.value = ''
    }

    // Updating with the PUT method
    const handleSubmit = async () => {
      const post = {
        id: Math.floor(Math.random() * 10000),
        title: title.value,
        body: body.value,
        tags: tags.value
      }

      await fetch(process.env.VUE_APP_ENV_VARIABLE + '/posts/' + route.params.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(post)
      })


      router.push({ name: 'Home' })
    }

    return { body, title, tags, tag, handleKeydown, handleSubmit, deleteSkill}
  },
  async mounted () {
    const route = useRoute()

    const data = await axios
      .get(process.env.VUE_APP_ENV_VARIABLE + '/posts/' + route.params.id)
    
    this.$nextTick(); // wait for re-render

    this.title = data.data.title
    this.body = data.data.body
    this.tags = data.data.tags
  }
}
</script>

<style>
  form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea, field {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
  }
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #ff8800;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }
</style>