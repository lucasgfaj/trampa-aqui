export interface IUser {
  id?: number; // ID único do usuário
  name?: string; // Nome do usuário
  email: string; // Email do usuário
  password: string; // Senha
  typeuser: string; // Tipo de usuário (exemplo: candidato ou empresa)
  createdAt?: Date; // Data de criação do usuário
  cpf?: string; // CPF do usuário
  phone?: string; // Telefone do usuário
  address?: string; // Endereço do usuário
  cep?: string; // CEP do usuário
  linguages?: ProgrammingLanguages[]; // Linguagens de programação
  experiencies?: ExperienceLevel; // Nível de experiência
  imageprofile?: string; // URL ou base64 para foto de perfil
  cnpj?: string; // CNPJ da empresa
}

// Enumerado para linguagens de programação
export enum ProgrammingLanguages {
  TypeScript = 'TypeScript',
  JavaScript = 'JavaScript',
  Python = 'Python',
  Java = 'Java',
  CSharp = 'C#',
  PHP = 'PHP',
  Ruby = 'Ruby',
  Go = 'Go',
  Swift = 'Swift',
  Kotlin = 'Kotlin',
  CPlusPlus = 'C++',
  Rust = 'Rust',
  Dart = 'Dart',
  Other = 'Outras'
}

// Enumerado para nível de experiência
export enum ExperienceLevel {
  Null = 'Não informado',
  Intern = 'Estágio',
  Junior = 'Júnior',
  Pleno = 'Pleno',
  Senior = 'Sênior'
}
