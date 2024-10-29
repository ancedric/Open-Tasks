<template>
    <section class="page">
        <div class="profile-ctn">
            <div class="user">
                <p class="link" @click="backHome">Home</p>            
                 <div v-if="profileStore.profile === undefined">
                    No user connected...
                </div>
                <div v-else class="sum-ctn">
                    <div class="profile-sumary">
                        <div class="profile-photo">
                            <img :src="profileStore.profile.profilePhoto" :alt="profileStore.profile.firstName">
                        </div>
                        <h2 class="profile-name">{{profileStore.profile.firstName}} {{profileStore.profile.lastName}}</h2>
                        <p class="email">{{profileStore.profile.email}}</p>
                        <p class="plan"> {{profileStore.profile.plan}}</p>
                        <router-link to="/editProfile" class="plan">Edit profile</router-link>
                    </div>
                    <div class="useful-links">
                        <router-link to="/" class="link">Users conditions</router-link>
                        <router-link to="/" class="link">Privacy Policy</router-link>
                        <router-link to="/" class="link">Legal Notice</router-link>
                        <router-link to="/" class="link">Support</router-link>
                        <p class="link" @click="logOut">Log Out</p>
                    </div>
                </div>
            </div>
            <div class="user-details">
                <div v-if="userStore.user === undefined"> Details appear here... </div>
                <div v-else class="details-view"> 
                    <p class="detail">First Name : {{profileStore.profile.firstName}}</p>
                    <p class="detail"> Last Name : {{profileStore.profile.lastName}}</p>
                    <p class="detail"> Email : {{profileStore.profile.email}}</p>
                    <p class="detail"> Company Name : {{profileStore.profile.company}}</p>
                    <p class="detail"> City : {{profileStore.profile.city}}</p>
                    <p class="detail"> Country : {{profileStore.profile.country}}</p>
                    <p class="detail"> Registered at : {{profileStore.profile.createdAt}}</p>
                </div>
            </div>
        </div>
    </section>
    
</template>

<script setup>
    import {ref, computed} from 'vue'
    import {useRouter} from "vue-router" 
    import { useUserStore } from '../store/index'
    import { useProfileStore } from '../store/profile'
    import supabase from '../services/supabaseConfig'

    const router = useRouter()
    const userStore = useUserStore()
    const profileStore = useProfileStore()

    if(userStore.user.email=== null || userStore.user.email === undefined){
        router.push('/auth')
    }

    const logOut = async () => {
        const { data, error } = await supabase.signOut

        if(error){
            console.error('Erreur lors de la déconnexion :', error)
        }
        if(data){
            userStore.user.$reset()
        }
    }

const backHome = () =>{
    router.push({path: "/"})
}
</script>

<style scoped>
    .link{
        padding-left: 50px;
        font-family: Inter;
        font-size: 0.8rem;
        font-weight: 400;
        text-decoration: none;
        color: #004581;
        cursor: pointer;
    }
    .profile-ctn{
        display: flex;
        justify-content: space-between;
        align-items: start;
        width: 70vw;
        height: 80vh;
        background-color: #eee;
        border-radius: 50px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        @media screen and (max-width: 860px){
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: start;
            width: 95vw;
            height: 95vh;
            padding: 0;
        }
    }
    .user{
       width: 35%;
       display: flex;
       flex-direction: column;
       justify-content: flex-start;
       align-items: center;
       @media screen and (max-width: 860px){
            width: 100%;
            height: 50%;
        }
    }
    .user .sum-ctn{
        @media screen and (max-width : 860px){
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }
    .profile-sumary{
        padding-left: 20px;
        color: #505181;
        height: 50%;
        @media screen and (max-width: 860px){
            
            height: 100%;
            gap:20px;
        }
    }
    .profile-sumary .user-name{
        @media screen and (max-width : 860px){
            font-size: 1rem;
        }
    }
    .profile-sumary .email{
        font-style: italic;
        font-size: 0.8rem;
    }
    .profile-sumary .profile-photo{
        width: 180px;
        height: 180px;
        margin-left: 20%;
        border: 6px solid #fff;
        border-radius: 50%;
        overflow: hidden;
       @media screen and (max-width:860px){
            width: 120px;
            height: 120px;
        }
    }
    .profile-sumary .profile-photo img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .profile-ctn .useful-links{
        display: flex;
        flex-direction: column;
        gap: 5px;
        @media screen and (max-width:860px){
            width: 50%;
            justify-content: center;
            align-items: center;
            gap: 15px;
            text-align: right;
        }
    }
    .profile-ctn .useful-links .link{
        @media screen and (max-width:860px){
            text-align: right;
            font-family: Inter;
            font-weight: 100;
            font-size: 0.7rem;
            color: #505181;
            width: 100%;
            padding-right: 70px;
        }
    }
    .user-details{
        width: 65%;
        height: 100%;
        background-color: #e1c7a5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #6b3e26;
        font-family: Inter;
        @media screen and (max-width: 860px){
            justify-content: flex-start;
            align-items: start;
            width: 100%;
            padding-left: 70px;
            overflow-y: scroll;
        }
    }
    .user-details .details-view{
        @media screen and (max-width : 860px){
            width: 100%;
            height: 100%;
            padding-bottom: 20px;
            overflow-y: scroll;
        }
    }
    .user-details p{
        display: flex;
        gap: 10px;
        width: 300px;
        height: 30px;
        border-bottom: 2px solid #eee;
        @media screen and (max-width: 860px){
            gap: 5px;
            width: 80%;
            height:30px;
            font-size: 1rem;
        }
    }
</style>