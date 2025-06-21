// storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Obra = {
  id: string;
  titulo: string;
  responsavel: string;
  dataInicio?: string;
  dataFim?: string;
  descricao?: string;
  localizacao?: string;
  fiscalizacoes?: Fiscalizacao[];
};

export type Fiscalizacao = {
  data: string;
  status: string;
  observacoes: string;
  localizacao?: string;
  foto?: string; // <- AQUI! Vai guardar o URI da imagem como string
};

export async function adicionarFiscalizacao(
  obraId: string,
  fiscalizacao: Fiscalizacao
): Promise<void> {
  const obras = await listarObras();
  const index = obras.findIndex((o) => o.id === obraId);

  if (index !== -1) {
    if (!obras[index].fiscalizacoes) {
      obras[index].fiscalizacoes = [];
    }

    obras[index].fiscalizacoes!.push(fiscalizacao);
    await salvarTodasAsObras(obras);
  }
}


// Chave usada no AsyncStorage
const STORAGE_KEY = "OBRAS_CADASTRADAS";

// Lista todas as obras salvas
export async function listarObras(): Promise<Obra[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) {
      return JSON.parse(json);
    }
    return [];
  } catch (error) {
    console.error("Erro ao listar obras:", error);
    return [];
  }
}

// Salva ou atualiza uma obra individualmente
export async function salvarObra(obra: Obra): Promise<void> {
  const obras = await listarObras();
  const index = obras.findIndex((o) => o.id === obra.id);

  if (index !== -1) {
    obras[index] = obra; // Atualiza obra existente
  } else {
    obras.push(obra); // Adiciona nova obra
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(obras));
}

// Salva a lista completa de obras (útil para exclusão)
export async function salvarTodasAsObras(obras: Obra[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(obras));
}

// Remove uma obra pelo id
export async function excluirObra(id: string): Promise<void> {
  const obras = await listarObras();
  const novasObras = obras.filter((o) => o.id !== id);
  await salvarTodasAsObras(novasObras);
}
