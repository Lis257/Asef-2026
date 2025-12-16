import React, { useState } from 'react';

const DotsAndBoxes = ({ goBack }) => {
  const rows = 4, cols = 4;
  // Edges: horizontal (rows * cols-1), vertical (rows-1 * cols)
  // We represent state as objects of edges.
  const [hEdges, setHEdges] = useState(Array(rows).fill(0).map(() => Array(cols - 1).fill(null)));
  const [vEdges, setVEdges] = useState(Array(rows - 1).fill(0).map(() => Array(cols).fill(null)));
  const [boxes, setBoxes] = useState(Array(rows - 1).fill(0).map(() => Array(cols - 1).fill(null)));
  const [turn, setTurn] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });

  const checkBox = (r, c, h, v) => {
    // Check if box at r,c is closed
    return (h[r][c] && h[r+1][c] && v[r][c] && v[r][c+1]);
  }

  const handleEdge = (type, r, c) => {
    let madeBox = false;
    let newH = [...hEdges.map(row => [...row])];
    let newV = [...vEdges.map(row => [...row])];
    let newBoxes = [...boxes.map(row => [...row])];

    if (type === 'h') {
      if (newH[r][c]) return; // Taken
      newH[r][c] = turn;
    } else {
      if (newV[r][c]) return;
      newV[r][c] = turn;
    }

    // Check all boxes
    for(let i=0; i<rows-1; i++) {
        for(let j=0; j<cols-1; j++) {
            if (!newBoxes[i][j] && checkBox(i, j, newH, newV)) {
                newBoxes[i][j] = turn;
                madeBox = true;
            }
        }
    }

    if (type === 'h') setHEdges(newH); else setVEdges(newV);
    setBoxes(newBoxes);

    if (madeBox) {
        setScores({
            1: newBoxes.flat().filter(x => x === 1).length,
            2: newBoxes.flat().filter(x => x === 2).length
        });
    } else {
        setTurn(turn === 1 ? 2 : 1);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Dots & Boxes</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 10 }}>
        <span style={{color: turn===1 ? '#0ff' : '#aaa'}}>P1: {scores[1]}</span>
        <span style={{color: turn===2 ? '#f0f' : '#aaa'}}>P2: {scores[2]}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', padding: 20, borderRadius: 10 }}>
        {/* Render Grid */}
        {Array(rows).fill(0).map((_, r) => (
            <div key={`row-${r}`} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                    {Array(cols).fill(0).map((__, c) => (
                        <React.Fragment key={`cell-${r}-${c}`}>
                            <div style={{ width: 10, height: 10, background: '#000', borderRadius: '50%' }} />
                            {c < cols - 1 && (
                                <div 
                                    onClick={() => handleEdge('h', r, c)}
                                    style={{ 
                                        width: 50, height: 10, 
                                        background: hEdges[r][c] ? (hEdges[r][c]===1 ? '#0ff' : '#f0f') : '#ddd', 
                                        cursor: 'pointer' 
                                    }} 
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
                {r < rows - 1 && (
                    <div style={{ display: 'flex' }}>
                         {Array(cols).fill(0).map((__, c) => (
                            <React.Fragment key={`v-${r}-${c}`}>
                                <div 
                                    onClick={() => handleEdge('v', r, c)}
                                    style={{ 
                                        width: 10, height: 50, 
                                        background: vEdges[r][c] ? (vEdges[r][c]===1 ? '#0ff' : '#f0f') : '#ddd',
                                        cursor: 'pointer' 
                                    }} 
                                />
                                {c < cols - 1 && (
                                    <div style={{ 
                                        width: 50, height: 50, 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: boxes[r][c] ? (boxes[r][c]===1 ? 'rgba(0,255,255,0.3)' : 'rgba(255,0,255,0.3)') : 'transparent' 
                                    }}>
                                        {boxes[r][c] && (boxes[r][c]===1 ? 'P1' : 'P2')}
                                    </div>
                                )}
                            </React.Fragment>
                         ))}
                    </div>
                )}
            </div>
        ))}
      </div>
      <button className="back-btn" style={{marginTop: 20}} onClick={goBack}>Back</button>
    </div>
  );
};
export default DotsAndBoxes;