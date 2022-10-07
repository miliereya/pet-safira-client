import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { ICart } from "../models/ICart";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false
    regError = ''
    logError = ''

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean){
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    setCart(cart: ICart[]){
        this.user.cart = cart
    }

    setRegError(message: string) {
        this.regError = message
    }
    setLogError(message: string) {
        this.logError = message
    }

    async login(email:string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e:any) {
            this.setLogError(e.response?.data?.message)
        }
    }

    async registration(email:string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e:any) {
            this.setRegError(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch(e:any) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e:any) {
            this.setAuth(false)
        } finally {
            this.setLoading(false)
        }
    }
}