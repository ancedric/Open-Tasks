<script setup>
    import { ref, onMounted } from 'vue';

    const formattedDate = ref('');
    const formattedYear = ref('');

    onMounted(() => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Les mois sont indexés à partir de 0
    const year = currentDate.getFullYear();

    formattedDate.value = `${day} | ${month}`;
    formattedYear.value = year.toString();
    });
</script>

<template>
    <div class="date-ctn">
      <p class="date">{{ formattedDate }}</p>
      <p class="year">{{ formattedYear }}</p>
    </div>
</template>

<style scoped>
    .date-ctn{
        background-color: #eee;
        width: 100px;
        height: 60px;
        border-radius: 10px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
        @media screen and (max-width: 860px){
            display: none;
        }
    }
    .date{
        font-family: Inter;
        font-size: 0.8rem;
        font-weight: 700;
        padding-left: 30px;
        position: relative;
        &::after{
            content:"";
            position: relative;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 2px;
            border-radius: 10px;
            background-color: #2a2f4f;
        }
    }
    .year{
        padding: 0;
        text-align: center;
        font-family: "Hanken Grotesk";
        font-weight: 200;
        font-size: 0.6rem;
    }
</style>