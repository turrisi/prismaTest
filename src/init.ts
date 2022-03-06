import { PrismaClient } from "@prisma/client"
import axios, { AxiosResponse } from "axios"
const prisma = new PrismaClient()

const requestCategory = async () =>{
    const {data}:any = await axios.get("https://the-funko-api.herokuapp.com//api/v1/categories").then((response:AxiosResponse)=> response.data)
    return data
}



const requestProduct = async () =>{
    for(let i = 1; i<= 2; i++){
        const {data}:any = await axios.get(`https://the-funko-api.herokuapp.com//api/v1/items/?page=${i}`).then((response:AxiosResponse)=> response.data)
        return data
    }
}

export const createProduct = async ()=>{
    const {data}:any = await axios.get("https://the-funko-api.herokuapp.com//api/v1/categories").then((response:AxiosResponse)=> response.data)
}

export const findCategory = (pro:[], name:String)=>{
    let result = pro.find((elemento:any) => elemento.attributes.name === name)
    return result
}

export const init = async () =>{
    try{
       let allProduct = await requestProduct()
       let allCategory = await requestCategory()
       allProduct.map(async (elemento:any)=> {
           let category = findCategory(allCategory, elemento.attributes.category)
           
          
        })
    }catch(error){
        console.log(error)
    }
}