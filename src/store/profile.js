import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import supabase from '../services/supabaseConfig'
import Cookies from 'js-cookie'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref(null)
  const isLoading = ref(true)

  const setProfile = (data) => {
    profile.value = data
    Cookies.set('profile', JSON.stringify(data))
  }

  // Fonction pour mettre à jour une propriété spécifique du profil
  const updateProfileProperty = (property, value) => {
    profile.value[property] = value
    Cookies.set('profile', JSON.stringify(profile.value))
  }

  const init = async () => {
    const storedProfile = Cookies.get('profile')
    if (storedProfile) {
      profile.value = JSON.parse(storedProfile)
    }
    isLoading.value = false
  }

  const resetProfile = () => {
    profile.value = null
    Cookies.remove('profile')
  }

  return {
    profile,
    isLoading,
    setProfile,
    updateProfileProperty,
    init,
    resetProfile
  }
})