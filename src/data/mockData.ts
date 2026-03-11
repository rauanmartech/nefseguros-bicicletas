export interface Lead {
  id: string;
  nome?: string;
  docto_identificacao?: string;
  genero?: string;
  data_nascimento?: string;
  email?: string;
  telefone?: string;
  celular?: string;
  receber_calendario?: string;
  receber_produtos_parceiros?: string;
  uf?: string;
  cidade?: string;
  bairro?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  pais?: string;
  eventos?: string;
  created_at?: string;
}

// Mock data removed as it doesn't match the new schema structure and we're using real data
export const mockLeads: Lead[] = [];

export const dashboardMetrics = {
  totalLeads: 0,
  leadsQuentes: 0,
  leadsContato: 0,
  leadsConvertidos: 0,
};

export const chartData = [
  { mes: "Atual", leads: 0, convertidos: 0 },
];
