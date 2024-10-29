import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import supabase from '../services/supabaseConfig'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref(null)

  const setProfile = (data) => {
          profile.value = data
      }

  // Fonction pour mettre à jour une propriété spécifique du profil
  const updateProfileProperty = (property, value) => {
    profile.value[property] = value
  }

  return {
    profile,
    setProfile,
    updateProfileProperty
  }
})