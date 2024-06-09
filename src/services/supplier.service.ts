import { Supplier } from "../models";
import api from "./api";


export class SupplierService {
    async getSuppliers(): Promise<Supplier[]> {
        
        const response = await api.get('/supplier')
        return response.data
    }

    async createSupplier(supplier: Supplier): Promise<Supplier> {

        const response = await api.post(`/supplier`, supplier);
        return response.data
    } 

    async getSupplierById(id: number): Promise<Supplier> {
        
        const response = await api.get(`/supplier/${id}`)
        return response.data
    }

    async deleteSupplier(id: number): Promise<Supplier> {
        
        const response = await api.delete(`/supplier/${id}`)
        return response.data
    }

    async updateSupplier(id: number, supplier: Omit<Supplier, "id">): Promise<Supplier> {
        
        const response = await api.put(`/supplier/${id}`, supplier)
        return response.data
    }

}