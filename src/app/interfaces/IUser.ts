export interface IUser {
  id?: string; // ID único do usuário
  name?: string; // Nome do usuário
  email: string; // Email do usuário
  password: string; // Senha
  typeuser: string; // Tipo de usuário (exemplo: candidato ou empresa)
  createdAt?: Date; // Data de criação do usuário
  cpf?: string; // CPF do usuário
  contact?: string; // Telefone do usuário
  street?: string; // Endereço do usuário
  cep?: string; // CEP do usuário
  linguages?: ProgrammingLanguages[]; // Linguagens de programação
  experiencies?: ExperienceLevel; // Nível de experiência
  imageprofile?: string; // URL ou base64 para foto de perfil
  cnpj?: string; // CNPJ da empresa
}

// Enumerado para linguagens de programação
export enum ProgrammingLanguages {
  javascript = 'JavaScript',
  typescript = 'TypeScript',
  python = 'Python',
  java = 'Java',
  csharp = 'C#',
  cpp = 'C++',
  ruby = 'Ruby',
  swift = 'Swift',
  kotlin = 'Kotlin',
  go = 'Go',
  rust = 'Rust',
  dart = 'Dart',
  scala = 'Scala',
  perl = 'Perl',
  html = 'HTML',
  css = 'CSS',
  sql = 'SQL',
  bash = 'Bash',
  shell = 'Shell',
  r = 'R',
  matlab = 'MATLAB',
  assembly = 'Assembly',
  fortran = 'Fortran',
  cobol = 'COBOL',
  vbnet = 'VB.NET',
  groovy = 'Groovy',
  lua = 'Lua',
  pascal = 'Pascal',
  delphi = 'Delphi',
  powershell = 'PowerShell',
  clojure = 'Clojure',
  objectivec = 'Objective-C'
}

// Enumerado para nível de experiência
export enum ExperienceLevel {
  Null = 'Não informado',
  Intern = 'Estágio',
  Junior = 'Júnior',
  Pleno = 'Pleno',
  Senior = 'Sênior'
}
