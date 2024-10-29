<script setup>
    import ProgressBar from "./ProgressBar.vue"
    import {useRoute, useRouter} from 'vue-router'

    const props = defineProps({
        title: String,
        link: String
    })

    const route = useRoute()
    const router= useRouter()

    const navigateTask = () =>{
        router.push({path: props.link})
    }
</script>

<template>
  <div class="main-ctn" @click="navigateTask">
    <div class="card-title">
        <h3>{{props.title}}</h3>
    </div>
    <div class="mid">
        <img src="/src/assets/images/new-task-image.jpeg" class="task-img"/>
    </div>
    <div class="bottom-ctn">
        <div class="bottom">
            <div class="task-title">REDACTION DE L'ARTICLE</div>
        </div>
    </div>
    
  </div>
</template>

<style scoped>
    .main-ctn{
        width: 200px;
        height: 250px;
        border-radius: 15px;
        margin: 10px;
        overflow: hidden;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
        position: relative;
        &:hover{
            cursor: pointer;
            box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.5);
        }
        &:hover .card-title h3::after{
            width: 72px;
        }
        &:hover .mid .task-img{
            transform: scale(1.2);
        }
        @media screen and (max-width: 860px){
            width: 40vw;
            height: 25vh;
        }
    }
    
    .main-ctn::after{
        content:"";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40%;
        background-image: linear-gradient(45deg, #0000009d , #ffffff00);
    }
    .card-title{
        text-align: right;
        color :#eee;
        height: 20%;
        background-image: linear-gradient(-135deg, #0000009d , #ffffff00);
        position: relative;
        z-index: 1;
    }
    .card-title h3{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1rem;
        @media screen and (max-width:860px){
            top: -15px;
        }
    }
    .card-title h3::after{
        content: "";
        width: 30px;
        height: 4px;
        background-color: #eee;
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 50px;
        transition: all 0.35s ease;
    }
    
    .mid{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .mid .task-img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.35s ease;
    }
    .bottom-ctn{
        position: relative;
        height: 80%;
    }
    .bottom{
        position: absolute;
        bottom: 30px;
        color: #eee;
        display: flex;
        @media screen and (max-width:860px){
            bottom: 0;
        }
    }
    .bottom .task-title{
        padding: 20px;
        font-size: 1.2rem;
        font-weight: 700;
        z-index: 1;
    }
</style>
