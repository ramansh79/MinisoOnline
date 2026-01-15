<script setup lang="ts">

// import axios from 'axios';

// axios.defaults.withCredentials = true;//Tells Axios to send cookies (like your session ID) back and forth with every request.
// axios.defaults.withXSRFToken = true;//Tells Axios to look for a specific security token (XSRF-TOKEN) in the cookies and send it back in the headers.
// axios.defaults.baseURL= "http://localhost:8000";

// insted of importing axios we import AxiosInstance, where base url and cradentials are defined.

import { reactive } from 'vue';
// import { AxiosError } from 'axios';
// import axiosInstance from '../../lib/axios';                //@ is path alias it is a shortcut that points directly to your src folder.
                                                            //so only @ insted of ../../lib/axios.
                                                            //sends withCredentials:true, it sends the security cookies required by Laravel.

import type { RegisterForm } from '@/types/index'           //Interface is a TypeScript tool used for Type Safety
                                                            //acts as a blueprint that defines exactly what properties the form object must have (name, email, etc.) and what data types they are
                                                            //used for Prevention of Typos & Autocompletion
// import router from '../../router/index';

const form = reactive<RegisterForm>({           //a Vue function that makes an entire object reactive.
    name:"",                                    //Vue automatically detects the change and updates the internal state of that object instantly.
    email:"",                                   //By writing reactive<RegisterForm>(...), you are telling Vue: "I want this reactive object to follow the rules defined in the RegisterForm interface."
    password:"",
    password_confirmation:"",
});



// const errors = reactive({                       //deal with error in form.
//                                                 //reactive storage
//     name: [],
//     email: [],
//     password: [],
// });


//this is the main function used up to making register to login form.
//it is with out error display in form.

// const register = async(payload: RegisterForm) =>{                //payload is the type of RegisterForm.
//     await axiosInstance.get("/sanctum/csrf-cookie",{
//         baseURL: "http://localhost:8000",
//     });                                     //initialize the security.
//                                             //Before sending any data, asking Laravel for a CSRF cookie.
//                                             //we used baseURL cause it dosent has api/ in its route.
//     try{
//         const response = await axiosInstance.post('/register', payload);    //payload is a variable name for the data you are sending to the server.

//         console.log(response.data);

//     }catch (error){
//         console.error(error);
//     }
// };



//with error display
// const register = async(payload: RegisterForm) =>{           
//     await axiosInstance.get("/sanctum/csrf-cookie",{        //initialize the security.
//         baseURL: "http://localhost:8000",                   //Before sending any data, asking Laravel for a CSRF cookie.
//     });                                                     //we used baseURL cause it dosent has api/ in its route.
         
//     //to reset the old msg from previous error msg before page reload(when u hit submit).
//     errors.name = [];                                       
//     errors.email = [];
//     errors.password = []; 
    
//     try{
//         await axiosInstance.post('/register', payload);    //payload is a variable name for the data you are sending to the server.
//                                                             //sends request to laravel.(also )
//         router.push("/dashboard");
//     }catch (e){
//         if(e instanceof AxiosError && e.response?.status === 422){                      //e is instanceof AxiosError.
//                                                                                         //is errors response status = 422.
//             errors.name = e.response.data.errors.name;
//             errors.email = e.response.data.errors.email;
//             errors.password = e.response.data.errors.password;

//         }
        
//     }
// };

import { useAuthStore } from '@/store/auth';

const { register, errors1} = useAuthStore();


</script>





<template>
    <h1 class="text-3xl text-slate-200 p-4">Resgister</h1>
    <!-- .prevent is a Modifier. HTML form refresh the whole page so it stops that default behavior so your js can handle the submission smoothly without a page reload.-->
    <!-- v-model is the "bridge" between your HTML and your JavaScript -->
    <form @submit.prevent="register(form)"                         
                                                            
        class="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="mb-5 text-left ">
            <label
                for="name" 
                class="block mb-2.5 text-sm font-medium text-heading"
                >Name
            </label>
            <input 
                type="text" 
                id="name" 
                v-model="form.name"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full 
                px-3 py-2.5 shadow-xs placeholder:text-body" 
                placeholder="name" 
            />
            <template v-if="errors1.name?.length">
                <span
                    v-for="error in errors1.name"
                    :key="error"
                    class="text-red-500 text-xs italic"
                >
                    {{ error }}
                </span>
            </template>
        </div>
        <div class="mb-5 text-left">
            <label 
                for="email" 
                class="block mb-2.5 text-sm font-medium text-heading"
                >Email
            </label>
            <input type="email" 
                id="email" 
                v-model="form.email"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand 
                focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
                placeholder="name@flowbite.com"
            />
            <template v-if="errors1.email?.length">
                <span
                    v-for="error in errors1.email"
                    :key="error"
                    class="text-red-500 text-xs italic"
                >
                    {{ error }}
                </span>
            </template>
            
            <!-- v-if="errors1.name?.length": This is a guard. It tells Vue: "Only show this section if the name array has at least one error message inside it."
                v-for="error in errors1.name": This is a loop. If Laravel sends multiple errors for one field (e.g., "Too short" and "Must contain numbers"), 
                this loop will create a separate red <span> for every single message. -->


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
                placeholder="••••••••"
            />
            <template v-if="errors1.password?.length">
                <span
                    v-for="error in errors1.password"
                    :key="error"
                    class="text-red-500 text-xs italic"
                >
                    {{ error }}
                </span>
            </template>
        </div>
        <div class="mb-5 text-left">
            <label 
                for="password_confirmation" 
                class="block mb-2.5 text-sm font-medium text-heading"> Password Confirmation</label>
            <input 
                type="password" 
                id="password_confirmation" 
                v-model="form.password_confirmation"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full 
                px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••"  />
        </div>

        <button type="submit" class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
    </form>

</template>