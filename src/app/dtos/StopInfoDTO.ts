export interface StopInfo {
  error: boolean
  errorMessage: string
  errorType: number
  idParada: string
  nombreParada: string
  timestamp: number
  estimaciones: Estimacion[]
}

export interface Estimacion {
  color: string
  line: string
  vh_first: Vh
  vh_second?: Vh
}

export interface Vh {
  destino: string
  seconds: number
  enParada: boolean
  llegando: boolean
}
