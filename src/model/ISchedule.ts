export interface ISchedule {
    id: string;
    name_client: string;
    cep: string;
    address: string;
    type_service: string;
    price: number;
    date: Date;
    hour: string | null; // Permite null
}