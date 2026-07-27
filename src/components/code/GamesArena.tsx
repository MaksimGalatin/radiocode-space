'use client';
import React, { memo, useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";

// Self-contained game labels (ported from the CODE app) so this component
// does not depend on the site-wide translation keys.
type Lang = "en" | "ru" | "es" | "zh";
const GI: Record<string, Record<string, string>> = {"en": {"tab.games": "Games", "tier.spark": "Spark", "tier.archives": "Family Archive", "tier.dna": "Digital DNA", "tier.none": "No tier", "games.title": "Game Arena", "games.subtitle": "Play against AIfa — your AI companion", "games.chess": "Chess", "games.chess.desc": "Classic chess vs AIfa", "games.ttt": "Tic-Tac-Toe", "games.ttt.desc": "Perfect minimax AI", "games.checkers": "Checkers", "games.checkers.desc": "Mandatory captures", "games.backgammon": "Backgammon", "games.backgammon.desc": "Roll & bear off", "games.tetris": "Tetris", "games.tetris.desc": "Endless lines & score", "games.win": "🏆 You win!", "games.lose": "💀 AIfa wins!", "games.draw": "🤝 Draw!", "games.thinking": "⏳ AIfa thinking…", "games.newGame": "↺ New Game", "games.chess.whiteToMove": "♔ White to move", "games.chess.history": "📜 Move History", "games.chess.noMoves": "No moves yet", "games.chess.label": "You = White, AIfa = Black", "games.ttt.yourTurn": "✕ Your turn (X)", "games.ttt.label": "You = X, AIfa = O · Perfect minimax AI", "games.checkers.yourTurn": "⬤ Your turn (Red)", "games.checkers.youLabel": "You (Red)", "games.checkers.aifaLabel": "AIfa (Black)", "games.bg.rollToStart": "Roll to start!", "games.bg.rollPrompt": "Roll to start your turn", "games.bg.rollDice": "🎲 Roll Dice", "games.bg.bearOff": "Bear Off", "games.bg.yourTurn": "Your turn — roll!", "games.bg.aifaTurn": "AIfa's turn — rolling...", "games.bg.noMoves": "No moves available! Turn passes.", "games.bg.selectChecker": "Select a checker.", "games.bg.selectTarget": "Select a target point to enter.", "games.bg.selectMove": "Select a target.", "games.bg.label": "You = White (moves right→left), AIfa = Black · Doubles = 4 moves", "games.chess.check": "⚠️ Check!", "games.chess.mate": "Checkmate!", "games.chess.stalemate": "Stalemate", "games.chess.material": "Insufficient material", "games.chess.promote": "Choose a piece", "games.chess.lastMove": "Last move", "games.noMoves": "No moves available", "games.bg.playLarger": "You must play the larger die"}, "ru": {"tab.games": "Игры", "tier.spark": "Искра", "tier.archives": "Семейный Архив", "tier.dna": "Цифровая ДНК", "tier.none": "Нет тарифа", "games.title": "Арена игр", "games.subtitle": "Играй против AIfa — твоего ИИ-компаньона", "games.chess": "Шахматы", "games.chess.desc": "Классические шахматы с AIfa", "games.ttt": "Крестики-нолики", "games.ttt.desc": "Непобедимый ИИ", "games.checkers": "Шашки", "games.checkers.desc": "Обязательные взятия", "games.backgammon": "Нарды", "games.backgammon.desc": "Бросай кости и выбивай", "games.tetris": "Тетрис", "games.tetris.desc": "Бесконечные линии и очки", "games.win": "🏆 Вы победили!", "games.lose": "💀 AIfa победила!", "games.draw": "🤝 Ничья!", "games.thinking": "⏳ AIfa думает…", "games.newGame": "↺ Новая игра", "games.chess.whiteToMove": "♔ Ход белых", "games.chess.history": "📜 История ходов", "games.chess.noMoves": "Ходов ещё нет", "games.chess.label": "Вы = Белые, AIfa = Чёрные", "games.ttt.yourTurn": "✕ Ваш ход (X)", "games.ttt.label": "Вы = X, AIfa = O · Непобедимый ИИ", "games.checkers.yourTurn": "⬤ Ваш ход (Красные)", "games.checkers.youLabel": "Вы (Красные)", "games.checkers.aifaLabel": "AIfa (Чёрные)", "games.bg.rollToStart": "Бросайте кости!", "games.bg.rollPrompt": "Бросьте кости для начала хода", "games.bg.rollDice": "🎲 Бросить кости", "games.bg.bearOff": "Выбить", "games.bg.yourTurn": "Ваш ход — бросайте!", "games.bg.aifaTurn": "Ход AIfa — бросает...", "games.bg.noMoves": "Нет доступных ходов! Ход передаётся.", "games.bg.selectChecker": "Выберите шашку.", "games.bg.selectTarget": "Выберите целевую позицию для входа.", "games.bg.selectMove": "Выберите цель.", "games.bg.label": "Вы = Белые (ходят справа→налево), AIfa = Чёрные · Дубль = 4 хода", "games.chess.check": "⚠️ Шах!", "games.chess.mate": "Мат!", "games.chess.stalemate": "Пат", "games.chess.material": "Недостаточно материала", "games.chess.promote": "Выберите фигуру", "games.chess.lastMove": "Последний ход", "games.noMoves": "Нет доступных ходов", "games.bg.playLarger": "Нужно играть большую кость"}, "es": {"tab.games": "Juegos", "tier.spark": "Chispa", "tier.archives": "Archivo Familiar", "tier.dna": "ADN Digital", "tier.none": "Sin nivel", "games.title": "Arena de Juegos", "games.subtitle": "Juega contra AIfa — tu compañero IA", "games.chess": "Ajedrez", "games.chess.desc": "Ajedrez clásico vs AIfa", "games.ttt": "Tres en Raya", "games.ttt.desc": "IA minimax perfecta", "games.checkers": "Damas", "games.checkers.desc": "Capturas obligatorias", "games.backgammon": "Backgammon", "games.backgammon.desc": "Tira y saca", "games.tetris": "Tetris", "games.tetris.desc": "Líneas y puntos sin fin", "games.win": "🏆 ¡Ganaste!", "games.lose": "💀 ¡Gana AIfa!", "games.draw": "🤝 ¡Empate!", "games.thinking": "⏳ AIfa pensando…", "games.newGame": "↺ Nueva Partida", "games.chess.whiteToMove": "♔ Mueven blancas", "games.chess.history": "📜 Historial", "games.chess.noMoves": "Sin movimientos", "games.chess.label": "Tú = Blancas, AIfa = Negras", "games.ttt.yourTurn": "✕ Tu turno (X)", "games.ttt.label": "Tú = X, AIfa = O · IA minimax perfecta", "games.checkers.yourTurn": "⬤ Tu turno (Rojo)", "games.checkers.youLabel": "Tú (Rojo)", "games.checkers.aifaLabel": "AIfa (Negro)", "games.bg.rollToStart": "¡Lanza para empezar!", "games.bg.rollPrompt": "Lanza para iniciar tu turno", "games.bg.rollDice": "🎲 Lanzar Dados", "games.bg.bearOff": "Sacar", "games.bg.yourTurn": "Tu turno — ¡lanza!", "games.bg.aifaTurn": "Turno de AIfa — lanzando...", "games.bg.noMoves": "¡Sin movimientos! Pasa el turno.", "games.bg.selectChecker": "Selecciona una pieza.", "games.bg.selectTarget": "Selecciona el punto de entrada.", "games.bg.selectMove": "Selecciona el destino.", "games.bg.label": "Tú = Blancas (dcha→izq), AIfa = Negras · Dobles = 4 jugadas", "games.chess.check": "⚠️ ¡Jaque!", "games.chess.mate": "¡Jaque mate!", "games.chess.stalemate": "Rey ahogado", "games.chess.material": "Material insuficiente", "games.chess.promote": "Elige una pieza", "games.chess.lastMove": "Última jugada", "games.noMoves": "No hay movimientos", "games.bg.playLarger": "Debes jugar el dado mayor"}, "zh": {"tab.games": "游戏", "tier.spark": "星火", "tier.archives": "家族档案", "tier.dna": "数字DNA", "tier.none": "无等级", "games.title": "游戏竞技场", "games.subtitle": "与你的AI伙伴AIfa对战", "games.chess": "国际象棋", "games.chess.desc": "经典象棋对决AIfa", "games.ttt": "井字棋", "games.ttt.desc": "完美极小化极大AI", "games.checkers": "跳棋", "games.checkers.desc": "强制吃子", "games.backgammon": "双陆棋", "games.backgammon.desc": "掷骰撤棋", "games.tetris": "俄罗斯方块", "games.tetris.desc": "无尽消行与得分", "games.win": "🏆 你赢了！", "games.lose": "💀 AIfa赢了！", "games.draw": "🤝 平局！", "games.thinking": "⏳ AIfa思考中…", "games.newGame": "↺ 新游戏", "games.chess.whiteToMove": "♔ 白方走棋", "games.chess.history": "📜 走棋记录", "games.chess.noMoves": "暂无走棋记录", "games.chess.label": "你 = 白方，AIfa = 黑方", "games.ttt.yourTurn": "✕ 你的回合 (X)", "games.ttt.label": "你 = X，AIfa = O · 完美极小化极大AI", "games.checkers.yourTurn": "⬤ 你的回合（红方）", "games.checkers.youLabel": "你（红方）", "games.checkers.aifaLabel": "AIfa（黑方）", "games.bg.rollToStart": "掷骰开始！", "games.bg.rollPrompt": "掷骰开始你的回合", "games.bg.rollDice": "🎲 掷骰子", "games.bg.bearOff": "撤子", "games.bg.yourTurn": "你的回合 — 掷骰！", "games.bg.aifaTurn": "AIfa的回合 — 掷骰中...", "games.bg.noMoves": "无可用走法！跳过回合。", "games.bg.selectChecker": "选择一枚棋子。", "games.bg.selectTarget": "选择目标点位进入。", "games.bg.selectMove": "选择目标位置。", "games.bg.label": "你 = 白方（右→左移动），AIfa = 黑方 · 双数 = 4步", "games.chess.check": "⚠️ 将军！", "games.chess.mate": "将杀！", "games.chess.stalemate": "逼和", "games.chess.material": "子力不足", "games.chess.promote": "选择升变棋子", "games.chess.lastMove": "上一步", "games.noMoves": "无可用走法", "games.bg.playLarger": "必须使用较大的骰子"}};
const t = (key: string, lang: Lang): string => (GI[lang]?.[key] ?? GI.en?.[key] ?? key);
function fireWin(game: string) { if (typeof window !== "undefined") { try { (window as any).__aifaGameWin && (window as any).__aifaGameWin(game); } catch {} } }


function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

// ─── Chess — full rules engine: check, checkmate, stalemate, castling, en passant, promotion ─
const CHESS_PIECES: Record<string, string> = {
  wK:"♔", wQ:"♕", wR:"♖", wB:"♗", wN:"♘", wP:"♙",
  bK:"♚", bQ:"♛", bR:"♜", bB:"♝", bN:"♞", bP:"♟",
};
type ChessBoard = (string|null)[][];
type PromoPiece = "Q"|"R"|"B"|"N";
interface CastleRights { wK:boolean; wQ:boolean; bK:boolean; bQ:boolean; }
interface ChessState { board:ChessBoard; castle:CastleRights; ep:[number,number]|null; }
interface CMove { fr:number; fc:number; tr:number; tc:number; promo?:PromoPiece; castle?:"K"|"Q"; ep?:boolean; }

function initChessState(): ChessState {
  const b: ChessBoard = Array.from({length:8},()=>Array(8).fill(null));
  const back = ["R","N","B","Q","K","B","N","R"];
  for (let c=0;c<8;c++) { b[0][c]="b"+back[c]; b[1][c]="bP"; b[7][c]="w"+back[c]; b[6][c]="wP"; }
  return { board:b, castle:{wK:true,wQ:true,bK:true,bQ:true}, ep:null };
}
function inBoundsC(r:number,c:number){return r>=0&&r<8&&c>=0&&c<8;}
function colorC(p:string|null){return p?p[0]:null;}
function findKingC(b:ChessBoard,col:"w"|"b"):[number,number]{
  for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(b[r][c]===col+"K")return[r,c];
  return[-1,-1];
}
// Is square (r,c) attacked by side `by`?
function squareAttacked(b:ChessBoard,r:number,c:number,by:"w"|"b"):boolean{
  const pd=by==="w"?1:-1;
  for(const dc of[-1,1]){const pr=r+pd,pc=c+dc;if(inBoundsC(pr,pc)&&b[pr][pc]===by+"P")return true;}
  for(const[dr,dc]of[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]]){const nr=r+dr,nc=c+dc;if(inBoundsC(nr,nc)&&b[nr][nc]===by+"N")return true;}
  for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const nr=r+dr,nc=c+dc;if(inBoundsC(nr,nc)&&b[nr][nc]===by+"K")return true;}
  for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1]]){let nr=r+dr,nc=c+dc;while(inBoundsC(nr,nc)){const p=b[nr][nc];if(p){if(p[0]===by&&(p[1]==="R"||p[1]==="Q"))return true;break;}nr+=dr;nc+=dc;}}
  for(const[dr,dc]of[[1,1],[1,-1],[-1,1],[-1,-1]]){let nr=r+dr,nc=c+dc;while(inBoundsC(nr,nc)){const p=b[nr][nc];if(p){if(p[0]===by&&(p[1]==="B"||p[1]==="Q"))return true;break;}nr+=dr;nc+=dc;}}
  return false;
}
function inCheckC(b:ChessBoard,col:"w"|"b"):boolean{
  const[kr,kc]=findKingC(b,col);
  return kr>=0&&squareAttacked(b,kr,kc,col==="w"?"b":"w");
}
function pseudoMovesC(st:ChessState,r:number,c:number):CMove[]{
  const b=st.board;const p=b[r][c];if(!p)return[];
  const col=p[0] as "w"|"b",type=p[1];const enemy=(col==="w"?"b":"w") as "w"|"b";
  const out:CMove[]=[];
  const push=(tr:number,tc:number)=>{
    if(type==="P"&&(tr===0||tr===7))out.push({fr:r,fc:c,tr,tc,promo:"Q"});
    else out.push({fr:r,fc:c,tr,tc});
  };
  const slide=(dr:number,dc:number)=>{let nr=r+dr,nc=c+dc;while(inBoundsC(nr,nc)){if(colorC(b[nr][nc])===col)break;push(nr,nc);if(b[nr][nc])break;nr+=dr;nc+=dc;}};
  if(type==="P"){
    const dir=col==="w"?-1:1;const start=col==="w"?6:1;
    if(inBoundsC(r+dir,c)&&!b[r+dir][c]){push(r+dir,c);if(r===start&&!b[r+2*dir][c])push(r+2*dir,c);}
    for(const dc of[-1,1]){
      const nr=r+dir,nc=c+dc;if(!inBoundsC(nr,nc))continue;
      if(colorC(b[nr][nc])===enemy)push(nr,nc);
      else if(st.ep&&st.ep[0]===nr&&st.ep[1]===nc&&!b[nr][nc])out.push({fr:r,fc:c,tr:nr,tc:nc,ep:true});
    }
  }else if(type==="R"){for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1]])slide(dr,dc);}
  else if(type==="B"){for(const[dr,dc]of[[1,1],[1,-1],[-1,1],[-1,-1]])slide(dr,dc);}
  else if(type==="Q"){for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]])slide(dr,dc);}
  else if(type==="N"){for(const[dr,dc]of[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]])if(inBoundsC(r+dr,c+dc)&&colorC(b[r+dr][c+dc])!==col)push(r+dr,c+dc);}
  else if(type==="K"){
    for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]])if(inBoundsC(r+dr,c+dc)&&colorC(b[r+dr][c+dc])!==col)push(r+dr,c+dc);
    // Castling: rights intact, path empty, rook in place, not from/through/into check
    const home=col==="w"?7:0;
    if(r===home&&c===4&&!inCheckC(b,col)){
      if(st.castle[(col+"K") as keyof CastleRights]&&!b[home][5]&&!b[home][6]&&b[home][7]===col+"R"
        &&!squareAttacked(b,home,5,enemy)&&!squareAttacked(b,home,6,enemy))
        out.push({fr:r,fc:c,tr:home,tc:6,castle:"K"});
      if(st.castle[(col+"Q") as keyof CastleRights]&&!b[home][1]&&!b[home][2]&&!b[home][3]&&b[home][0]===col+"R"
        &&!squareAttacked(b,home,3,enemy)&&!squareAttacked(b,home,2,enemy))
        out.push({fr:r,fc:c,tr:home,tc:2,castle:"Q"});
    }
  }
  return out;
}
function applyC(st:ChessState,m:CMove):ChessState{
  const b=st.board.map(row=>[...row]);
  const p=b[m.fr][m.fc]!;const col=p[0] as "w"|"b";
  b[m.tr][m.tc]=p;b[m.fr][m.fc]=null;
  if(m.ep)b[m.fr][m.tc]=null; // en passant: captured pawn sits beside the moving pawn
  if(m.castle){const home=col==="w"?7:0;
    if(m.castle==="K"){b[home][5]=b[home][7];b[home][7]=null;}
    else{b[home][3]=b[home][0];b[home][0]=null;}
  }
  if(p[1]==="P"&&(m.tr===0||m.tr===7))b[m.tr][m.tc]=col+(m.promo||"Q");
  const castle={...st.castle};
  if(p==="wK"){castle.wK=false;castle.wQ=false;}
  if(p==="bK"){castle.bK=false;castle.bQ=false;}
  if((m.fr===7&&m.fc===0)||(m.tr===7&&m.tc===0))castle.wQ=false;
  if((m.fr===7&&m.fc===7)||(m.tr===7&&m.tc===7))castle.wK=false;
  if((m.fr===0&&m.fc===0)||(m.tr===0&&m.tc===0))castle.bQ=false;
  if((m.fr===0&&m.fc===7)||(m.tr===0&&m.tc===7))castle.bK=false;
  let ep:[number,number]|null=null;
  if(p[1]==="P"&&Math.abs(m.tr-m.fr)===2)ep=[(m.tr+m.fr)/2,m.fc];
  return{board:b,castle,ep};
}
// Legal move = pseudo move that does not leave own king in check (verified by simulation)
function legalMovesC(st:ChessState,r:number,c:number):CMove[]{
  const p=st.board[r][c];if(!p)return[];
  const col=p[0] as "w"|"b";
  return pseudoMovesC(st,r,c).filter(m=>!inCheckC(applyC(st,m).board,col));
}
function allLegalC(st:ChessState,col:"w"|"b"):CMove[]{
  const out:CMove[]=[];
  for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(st.board[r][c]?.[0]===col)out.push(...legalMovesC(st,r,c));
  return out;
}
// Draw by insufficient material: K vs K, K+B vs K, K+N vs K
function insufficientMaterialC(b:ChessBoard):boolean{
  const minor:string[]=[];
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){
    const p=b[r][c];if(!p||p[1]==="K")continue;
    if(p[1]==="B"||p[1]==="N")minor.push(p[1]);else return false;
  }
  return minor.length<=1;
}
// Chess AI: minimax depth-3 with alpha-beta pruning over fully legal moves.
const PIECE_VAL: Record<string, number> = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000 };
const PAWN_PST = [
  [0,0,0,0,0,0,0,0],[50,50,50,50,50,50,50,50],[10,10,20,30,30,20,10,10],[5,5,10,25,25,10,5,5],
  [0,0,0,20,20,0,0,0],[5,-5,-10,0,0,-10,-5,5],[5,10,10,-20,-20,10,10,5],[0,0,0,0,0,0,0,0]];
const KNIGHT_PST = [
  [-50,-40,-30,-30,-30,-30,-40,-50],[-40,-20,0,0,0,0,-20,-40],[-30,0,10,15,15,10,0,-30],[-30,5,15,20,20,15,5,-30],
  [-30,0,15,20,20,15,0,-30],[-30,5,10,15,15,10,5,-30],[-40,-20,0,5,5,0,-20,-40],[-50,-40,-30,-30,-30,-30,-40,-50]];
function pst(type: string, r: number, c: number, isWhite: boolean): number {
  const rr = isWhite ? r : 7 - r;
  if (type === "P") return PAWN_PST[rr][c];
  if (type === "N") return KNIGHT_PST[rr][c];
  if (type === "B" || type === "R" || type === "Q") return 5 - (Math.abs(3.5 - rr) + Math.abs(3.5 - c));
  return 0;
}
function evalBoard(b: ChessBoard): number {
  // positive = good for black (AI)
  let s = 0;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const p = b[r][c]; if (!p) continue;
    const v = (PIECE_VAL[p[1]] || 0) + pst(p[1], r, c, p[0] === "w");
    s += p[0] === "b" ? v : -v;
  }
  return s;
}
function orderedLegalC(st:ChessState,col:"w"|"b"):CMove[]{
  const ms=allLegalC(st,col);
  ms.sort((a,b2)=>{
    const va=st.board[a.tr][a.tc]?(PIECE_VAL[st.board[a.tr][a.tc]![1]]||0):0;
    const vb=st.board[b2.tr][b2.tc]?(PIECE_VAL[st.board[b2.tr][b2.tc]![1]]||0):0;
    return vb-va;
  });
  return ms;
}
function minimaxC(st:ChessState,depth:number,alpha:number,beta:number,blackToMove:boolean):number{
  if(depth===0)return evalBoard(st.board);
  const col=blackToMove?"b":"w";
  const moves=orderedLegalC(st,col as "w"|"b");
  if(!moves.length){
    // checkmate or stalemate
    if(inCheckC(st.board,col as "w"|"b"))return blackToMove?-(99999+depth):(99999+depth);
    return 0;
  }
  if(blackToMove){
    let best=-Infinity;
    for(const m of moves){best=Math.max(best,minimaxC(applyC(st,m),depth-1,alpha,beta,false));alpha=Math.max(alpha,best);if(beta<=alpha)break;}
    return best;
  }else{
    let best=Infinity;
    for(const m of moves){best=Math.min(best,minimaxC(applyC(st,m),depth-1,alpha,beta,true));beta=Math.min(beta,best);if(beta<=alpha)break;}
    return best;
  }
}
function chessAiPick(st:ChessState):CMove|null{
  const moves=orderedLegalC(st,"b");
  if(!moves.length)return null;
  let bestScore=-Infinity,best=moves[0];
  for(const m of moves){
    const s=minimaxC(applyC(st,m),2,-Infinity,Infinity,false)+Math.random()*2;
    if(s>bestScore){bestScore=s;best=m;}
  }
  return best;
}
const sqNameC=(r:number,c:number)=>`${String.fromCharCode(97+c)}${8-r}`;
// Algebraic-style notation: ♘g1→f3, ♙e4×d5, O-O / O-O-O, =♕, + check, # mate
function noteC(before:ChessState,m:CMove,after:ChessState):string{
  const p=before.board[m.fr][m.fc]!;
  let base:string;
  if(m.castle)base=m.castle==="K"?"O-O":"O-O-O";
  else{
    const cap=!!before.board[m.tr][m.tc]||!!m.ep;
    base=`${CHESS_PIECES[p]}${sqNameC(m.fr,m.fc)}${cap?"×":"→"}${sqNameC(m.tr,m.tc)}`;
    if(p[1]==="P"&&(m.tr===0||m.tr===7))base+="="+CHESS_PIECES[p[0]+(m.promo||"Q")];
  }
  const opp=(p[0]==="w"?"b":"w") as "w"|"b";
  if(inCheckC(after.board,opp))base+=allLegalC(after,opp).length?"+":"#";
  return base;
}

function Chess({ lang }: { lang: Lang }) {
  const mobile = useIsMobile();
  const cell = mobile ? 38 : 48;
  const files = ["a","b","c","d","e","f","g","h"];
  const [st, setSt] = useState<ChessState>(initChessState);
  const [selected, setSelected] = useState<[number,number]|null>(null);
  const [legal, setLegal] = useState<CMove[]>([]);
  const [history, setHistory] = useState<{w:string;b?:string}[]>([]);
  const [whiteTurn, setWhiteTurn] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [status, setStatus] = useState<"playing"|"white_wins"|"black_wins"|"stalemate"|"material">("playing");
  const [lastMove, setLastMove] = useState<CMove|null>(null);
  const [promo, setPromo] = useState<CMove|null>(null);

  const whiteInCheck = inCheckC(st.board,"w");
  const blackInCheck = inCheckC(st.board,"b");

  function finishPlayerMove(mv:CMove){
    const after=applyC(st,mv);
    const wNote=noteC(st,mv,after);
    setSt(after); setSelected(null); setLegal([]); setLastMove(mv); setPromo(null);
    const aiMoves=allLegalC(after,"b");
    if(!aiMoves.length){
      setHistory(h=>[...h,{w:wNote}]);
      if(inCheckC(after.board,"b")){ setStatus("white_wins"); fireWin("chess"); }
      else setStatus("stalemate");
      return;
    }
    if(insufficientMaterialC(after.board)){ setHistory(h=>[...h,{w:wNote}]); setStatus("material"); return; }
    setWhiteTurn(false); setThinking(true);
    setTimeout(()=>{
      const aiMv=chessAiPick(after);
      if(!aiMv){ setThinking(false); return; }
      const after2=applyC(after,aiMv);
      const bNote=noteC(after,aiMv,after2);
      setSt(after2); setLastMove(aiMv); setThinking(false);
      setHistory(h=>[...h,{w:wNote,b:bNote}]);
      const wMoves=allLegalC(after2,"w");
      if(!wMoves.length){
        if(inCheckC(after2.board,"w")) setStatus("black_wins");
        else setStatus("stalemate");
        return;
      }
      if(insufficientMaterialC(after2.board)){ setStatus("material"); return; }
      setWhiteTurn(true);
    }, 350);
  }

  function handleClick(r:number, c:number) {
    if(!whiteTurn||status!=="playing"||promo) return;
    if(selected){
      const mv=legal.find(m=>m.tr===r&&m.tc===c);
      if(mv){
        if(mv.promo){ setPromo(mv); return; } // let the player choose the piece
        finishPlayerMove(mv);
        return;
      }
    }
    if(st.board[r][c]?.startsWith("w")){ setSelected([r,c]); setLegal(legalMovesC(st,r,c)); }
    else { setSelected(null); setLegal([]); }
  }

  function reset(){
    setSt(initChessState()); setSelected(null); setLegal([]); setHistory([]);
    setWhiteTurn(true); setThinking(false); setStatus("playing"); setLastMove(null); setPromo(null);
  }

  const lastEntry=history[history.length-1];
  const lastNote=lastEntry?(lastEntry.b||lastEntry.w):null;
  const coordStyle:React.CSSProperties={fontSize:"10px",color:"rgba(232,213,176,0.65)"};

  return (
    <div>
      <div className="glass-panel-sm" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",padding:"10px 24px",marginBottom:"12px"}}>
        {status==="white_wins"&&<span style={{fontWeight:700,color:"#10B981"}}>{t("games.win",lang)} · {t("games.chess.mate",lang)}</span>}
        {status==="black_wins"&&<span style={{fontWeight:700,color:"#ef4444"}}>{t("games.lose",lang)} · {t("games.chess.mate",lang)}</span>}
        {status==="stalemate"&&<span style={{fontWeight:700,color:"#D4A24C"}}>{t("games.draw",lang)} · {t("games.chess.stalemate",lang)}</span>}
        {status==="material"&&<span style={{fontWeight:700,color:"#D4A24C"}}>{t("games.draw",lang)} · {t("games.chess.material",lang)}</span>}
        {status==="playing"&&(
          (thinking||!whiteTurn)
            ?<span style={{fontWeight:600,color:"rgb(232,232,240)"}}>{t("games.thinking",lang)}</span>
            :<span style={{fontWeight:600,color:whiteInCheck?"#ef4444":"rgb(232,232,240)"}}>{whiteInCheck?t("games.chess.check",lang):t("games.chess.whiteToMove",lang)}</span>
        )}
      </div>
      <div style={{display:"flex",justifyContent:"center",marginBottom:"12px",overflowX:"auto"}}>
        <div className="glass-panel" style={{padding:"10px",display:"inline-block",position:"relative"}}>
          <div style={{display:"flex",paddingLeft:"20px",marginBottom:"2px"}}>
            {files.map(l=><div key={l} style={{...coordStyle,width:`${cell}px`,textAlign:"center"}}>{l}</div>)}
          </div>
          {st.board.map((row,r)=>(
            <div key={r} style={{display:"flex",alignItems:"center"}}>
              <div style={{...coordStyle,width:"20px",textAlign:"right",paddingRight:"4px"}}>{8-r}</div>
              {row.map((piece,c)=>{
                const isDark=(r+c)%2===1;
                const isSel=selected?.[0]===r&&selected?.[1]===c;
                const mvHere=legal.find(m=>m.tr===r&&m.tc===c);
                const isLast=!!lastMove&&((lastMove.fr===r&&lastMove.fc===c)||(lastMove.tr===r&&lastMove.tc===c));
                const isCheckKing=!!piece&&piece[1]==="K"&&((piece[0]==="w"&&whiteInCheck)||(piece[0]==="b"&&blackInCheck));
                let shadow="none";
                if(isCheckKing) shadow="inset 0 0 0 3px #EF4444, inset 0 0 16px rgba(239,68,68,0.8)";
                else if(isSel) shadow="inset 0 0 0 3px #8B5CF6, inset 0 0 14px rgba(124,58,237,0.6)";
                else if(mvHere&&piece) shadow="inset 0 0 0 3px rgba(16,185,129,0.95)";
                else if(isLast) shadow="inset 0 0 0 3px rgba(251,191,36,0.85)";
                return (
                  <button key={c} onClick={()=>handleClick(r,c)} style={{width:`${cell}px`,height:`${cell}px`,display:"flex",alignItems:"center",justifyContent:"center",border:"none",cursor:"pointer",padding:0,position:"relative",
                    background:isDark?"#7A4F26":"rgba(232,213,176,0.92)",boxShadow:shadow,transition:"box-shadow 0.12s"}}>
                    {mvHere&&!piece&&<div style={{width:"12px",height:"12px",borderRadius:"50%",background:"rgba(16,185,129,0.85)",boxShadow:"0 0 8px rgba(16,185,129,0.9)",pointerEvents:"none"}}/>}
                    {piece&&<span style={{fontSize:mobile?"28px":"33px",lineHeight:1,
                      color:piece[0]==="w"?"#FAFAF5":"#1A1E2E",
                      textShadow:piece[0]==="w"?"0 1px 2px rgba(0,0,0,0.85), 0 0 4px rgba(0,0,0,0.5)":"0 1px 2px rgba(255,255,255,0.4), 0 0 4px rgba(255,255,255,0.28)"}}>{CHESS_PIECES[piece]||""}</span>}
                  </button>
                );
              })}
              <div style={{...coordStyle,width:"20px",paddingLeft:"4px"}}>{8-r}</div>
            </div>
          ))}
          <div style={{display:"flex",paddingLeft:"20px",marginTop:"2px"}}>
            {files.map(l=><div key={l} style={{...coordStyle,width:`${cell}px`,textAlign:"center"}}>{l}</div>)}
          </div>
          {promo&&(
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(8,8,18,0.72)",zIndex:5,borderRadius:"12px"}}>
              <div className="glass-panel" style={{padding:"16px 20px",textAlign:"center"}}>
                <div style={{fontSize:"13px",fontWeight:600,color:"rgb(232,232,240)",marginBottom:"10px"}}>{t("games.chess.promote",lang)}</div>
                <div style={{display:"flex",gap:"10px",justifyContent:"center"}}>
                  {(["Q","R","B","N"] as PromoPiece[]).map(pp=>(
                    <button key={pp} onClick={()=>finishPlayerMove({...promo,promo:pp})} style={{width:"52px",height:"52px",fontSize:"30px",lineHeight:1,borderRadius:"10px",cursor:"pointer",
                      background:"rgba(232,213,176,0.92)",border:"2px solid rgba(124,58,237,0.55)",color:"#1A1E2E"}}>{CHESS_PIECES["w"+pp]}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
        <div className="glass-panel" style={{padding:"14px"}}>
          <div style={{fontSize:"13px",fontWeight:600,color:"rgb(232,232,240)",marginBottom:"8px"}}>{t("games.chess.history",lang)}</div>
          <div style={{maxHeight:"120px",overflowY:"auto"}}>
            {history.length===0?<div style={{fontSize:"12px",color:"rgb(107,114,128)"}}>{t("games.chess.noMoves",lang)}</div>:history.map((m,i)=>(
              <div key={i} style={{display:"flex",gap:"10px",fontSize:"12px",marginBottom:"2px",whiteSpace:"nowrap"}}>
                <span style={{color:"rgb(107,114,128)",fontSize:"11px",width:"22px",flexShrink:0}}>{i+1}.</span>
                <span style={{color:"rgb(232,232,240)",minWidth:"92px"}}>{m.w}</span>
                <span style={{color:"#67E8F9"}}>{m.b||""}</span>
              </div>
            ))}
          </div>
          {lastNote&&<div style={{marginTop:"6px",fontSize:"11px",color:"rgb(107,114,128)"}}>{t("games.chess.lastMove",lang)}: <span style={{color:"#FBBF24"}}>{lastNote}</span></div>}
        </div>
        <div className="glass-panel" style={{padding:"14px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"8px"}}>
          <button onClick={reset} style={{background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.25)",color:"#7C3AED",padding:"10px 20px",borderRadius:"12px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>{t("games.newGame",lang)}</button>
          <div style={{fontSize:"11px",color:"rgb(107,114,128)"}}>{t("games.chess.label",lang)}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Tic-Tac-Toe ─────────────────────────────────────────────────────────────
type TTTBoard = (null|"X"|"O")[];
function tttWinner(b:TTTBoard):null|"X"|"O"|"draw"{
  const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(const[a,b2,c]of lines){ if(b[a]&&b[a]===b[b2]&&b[a]===b[c]) return b[a] as "X"|"O"; }
  if(b.every(x=>x)) return "draw";
  return null;
}
function tttMinimax(b:TTTBoard, isO:boolean):number{
  const w=tttWinner(b);
  if(w==="O") return 10; if(w==="X") return -10; if(w==="draw") return 0;
  const scores=b.map((cell,i)=>{
    if(cell) return isO?-Infinity:Infinity;
    const nb=[...b] as TTTBoard; nb[i]=isO?"O":"X";
    return tttMinimax(nb,!isO);
  });
  return isO?Math.max(...scores):Math.min(...scores);
}
function tttBestMove(b:TTTBoard):number{
  let best=-Infinity, idx=0;
  b.forEach((cell,i)=>{
    if(cell) return;
    const nb=[...b] as TTTBoard; nb[i]="O";
    const s=tttMinimax(nb,false);
    if(s>best){best=s;idx=i;}
  });
  return idx;
}

function TicTacToe({ lang }: { lang: Lang }) {
  const mobile = useIsMobile();
  const cell = mobile ? 72 : 80;
  const [board, setBoard] = useState<TTTBoard>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const winner = tttWinner(board);

  function handleClick(i:number) {
    if (board[i] || winner || !xTurn) return;
    const nb=[...board] as TTTBoard; nb[i]="X";
    const w=tttWinner(nb);
    if(w==="X") fireWin("ttt");
    setBoard(nb); setXTurn(false);
    if(!w) setTimeout(()=>{
      setBoard(prev=>{
        const w2=tttWinner(prev); if(w2) return prev;
        const nb2=[...prev] as TTTBoard; nb2[tttBestMove(nb2)]="O";
        return nb2;
      });
      setXTurn(true);
    }, 300);
  }

  function reset(){ setBoard(Array(9).fill(null)); setXTurn(true); }

  const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const winLine=lines.find(([a,b,c])=>board[a]&&board[a]===board[b]&&board[a]===board[c]);

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"}}>
      <div className="glass-panel-sm" style={{padding:"10px 32px",textAlign:"center"}}>
        {winner==="X"&&<span style={{fontWeight:700,color:"#10B981",fontSize:"16px"}}>{t("games.win",lang)}</span>}
        {winner==="O"&&<span style={{fontWeight:700,color:"#ef4444",fontSize:"16px"}}>{t("games.lose",lang)}</span>}
        {winner==="draw"&&<span style={{fontWeight:700,color:"#D4A24C",fontSize:"16px"}}>{t("games.draw",lang)}</span>}
        {!winner&&<span style={{fontWeight:600,color:"rgb(232,232,240)",fontSize:"15px"}}>{xTurn?t("games.ttt.yourTurn",lang):t("games.thinking",lang)}</span>}
      </div>
      <div className="glass-panel" style={{padding:"16px",display:"inline-block"}}>
        <div style={{display:"grid",gridTemplateColumns:`repeat(3,${cell}px)`,gridTemplateRows:`repeat(3,${cell}px)`,gap:"4px"}}>
          {board.map((sq,i)=>{
            const isWin=winLine?.includes(i);
            return (
              <button key={i} onClick={()=>handleClick(i)} style={{
                width:`${cell}px`,height:`${cell}px`,display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:mobile?"28px":"36px",fontWeight:700,border:"1px solid rgba(124,58,237,0.2)",borderRadius:"8px",cursor:sq||winner?"default":"pointer",
                background:isWin?"rgba(124,58,237,0.2)":"rgba(15,15,25,0.6)",
                color:sq==="X"?"#10B981":sq==="O"?"#ef4444":"transparent",
                transition:"background 0.1s",fontFamily:"Inter,sans-serif"
              }}>{sq||"·"}</button>
            );
          })}
        </div>
      </div>
      <button onClick={reset} style={{background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.25)",color:"#7C3AED",padding:"10px 24px",borderRadius:"12px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>{t("games.newGame",lang)}</button>
      <div style={{fontSize:"11px",color:"rgb(107,114,128)"}}>{t("games.ttt.label",lang)}</div>
    </div>
  );
}

// ─── Checkers (Russian rules) ────────────────────────────────────────────────
// Red = player (moves up = decreasing row), Black = AI (moves down = increasing row).
// Mandatory captures, forced capture chains, men capture backwards, flying kings,
// promotion mid-chain continues the capture as a king.
type CheckerPiece = null | "r" | "R" | "b" | "B"; // r=red, R=red king, b=black, B=black king
type CheckersBoard = CheckerPiece[][];

function initCheckers(): CheckersBoard {
  const b: CheckersBoard = Array.from({length:8},()=>Array(8).fill(null));
  for(let r=0;r<3;r++) for(let c=0;c<8;c++) if((r+c)%2===1) b[r][c]="b";
  for(let r=5;r<8;r++) for(let c=0;c<8;c++) if((r+c)%2===1) b[r][c]="r";
  return b;
}

interface CheckerMove { fr:number; fc:number; tr:number; tc:number; captures?:[number,number][]; }

function getCheckerMoves(b:CheckersBoard, r:number, c:number, mustCapture=false): CheckerMove[] {
  const p=b[r][c]; if(!p) return [];
  const isRed=p==="r"||p==="R"; const isKing=p==="R"||p==="B";
  const inb=(x:number,y:number)=>x>=0&&x<8&&y>=0&&y<8;
  const enemy=(n:CheckerPiece)=> !!n && (isRed ? (n==="b"||n==="B") : (n==="r"||n==="R"));
  const moves:CheckerMove[]=[];
  const ALL:[number,number][]=[[-1,-1],[-1,1],[1,-1],[1,1]];
  if(isKing){
    // Russian flying king: slides any distance; captures at distance, lands anywhere past the piece.
    for(const[dr,dc] of ALL){
      let nr=r+dr, nc=c+dc;
      while(inb(nr,nc) && !b[nr][nc]){ if(!mustCapture) moves.push({fr:r,fc:c,tr:nr,tc:nc}); nr+=dr; nc+=dc; }
      if(inb(nr,nc) && enemy(b[nr][nc])){
        const cr=nr, cc=nc; let lr=nr+dr, lc=nc+dc;
        while(inb(lr,lc) && !b[lr][lc]){ moves.push({fr:r,fc:c,tr:lr,tc:lc,captures:[[cr,cc]]}); lr+=dr; lc+=dc; }
      }
    }
  } else {
    // Men: move forward one; capture one square in ANY diagonal direction (Russian rules).
    const fwd:[number,number][] = isRed ? [[-1,-1],[-1,1]] : [[1,-1],[1,1]];
    for(const[dr,dc] of fwd){
      const nr=r+dr,nc=c+dc;
      if(inb(nr,nc) && !b[nr][nc] && !mustCapture) moves.push({fr:r,fc:c,tr:nr,tc:nc});
    }
    for(const[dr,dc] of ALL){
      const nr=r+dr,nc=c+dc;
      if(inb(nr,nc) && enemy(b[nr][nc])){
        const jr=nr+dr,jc=nc+dc;
        if(inb(jr,jc) && !b[jr][jc]) moves.push({fr:r,fc:c,tr:jr,tc:jc,captures:[[nr,nc]]});
      }
    }
  }
  return moves;
}

function allCheckerMoves(b:CheckersBoard, color:"r"|"b"): CheckerMove[] {
  const all:CheckerMove[]=[];
  for(let r=0;r<8;r++) for(let c=0;c<8;c++){
    const p=b[r][c]; if(!p) continue;
    const isColor=(color==="r"&&(p==="r"||p==="R"))||(color==="b"&&(p==="b"||p==="B"));
    if(!isColor) continue;
    all.push(...getCheckerMoves(b,r,c));
  }
  // mandatory capture: if any capture exists, plain moves are forbidden
  const captures=all.filter(m=>m.captures?.length);
  return captures.length?captures:all;
}

function applyCheckerMove(b:CheckersBoard, m:CheckerMove): CheckersBoard {
  const nb=b.map(row=>[...row]) as CheckersBoard;
  nb[m.tr][m.tc]=nb[m.fr][m.fc]; nb[m.fr][m.fc]=null;
  for(const[cr,cc] of (m.captures||[])) nb[cr][cc]=null;
  // king promotion (also mid-chain: the piece keeps capturing as a king afterwards)
  if(nb[m.tr][m.tc]==="r"&&m.tr===0) nb[m.tr][m.tc]="R";
  if(nb[m.tr][m.tc]==="b"&&m.tr===7) nb[m.tr][m.tc]="B";
  return nb;
}

function Checkers({ lang }: { lang: Lang }) {
  const mobile = useIsMobile();
  const cell = mobile ? 38 : 50;
  const piece = mobile ? 27 : 37;
  const files = ["a","b","c","d","e","f","g","h"];
  const [board, setBoard] = useState(initCheckers);
  const [selected, setSelected] = useState<[number,number]|null>(null);
  const [validMoves, setValidMoves] = useState<CheckerMove[]>([]);
  const [chaining, setChaining] = useState<[number,number]|null>(null); // piece locked in a capture chain
  const [turn, setTurn] = useState<"r"|"b">("r");
  const [status, setStatus] = useState<"playing"|"red_wins"|"black_wins">("playing");

  const allRed = allCheckerMoves(board,"r"); // already capture-filtered when captures exist

  function selectRed(r:number,c:number){
    setSelected([r,c]); setValidMoves(allRed.filter(m=>m.fr===r&&m.fc===c));
  }

  function aiTurn(){
    setTurn("b");
    setTimeout(()=>{
      setBoard(prev=>{
        const bMoves=allCheckerMoves(prev,"b");
        if(!bMoves.length){ setStatus("red_wins"); fireWin("checkers"); return prev; }
        const pick=bMoves[Math.floor(Math.random()*bMoves.length)];
        let nb2=applyCheckerMove(prev,pick);
        // mandatory chain: AI keeps capturing with the same piece until no capture remains
        if(pick.captures?.length){
          let cr=pick.tr, cc=pick.tc;
          let further=getCheckerMoves(nb2,cr,cc,true).filter(m=>m.captures?.length);
          while(further.length){
            const nxt=further[Math.floor(Math.random()*further.length)];
            nb2=applyCheckerMove(nb2,nxt);
            cr=nxt.tr; cc=nxt.tc;
            further=getCheckerMoves(nb2,cr,cc,true).filter(m=>m.captures?.length);
          }
        }
        const rm=allCheckerMoves(nb2,"r");
        if(!rm.length) setStatus("black_wins"); // no moves or no pieces = loss
        return nb2;
      });
      setTurn("r");
    }, 500);
  }

  function handleClick(r:number, c:number) {
    if(status!=="playing"||turn!=="r") return;
    const p=board[r][c];
    if(selected){
      const mv=validMoves.find(m=>m.tr===r&&m.tc===c);
      if(mv){
        const nb=applyCheckerMove(board,mv);
        if(mv.captures?.length){
          // forced continuation: if the same piece can capture again, the turn is NOT passed
          const further=getCheckerMoves(nb,mv.tr,mv.tc,true).filter(m=>m.captures?.length);
          if(further.length){
            setBoard(nb); setSelected([mv.tr,mv.tc]); setValidMoves(further); setChaining([mv.tr,mv.tc]);
            return;
          }
        }
        setBoard(nb); setSelected(null); setValidMoves([]); setChaining(null);
        const bm=allCheckerMoves(nb,"b");
        if(!bm.length){ setStatus("red_wins"); fireWin("checkers"); return; }
        aiTurn();
        return;
      }
      if(chaining) return; // mid-chain: cannot switch piece or abort the capture
      if(p==="r"||p==="R"){ selectRed(r,c); return; }
      setSelected(null); setValidMoves([]);
    } else {
      if(p==="r"||p==="R") selectRed(r,c);
    }
  }

  function reset(){ setBoard(initCheckers()); setSelected(null); setValidMoves([]); setChaining(null); setTurn("r"); setStatus("playing"); }

  const coordStyle:React.CSSProperties={fontSize:"10px",color:"rgba(232,213,176,0.65)"};

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"}}>
      <div className="glass-panel-sm" style={{padding:"10px 32px",textAlign:"center"}}>
        {status==="red_wins"&&<span style={{fontWeight:700,color:"#10B981",fontSize:"16px"}}>{t("games.win",lang)}</span>}
        {status==="black_wins"&&<span style={{fontWeight:700,color:"#ef4444",fontSize:"16px"}}>{t("games.lose",lang)}</span>}
        {status==="playing"&&<span style={{fontWeight:600,color:"rgb(232,232,240)",fontSize:"15px"}}>{turn==="r"?t("games.checkers.yourTurn",lang):t("games.thinking",lang)}</span>}
      </div>
      <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch" as any}}>
        <div className="glass-panel" style={{padding:"10px",display:"inline-block"}}>
          <div style={{display:"flex",paddingLeft:"20px",marginBottom:"2px"}}>
            {files.map(l=><div key={l} style={{...coordStyle,width:`${cell}px`,textAlign:"center"}}>{l}</div>)}
          </div>
          {board.map((row,r)=>(
            <div key={r} style={{display:"flex",alignItems:"center"}}>
              <div style={{...coordStyle,width:"20px",textAlign:"right",paddingRight:"4px"}}>{8-r}</div>
              {row.map((sq,c)=>{
                const isDark=(r+c)%2===1;
                const isSel=selected?.[0]===r&&selected?.[1]===c;
                const isTarget=validMoves.some(m=>m.tr===r&&m.tc===c);
                let shadow="none";
                if(isSel) shadow="inset 0 0 0 3px #8B5CF6, inset 0 0 14px rgba(124,58,237,0.6)";
                else if(isTarget) shadow="inset 0 0 0 3px rgba(16,185,129,0.9)";
                return (
                  <button key={c} onClick={()=>handleClick(r,c)} style={{
                    width:`${cell}px`,height:`${cell}px`,display:"flex",alignItems:"center",justifyContent:"center",
                    border:"none",cursor:"pointer",padding:0,
                    background:isDark?"#7A4F26":"rgba(232,213,176,0.92)",
                    boxShadow:shadow,transition:"box-shadow 0.12s"
                  }}>
                    {sq&&<div style={{
                      width:`${piece}px`,height:`${piece}px`,borderRadius:"50%",
                      background:(sq==="r"||sq==="R")
                        ?"radial-gradient(circle at 35% 30%, #F87171 0%, #DC2626 55%, #7F1D1D 100%)"
                        :"radial-gradient(circle at 35% 30%, #4B5563 0%, #1F2937 55%, #0B0F1A 100%)",
                      border:(sq==="r"||sq==="R")?"2px solid rgba(255,255,255,0.4)":"2px solid rgba(148,163,184,0.55)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:mobile?"14px":"18px",lineHeight:1,color:"#FBBF24",
                      boxShadow:"0 2px 5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.25)"
                    }}>{(sq==="R"||sq==="B")?"♛":""}</div>}
                    {isTarget&&!sq&&<div style={{width:"12px",height:"12px",borderRadius:"50%",background:"rgba(16,185,129,0.85)",boxShadow:"0 0 8px rgba(16,185,129,0.9)",pointerEvents:"none"}}/>}
                  </button>
                );
              })}
              <div style={{...coordStyle,width:"20px",paddingLeft:"4px"}}>{8-r}</div>
            </div>
          ))}
          <div style={{display:"flex",paddingLeft:"20px",marginTop:"2px"}}>
            {files.map(l=><div key={l} style={{...coordStyle,width:`${cell}px`,textAlign:"center"}}>{l}</div>)}
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:"16px",alignItems:"center"}}>
        <div style={{fontSize:"12px",color:"rgb(107,114,128)"}}>
          <span style={{display:"inline-block",width:"12px",height:"12px",borderRadius:"50%",background:"radial-gradient(circle at 35% 30%, #F87171, #DC2626)",border:"1px solid rgba(255,255,255,0.4)",marginRight:"4px",verticalAlign:"middle"}}/>{t("games.checkers.youLabel",lang)}
          &nbsp;&nbsp;
          <span style={{display:"inline-block",width:"12px",height:"12px",borderRadius:"50%",background:"radial-gradient(circle at 35% 30%, #4B5563, #1F2937)",border:"1px solid rgba(148,163,184,0.55)",marginRight:"4px",verticalAlign:"middle"}}/>{t("games.checkers.aifaLabel",lang)}
        </div>
        <button onClick={reset} style={{background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.25)",color:"#7C3AED",padding:"8px 18px",borderRadius:"12px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>{t("games.newGame",lang)}</button>
      </div>
    </div>
  );
}

// ─── Backgammon ───────────────────────────────────────────────────────────────
// White = player (moves 24→1, bears off at 0), Black = AI (moves 1→24, bears off at 25)
// points[0..23]: positive = white checkers, negative = black checkers
// bar[0]=white on bar, bar[1]=black on bar
// off[0]=white off, off[1]=black off

interface BgState {
  points: number[];
  bar: [number,number];
  off: [number,number];
  dice: number[];
  usedDice: boolean[];
  turn: "white"|"black";
  selected: number|"bar"|null;
  phase: "roll"|"move"|"done";
  winner: "white"|"black"|null;
  msg: string;
}

function initBg(rollMsg = "Roll to start!"): BgState {
  const pts = Array(24).fill(0);
  pts[23]=2; pts[12]=5; pts[7]=3; pts[5]=5;
  pts[0]=-2; pts[11]=-5; pts[16]=-3; pts[18]=-5;
  return { points:pts, bar:[0,0], off:[0,0], dice:[], usedDice:[], turn:"white", selected:null, phase:"roll", winner:null, msg:rollMsg };
}

function rollDie(){ return Math.floor(Math.random()*6)+1; }

function bgValidMoves(st:BgState, die:number): {from:number|"bar"; to:number|"off"}[] {
  const isWhite=st.turn==="white";
  const moves:{from:number|"bar";to:number|"off"}[]=[];

  if(isWhite){
    // check if must enter from bar
    if(st.bar[0]>0){
      // white enters on points 19-24 (indices 18-23), die=1 → idx23, die=6 → idx18
      const to=24-die; // point number minus 1 for 0-index
      if(to>=0&&to<=23&&st.points[to]>=-1) moves.push({from:"bar",to});
      return moves;
    }
    // check bearing off — ALL white checkers must be in home (indices 0-5) and none on the bar
    const allHome=st.points.slice(6).every(v=>v<=0)&&st.bar[0]===0;
    for(let idx=0;idx<24;idx++){
      if(st.points[idx]<=0) continue;
      const toIdx=idx-die;
      if(toIdx<0){
        if(allHome){
          // exact bear off, or overshoot only from the farthest (highest-index) occupied point
          const highestOccupied=st.points.slice(0,6).reduce((acc,v,i)=>v>0?i:acc,-1);
          if(toIdx===-1||(toIdx<-1&&idx===highestOccupied)) moves.push({from:idx,to:"off"});
        }
      } else {
        if(st.points[toIdx]>=-1) moves.push({from:idx,to:toIdx});
      }
    }
  } else {
    // black moves from low idx to high idx
    if(st.bar[1]>0){
      const to=die-1; // point die (1-indexed) → index die-1
      if(to>=0&&to<=23&&st.points[to]<=1) moves.push({from:"bar",to});
      return moves;
    }
    // ALL black checkers must be in home (indices 18-23) and none on the bar
    const allHome=st.points.slice(0,18).every(v=>v>=0)&&st.bar[1]===0;
    for(let idx=0;idx<24;idx++){
      if(st.points[idx]>=0) continue;
      const toIdx=idx+die;
      if(toIdx>23){
        if(allHome){
          // exact bear off, or overshoot only from the farthest (lowest-index) occupied point
          const fi=st.points.slice(18,24).findIndex(v=>v<0);
          const farthestOccupied=fi===-1?-1:18+fi;
          if(toIdx===24||(toIdx>24&&idx===farthestOccupied)) moves.push({from:idx,to:"off"});
        }
      } else {
        if(st.points[toIdx]<=1) moves.push({from:idx,to:toIdx});
      }
    }
  }
  return moves;
}

function applyBgMove(st:BgState, from:number|"bar", to:number|"off", dieIdx:number, lang:Lang="en", sim=false): BgState {
  const ns:BgState=JSON.parse(JSON.stringify(st));
  const isWhite=st.turn==="white";
  ns.usedDice=[...st.usedDice]; ns.usedDice[dieIdx]=true;

  if(from==="bar"){
    if(isWhite) ns.bar[0]--; else ns.bar[1]--;
  } else {
    const fi=from as number;
    if(isWhite) ns.points[fi]--; else ns.points[fi]++;
  }

  if(to==="off"){
    if(isWhite) ns.off[0]++; else ns.off[1]++;
    if(isWhite&&ns.off[0]===15){ ns.phase="done"; ns.winner="white"; ns.msg=t("games.win",lang); if(!sim) fireWin("backgammon"); }
    if(!isWhite&&ns.off[1]===15){ ns.phase="done"; ns.winner="black"; ns.msg=t("games.lose",lang); }
  } else {
    const ti=to as number;
    // blot hit
    if(isWhite&&ns.points[ti]===-1){ ns.points[ti]=1; ns.bar[1]++; }
    else if(!isWhite&&ns.points[ti]===1){ ns.points[ti]=-1; ns.bar[0]++; }
    else { if(isWhite) ns.points[ti]++; else ns.points[ti]--; }
  }
  return ns;
}

function bgCanMove(st:BgState): boolean {
  return st.dice.some((d,i)=>!st.usedDice[i]&&bgValidMoves(st,d).length>0);
}

interface BgMoveC { from:number|"bar"; to:number|"off"; dieIdx:number; }
// Max number of remaining dice that can still be played from this position.
function bgMaxPlayable(st:BgState):number{
  const remaining=st.dice.filter((_,j)=>!st.usedDice[j]).length;
  if(remaining===0) return 0;
  let best=0;
  const tried=new Set<number>();
  for(let i=0;i<st.dice.length;i++){
    if(st.usedDice[i]||tried.has(st.dice[i])) continue;
    tried.add(st.dice[i]);
    for(const mv of bgValidMoves(st,st.dice[i])){
      const sub=1+bgMaxPlayable(applyBgMove(st,mv.from,mv.to,i,"en",true));
      if(sub>best) best=sub;
      if(best>=remaining) return best;
    }
  }
  return best;
}
// Legal moves under the full rule: both dice must be played if possible;
// if only one die can be played, the LARGER one must be chosen when playable.
function bgAllowedMoves(st:BgState): BgMoveC[] {
  if(st.winner) return [];
  const cands:{mv:BgMoveC;count:number}[]=[];
  const tried=new Set<number>();
  for(let i=0;i<st.dice.length;i++){
    if(st.usedDice[i]||tried.has(st.dice[i])) continue;
    tried.add(st.dice[i]);
    for(const mv of bgValidMoves(st,st.dice[i])){
      const after=applyBgMove(st,mv.from,mv.to,i,"en",true);
      cands.push({mv:{from:mv.from,to:mv.to,dieIdx:i},count:1+bgMaxPlayable(after)});
    }
  }
  if(!cands.length) return [];
  const M=Math.max(...cands.map(c=>c.count));
  let pool=cands.filter(c=>c.count===M);
  const vals=Array.from(new Set(st.dice.filter((_,j)=>!st.usedDice[j])));
  if(vals.length===2&&M===1){
    const hi=Math.max(vals[0],vals[1]);
    const hiPool=pool.filter(c=>st.dice[c.mv.dieIdx]===hi);
    if(hiPool.length) pool=hiPool;
  }
  return pool.map(c=>c.mv);
}
// Can white hit a black blot standing on idx next roll? (direct shots + entry from the bar)
function bgWhiteThreat(st:BgState,idx:number):boolean{
  for(let d=1;d<=6;d++){ const j=idx+d; if(j<=23&&st.points[j]>0) return true; }
  return st.bar[0]>0&&idx>=18;
}
// Greedy AI heuristic: hit blot > make point > escape rear checker > bear off; avoid leaving blots.
function bgScoreAi(st:BgState,mv:BgMoveC):number{
  let s=Math.random()*2;
  if(mv.from==="bar") s+=25;
  if(mv.to==="off") return s+30;
  const ti=mv.to as number;
  if(st.points[ti]===1) s+=130; // hit a white blot
  const after=applyBgMove(st,mv.from,mv.to,mv.dieIdx,"en",true);
  if(after.points[ti]<=-2) s+=55; // made / kept a point
  else if(after.points[ti]===-1&&bgWhiteThreat(after,ti)) s-=60; // exposed blot at destination
  if(typeof mv.from==="number"&&after.points[mv.from]===-1&&bgWhiteThreat(after,mv.from)) s-=45; // blot left behind
  let rear=-1; for(let i2=0;i2<24;i2++){ if(st.points[i2]<0){ rear=i2; break; } }
  if(mv.from===rear) s+=12; // advance the rearmost checker
  s+=st.dice[mv.dieIdx]*1.5;
  return s;
}

const BG_PIPS: Record<number, number[]> = {1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function BgDie({ v, used, size }: { v:number; used:boolean; size:number }) {
  const pip = Math.max(5, Math.round(size*0.15));
  return (
    <div style={{
      width:`${size}px`,height:`${size}px`,borderRadius:`${Math.round(size*0.22)}px`,flexShrink:0,
      background:used?"linear-gradient(145deg,#1A2032,#0E1220)":"linear-gradient(145deg,#FDFDF8 0%,#E8E8DE 60%,#CFCFC2 100%)",
      border:used?"1px solid rgba(107,114,128,0.35)":"1px solid rgba(212,162,76,0.55)",
      boxShadow:used?"inset 0 0 6px rgba(0,0,0,0.4)":"0 4px 10px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.8)",
      display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"repeat(3,1fr)",
      padding:`${Math.round(size*0.15)}px`,opacity:used?0.55:1,transition:"opacity 0.2s, background 0.2s",
    }}>
      {Array.from({length:9}).map((_,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          {BG_PIPS[v]?.includes(i)&&(
            <div style={{width:`${pip}px`,height:`${pip}px`,borderRadius:"50%",
              background:used?"rgba(107,114,128,0.55)":"radial-gradient(circle at 35% 30%, #2A2F45, #0B0F1A)",
              boxShadow:used?"none":"inset 0 1px 1px rgba(0,0,0,0.6)"}}/>
          )}
        </div>
      ))}
    </div>
  );
}

function Backgammon({ lang }: { lang: Lang }) {
  const mobile = useIsMobile();
  const ptW = mobile ? 30 : 44;
  const barW = mobile ? 26 : 36;
  const chkSz = mobile ? 21 : 29;
  const pointH = mobile ? 120 : 160;
  const midGap = mobile ? 14 : 20;
  const [st, setSt] = useState<BgState>(()=>initBg(t("games.bg.rollToStart",lang)));

  function roll(){
    if(st.phase!=="roll") return;
    const d1=rollDie(), d2=rollDie();
    const dice=d1===d2?[d1,d1,d1,d1]:[d1,d2];
    const ns={...st, dice, usedDice:Array(dice.length).fill(false), phase:"move" as const, msg:`${dice.join(", ")}. ${t("games.bg.selectChecker",lang)}`, selected:null};
    const allowed=bgAllowedMoves(ns);
    if(!allowed.length){
      // show "no moves" for 1.2s before passing the turn
      setSt({...ns, msg:`${dice.join(", ")} — ${t("games.bg.noMoves",lang)}`});
      setTimeout(()=>endTurn({...ns}),1200);
      return;
    }
    if(d1!==d2){
      const hi=Math.max(d1,d2), lo=Math.min(d1,d2);
      const usable=new Set(allowed.map(m=>dice[m.dieIdx]));
      if(usable.size===1&&usable.has(hi)&&bgValidMoves(ns,lo).length>0)
        ns.msg=`${dice.join(", ")}. ${t("games.bg.playLarger",lang)}`;
    }
    setSt(ns);
  }

  function endTurn(state:BgState){
    if(state.winner) return;
    const nextTurn = state.turn==="white"?"black":"white";
    const ns={...state, turn:nextTurn as "white"|"black", phase:"roll" as const, dice:[], usedDice:[], selected:null, msg:nextTurn==="black"?t("games.bg.aifaTurn",lang):t("games.bg.yourTurn",lang)};
    setSt(ns);
    if(nextTurn==="black") setTimeout(()=>doAiTurn(ns),600);
  }

  function doAiTurn(state:BgState){
    const d1=rollDie(), d2=rollDie();
    const dice=d1===d2?[d1,d1,d1,d1]:[d1,d2];
    let cur:BgState={...state, dice, usedDice:Array(dice.length).fill(false), phase:"move" as const};
    let allowed=bgAllowedMoves(cur);
    if(!allowed.length){
      setSt({...cur, msg:t("games.bg.noMoves",lang)});
      setTimeout(()=>setSt({...cur, turn:"white" as const, phase:"roll" as const, dice:[], usedDice:[], selected:null, msg:t("games.bg.yourTurn",lang)}),1200);
      return;
    }
    while(allowed.length&&!cur.winner){
      let best=allowed[0], bs=-Infinity;
      for(const m of allowed){ const s=bgScoreAi(cur,m); if(s>bs){ bs=s; best=m; } }
      cur=applyBgMove(cur,best.from,best.to,best.dieIdx,lang);
      if(cur.winner) break;
      allowed=bgAllowedMoves(cur);
    }
    if(cur.winner){ setSt({...cur,msg:t("games.lose",lang),phase:"done"}); return; }
    const ns2={...cur,turn:"white" as const,phase:"roll" as const,dice:[],usedDice:[],selected:null,msg:t("games.bg.yourTurn",lang)};
    setSt(ns2);
  }

  function handlePointClick(idx:number){
    if(st.phase!=="move"||st.turn!=="white") return;
    if(st.selected===null||st.selected==="bar"){
      if(st.bar[0]>0){
        setSt({...st,selected:"bar",msg:t("games.bg.selectTarget",lang)});
      } else if(st.points[idx]>0){
        setSt({...st,selected:idx,msg:t("games.bg.selectMove",lang)});
      }
      return;
    }
    // attempt move (only moves that keep the maximum number of dice playable)
    const allowed=bgAllowedMoves(st);
    const mv=allowed.find(m=>m.from===st.selected&&m.to===idx);
    if(mv){
      const ns=applyBgMove(st,mv.from,mv.to,mv.dieIdx,lang);
      if(ns.winner){ setSt(ns); return; }
      const remaining=ns.dice.filter((_,j)=>!ns.usedDice[j]);
      if(!remaining.length){ endTurn({...ns,selected:null}); return; }
      if(!bgAllowedMoves(ns).length){
        setSt({...ns,selected:null,msg:t("games.bg.noMoves",lang)});
        setTimeout(()=>endTurn({...ns,selected:null}),1200);
        return;
      }
      setSt({...ns,selected:null,msg:t("games.bg.selectChecker",lang)});
      return;
    }
    // reselect
    if(st.points[idx]>0) setSt({...st,selected:idx});
    else setSt({...st,selected:null,msg:t("games.bg.selectChecker",lang)});
  }

  function handleBarClick(){
    if(st.phase!=="move"||st.turn!=="white") return;
    if(st.bar[0]>0) setSt({...st,selected:"bar",msg:t("games.bg.selectTarget",lang)});
  }

  function handleBearOff(){
    if(st.phase!=="move"||st.turn!=="white"||st.selected===null||st.selected==="bar") return;
    const from=st.selected as number;
    const mv=bgAllowedMoves(st).find(m=>m.from===from&&m.to==="off");
    if(mv){
      const ns=applyBgMove(st,mv.from,mv.to,mv.dieIdx,lang);
      if(ns.winner){ setSt(ns); return; }
      const remaining=ns.dice.filter((_,j)=>!ns.usedDice[j]);
      if(!remaining.length){ endTurn({...ns,selected:null}); return; }
      if(!bgAllowedMoves(ns).length){
        setSt({...ns,selected:null,msg:t("games.bg.noMoves",lang)});
        setTimeout(()=>endTurn({...ns,selected:null}),1200);
        return;
      }
      setSt({...ns,selected:null,msg:t("games.bg.selectChecker",lang)});
      return;
    }
  }

  const pts=st.points;
  const allowedNow = (st.phase==="move"&&st.turn==="white") ? bgAllowedMoves(st) : [];
  const triA="rgba(124,58,237,0.35)", triB="rgba(6,182,212,0.25)";
  const barH = pointH*2 + midGap;

  function checkerStyle(isWhiteChk:boolean, glow:boolean): React.CSSProperties {
    return {
      width:`${chkSz}px`,height:`${chkSz}px`,borderRadius:"50%",flexShrink:0,zIndex:1,position:"relative",
      background:isWhiteChk
        ?"radial-gradient(circle at 35% 30%, #F5F5F0 0%, #E2E2DA 45%, #C9C9C0 100%)"
        :"radial-gradient(circle at 35% 30%, #3A3F55 0%, #232840 50%, #12141F 100%)",
      border:isWhiteChk?"1px solid rgba(255,255,255,0.6)":"1px solid rgba(6,182,212,0.55)",
      boxShadow:glow
        ?"0 0 10px rgba(124,58,237,0.9), 0 2px 5px rgba(0,0,0,0.55)"
        :"0 2px 5px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.15)",
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:"10px",fontWeight:700,color:isWhiteChk?"#111":"#67E8F9",
      transition:"box-shadow 0.15s",
    };
  }

  function renderPoint(idx:number, top:boolean){
    const count=Math.abs(pts[idx]);
    const isWhiteChk=pts[idx]>0;
    const isSel=st.selected===idx;
    const isTarget=st.selected!==null && allowedNow.some(m=>m.from===st.selected&&m.to===idx);
    const tri=idx%2===0?triA:triB;
    const shown=Math.min(count,5);
    return (
      <button key={idx} onClick={()=>handlePointClick(idx)} className="bgm-pt" style={{
        width:`${ptW}px`,height:`${pointH}px`,position:"relative",padding:"2px 0",border:"none",
        background:"transparent",cursor:"pointer",
        display:"flex",flexDirection:top?"column":"column-reverse",alignItems:"center",justifyContent:"flex-start",gap:"2px",
      }}>
        <svg width={ptW} height={pointH} viewBox={`0 0 ${ptW} ${pointH}`} style={{position:"absolute",inset:0,pointerEvents:"none",filter:isTarget?"drop-shadow(0 0 7px rgba(16,185,129,0.75))":isSel?"drop-shadow(0 0 7px rgba(124,58,237,0.75))":"none"}}>
          <polygon
            points={top?`1,1 ${ptW-1},1 ${ptW/2},${pointH*0.94}`:`1,${pointH-1} ${ptW-1},${pointH-1} ${ptW/2},${pointH*0.06}`}
            fill={isTarget?"rgba(16,185,129,0.28)":isSel?"rgba(124,58,237,0.45)":tri}
            stroke={isTarget?"rgba(16,185,129,0.9)":isSel?"#7C3AED":"rgba(255,255,255,0.07)"}
            strokeWidth={isTarget||isSel?1.5:1}
          />
        </svg>
        {Array.from({length:shown}).map((_,i)=>(
          <div key={i} style={checkerStyle(isWhiteChk,isSel&&i===shown-1)}>
            {i===shown-1&&count>5?count:""}
          </div>
        ))}
        {isTarget&&count===0&&<div style={{width:"12px",height:"12px",borderRadius:"50%",background:"rgba(16,185,129,0.85)",boxShadow:"0 0 8px rgba(16,185,129,0.9)",zIndex:1,margin:"6px 0"}}/>}
      </button>
    );
  }

  const bearOffPossible = st.selected!==null && st.selected!=="bar" && allowedNow.some(m=>m.from===st.selected&&m.to==="off");

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
      <style>{`.bgm-pt{transition:filter .15s;} .bgm-pt:hover{filter:brightness(1.3);}`}</style>
      <div className="glass-panel-sm" style={{padding:"8px 24px",textAlign:"center",fontSize:"14px",fontWeight:600,color:"rgb(232,232,240)"}}>
        {st.msg}
      </div>
      {/* Dice */}
      <div style={{display:"flex",gap:"10px",alignItems:"center",minHeight:`${mobile?40:48}px`}}>
        {st.dice.length>0
          ? st.dice.map((d,i)=>(<BgDie key={i} v={d} used={st.usedDice[i]} size={mobile?38:46}/>))
          : <div style={{fontSize:"12px",color:"rgb(107,114,128)"}}>{t("games.bg.rollPrompt",lang)}</div>}
      </div>

      {/* Board */}
      <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch" as any,maxWidth:"100%"}}>
        <div style={{
          display:"inline-block",padding:mobile?"8px":"12px",borderRadius:"16px",
          background:"linear-gradient(145deg,#4A3521 0%,#2A1D0E 45%,#3A2915 100%)",
          border:"1px solid rgba(212,162,76,0.4)",
          boxShadow:"0 10px 30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}>
          <div style={{
            display:"flex",alignItems:"stretch",gap:mobile?"3px":"5px",
            background:"linear-gradient(180deg,#0B0F1A 0%,#101830 55%,#0B0F1A 100%)",
            borderRadius:"10px",padding:mobile?"4px":"6px",
            border:"1px solid rgba(6,182,212,0.14)",boxShadow:"inset 0 0 22px rgba(0,0,0,0.6)",
          }}>
            {/* Left half: points 13-18 (top) / 12-7 (bottom) */}
            <div style={{display:"flex",flexDirection:"column"}}>
              <div style={{display:"flex",gap:"2px"}}>{[12,13,14,15,16,17].map(i=>renderPoint(i,true))}</div>
              <div style={{height:`${midGap}px`}}/>
              <div style={{display:"flex",gap:"2px"}}>{[11,10,9,8,7,6].map(i=>renderPoint(i,false))}</div>
            </div>
            {/* Bar */}
            <button onClick={handleBarClick} style={{
              width:`${barW}px`,height:`${barH}px`,alignSelf:"center",
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"3px",padding:"6px 0",
              background:"linear-gradient(180deg,#3A2915 0%,#211505 50%,#3A2915 100%)",
              border:st.selected==="bar"?"1px solid #7C3AED":"1px solid rgba(212,162,76,0.35)",
              boxShadow:st.selected==="bar"?"0 0 10px rgba(124,58,237,0.6), inset 0 0 10px rgba(0,0,0,0.6)":"inset 0 0 10px rgba(0,0,0,0.6)",
              borderRadius:"6px",cursor:"pointer",
            }}>
              {st.bar[0]>0&&Array.from({length:Math.min(st.bar[0],3)}).map((_,i)=>(
                <div key={"w"+i} style={checkerStyle(true,st.selected==="bar"&&i===0)}>{i===0&&st.bar[0]>3?st.bar[0]:""}</div>
              ))}
              <div style={{fontSize:"8px",letterSpacing:"1px",color:"rgba(212,162,76,0.75)",fontWeight:700}}>BAR</div>
              {st.bar[1]>0&&Array.from({length:Math.min(st.bar[1],3)}).map((_,i)=>(
                <div key={"b"+i} style={checkerStyle(false,false)}>{i===0&&st.bar[1]>3?st.bar[1]:""}</div>
              ))}
            </button>
            {/* Right half: points 19-24 (top) / 6-1 (bottom) */}
            <div style={{display:"flex",flexDirection:"column"}}>
              <div style={{display:"flex",gap:"2px"}}>{[18,19,20,21,22,23].map(i=>renderPoint(i,true))}</div>
              <div style={{height:`${midGap}px`}}/>
              <div style={{display:"flex",gap:"2px"}}>{[5,4,3,2,1,0].map(i=>renderPoint(i,false))}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Off + controls */}
      <div style={{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
        <div style={{fontSize:"12px",color:"rgb(107,114,128)"}}>
          Off: <span style={{color:"#F5F5F0"}}>⬤{st.off[0]}</span> <span style={{color:"#67E8F9"}}>⬤{st.off[1]}</span>
          &nbsp;|&nbsp;Bar: <span style={{color:"#F5F5F0"}}>⬤{st.bar[0]}</span> <span style={{color:"#67E8F9"}}>⬤{st.bar[1]}</span>
        </div>
        {st.phase==="roll"&&st.turn==="white"&&(
          <button onClick={roll} style={{background:"rgba(124,58,237,0.15)",border:"1px solid rgba(124,58,237,0.4)",color:"#7C3AED",padding:"8px 20px",borderRadius:"12px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>{t("games.bg.rollDice",lang)}</button>
        )}
        {bearOffPossible&&(
          <button onClick={handleBearOff} style={{background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",color:"#10B981",padding:"8px 16px",borderRadius:"12px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>{t("games.bg.bearOff",lang)}</button>
        )}
        <button onClick={()=>setSt(initBg(t("games.bg.rollToStart",lang)))} style={{background:"rgba(124,58,237,0.08)",border:"1px solid rgba(124,58,237,0.2)",color:"#7C3AED",padding:"8px 16px",borderRadius:"12px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>{t("games.newGame",lang)}</button>
      </div>
      <div style={{fontSize:"11px",color:"rgb(107,114,128)"}}>{t("games.bg.label",lang)}</div>
    </div>
  );
}

// ─── GamesArena wrapper ───────────────────────────────────────────────────────
type GameId = "chess"|"ttt"|"checkers"|"backgammon"|"tetris";

function GamesArena({ tetrisSlot }: { tetrisSlot?: React.ReactNode } = {}) {
  const { lang } = useLang();
  const mobile = useIsMobile();
  const [active, setActive] = useState<GameId>("chess");
  const [keys, setKeys] = useState<Record<GameId,number>>({chess:0,ttt:0,checkers:0,backgammon:0,tetris:0});

  const games = [
    {id:"chess"      as GameId, icon:"♟", label:t("games.chess",lang),       desc:t("games.chess.desc",lang)},
    {id:"ttt"        as GameId, icon:"✕", label:t("games.ttt",lang),         desc:t("games.ttt.desc",lang)},
    {id:"checkers"   as GameId, icon:"⬤", label:t("games.checkers",lang),    desc:t("games.checkers.desc",lang)},
    {id:"backgammon" as GameId, icon:"🎲", label:t("games.backgammon",lang),  desc:t("games.backgammon.desc",lang)},
    ...(tetrisSlot ? [{id:"tetris" as GameId, icon:"🧱", label:t("games.tetris",lang), desc:t("games.tetris.desc",lang)}] : []),
  ];

  function selectGame(id:GameId){
    setActive(id);
    setKeys(k=>({...k,[id]:k[id]+1}));
  }

  return (
    <div style={{maxWidth:"1280px",margin:"0 auto"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"}}>
        <div style={{width:"40px",height:"40px",borderRadius:"12px",background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px"}}>🎮</div>
        <div>
          <div style={{fontSize:"18px",fontWeight:700,color:"rgb(232,232,240)"}}>{t("games.title",lang)}</div>
          <div style={{fontSize:"12px",color:"rgb(107,114,128)"}}>{t("games.subtitle",lang)}</div>
        </div>
      </div>

      {/* Game selector — 2-col grid on mobile, row on desktop */}
      <div style={{display:"grid",gridTemplateColumns:mobile?"1fr 1fr":`repeat(${games.length},1fr)`,gap:"8px",marginBottom:"16px"}}>
        {games.map(g=>(
          <button key={g.id} onClick={()=>selectGame(g.id)} style={{
            display:"flex",alignItems:"center",gap:"8px",padding:mobile?"8px 12px":"10px 18px",borderRadius:"12px",
            fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif",transition:"all 0.15s",
            background:active===g.id?"rgba(124,58,237,0.2)":"rgba(15,15,25,0.6)",
            border:active===g.id?"1px solid rgba(124,58,237,0.5)":"1px solid rgba(124,58,237,0.15)",
            color:active===g.id?"#7C3AED":"rgb(107,114,128)"
          }}>
            <span style={{fontSize:"16px",flexShrink:0}}>{g.icon}</span>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",minWidth:0}}>
              <span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}}>{g.label}</span>
              <span style={{fontSize:"10px",fontWeight:400,color:active===g.id?"rgba(124,58,237,0.8)":"rgba(107,114,128,0.7)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}}>{g.desc}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Active game */}
      {active==="chess"      && <Chess        lang={lang} key={keys.chess}/>}
      {active==="ttt"        && <TicTacToe    lang={lang} key={keys.ttt}/>}
      {active==="checkers"   && <Checkers     lang={lang} key={keys.checkers}/>}
      {active==="backgammon" && <Backgammon   lang={lang} key={keys.backgammon}/>}
      {active==="tetris"     && tetrisSlot}
    </div>
  );
}

export default memo(GamesArena);
