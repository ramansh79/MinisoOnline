import { defineStore } from "pinia";
import { ref, reactive } from 'vue';
import type { RegisterForm, LoginForm, user } from "../types/index";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import router from "../router/index";


//register logic.



export const useAuthStore = defineStore("auth", ()=>{
    const user = ref<user | null>(null);
    const isLoggedIn = ref<boolean>(false);


    const errors1 = reactive({                       //deal with error in form.
                                                    //reactive storage
        name: [],
        email: [],
        password: [],
    });

    const register = async(payload: RegisterForm) =>{           
        await axiosInstance.get("/sanctum/csrf-cookie",{        //initialize the security.
            baseURL: "http://localhost:8000",                   //Before sending any data, asking Laravel for a CSRF cookie.
        });                                                     //we used baseURL cause it dosent has api/ in its route.
            
        //to reset the old msg from previous error msg before page reload(when u hit submit).
        errors1.name = [];                                       
        errors1.email = [];
        errors1.password = []; 
        
        try{
            await axiosInstance.post('/register', payload);    //payload is a variable name for the data you are sending to the server.
                                                                //sends request to laravel.(also )
            router.push("/dashboard");
        }catch (e){
            if(e instanceof AxiosError && e.response?.status === 422){                      //e is instanceof AxiosError.
                                                                                            //is errors response status = 422.
                errors1.name = e.response.data.errors.name;
                errors1.email = e.response.data.errors.email;
                errors1.password = e.response.data.errors.password;
            }
        }
    };




    //login logic.
    const errors2 = reactive({           //deal with error in form
        email: [],
        password: []
    });

    const login = async(payload: LoginForm) =>{   
        await axiosInstance.get("/sanctum/csrf-cookie",{    //initialize the security.
            baseURL: "http://localhost:8000",               //Before sending any data, asking Laravel for a CSRF cookie.
        });                                                 //we used baseURL cause it dosent has api/ in its route.
                                                
        errors2.email = [];                                  //to reset the error msg before page redirects.
        errors2.password = [];                                
        
        
        try{
            await axiosInstance.post('/login', payload);    //payload is a variable name for the data you are sending to the server.
            router.push("/dashboard");
        }catch (e){
        
            if(e instanceof AxiosError && e.response?.status === 422){

                errors2.email = e.response.data.errors.email;
                errors2.password = e.response.data.errors.password;
            }
        }
    };


    //dashboard logic.
    const getUser = async() =>{

            try{
                const response = await axiosInstance.get('/user');      //due to async/await he function pauses for a split second while Laravel finds the user in the database and sends it back.
                user.value = response.data;
                isLoggedIn.value = true;
            }catch(error){
                console.error(error);
            }
    };



    const logout = async() =>{
        try{
            await axiosInstance.post('/logout');
            // user.value = {
            //     name: "",
            //     email: "",
            // };
            //since we changed ref() so now this becomes
            user.value = null;
            isLoggedIn.value = false;


        }catch(error){
            console.error(error);
        }
    };



    return {
        user,
        isLoggedIn,
        register,
        login,
        getUser,
        logout,
        errors1,
        errors2,
    }

});