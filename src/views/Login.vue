<template>
    <div class="page">
      <div class="auth-ctn">
        <form @submit.prevent="handleSubmit">
          <div class="input-ctn">
            <div class="label">Email address</div>
            <input type="email" class="set-input" v-model="email" placeholder="Email">
          </div>
          <div class="input-ctn">
            <div class="label">Password</div>
            <input type="password" class="set-input" v-model="password" placeholder="Password">
          </div>
          <button type="submit" class="auth-btn">Sign In</button>
          <p>OR</p>
          <button @click="signInWIthGitHub" class="auth-btn">Connect with GitHub</button>
        </form>
        <p>You don't have an account ? <router-link to="/register">Sign Up</router-link></p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import supabase from '../services/supabaseConfig'
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../store/index'
  import { useProfileStore } from '../store/profile'
  
      const email = ref('');
      const password = ref('');
      const router = useRouter();

      const user = useUserStore()
      const profile = useProfileStore()
  
      const handleSubmit = async () => {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: email.value,
              password: password.value
            })
            if(error){
              console.log('Error during authentication:', error)
            }

            if(data){
              user.authenticate(data.user)
              console.log('data:', data.user)
              console.log('user: ', user.user)  
              fetchProfile(email.value)  
            }
            
      }
      
      const fetchProfile = async (_email) => {
        const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .eq('email', _email)

        if(error){
          console.log('Error during profile fetching:', error)
        }

        if(data){
          console.log('profile data:', data[0])
          profile.setProfile(data[0]) 
          console.log( 'user profile : ', profile)
          router.push('/home')
        }
          
      }

      const signInWIthGitHub = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'github'
        })
      }

  </script>

  <style scoped>
    .auth-ctn{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70vw;
        height: 80vh;
        padding: 0;
        background-color: #eee;
        border-radius: 30px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        @media screen and (max-width: 860px){
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 95vw;
            height: 95vh;
            padding: 0;
        }
    }
    .auth-ctn form{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 80%;
      width: 300px;
      margin-top: 20px;
      border-radius: 15px;
      border: 2px solid #9da6e0;
    }
    .auth-ctn form .input-ctn .set-input{
        height: 33px;
        width: 100%;
        border-radius: 10px;
        background-color: #eee;
        color: #9da6e0;
        padding-left: 10px;
        font-family: Poppins;
        margin-left: 0;
        border: 1px solid;
    }
    .auth-ctn form .input-ctn{
        height: 43px;
        width: 200px;
        color: #9da6e0;
        margin: 0;
        padding-right: 25px;
        font-family: Poppins;
        position: relative;
    }
    .input-ctn .label{
        position: absolute;
        top: -5px;
        left: 30px;
        font-size: 0.8rem;
        background-color: #eee;
        padding-left: 5px;
        padding-right: 5px;
        z-index: 1;
    }
    .auth-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 200px;
        border: none;
        border-radius: 10px;
        background-color: #2a2f4f;
        color: #eee;
        font-family: Poppins;
        font-weight: 600;
        cursor: pointer;
        margin-top: 10px;
    }
  </style>