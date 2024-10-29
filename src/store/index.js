import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import supabase from '../services/supabaseConfig'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)  
  const authenticate = async (data) => { 
      user.value = data    
  }

    return{
      user, authenticate,
    }
    
  })

  