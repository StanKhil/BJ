import router from '@/router'
import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

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
        if (axios.isAxiosError(e) && e.response?.status === 401) {
          router.push('/login')
        } 
      }
    }
    const logout = () => {
      localStorage.setItem('token', '');
      axios.defaults.headers.common['Authorization'] = ``;
      user.id = '';
      user.username = '';
      user.role = '';
      user.token = '';
      router.push('/login')
    }
    return { user, checkToken, logout }
  })