<template>
    <section class="page">
        <div class="tasks-ctn">
            <div class="tasksList">
                <p class="link" @click="backHome">Home</p>            
                <div v-if="displayedTasks.length === 0">
                    Aucune tâche...
                </div>
                <ul v-else>
                    <li 
                        v-for="todo in displayedTasks"
                        :class="{task: true, current: open && todo.id === selectedTodoId}" 
                        :key="todo.id"
                        @mouseover="displayOptions(todo.id)"
                        @mouseleave="hideOptions(todo.id)"
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
                        <div :class="{options:true, visible: showOptions && todo.id === selectedTodoId}" 
                            v-if="showOptions"
                            @click="openOptions = true"
                        >
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                        <div class="todoOptions" v-if="openOptions && todo.id === selectedTodoId">
                            <div class="option" @click="editTask(todo.id, todo.title, todo.description)">
                                <img src="/src/assets/images/edit.png">
                            </div>
                            <div class="option" @click="deleteTask(todo.id)">
                                <img src="/src/assets/images/corbeille.png">
                            </div>
                        </div>
                    </li>
                    
                </ul>
                <div class="tags">
                    <p :class="{tag: true, current: all}" @click="setAllTasks">All</p>
                    <p :class="{tag: true, current: completed}" @click="setCompletedTasks">Completed</p>
                    <p :class="{tag: true, current: inProgress}" @click="setInProgressTasks">In progress</p>
                </div>
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
                            <li class="list-elem" v-for="step in currentTodo.steps" :key="step.id">
                                <label v-if="step.taskID === currentTodo.id" :class="{done:step.done === true}">
                                    <p class="step-name">{{step.title}} : </p>
                                    <p> Start : {{step.start}} | End : {{step.end}}</p>
                                    <button :class="{check: true, checked: step.done}" @click="check(step.id, step)">
                                        Done
                                    </button>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    <Alert type="danger" action="error" v-if="errors"/>
    <Alert type="success" action="added" v-if="success"/>
    </section>
</template>

<script setup>
    import supabase from '../services/supabaseConfig.js';
    import { ref, computed, onMounted } from 'vue'
    import ProgressBar from '../components/ProgressBar.vue'
    import {useRouter} from "vue-router" 
    import { useProfileStore } from '../store/profile'

    const hideCompleted = ref(false)
    const currentTodo = ref('')
    const tasks = ref([])
    const steps = ref([])
    const open = ref(false)
    const selectedTodoId= ref(null)
    const router = useRouter()
    const profileStore = useProfileStore()
    const showOptions = ref(false)
    const openOptions= ref(false)
    const all = ref(true)
    const completed = ref(false)
    const inProgress = ref(false)
    const success = ref(false)
    const errors = ref(false)

    const getTaskSteps = async (taskId) => {
        const { data, error } = await supabase 
        .from('TaskSteps')
        .select('*')
        .eq('taskID', taskId)

        if(error){
            console.log(error);
            return []
        }
        if(data){
            return data
        }
    };

    const getTasks = async () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  } else {
    const { data, error } = await supabase
      .from('Tasks')
      .select('*')
      .eq('ownerId', profileStore.profile.id);

    if (error) {
      console.log(error);
      return [];
    }
    if (data) {
      const tasksWithSteps = await Promise.all(data.map(async (task) => {
        const steps = await getTaskSteps(task.id);
        return { ...task, steps };
      }));
      tasks.value = tasksWithSteps;
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
      console.log('tasks :', tasks.value);
      return tasksWithSteps;
    }
  }
  displayedTasks.value = sortedTasks()
};
    
onMounted(async () => {
  await getTasks();
});
    

    const sortedTasks = () => {
        all.value = true
        completed.value = false
        inProgress.value = false
        if(tasks.value.length === 0 || tasks.value === undefined ){
            return []
        }
        return tasks.value.sort((a, b) => a.id > b.id ? -1 : 1)
    }

    const alreadyCompletedTasks = () => {
        all.value = false
        completed.value = true
        inProgress.value = false
        if(tasks.value.length === 0 || tasks.value === undefined ){
            return []
        }
        return tasks.value.sort((a, b) => a.id > b.id ? -1 : 1).filter(t => hideCompleted.value === true || t.completed === true)
    }
    const tasksInProgress = () => {
        all.value = false
        completed.value = false
        inProgress.value = true
        if(tasks.value.length === 0 || tasks.value === undefined ){
            return []
        }
        return tasks.value.sort((a, b) => a.id > b.id ? -1 : 1).filter(t => hideCompleted.value === false || t.completed === false)
    }

    
    const displayedTasks = ref(sortedTasks())

    const setAllTasks = computed( () =>{
        console.log('setAllTasks is called')
        displayedTasks.value = sortedTasks()
        console.log(displayedTasks.value)
    })
    const setCompletedTasks = computed(() =>{
        console.log('setCompletedTasks is called')
        displayedTasks.value = alreadyCompletedTasks()
        console.log(displayedTasks.value)
    })
    const setInProgressTasks = computed(() =>{
        console.log('setInProgressTasks is called')
        displayedTasks.value = tasksInProgress()
        console.log(displayedTasks.value)
    })
    
    //setAllTasks()
    const displayTodo = (id, title, description, steps, progression, date, completed) =>{
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
const displayOptions = (id) =>{
    showOptions.value = true
    selectedTodoId.value = id
}
const hideOptions = (id) =>{
    selectedTodoId.value = id
    showOptions.value = false
    openOptions.value = false
}

const editTask = (id, title, description) => {
    router.replace({path: `/editTask/${id}/title/${title}/desc/${description}`})
}
const deleteTask = async (id) => {
    const { data, error } = await supabase
        .from('Tasks')
        .delete()
        .eq('id', id)

        if(error){
            console.log("Erreur lors de la mise à jour de la tâche :",error)
            errors.value = true

            setTimeout(() => error.value = false , 3000)
        }
        if(data){
            success.value = true
            router.push('/tasks')

            setTimeout(() => success.value = false , 3000)
        }
    }

    const check = async (stepId) => {
        const stepIndex = currentTodo.value.steps.findIndex((step) => step.id === stepId)
        const step = currentTodo.value.steps[stepIndex]

        if (step.done) {
            // Décocher l'étape
            step.done = false
            const { data, error } = await supabase
            .from('TaskSteps')
            .update({ done: false })
            .eq('id', stepId)

            // Mettre à jour la progression de la tâche
            const nbDoneSteps = currentTodo.value.steps.filter((step) => step.done).length
            const progression = (nbDoneSteps / currentTodo.value.steps.length) * 100
            currentTodo.value.progression = progression
            await supabase
            .from('Tasks')
            .update({ progression: progression })
            .eq('id', currentTodo.value.id)

            // Vérifier si la tâche est toujours complétée
            if (currentTodo.value.completed) {
            // Mettre à jour l'attribut completed
            currentTodo.value.completed = false
            await supabase
                .from('Tasks')
                .update({ completed: false })
                .eq('id', currentTodo.value.id)
            }
        } else {
            // Cocher l'étape
            step.done = true
            const { data, error } = await supabase
            .from('TaskSteps')
            .update({ done: true })
            .eq('id', stepId)

            // Mettre à jour la progression de la tâche
            const nbDoneSteps = currentTodo.value.steps.filter((step) => step.done).length
            const progression = (nbDoneSteps / currentTodo.value.steps.length) * 100
            currentTodo.value.progression = progression
            await supabase
            .from('Tasks')
            .update({ progression: progression })
            .eq('id', currentTodo.value.id)

            // Vérifier si toutes les étapes sont complétées
            if (nbDoneSteps === currentTodo.value.steps.length) {
            // Mettre à jour l'attribut completed
            currentTodo.value.completed = true
            await supabase
                .from('Tasks')
                .update({ completed: true })
                .eq('id', currentTodo.value.id)
            }
        }
    }
const backHome = () =>{
    router.push({path: "/home"})
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
        align-items: flex-start;
        width: 80vw;
        height: 90vh;
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
            overflow-y: scroll;
                &::-webkit-scrollbar{
                width: 5px;
                background-color: #4e4f5048;
                border-radius: 50px;
            }                   
        }
    }
    .tasksList{
        width: 35%;
        height: 80%;
        @media screen and (max-width: 860px){
            width: 100%;
        }
    }
    .tasksList ul{
        width: 100%;
        height: 70%;
        padding-top: 30px;
        padding-bottom: 30px;
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar{
            width: 5px;
            background-color: #4e4f5048;
            border-radius: 50px;
        }
        @media screen and (max-width: 860px){
            height: 60%;
        }
    }
    .tasksList ul .task{
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding-left: 10px;
        font-family: Inter;
        font-weight: 400;
        font-size: 1rem;
        width: 80%;
        height: 60px;
        background-color: #97cbdc;
        color: #004581;
        margin-bottom: 10px;
        border-radius: 10px;
        transition: all 0.3s ease;
        position: relative;
        @media screen and (max-width: 860px){
            width: 80%;
            justify-content: flex-start;
        }
    }
    .tasksList ul .task .options{
        opacity: 0;
        width: 30px;
        height: 30px;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    .tasks-list ul .task .visible{
        opacity: 1;
    }
    .tasksList ul .task .options .dot{
        width: 5px;
        height: 5px;
        margin-bottom: 3px;
        border-radius: 50px;
        background-color: #0e0e0e;
    }

    .tasksList ul .task .todoOptions{
        position: absolute;
        right: -30px;
        width: 60px;
        height: 50px;
    }
    .tasksList ul .task .todoOptions .option{
        width: 50%;
        height: 50%;
        color: grey;
        padding-left: 25px;
    }
    .tasksList ul .task .todoOptions .option img{
        width: 100%;
        height: 100%;
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
        padding: 10px;
        font-family: Inter;
        @media screen and (max-width: 860px){
            justify-content: flex-start;
            width: 100%;
            font-size: 0.8rem;
            padding: 10px;
        }
    }
    .task-details .details-ctn{
        @media screen and (max-width: 860px){
            width: 80%;
        }
    }
    .task-details .details-ctn .steps{
        padding: 0;
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
    .task-details .details-ctn .desc{
        width: 300px;
        height: 70px;
        border: 1px solid #6b3e26;
        font-weight: 300;
        font-size: 0.8rem;
        padding: 20px;
        @media screen and (max-width: 860px){
            width: 90%;
            height: 70px;
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
        font-size: 0.7rem;
        width: 100%;
        background-color: #eee;
        color: #348feb;
        margin-bottom: 10px;
        border-radius: 5px;
        @media screen and (max-width: 860px){
            width:100%;
            height: 30px;
            font-size: 0.7rem;
        }
    }
    .step-name{
        text-wrap: nowrap;
        padding-left: 5px;
        margin-right: 5px;
        font-size: 0.8rem;
    }
    .done{
        text-decoration: line-through;
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
            width: 100%;
            padding: 0;
            font-size: 0.8rem;
        }
    }
    .tags{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .tag{
        height: 20px;
        padding-left: 5px;
        padding-right: 5px;
        font-family: Inter;
        font-size: 0.8rem;
        text-align: center;
        border-radius: 5px;
        background-color: #778fa5;
        cursor: pointer;
    }
    .tag.current{
        background-color: #8fc79a;
        color: #2d8d79;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
    }
    .check{
        border: none;
        border-radius: 5px;
        margin-right: 5px;
        margin-left: 5px;
        color: #eee;
        background-color: #348ceb;
        cursor: pointer;
    }
    .checked{
        background-color: #60708a;
    }
</style>