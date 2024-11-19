import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('error', () => {
  const message = ref('');
  const type = ref('');
  const error = (mes) => {
    message.value = mes;
    type.value = 'error';
  }
  const warning = (mes) => {
    message.value = mes;
    type.value = 'warning';
  }
  const success = (mes) => {
    message.value = mes;
    type.value = 'success';
  }
  const close = () => {
    message.value = '';
    type.value = '';
  }
  return { message, type, error, warning, success, close }
})