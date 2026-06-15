export type BadgeColor = "blue" | "purple" | "amber" | "red" | "green" | "gray";
export type WinnerType = "A" | "B" | "tie";
export type ResultType = "W" | "L" | "D";

export interface MatchResult {
  opp: string;
  score: string;
  type: ResultType;
  date: string;
}

export interface Player {
  pos: string;
  name: string;
  club: string;
  rating: number;
}

export interface Alert {
  type: BadgeColor;
  text: string;
}

export interface Tag {
  text: string;
  color: BadgeColor;
}

export interface Factor {
  label: string;
  scoreA: number;
  scoreB: number;
  winner: WinnerType;
}

export interface SetPieces {
  goalsPct: number;       // % dos gols marcados oriundos de bola parada
  concededPct: number;    // % dos gols sofridos oriundos de bola parada
  cornersFor: number;     // média de escanteios a favor por jogo
  foulsSuffered: number;  // média de faltas sofridas por jogo
  penalties: number;      // pênaltis marcados nos últimos 10 jogos
  note?: string;          // observação pontual (ex: "Wood perigo em escanteios")
}

export interface StyleData {
  formation: string;      // ex: "4-2-3-1"
  description: string;    // resumo tático em prosa
  possession: number;     // posse média em %
  passes: number;         // passes por jogo
  pressing: number;       // intensidade de pressão alta (1-5)
  transition: number;     // velocidade de transição (1-5)
  aerial: number;         // jogo aéreo (1-5)
  creativity: number;     // criatividade / combinações (1-5)
  defensive: number;      // disciplina defensiva (1-5)
}

export interface GoalTiming {
  // 7 intervalos: [1-15, 16-30, 31-45, 46-60, 61-75, 76-90, 90+]
  scored: [number, number, number, number, number, number, number];
  conceded: [number, number, number, number, number, number, number];
  note?: string;          // padrão identificado (ex: "Irã marca no 2T em Copas")
}

export interface TeamData {
  name: string;
  flag: string;
  coach: string;
  avgAttack: number;
  avgDef: number;
  matches: MatchResult[];
  players: Player[];
  alerts?: Alert[];
  setpieces: SetPieces;
  style: StyleData;
  timing: GoalTiming;
}

export interface MatchData {
  teamA: TeamData;
  teamB: TeamData;
  factors: Factor[];
  probA: number;
  probD: number;
  probB: number;
  prediction: string;
  verdict: string;
  observation?: string;
  tags: Tag[];
  group: string;
  date: string;
  venue: string;
  note?: string;
}