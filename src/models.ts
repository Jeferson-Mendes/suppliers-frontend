
export type Supplier = {
    id: number
    name: string
    description: string
    category: string
    fullAddress: string
    phoneNumber: string
    email: string
}

export enum SupplierCategory {
    INFORMATION_TECHNOLOGY = "Hardware, Software, Serviços de TI",
    COMMUNICATION_SERVICES = "Telefonia, Internet, Plataformas de Comunicação",
    OFFICE_SUPPLIES = "Material de Escritório, Mobiliário, Equipamentos",
    CLEANING_AND_MAINTENANCE = "Limpeza Geral, Manutenção Predial, Segurança",
    HUMAN_RESOURCES = "Recrutamento, Treinamento, Benefícios",
    LOGISTICS_AND_TRANSPORTATION = "Transporte de Mercadorias, Armazenagem, Gestão de Frota",
    MARKETING_AND_ADVERTISING = "Publicidade, Marketing Digital, Eventos",
    LEGAL_AND_COMPLIANCE_SERVICES = "Serviços Jurídicos, Auditoria, Consultoria em Conformidade",
    FINANCIAL_SERVICES = "Bancário, Contabilidade, Seguros",
    UTILITIES = "Eletricidade, Água, Gás"
}