export interface IJob {
    id: string; // ID único do usuário
    nameJob: string; // Nome do Job
    salary: string; // Salário
    status?: JobStatus; // Status do Job
    typeEnterprise: EnterpriseType[]; // Tipo da Empresa
    typeJob: JobType[]; // Tipo de Trabalho
    typeContract: ContractType[]; // Tipo de Contrato / Experiência
    dispobilityLocation: LocationDispobility[]; // Disponibilidade de locomoção
    requiredLanguage: LanguageRequired[]; // Linguagem Exigida
    selectCandidate: CandidateSelect[]; // Selecionar o Candidato
    createdAt?: Date; // Data de Criação 
}

export enum JobStatus {
    aberta = 'aberta',
    finalizada = 'finalizada',
    excluida = 'excluida',
  }

export enum EnterpriseType {
    null = 'Não informado',
    startup = 'Start-Up',
    pequeno = 'Pequeno porte',
    medio = 'Médio porte',
    grande = 'Grande porte',
}

export enum JobType {
    null = 'Não informado',
    remoto = 'Remoto',
    hibrido = 'Híbrido',
    presencial = 'Presencial',
}

export enum ContractType {
    null = 'Não informado',
    estagio = 'Estágio',
    junior = 'Júnior',
    pleno = 'Pleno',
    senior = 'Sênior',
}

export enum LocationDispobility {
    null = 'Não informado',
    option1 = 'Aceita candidatos dispostos a se mudar',
    option2 = 'Aceita candidatos morando em outros lugares',
    option3 = 'Somente aceita candidatos que moram na sede'
}

export enum LanguageRequired {
    null = 'Não informado',
    php = 'PHP',
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

export enum CandidateSelect {
    candidate = 'Não informado',
}