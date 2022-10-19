import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
    state: () => {
        return {
            userInfo: {
                userName: '',
            },
            token: localStorage.getItem('token') || ''
        }
    },
})

export default useUserStore
