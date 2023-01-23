import { defineStore } from 'pinia'

export const AccountStore = defineStore("Account", {
    state: () => {
        return {
            accountemail: "",
            token: "",
        }
    },
    actions: {},
    getters: {}
})