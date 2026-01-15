<script setup lang="ts">
    // import axiosInstance from '../../lib/axios';
    // import { ref } from 'vue';
    // import type { user } from '../../types/index';



    //ref()

    // const user = ref({                                  //reactive reference.
    //     name: "",                                       //a wrapper
    //     email: "",                                      //reactive storage.
    //                                                     //similar to reactive, but here needs '.value' to access properties.
    //                                                     //vue function that holds actual data and tells browser whatch this, if it changes update the screen.
    // });                     

    //here we import the interface from types/index.ts and we can say ref() as.
    // const user = ref<user | null>(null)



    // const getUser = async() =>{

    //     try{
    //         const response = await axiosInstance.get('/user');      //due to async/await he function pauses for a split second while Laravel finds the user in the database and sends it back.
    //         user.value = response.data;
    //     }catch(error){
    //         console.error(error);
    //     }
    // };

    // getUser();

    // const logout = async() =>{
    //     try{
    //         await axiosInstance.post('/logout');
    //         // user.value = {
    //         //     name: "",
    //         //     email: "",
    //         // };
    //         //since we changed ref() and we can say.
    //         user.value = null;

    //     }catch(error){
    //         console.error(error);
    //     }
    // };
    


    //using store.

    import { useAuthStore } from '@/store/auth';
    const auth = useAuthStore();
    auth.getUser();                                                 //we are not assigning the use and should be null by default








</script>




<template>
    <h1 class="text-3xl text-slate-200">Dashboard</h1>
    <div class="flex items-center justify-between">
        <div class="text-left">
            <p class="text-lg text-slate-200">Welcome back, {{ auth.user?.name }}</p>
            <p class="text-sm text-slate-200">{{ auth.user?.email }}</p>
        </div>
        <button @click="auth.logout">Logout</button>
    </div>
</template>