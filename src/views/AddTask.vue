<template>
    <section class="page">
        <div class="ctn">
            <router-link to="/home">Home</router-link>
            <h4>Add Task</h4>
            <form class="tasks-form" action="" @submit.prevent="submitTask">
                
                <div class="top">
                    <div class="set-title">
                        <div class="type-ctn">
                            <div class="label">Task title</div>
                            <input type="text" v-model="taskTitle" class="task-set-input" :placeholder="taskTitle"><br/>
                        </div>
                    </div>
                    <div class="set-details">
                        <div class="type-ctn">
                            <div class="label">Task description</div>
                            <textarea v-model="taskDescription" class="task-area"></textarea><br/>
                        </div>
                        <label>Steps: </label><br/>
                        <div v-if="stepsList.length > 0">
                            <ul class="step-list">
                                <li class="step-list-elem" v-for="step in stepsList" :key="step.name">
                                    <label>
                                        {{step.title}}
                                        <input type="checkbox" class="checkbox" v-model="step.done"/>
                                        <p>{{step.time}}</p>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <p @click="showStepForm" class="stepForm">Click to add a step</p>
                        

                        <div class="step-form">
                            <form action="" v-if="addStep === true" @submit.prevent="addNewStep">
                                <div class="input-ctn">
                                    <div class="label">Step position</div><input type="number" class="step-set-input" v-model="newStepPosition">
                                </div>
                                <div class="input-ctn">
                                    <div class="label">Step title</div><input type="text" class="step-set-input" v-model="newStepTitle">
                                </div>
                                <div class="input-ctn">
                                    <div class="label">Step start</div><input type="date" class="step-set-input" v-model="newStepStart">
                                </div>
                                <div class="input-ctn">
                                    <div class="label">Step end</div><input type="date" class="step-set-input" v-model="newStepEnd">
                                </div>
                                <div class="input-ctn">
                                    <div class="label">Step notes</div>
                                    <textarea class="step-area" v-model="newStepNotes"></textarea>
                                </div>
                                    
                                <button class="add-btn">Add step</button>
                            </form>
                        </div>
                        
                    </div>
                </div>
                <div class="bottom">
                    <button class="send-task-btn">Add task now</button>
                </div>
            </form>
        </div>
    </section>
    <Alert type="danger" action="emptyField" v-if="notFilled"/>
    <Alert type="danger" action="error" v-if="errors"/>
    <Alert type="success" action="added" v-if="success"/>
</template>

<script setup>
import { ref } from 'vue'
import supabase from '../services/supabaseConfig.js'
import { useRoute, useRouter } from 'vue-router'
import Alert from '../components/Alert.vue';
import { useProfileStore } from '../store/profile'

const route = useRoute()
const router = useRouter()
const useProfile = useProfileStore()

const taskTitle = ref(route.params.title)
const taskDescription = ref('')
const stepsList = ref([])
const newStepPosition = ref(null)
const newStepTitle = ref('')
const newStepStart = ref('')
const newStepEnd = ref('')
const newStepNotes = ref('')
const addStep = ref(false)
const errors = ref(false)
const success = ref(false)
const notFilled = ref(false)

const showStepForm = () => {
  addStep.value = !addStep.value
}

const addNewStep = () => {
  stepsList.value.push({
    position: newStepPosition.value,
    title: newStepTitle.value,
    start: newStepStart.value,
    end: newStepEnd.value,
    done: false,
    notes: newStepNotes.value,
  })
  newStepPosition.value = null
  newStepTitle.value = ''
  newStepStart.value = ''
  newStepEnd.value = ''
  newStepNotes.value = ''
  addStep.value = false
}

const submitTask = async () => {
  if(taskTitle.value === '' || taskDescription.value === ''){
    notFilled.value = true
    errors.value = false
    success.value = false
    setTimeout(() => notFilled.value = false , 3000)
  }else{
    const title = taskTitle.value
    const description = taskDescription.value
    const progression = 0
    const completed = false
    const ownerId = useProfile.profile.id

    console.log("form data:",title, description, progression, completed, ownerId)

    const { data: taskData, error: taskError } = await supabase
      .from('Tasks')
      .insert([{title, description, progression, completed, ownerId }])
      .select()

    if(taskError){
      console.log(taskError)
      errors.value = true
      setTimeout(() => errors.value = false , 3000)
    }
    if(taskData){
      const taskID = taskData[0].id

      const stepsToInsert = stepsList.value.map((step) => ({
        position: step.position,
        title: step.title,
        start: step.start,
        end: step.end,
        done: step.done,
        notes: step.notes,
        taskID
      }))

            const { data: stepsData, error: stepsError } = await supabase
        .from('TaskSteps')
        .insert(stepsToInsert)

      if(stepsError){
        console.log(stepsError)
        errors.value = true
        setTimeout(() => errors.value = false , 3000)
      }
      if(stepsData){
        console.log('new steps added')
      }
    }
  }
    router.push('/tasks')
    success.value = true
    errors.value = false
    notFilled.value = false
    setTimeout(() => success.value = false , 3000)
}
</script>

<style scope>
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
        background-color: #97cbdc;
        /*background: hsla(152, 100%, 50%, 1);
        background: linear-gradient(45deg, hsla(152, 100%, 50%, 1), 0%, hsla(186, 100%, 69%, 1) 100%);
        background: -moz-linear-gradient(45deg, hsla(152, 100%, 50%, 1), 0%, hsla(186, 100%, 69%, 1) 100%);
        background: -webkit-linear-gradient(45deg, hsla(152, 100%, 50%, 1), 0%, hsla(186, 100%, 69%, 1) 100%);
        filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#00ff87", endColorstr="#60efff", GradientType=1);*/
        @media screen and (max-width: 860px){
        }
    }
    .ctn{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 70vw;
        height: 80vh;
        background-color: #eee;
        border-radius: 50px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
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
    .ctn .tasks-form{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        @media screen and (max-width : 860px){
            height:100px;
            position: relative;
        }
    }
    .ctn .tasks-form .top{
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 50px;
        @media screen and (max-width: 860px){
            position: absolute;
            top: 40px;
            left: 20px;
            flex-direction: column;
            justify-content: flex-start;
            gap: 10px;
        }
    }
    .ctn .tasks-form .bottom{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .set-title{
        border-right: 1px solid; 
        padding-right: 50px;
        margin-bottom: 30px;
        @media screen and (max-width: 860px){
            border-right: none;
            padding-right: 10px;
            margin-bottom: 10px;
        }
    }
    .set-details{
        position: relative;
        @media screen and (max-width: 860px){
            width: 100%;
            padding: 0;
        }
    }
    .set-details .step-form{
        position: absolute;
        top: 60%;
        left: -145%;
        height: 120px;
        width: 250px;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-top: 90px;
        padding-bottom: 10px;
        &::-webkit-scrollbar{
            width: 5px;
            background-color: #4e4f5048;
            border-radius: 50px;
        }
        @media screen and (max-width: 860px){
            top: -400px;
            left: 300px;
            width: 300px;
            height: 600px;
            overflow-y: hidden;
            overflow-x: hidden;
        }
    }
    .task-set-input{
        height: 43px;
        width: 200px;
        border-radius: 10px;
        background-color: #eee;
        color: #9da6e0;
        font-family: Poppins;
        padding-left: 20px;
        border: 1px solid;
    }
    .step-set-input{
        height: 30px;
        width: 200px;
        border-radius: 10px;
        background-color: #eee;
        color: #9da6e0;
        font-family: Poppins;
        border: 1px solid;
    }
    .input-ctn{
        height: 43px;
        width: 200px;
        color: #9da6e0;
        margin-top: 20px;
        font-family: Poppins;
        position: relative;
    }
    .type-ctn{
        height: 43px;
        width: 200px;
        color: #9da6e0;
        margin-top: 20px;
        font-family: Poppins;
        margin-bottom: 70px;
        position: relative;
    }
    .input-ctn .label{
        position: absolute;
        top: -10px;
        left: 40px;
        font-size: 0.8rem;
        background-color: #eee;
        padding-left: 5px;
        padding-right: 5px;
        z-index: 1;
    }
    .type-ctn .label{
        position: absolute;
        top: -10px;
        left: 40px;
        font-size: 0.8rem;
        background-color: #eee;
        padding-left: 5px;
        padding-right: 5px;
        z-index: 1;
    }
    .task-area{
        height: 100px;
        width: 100%;
        border-radius: 10px;
        background-color: #eee;
        color: #9da6e0;
        font-family: Poppins;
        padding-left: 20px;
        border: 1px solid;
    }
    .step-area{
        height: 60px;
        width: 80%;
        border-radius: 10px;
        background-color: #eee;
        color: #9da6e0;
        font-family: Poppins;
        padding-left: 20px;
        border: 1px solid;
    }
    .ctn .tasks-form .bottom .send-task-btn{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 40px;
        width: 40px;
        border: none;
        border-radius: 10px;
        background-color: #2a2f4f;
        color: #eee;
        font-family: Poppins;
        text-wrap: nowrap;
        font-weight: 600;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.35s ease;
        padding-left:10px;
        position: absolute;
        right: 10%;
        top: -35px;
        &:hover{
            width: 120px;
        }
        @media screen and (max-width: 860px){
            right: 15%;
            bottom: 100px;
            width: 120px;
        }
    }
    .step-form form .add-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 80px;
        border: none;
        border-radius: 5px;
        background-color: #2a2f4f;
        color: #eee;
        font-family: Poppins;
        font-weight: 600;
        cursor: pointer;
        margin-top: 30px;
    }
    .stepForm{
        font-family: Inter;
        font-size: 0.8rem;
        text-decoration: underline;
        cursor: pointer;
    }
    .step-list-elem label .checkbox{
        width: 30px;
        border: 2px solid;
    }
    .step-list-elem label{
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Inter;
        font-weight: 400;
    }
</style>