import Message from "@/models/Message";
import Product from "@/models/Product";
import ProductModel from "@/models/ProductModel";
import axios from "axios"

export default class ProductService {
    async getAllProducts(RestaurantName : string): Promise<Array<ProductModel>> {
        
        const { data } = await axios.post<Message>(
            'https://ceseat.abconsult.ovh:8080/product',
            {
                restaurant: RestaurantName
                
            },
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        return data.message;

    }
    async getProduct(id:string): Promise<ProductModel> {
        const { data } = await axios.post<Message>(
            'https://ceseat.abconsult.ovh:8080/product',
            { _id: id},
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        console.log('getProduct',data)
        return data.message[0];
    }
    async createProduct(product:Product): Promise<boolean> {
        const { data } = await axios.put<Message>(
            'https://ceseat.abconsult.ovh:8080/product/create',
            product,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
        console.log('createProduct',data)
        if (data.status == "success"){
            return true
        }else {
            return false
        }
    }

    async updateProduct(product:Product): Promise<boolean> {
        const { data } = await axios.put<Message>(
            `https://ceseat.abconsult.ovh:8080/product/update/${product._id}`,
            product,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
        console.log('createProduct',data)
        if (data.status == "success"){
            return true
        }else {
            return false
        }
    }

    async deleteProduct(id:string): Promise<boolean> {
        const { data } = await axios.delete<Message>(
            `https://ceseat.abconsult.ovh:8080/product/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
        console.log('deleteProduct',data.status)
        console.log('deleteProduct',data)
        if (data.status == "success"){
            return true
        }else {
            return false
        }
    }
}