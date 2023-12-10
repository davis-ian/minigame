<script setup>
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast'
import {ref} from 'vue';

// Toast
const toast = useToast();
const handleToast = () => {
  toast.add({severity: 'info', summary: 'S-Info', detail: 'Message Content', life: 3000})
}

// Dialog
var displayDialog = ref(false);

const initDialog = () => {
  console.log('initing dialog')
  displayDialog.value = true;
}

const closeDialog = () => {
  displayDialog.value = false;
}

</script>

<template>
  <div style="text-align:center">
  

    <h1>Games</h1>
    <!-- <Button @click="handleToast">Toast</Button>
    <Button @click="initDialog">Dialog</Button> -->

    <Button @click="$router.push('/memory')">Memory</Button>

    <transition name="fade">
      <Dialog modal  @click:outside="closeDialog" v-model:visible="displayDialog" :style="{maxWidth: '500px'}" :pt="{
        mask: {
          style: 'backdrop-filter: blur(2px)'
        }
      }">
      <template #header>
        <div >
          Slot Header
        </div>
      </template>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.!</p>
      </Dialog>
    </transition>
  </div>
</template>


<style>
/* Fade Transition */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
</style>