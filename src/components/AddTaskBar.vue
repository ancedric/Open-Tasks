
<script setup>
    import {ref} from 'vue'
    import {useRoute, useRouter} from 'vue-router'
    import Alert from './Alert.vue';

    const newTask = ref('')
    const route = useRoute()
    const router= useRouter()
    const errors = ref( false )

    const submitTask = () => {
        if(newTask === null || newTask === undefined){
            error.value = true
        } else{
            errors.value = false
            router.replace({path: `/addTask/${newTask.value}`})
        }
    }


</script>

<template>
    <div class="form-ctn">
        <form action="" @submit.prevent="submitTask">
            <input type="text" v-model="newTask" placeHolder="Add new task..." class="task-input" />
            <button :disabled="newTask.length === 0" class="send-btn"> <div class="btn-circle"> <div class="btn-circle-2"></div> </div> Add task</button>
        </form>
    </div>
    <Alert type="danger" action="emptyField" v-if="errors"/>
</template>
<style scope>
    .form-ctn, form{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        @media screen and (max-width: 860px){
            height: 30px;
        } 
    }
    .task-input{
        height: 43px;
        width: 80%;
        border: none;
        border-radius: 50px;
        background-color: #eee;
        color: #9da6e0;
        font-family: Poppins;
        padding-left: 20px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
    }
    .send-btn{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 40px;
        width: 40px;
        border: none;
        border-radius: 50px;
        background-color: #2a2f4f;
        color: #eee;
        font-family: Poppins;
        text-wrap: nowrap;
        font-weight: 600;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.35s ease;
        position: absolute;
        right: 9%;
        top: 50%;
        transform: translateY(-50%);
        &:hover{
            width: 120px;
        }
        @media screen and (max-width : 860px){
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .btn-circle{
        height: 25px;
        width: 25px;
        flex-shrink: 0;
        border: 2px solid #eee;
        border-radius: 50px;
        margin-top: 1px;
        margin-right: 10px;
        background-color: transparent;
    }
    .btn-circle-2{
        height: 15px;
        width: 15px;
        flex-shrink: 0;
        border: 2px solid #eee;
        border-radius: 50px;
        padding-top: 1px;
        padding-bottom: 1px;
        margin-left: 3px;
        margin-top: 2px;
        background-color: transparent;
    }
</style>