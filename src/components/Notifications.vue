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
              {{ formatDateTime(notification.created_at) }}<br/>
              <button @click="markAsRead(notification.id)" class="markRead">
                {{ notification.read ? 'Already read' : 'Mark as read' }}
              </button>
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
  const displayNotif = ref(false)

  const showNotifs = () => {
    displayNotif.value = true
  }
  const closeNotifs = () => {
    displayNotif.value = false
  }

  const unread = ref(0);

  const countNotifs = () => {
    unread.value = notifications.value.filter((notif) => !notif.read).length;
  };
  
  const getNotifications = async () => {
    const { data, error } = await supabase
      .from('Notifications')
      .select('*')
      .eq('userId', profileStore.profile.id);
  
    if (error) {
      console.log(error);
    } else {
      notifications.value = [...data]
      countNotifs();
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
      padding-top: 60px;
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
    
    .notif-ctn h5{
      position: fixed;
      top: 30px;
      width: 300px;
      height: 60px;
      padding-left: 10px;
      padding-top: 10px;
      background-color: #eee;
      border-radius: 10px;
      z-index: 5;
      @media screen and (max-width: 860px){
        width: 78%;
      }
    }
    .close{
      position: fixed;
      top: 60px;
      right: 30px;
      width: 10%;
      height: 30px;
      margin: 10px;
      background-color: #050df8;
      color: #eee;
      font-size: 1rem;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      z-index: 5;
      @media screen and (max-width: 860px){
        right: 65px;
        width: 20%;
      }
    }
    .empty,
    .contain{
      padding: 10px;
      font-size: 0.9rem;
      text-align: center;
    }
    .unread{
      background-color: #04064980;
      color: #eee;
      padding: 5px;
      border-radius: 5px;
      border-bottom: 1px solid;
      margin-bottom: 10px;
    }
    .read{
      background-color: #a6ada8;
      color: #eee;
      padding: 5px;
      border-radius: 5px;
      border-bottom: 1px solid;
      margin-bottom: 10px;
    }
    .markRead{
      background-color: #b6f89cf6;
      color: #316e18f6;
      border-radius: 3px;
      border: none;
      width: 90%;
      cursor: pointer;
    }
  </style>