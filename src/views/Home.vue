<script setup>
    import MainCard from "../components/MainCard.vue"
    import Card from "../components/Card.vue"
    import ProfileCard from "../components/ProfileCard.vue"
    import AddTaskBar from "../components/AddTaskBar.vue"
    import Timer from "../components/Timer.vue"
    import { useUserStore } from '../store/index'
    import { useProfileStore } from '../store/profile'
    import { useRouter } from 'vue-router'
    import {storeToRefs} from 'pinia'

    const router = useRouter()
    const userStore = useUserStore()
    const profileStore = useProfileStore()

    console.log('userStore:',userStore.user, 'user email:', userStore.user.email)
    /*if(userStore.user.email === null || userStore.user.email === undefined){
        router.push('/auth')
    }*/
    console.log('profile:', profileStore.profile, 'profile email:', profileStore.profile.email)
    /*if(profileStore.profile.email === null || profileStore.profile.email === undefined){
        router.push('/setProfile')
    }*/
</script>

<template>
<section class="page">
    <div class="home-ctn">
        <div class="header">
            <h1>OpenTask</h1>
            <Timer />
            <div class="about">About</div>
        </div>
        <div class="body">
            <div class="left">
                <MainCard />
            </div>
            <div class="right">
                <div class="top">
                    <AddTaskBar />
                </div>
                <div class="bottom">
                    <Card title="All Tasks" link="/tasks" />
                    <ProfileCard />
                </div>
                
            </div>
        </div>
    </div>
</section>
    
</template>

<style scoped>
    .page{
        z-index: -10;
        width: 100vw;
        height: 100vh;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #004581;
        /*background: hsla(152, 100%, 50%, 1);
        background: linear-gradient(45deg, hsla(152, 100%, 50%, 1), 0%, hsla(186, 100%, 69%, 1) 100%);
        background: -moz-linear-gradient(45deg, hsla(152, 100%, 50%, 1), 0%, hsla(186, 100%, 69%, 1) 100%);
        background: -webkit-linear-gradient(45deg, hsla(152, 100%, 50%, 1), 0%, hsla(186, 100%, 69%, 1) 100%);
        filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#00ff87", endColorstr="#60efff", GradientType=1);*/
        @media screen and (max-width: 860px){
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
    .home-ctn{
        width: 70vw;
        height: 80vh;
        @media screen and (max-width: 860px){
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 10px;
        }
    }
    .header{
        display: flex;
        justify-content: space-around;
        align-items:center;
        width: 100%;
        height: 30%;
        color: #ccc;
        font-size: 1.2rem;
        font-weight: 400;
        padding-left: 20px;
        @media screen and (max-width: 860px){
            height: 80px;
            width: 100vw;
            color: #eee;
            font-size: 1rem;
            padding-left: 20px;
        }
    }
    .body{
        width: 100%;
        height: 80%;
        display: flex;
        @media screen and (max-width: 860px){
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100vw;
        }
    }
    .body .left{
        width: 30%;
        height: 100%;
        @media screen and (max-width: 860px){
            width: 100%;
            height: 70%;
        }
    }
    .right{
        width: 70%;
        height: 100%;
        @media screen and (max-width: 860px){
            width: 100%;
            height: 100%;
        }
    }
    .top{
        width: 100%;
        height: 25%;
        @media screen and (max-width: 860px){
            width: 100vw;
            height: 10vh;
        }
    }
    .bottom{
        display: flex;
        align-items: center;
        gap: 20px;
        width: 100%;
        height: 75%;
        margin-left: 20px;
        @media screen and (max-width: 860px){
            width: 100vw;
            height: 30vh;
        }
    }
    .about{
        font-family: Inter;
        font-size: 0.8rem;
        font-weight: 400;
        text-decoration: underline;
    }

</style>