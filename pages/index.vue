<template>
    <dashboard />
</template>

<script>
import dashboard from'./dashboard';

export default{
    middleware:['authentication'],
    components:{
        dashboard
    }
};
</script>