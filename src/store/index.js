// store/index.js
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import supabase from '../services/supabaseConfig'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const authenticate = async (data) => {
    user.value = data
    Cookies.set('user', JSON.stringify(data))
  }

  const init = () => {
    const storedUser = Cookies.get('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  const logout = () => {
    user.value = null
    Cookies.remove('user')
  }

  init()

  return {
    user,
    authenticate,
    logout,
  }
})