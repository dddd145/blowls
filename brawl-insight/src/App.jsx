import { useState } from 'react';
import { BRAWLERS, MAPS } from './brawlData';
import './App.css';

function App() {
  const [selectedMapId, setSelectedMapId] = useState(MAPS[0].id);
  const [banned, setBanned] = useState([]);
  const [allyPicks, setAllyPicks] = useState([]);
  const [enemyPicks, setEnemyPicks] = useState([]);
  // 今どの枠（BAN / 味方 / 敵）を選択中かのモード
  const [activeSlot, setActiveSlot] = useState('enemy'); 

  const currentMap = MAPS.find(m => m.id === selectedMapId);

  // キャラをクリックした時の追加・削除処理
  const handleSelectBrawler = (id) => {
    // すでにどこかで選択済みなら解除する
    if (banned.includes(id)) return setBanned(banned.filter(b => b !== id));
    if (allyPicks.includes(id)) return setAllyPicks(allyPicks.filter(a => a !== id));
    if (enemyPicks.includes(id)) return setEnemyPicks(enemyPicks.filter(e => e !== id));

    // 選択中のモードに応じて追加（上限チェック付き）
    if (activeSlot === 'ban' && banned.length < 6) setBanned([...banned, id]);
    if (activeSlot === 'ally' && allyPicks.length < 2) setAllyPicks([...allyPicks, id]);
    if (activeSlot === 'enemy' && enemyPicks.length < 3) setEnemyPicks([...enemyPicks, id]);
  };

  // 全リセット
  const handleReset = () => {
    setBanned([]);
    setAllyPicks([]);
    setEnemyPicks([]);
  };

  // ★ おすすめピックのスコア計算ロジック ★
  const getRecommendations = () => {
    const unavailable = [...banned, ...allyPicks, ...enemyPicks];

    return BRAWLERS
      .filter(b => !unavailable.includes(b.id)) // すでに選ばれたキャラは除外
      .map(brawler => {
        let score = 0;
        let reasons = [];

        // 1. マップ適性スコア
        if (currentMap.tierS.includes(brawler.id)) {
          score += 10;
          reasons.push('マップ最強(Tier S)');
        } else if (currentMap.tierA.includes(brawler.id)) {
          score += 6;
          reasons.push('マップ適正高(Tier A)');
        }

        // 2. 敵ピックへの有利・不利計算
        enemyPicks.forEach(enemyId => {
          const enemy = BRAWLERS.find(e => e.id === enemyId);
          // 敵の苦手リストに自分が入っていれば有利（プラス）
          if (enemy && enemy.counters.includes(brawler.id)) {
            score += 7;
            reasons.push(`${enemy.name}に有利`);
          }
          // 自分の苦手リストに敵が入っていれば不利（マイナス）
          if (brawler.counters.includes(enemyId)) {
            score -= 8;
            reasons.push(`${enemy.name}がキツイ`);
          }
        });

        return { ...brawler, score, reasons };
      })
      .sort((a, b) => b.score - a.score) // 点数が高い順に並び替え
      .slice(0, 5); // トップ5を表示
  };

  const recommendations = getRecommendations();
  const getBrawlerName = (id) => BRAWLERS.find(b => b.id === id)?.name || id;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#ffb300', textShadow: '1px 1px 2px #000', margin: 0 }}>Brawl Insight 🎯</h1>
        <p style={{ margin: '5px 0', color: '#666' }}>ガチバトル リアルタイム・ドラフト支援</p>
      </header>

      {/* 1. マップ選択 ＆ リセット */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select 
          value={selectedMapId} 
          onChange={(e) => setSelectedMapId(e.target.value)}
          style={{ flex: 1, padding: '12px', fontSize: '16px', borderRadius: '8px', border: '2px solid #ddd', fontWeight: 'bold' }}
        >
          {MAPS.map(m => <option key={m.id} value={m.id}>🗺️ {m.name}</option>)}
        </select>
        <button onClick={handleReset} style={{ padding: '0 20px', borderRadius: '8px', border: 'none', background: '#555', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
          リセット
        </button>
      </div>

      {/* 2. ドラフト入力エリア（クリックで入力先を切り替え） */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {/* BAN枠 */}
        <div 
          onClick={() => setActiveSlot('ban')}
          style={{ padding: '12px', borderRadius: '8px', background: '#f5f5f5', border: activeSlot === 'ban' ? '3px solid #333' : '1px solid #ccc', cursor: 'pointer' }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🚫 BAN ({banned.length}/6)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {banned.map(id => <span key={id} style={{ background: '#333', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{getBrawlerName(id)}</span>)}
          </div>
        </div>

        {/* 味方枠 */}
        <div 
          onClick={() => setActiveSlot('ally')}
          style={{ padding: '12px', borderRadius: '8px', background: '#e3f2fd', border: activeSlot === 'ally' ? '3px solid #1976d2' : '1px solid #90caf9', cursor: 'pointer' }}
        >
          <div style={{ fontWeight: 'bold', color: '#0d47a1', marginBottom: '8px' }}>🔵 味方 ({allyPicks.length}/2)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {allyPicks.map(id => <span key={id} style={{ background: '#1976d2', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{getBrawlerName(id)}</span>)}
          </div>
        </div>

        {/* 敵枠 */}
        <div 
          onClick={() => setActiveSlot('enemy')}
          style={{ padding: '12px', borderRadius: '8px', background: '#ffebee', border: activeSlot === 'enemy' ? '3px solid #d32f2f' : '1px solid #ef9a9a', cursor: 'pointer' }}
        >
          <div style={{ fontWeight: 'bold', color: '#b71c1c', marginBottom: '8px' }}>🔴 相手 ({enemyPicks.length}/3)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {enemyPicks.map(id => <span key={id} style={{ background: '#d32f2f', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{getBrawlerName(id)}</span>)}
          </div>
        </div>
      </div>

      {/* 3. キャラ選択パレット */}
      <div style={{ background: '#fafafa', padding: '15px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '25px' }}>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
          上の枠をクリックして選択モードを切り替え、下のキャラを押して登録（もう一度押すと解除）：
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {BRAWLERS.map(b => {
            const isBanned = banned.includes(b.id);
            const isAlly = allyPicks.includes(b.id);
            const isEnemy = enemyPicks.includes(b.id);
            let bg = '#fff';
            let color = '#333';
            if (isBanned) { bg = '#424242'; color = '#fff'; }
            if (isAlly) { bg = '#1976d2'; color = '#fff'; }
            if (isEnemy) { bg = '#d32f2f'; color = '#fff'; }

            return (
              <button
                key={b.id}
                onClick={() => handleSelectBrawler(b.id)}
                style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid #ccc', background: bg, color: color, cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
              >
                {b.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. おすすめ結果表示 */}
      <section style={{ background: '#fffde7', padding: '20px', borderRadius: '10px', border: '2px solid #ffd54f' }}>
        <h3 style={{ marginTop: 0 }}>🔥 あなたへの最適ピック（トップ5）</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {recommendations.map((rec, idx) => (
            <div key={rec.id} style={{ background: '#fff', padding: '12px 16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 'bold' }}>
                  <span style={{ color: '#f57f17', marginRight: '8px' }}>#{idx + 1}</span>
                  {rec.name} 
                  <span style={{ fontSize: '12px', fontWeight: 'normal', background: '#eee', padding: '2px 8px', borderRadius: '4px', marginLeft: '8px' }}>{rec.role}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>
                  {rec.reasons.length > 0 ? rec.reasons.join(' ／ ') : '標準的な選択肢'}
                </div>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: rec.score > 0 ? '#2e7d32' : '#757575' }}>
                {rec.score > 0 ? `+${rec.score} pt` : `${rec.score} pt`}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;