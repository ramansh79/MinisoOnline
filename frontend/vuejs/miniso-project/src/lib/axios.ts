import axios from "axios";
import { useAuthStore } from "../store/auth";
import router from "../router/index";
import {useToast} from 'vue-toast-notification';

const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

    },
    withCredentials: true,
    withXSRFToken: true,

});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error)=> {
        const auth = useAuthStore();
        const $toast = useToast();
        if(error.response){
            switch(error.response.status) {
            case 401:
                auth.cleanState();
                $toast.error('Unauthorized!');
                router.push("/login");
                break;
            case 404:
                $toast.error('page not found');    
                router.push("/404");
                break;
            case 419:
                auth.cleanState();
                $toast.error('Unauthorized!');
                router.push("/login");
                break;
            case 500:
                router.push("/500");
                $toast.error('Internal.Server error');
                break;
            }
        }else{
            $toast.error('network error or cors blocked');
        }
        return Promise.reject(error);
    }
)


export default axiosInstance;