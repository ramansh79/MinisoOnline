<script lang="ts">
    import axiosInstance from '../../lib/axios';
    
    const user = async() =>{

        try{
            const response = await axiosInstance.get('/user');
            console.log(response.data);

        }catch(error){
            console.error(error);
        }
        
    };


    user();
    

</script>
<template>
    <h2>dashboard</h2>
</template>