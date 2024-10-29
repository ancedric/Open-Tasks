<template>
    <section class="page">
        <div class="tasks-ctn">
            <div class="tasks-list">
                <p class="link" @click="backHome">Home</p>            
                <div v-if="sortedTasks.length === 0">
                    Aucune tâche...
                </div>
                <ul v-else>
                    <li 
                        v-for="todo in sortedTasks"
                        :class="{task: true, current: open && todo.id === selectedTodoId}" 
                        :key="todo.id"
                        @click="displayTodo(todo.id, todo.title, todo.description, todo.steps, todo.progression, todo.date, todocompleted)"
                    >
                        <div class="data">
                            <label>
                                <input type="checkbox" v-model="todo.completed"/>
                                {{todo.title}}
                            </label>
                            <ProgressBar :percent="todo.progression"/>
                        </div>
                        <div class="progress">{{todo.progression}} %</div>
                        
                    </li>
            </ul>
            <label>
                <input type="checkbox" v-model="hideCompleted">
                Hide completed tasks
            </label>
            </div>
            <div class="task-details">
                <div v-if="!open"> Details appear here... </div>
                <div class="details-ctn" v-else> 
                    <h3> {{currentTodo.title}} <div class="progress">{{currentTodo.progression}} %</div> </h3>
                    <p class="desc"> {{currentTodo.description}} </p>
                    <ProgressBar :percent="currentTodo.progression"/>
                    <p> {{currentTodo.date}} </p>
                    STEPS:
                    <div class="steps">
                        <ul clas="step-list">
                            <li class="list-elem" v-for="step in currentTodo.steps" :key="step.name">
                                <label>
                                    <p class="step-name">{{step.name}}</p>
                                    <input type="checkbox" class="checkbox" v-model="step.done"/>
                                    <p>{{step.elapsedTime}} | {{step.time}}</p>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
</template>

<script setup>
    import supabase from '../services/supabaseConfig.js';
    import {ref, computed} from 'vue'
    import ProgressBar from '../components/ProgressBar.vue'
    import {useRouter} from "vue-router" 
    import { useProfileStore } from '../store/profile'

    const hideCompleted = ref(false)
    const currentTodo = ref('')
    const tasks = ref([])
    const open = ref(false)
    const selectedTodoId= ref(null)
    const router = useRouter()
    const profileStore = useProfileStore()


    const getTasks = async () => {
        const { data, error } = await supabase 
        .from('Tasks')
        .select('*')
        .eq('ownerId', profileStore.profile.id)

        if(error){
            console.log(error);
            return []
        }
        if(data){
            tasks.value =data
            return data
        }
    };
    getTasks()


    const sortedTasks = computed(() => {
        if(tasks.value.length === 0 || tasks.value === undefined ){
            return []
        }
        return tasks.value.sort((a, b) => a.date > b.date? 1 : -1)
    })
    const sortCompletedTasks = computed(() => {
        return tasks.value.sort((a, b) => a.date > b.date? 1 : -1).filter(t => hideCompleted.value === false || t.completed === false)
    })

    const displayTodo =(id, title, description, steps, progression, date, completed) =>{
    open.value = true
    selectedTodoId.value = id
    currentTodo.value = {
        id,
        title,
        description,
        steps,
        progression,
        date,
        completed,
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
    .tasks-ctn{
        display: flex;
        justify-content: space-between;
        align-items: center;
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
            align-items: center;
            width: 95vw;
            height: 95vh;
            padding: 0;
        }
    }
    .tasks-list{
        width: 35%;
        height: 100%;
        @media screen and (max-width: 860px){
            width: 100%;
        }
    }
    .tasks-list ul{
        width: 100%;
        height: 70%;
        overflow-y: scroll;
        padding-top: 30px;
        padding-bottom: 30px;
    }
    .tasks-list ul .task{
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding-left: 10px;
        font-family: Inter;
        font-weight: 400;
        width: 80%;
        height: 60px;
        background-color: #97cbdc;
        color: #004581;
        margin-bottom: 10px;
        border-radius: 10px;
        transition: all 0.3s ease;
        @media screen and (max-width: 860px){
            width: 80%;
            justify-content: flex-start;
        }
    }
    .task-details{
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
            width: 100%;
            font-size: 0.8rem;
            padding: 10px;
            padding-left: 70px;
        }
    }
    .task-details .details-ctn{
        height: 80%;
        width: 90%;
    }
    .task-details .details-ctn h3{
        display: flex;
        gap: 20px;
        width: 300px;
        height: 50px;
        border-bottom: 2px solid #eee;
        @media screen and (max-width: 860px){
            gap: 5px;
            width: 80%;
            height:30px;
            font-size: 1rem;
        }
    }
    .task-details .desc{
        width: 300px;
        height: 100px;
        border: 1px solid #6b3e26;
        font-weight: 300;
        padding: 20px;
        @media screen and (max-width: 860px){
            width: 80%;
            height: 30%;
            font-size: 0.8rem;
        }
    }
    .list-elem{
        list-style-type: none;
        margin-left: 0;
    }
    .list-elem label{
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Inter;
        font-weight: 400;
        width: 400px;
        background-color: #ffd181;
        margin-bottom: 10px;
        border-radius: 10px;
        @media screen and (max-width: 860px){
            width:100%;
            height: 30px;
            font-size: 0.8rem;
        }
    }
    .step-name{
        width: 150px;
        padding-left: 5px;
        @media screen and (max-width: 860px){
            width: 80px;
        }
    }
    /*.task{
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding-left: 10px;
        font-family: Inter;
        font-weight: 400;
        width: 250px;
        height: 50px;
        background-color: #97cbdc;
        color: #004581;
        margin-bottom: 10px;
        border-radius: 10px;
        transition: all 0.3s esae;
        @media screen and (max-width: 860px){
            width: 80px;
        }
    }*/
    .tasks-list ul .task .data{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        width: 200px;
        @media screen and (max-width: 860px){
            width: 80%;
        }
    }
    .progress{
        color: #ff9201;
        font-weight: 700;
        font-size: 1.2rem;
        width: 80px;
    }
    .tasks-list ul .task.current{
        background-color: #8fc79a;
        color: #2d8d79;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
    }
    .steps{
        padding: 30px;
        height: 150px;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            width: 5px;
        }
        &::-webkit-scrollbar-thumb{
            background: none;
            border-radius: 10px;
        }
        @media screen and (max-width: 860px){
            height:300px;
            width: 80%;
            padding: 0;
            font-size: 0.8rem;
        }
    }
</style>