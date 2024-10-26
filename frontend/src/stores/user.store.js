import axios from "axios"
import { defineStore } from "pinia"
import { reactive, ref } from "vue"

export const useUserStore = defineStore('user', () => {
    const user = reactive({
        token: localStorage.getItem('token'),
        role: '',
        username: '',
        id: ''
    })
    const checkToken = async () => {
      try {
        const response = await axios.get('/users/me', { headers: { 'Authorization': `Bearer ${user.token}` } });
        user.id = response.data.id;
        user.username = response.data.username;
        user.role = response.data.role;
      } catch (e) {
        console.log(e);
      }
    }
    return { user, checkToken }
  })