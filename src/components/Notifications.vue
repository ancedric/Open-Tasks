<template>
    <div class="notifications">
      <div class="notifications-icon" @click="showNotifs">
        <img src="/src/assets/images/notifs.png" alt="task-notifications">
        <div class="dot"> {{unread}} </div>
      </div>
      <div class="notif-ctn" v-if="displayNotif">
        <h5>Notifications</h5>
        <div v-if="notifications.length === 0" class="empty">
          <p>No notifications yet...</p>
        </div>
        <div class="contain">
          <ul>
            <li v-for="notification in notifications" :key="notification.id" :class="{read:notification.read === true, unread: notification.read === false}">
              {{ notification.message }}<br/>
              <button @click="markAsRead(notification.id)" class="markRead">Mark as read</button>
            </li>
          </ul>
        </div>
        
        <div class="close" @click="closeNotifs">close</div>
      </div> 
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import supabase from '../services/supabaseConfig.js';
  import { useProfileStore } from '../store/profile.js';
  
  const profileStore = useProfileStore()
  const notifications = ref([]);
  const displayNotif = ref(true)

  const showNotifs = () => {
    displayNotif.value = true
  }
  const closeNotifs = () => {
    displayNotif.value = false
  }
  
  const getNotifications = async () => {
    const { data, error } = await supabase
      .from('Notifications')
      .select('*')
      .eq('userId', profileStore.profile.id);
  
    if (error) {
      console.log(error);
    } else {
      notifications.value = data;
    }
  };
  
  const markAsRead = async (id) => {
    const { data, error } = await supabase
      .from('Notifications')
      .update({ read: true })
      .eq('id', id);
  
    if (error) {
      console.log(error);
    } else {
      await getNotifications();
    }
  };
  
  const countNotifs= () => {
    const notRead = ref(0)
      notifications.value.map((notif) => {
      if(notif.read === false){
        notRead.value ++
      }
      console.log(notRead.value)
      return notRead.value
  })}
  const unread = countNotifs()
  onMounted(() => {
    getNotifications();
  });
  </script>

  <style scoped>
    .notifications{
      width: 40px;
      height: 40px;
      position: relative;
    }
    .notifications-icon{
      width: 40px;
      height: 40px;
      overflow: hidden;
      object-fit: cover;
      position: relative;
    }
    .notifications-icon img{
      width: 100%;
      height: 100%;
    }
    .dot{
      width: 20px;
      height: 20px;
      background-color: red;
      font-size: 0.8rem;
      text-align: center;
      border-radius: 50px;
      position: absolute;
      top: 0;
      right: 0;
    }
    .notif-ctn{
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #eee;
      color: #348ceb;
      border-radius: 10px;
      border: 3px solid #040649;
      box-shadow: 0 0 30px #eeeeee80;
      width: 300px;
      height: 70vh;
      overflow-y: scroll; 
      overflow-x: hidden;
      z-index: 50;
      &::-webkit-scrollbar{
        width: 5px;
        border-radius: 50px;
      }
      @media screen and (max-width: 860px){
        left: -50vw;
        width: 80vw
      }
    }
    .close{
      width: 95%;
      height: 30px;
      margin: 10px;
      background-color: #050df8;
      color: #eee;
      font-size: 1rem;
      text-align: center;
      border-radius: 5px;
    }
    .empty,
    .contain{
      padding: 10px;
      font-size: 0.9rem;
    }
    .unread{
      background-color: #eeeeee80;
      border-bottom: 1 px solid;
    }
    .markRead{
      background-color: #b6f89cf6;
      color: #316e18f6;
      border-radius: 5px;
      border: none;
    }
  </style>