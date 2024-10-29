import Home from './views/Home.vue'
import AddTask from './views/AddTask.vue'
import Tasks from './views/Tasks.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ConfirmEmail from './views/ConfirmEmail.vue'
import EditProfile from './views/EditProfile.vue'
import SetProfile from './views/SetProfile.vue'
import Pricing from './views/Pricing.vue'

export const routes = [
    {path: '/home', component: Home},
    {path: '/addTask/:title', component: AddTask},
    {path: '/tasks', component: Tasks},
    {path: '/profile', component: Profile},
    {path: '/auth', component: Login},
    {path: '/register', component: Register},
    {path: '/confirmation', component: ConfirmEmail},
    {path: '/editProfile', component: EditProfile},
    {path: '/setProfile', component: SetProfile},
    {path: '/pricing', component: Pricing}
]