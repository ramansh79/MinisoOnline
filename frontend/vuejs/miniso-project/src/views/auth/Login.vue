<script setup lang="ts">

// import axios from 'axios';

// axios.defaults.withCredentials = true;//Tells Axios to send cookies (like your session ID) back and forth with every request.
// axios.defaults.withXSRFToken = true;//Tells Axios to look for a specific security token (XSRF-TOKEN) in the cookies and send it back in the headers.
// axios.defaults.baseURL= "http://localhost:8000";

// insted of importing axios we import AxiosInstance, where base url and cradentials are defined.

import { reactive } from 'vue';
import axiosInstance from '../../lib/axios'; //@ is path alias it is a shortcut that points directly to your src folder.
                                             //so only @ insted of ../../lib/axios.


interface LoginForm{                         //Interface is a TypeScript tool used for Type Safety
                                  //acts as a blueprint that defines exactly what properties the form object must have (name, email, etc.) and what data types they are
    email: string;
    password: string;
    
}
const form = reactive<LoginForm>({           //a Vue function that makes an entire object reactive.
                                        //Vue automatically detects the change and updates the internal state of that object instantly.
    email:"",
    password:"",
    
});





const login = async(payload: LoginForm) =>{   
    await axiosInstance.get("/sanctum/csrf-cookie",{
        baseURL: "http://localhost:8000",
    });                                     //initialize the security.
                                            //Before sending any data, asking Laravel for a CSRF cookie.
                                            //we used baseURL cause it dosent has api/ in its route.
    try{
        const response = await axiosInstance.post('/login', payload);    //payload is a variable name for the data you are sending to the server.

        console.log(response.data);

    }catch (error){
        console.error(error);
    }
};


</script>





<template>
    <h1 class="text-3xl text-slate-200 p-4">Login</h1>
<!-- .prevent is a Modifier. HTML form refresh the whole page so it stops that default behavior so your js can handle the submission smoothly without a page reload.-->
 <!-- v-model is the "bridge" between your HTML and your JavaScript -->
    <form @submit.prevent="login(form)"                         
                                                            
        class="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        
        <div class="mb-5 text-left">
            <label 
                for="email" 
                class="block mb-2.5 text-sm font-medium text-heading">
                Email
            </label>
            <input type="email" 
                id="email" 
                v-model="form.email"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand 
                focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
                placeholder="name@flowbite.com"/>
        </div>
        <div class="mb-5 text-left">
            <label 
                for="password" 
                class="block mb-2.5 text-sm font-medium text-heading">Password</label>
            <input 
                type="password " 
                id="password" 
                v-model="form.password"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full 
                px-3 py-2.5 shadow-xs placeholder:text-body" 
                placeholder="••••••••"/>
        </div>
       

        <button 
            type="submit" 
            class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium 
            leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            Login
        </button>
    </form>

</template>