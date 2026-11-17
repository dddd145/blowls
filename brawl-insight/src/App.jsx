import { useState } from 'react'
import './App.css'

function App() {
  // 状態の管理（選択されたマップ、BAN、味方、敵など）
  const [selectedMap, setSelectedMap] = useState('流れ星（賞金稼ぎ）');
  const [enemyPicks, setEnemyPicks] = useState([]);
  const [allyPicks, setAllyPicks] = useState([]);

  // 仮のマップリストとおすすめキャラ
  const maps = ['流れ星（賞金稼ぎ）', 'オープンゾーン（ホットゾーン）', 'コールドスナイプ（ノックアウト）'];
  
  const recommendations = [
    { name: 'エリザベス', role: 'スナイパー', reason: '射線が通りやすく長距離で圧倒的有利' },
    { name: 'ナーニ', role: 'スナイパー', reason: '高いバースト火力で相手をワンパンできる' },
    { name: 'レオン', role: 'アサシン', reason: '草むらや側面からの奇襲が刺さるマップ' }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#ffcc00', textShadow: '1px 1px 2px #000' }}>Brawl Insight 🎯</h1>
        <p>ガチバトル（ドラフト）ピック・相性支援ツール</p>
      </header>

      {/* マップ選択セクション */}
      <section style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>🗺️ マップ選択</h3>
        <select 
          value={selectedMap} 
          onChange={(e) => setSelectedMap(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px' }}
        >
          {maps.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </section>

      {/* ドラフト状況セクション（味方 / 相手） */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: '#e3f2fd', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ color: '#0d47a1' }}>🔵 味方のピック</h4>
          <p style={{ fontSize: '14px', color: '#666' }}>（クリックして選択予定）</p>
        </div>
        <div style={{ flex: 1, background: '#ffebee', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ color: '#b71c1c' }}>🔴 相手のピック</h4>
          <p style={{ fontSize: '14px', color: '#666' }}>（クリックして選択予定）</p>
        </div>
      </div>

      {/* おすすめピック表示セクション */}
      <section style={{ background: '#fffde7', padding: '20px', borderRadius: '8px', border: '2px solid #ffd54f' }}>
        <h3>🔥 おすすめのピック指示</h3>
        <p>現在のマップ: <strong>{selectedMap}</strong> に最適なキャラ：</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recommendations.map((rec, index) => (
            <li key={index} style={{ background: '#fff', margin: '10px 0', padding: '12px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{index + 1}. {rec.name}</span>
                <span style={{ fontSize: '12px', background: '#eee', padding: '2px 8px', borderRadius: '4px' }}>{rec.role}</span>
              </div>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#555' }}>💡 {rec.reason}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App