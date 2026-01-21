<script setup lang="ts">
    import { reactive } from 'vue';
    import type { CreatePost } from '../../types/index'
    import axiosInstance from '../../lib/axios';
    import { AxiosError } from 'axios';
    import router from '../../router/index';

    const post = reactive<CreatePost>({           //a Vue function that makes an entire object reactive.
                                            //Vue automatically detects the change and updates the internal state of that object instantly.
    title:"",
    body:"",
    
    });

    const errors = reactive({
        title: [],
        body: [],
    });

    const createPost = async(payload: CreatePost) =>{

        errors.title = [];
        errors.body = [];

        try{
            await axiosInstance.post('/dashboard/posts', payload);
            router.push('/dashboard/posts');
            
        }catch(e){
            if(e instanceof AxiosError && e.response?.status === 422){
                errors.title = e.response.data.errors.title || [];
                errors.body = e.response.data.errors.body || [];
            }
        }
    }



</script>

<template>   
    
    <h1 class="text-3xl text-slate-200 p-4">Create Post</h1>
<!-- .prevent is a Modifier. HTML form refresh the whole page so it stops that default behavior so your js can handle the submission smoothly without a page reload.-->
<!-- v-model is the "bridge" between your HTML and your JavaScript -->
    <form @submit.prevent="createPost(post)"                         
                                                            
        class="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        
        <div class="mb-5 text-left">
            <label 
                for="title" 
                class="block mb-2.5 text-sm font-medium text-heading">
                title
            </label>
            <input type="text" 
                id="title" 
                v-model="post.title"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand 
                focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-title" 
                placeholder="name@flowbite.com"
            />
            <template v-if="errors.title?.length">
                <span
                    v-for="error in errors.title"
                    :key="error"
                    class="text-red-500 text-xs italic"
                >
                    {{ error }}
                </span>
            </template>
        </div>
        <div class="mb-5 text-left">
            <label 
                for="body" 
                class="block mb-2.5 text-sm font-medium text-heading">body</label>
            <input 
                type="textarea" 
                id="body" 
                v-model="post.body"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full 
                px-3 py-2.5 shadow-xs placeholder:text-title" 
                placeholder="••••••••"
            />
            <template v-if="errors.body?.length">
                <span
                    v-for="error in errors.body"
                    :key="error"
                    class="text-red-500 text-xs italic"
                >
                    {{ error }}
                </span>
            </template>
        </div>
       

        <button 
            type="submit" 
            class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium 
            leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            Create
        </button>
    </form>
</template>