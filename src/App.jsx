
import "./styles.css";
import React, { useState, useEffect, useRef } from "react";


// ---- PAGES ----
const PAGES = {
  AGENT: "agent",
  COINS: "coins",
  STAKING: "staking",
  HISTORY: "history",
  WALLET: "wallet",
};

// ---- MOCK DATA ----
const COINS = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 89620.6,
    change24h: -1.88,
    change7d: -1.16,
    marketCap: "1.79T",
    volume24h: "59.10B",
    dominance: "47.9%",
    circulatingSupply: "19.7M BTC",
    sparkline: [40, 55, 50, 70, 65, 80, 75, 90],
    holdings: 0.23,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3037.15,
    change24h: -2.83,
    change7d: 1.33,
    marketCap: "366.4B",
    volume24h: "22.87B",
    dominance: "20.0%",
    circulatingSupply: "120.1M ETH",
    sparkline: [38, 42, 45, 50, 53, 57, 60, 64],
    holdings: 1.8,
  },
  {
    name: "Tether USDT",
    symbol: "USDT",
    price: 1.0,
    change24h: 0.02,
    change7d: -0.02,
    marketCap: "185.7B",
    volume24h: "86.07B",
    dominance: "7.2%",
    circulatingSupply: "185.6B USDT",
    sparkline: [48, 49, 50, 49, 50, 49, 50, 49],
    holdings: 3000,
  },
  {
    name: "Sui",
    symbol: "SUI",
    price: 1.52,
    change24h: 3.21,
    change7d: 6.8,
    marketCap: "3.2B",
    volume24h: "480M",
    dominance: "0.1%",
    circulatingSupply: "2.1B SUI",
    sparkline: [30, 32, 34, 40, 45, 43, 48, 52],
    holdings: 248.73,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 182.45,
    change24h: 4.12,
    change7d: 9.34,
    marketCap: "85.3B",
    volume24h: "6.2B",
    dominance: "3.9%",
    circulatingSupply: "443M SOL",
    sparkline: [30, 35, 45, 60, 58, 62, 70, 68],
    holdings: 12.4,
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: 612.31,
    change24h: -0.85,
    change7d: 2.41,
    marketCap: "94.6B",
    volume24h: "1.9B",
    dominance: "4.1%",
    circulatingSupply: "155M BNB",
    sparkline: [50, 52, 51, 55, 57, 60, 58, 62],
    holdings: 3.1,
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    price: 42.17,
    change24h: 1.73,
    change7d: 5.66,
    marketCap: "16.2B",
    volume24h: "820M",
    dominance: "0.7%",
    circulatingSupply: "385M AVAX",
    sparkline: [25, 28, 27, 30, 34, 33, 36, 38],
    holdings: 45.7,
  },
  {
    name: "XRP",
    symbol: "XRP",
    price: 0.72,
    change24h: -0.94,
    change7d: 0.53,
    marketCap: "39.8B",
    volume24h: "2.3B",
    dominance: "1.7%",
    circulatingSupply: "55.4B XRP",
    sparkline: [35, 34, 36, 38, 37, 39, 40, 41],
    holdings: 920,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.18,
    change24h: 6.32,
    change7d: 11.9,
    marketCap: "26.5B",
    volume24h: "1.6B",
    dominance: "1.1%",
    circulatingSupply: "144B DOGE",
    sparkline: [20, 21, 23, 25, 28, 30, 32, 34],
    holdings: 5200,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.62,
    change24h: -1.2,
    change7d: 3.7,
    marketCap: "21.3B",
    volume24h: "740M",
    dominance: "0.9%",
    circulatingSupply: "34.3B ADA",
    sparkline: [28, 29, 31, 33, 32, 35, 37, 36],
    holdings: 1600,
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 7.84,
    change24h: 0.45,
    change7d: 2.19,
    marketCap: "10.2B",
    volume24h: "410M",
    dominance: "0.4%",
    circulatingSupply: "1.3B DOT",
    sparkline: [26, 27, 27, 29, 30, 31, 32, 33],
    holdings: 210,
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    price: 18.93,
    change24h: 2.75,
    change7d: 7.14,
    marketCap: "11.1B",
    volume24h: "680M",
    dominance: "0.5%",
    circulatingSupply: "587M LINK",
    sparkline: [24, 26, 28, 31, 33, 36, 35, 38],
    holdings: 84,
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    price: 9.42,
    change24h: -0.33,
    change7d: 4.02,
    marketCap: "5.5B",
    volume24h: "290M",
    dominance: "0.2%",
    circulatingSupply: "587M UNI",
    sparkline: [22, 23, 24, 26, 27, 29, 28, 30],
    holdings: 120,
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    price: 86.53,
    change24h: 1.12,
    change7d: 3.59,
    marketCap: "6.4B",
    volume24h: "320M",
    dominance: "0.3%",
    circulatingSupply: "74.8M LTC",
    sparkline: [27, 28, 30, 32, 34, 35, 36, 37],
    holdings: 9.6,
  },
  {
    name: "Pepe",
    symbol: "PEPE",
    price: 0.000012,
    change24h: 8.31,
    change7d: 19.4,
    marketCap: "4.1B",
    volume24h: "1.1B",
    dominance: "0.17%",
    circulatingSupply: "420T PEPE",
    sparkline: [18, 19, 21, 24, 26, 29, 31, 33],
    holdings: 12000000,
  },
  {
    name: "Toncoin",
    symbol: "TON",
    price: 6.12,
    change24h: 3.02,
    change7d: 5.88,
    marketCap: "21.7B",
    volume24h: "560M",
    dominance: "0.9%",
    circulatingSupply: "3.5B TON",
    sparkline: [29, 31, 33, 36, 38, 40, 41, 43],
    holdings: 57.4,
  },
];


const INITIAL_NFTS = [
  {
    id: 1,
    name: "Sui Voyager #001",
    description: "Genesis explorer of the Sui network.",
    prompt: "retro neon space voyager",
    imageUrl: "https://placehold.co/400x400/0f172a/9ca3af?text=Voyager+001",
    staked: true,
    apy: 18,
  },
  {
    id: 2,
    name: "Flow Orb #023",
    description: "Dynamic orb reacting to on-chain activity.",
    prompt: "minimal glowing orb",
    imageUrl: "https://placehold.co/400x400/020617/60a5fa?text=Orb+023",
    staked: false,
    apy: 14,
  },
];

const MOCK_HISTORY = [
  {
    id: "tx_01",
    type: "SWAP",
    asset: "SUI → USDC",
    amount: "100 SUI",
    status: "Success",
    time: "2025-12-05 21:14",
    viaAgent: true,
    promptSummary: "Swap 100 SUI to USDC at best price.",
  },
  {
    id: "tx_02",
    type: "MINT_NFT",
    asset: "Sui Voyager #001",
    amount: "1 NFT",
    status: "Success",
    time: "2025-12-04 18:03",
    viaAgent: true,
    promptSummary: "Create a neon space pilot NFT.",
  },
  {
    id: "tx_03",
    type: "STAKE",
    asset: "Sui Voyager #001",
    amount: "1 NFT",
    status: "Pending",
    time: "2025-12-03 11:52",
    viaAgent: false,
    promptSummary: "Stake NFT for yield.",
  },
];

// ---- APP ROOT ----

function App() {
  const [activePage, setActivePage] = useState(PAGES.AGENT);
  const [theme, setTheme] = useState("dark");

  const [wallet, setWallet] = useState({
    connected: false,
    address: "",
    suiBalance: 0,
  });
  const [coins] = useState(COINS);
  const [nfts, setNfts] = useState(INITIAL_NFTS);
  const [history] = useState(MOCK_HISTORY);

  const handleConnectWallet = () => {
    if (!wallet.connected) {
      setWallet({
        connected: true,
        address: "0x42a1...9fD3",
        suiBalance: 248.73,
      });
    } else {
      setWallet({ connected: false, address: "", suiBalance: 0 });
    }
  };

  const handleToggleStake = (nftId) => {
    setNfts((prev) =>
      prev.map((nft) =>
        nft.id === nftId ? { ...nft, staked: !nft.staked } : nft
      )
    );
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`app-root theme-${theme}`}>
      <Sidebar activePage={activePage} onChangePage={setActivePage} />

      <div className="app-main">
        <Topbar
          wallet={wallet}
          onConnectWallet={handleConnectWallet}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        <div className="app-content">
          {activePage === PAGES.AGENT && <AgentPage coins={coins} />}
          {activePage === PAGES.COINS && <CoinsPage coins={coins} />}
          {activePage === PAGES.STAKING && (
            <StakingPage nfts={nfts} onToggleStake={handleToggleStake} />
          )}
          {activePage === PAGES.HISTORY && <HistoryPage history={history} />}
          {activePage === PAGES.WALLET && (
            <WalletPage wallet={wallet} coins={coins} />
          )}
        </div>
      </div>
    </div>
  );
}

// ---- LAYOUT COMPONENTS ----

function Sidebar({ activePage, onChangePage }) {
  const items = [
    { key: PAGES.AGENT, label: "AI Agent" },
    { key: PAGES.COINS, label: "Coins" },
    { key: PAGES.STAKING, label: "Staking" },
    { key: PAGES.HISTORY, label: "History" },
    { key: PAGES.WALLET, label: "Wallet" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-mark">S</span>
        <div className="sidebar-logo-text">
          <span>Sui Agent</span>
          <small>AI Transaction Hub</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.key}
            className={
              "sidebar-nav-item" +
              (activePage === item.key ? " sidebar-nav-item--active" : "")
            }
            onClick={() => onChangePage(item.key)}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-badge">Sui • Dev / Test</span>
      </div>
    </aside>
  );
}

function Topbar({ wallet, onConnectWallet, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">AI-Powered Sui Console</h1>
        <p className="topbar-subtitle">
          Give natural language commands. Let your agent handle the on-chain
          work.
        </p>
      </div>
      <div className="topbar-right">
        <button className="btn btn-ghost theme-toggle" onClick={onToggleTheme}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        <div className="topbar-network">
          <span className="network-dot" />
          <span className="network-label">Sui Network</span>
        </div>
        <div className="topbar-wallet">
          {wallet.connected ? (
            <>
              <div className="wallet-info">
                <span className="wallet-address">{wallet.address}</span>
                <span className="wallet-balance">
                  {wallet.suiBalance.toFixed(2)} SUI
                </span>
              </div>
              <button className="btn btn-ghost" onClick={onConnectWallet}>
                Disconnect
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={onConnectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// ---- PAGE: AI AGENT ----

function AgentPage({ coins }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "agent",
      text: "Welcome! Tell me what you want to do on Sui. For example: “Swap 50 SUI to USDC and send it to my cold wallet.”",
      time: "now",
    },
  ]);
  const [input, setInput] = useState("");
    const chatRef = useRef(null);   // 👈 chat alanı referansı

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      // istersen smooth:
      // chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);   

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      from: "user",
      text: input.trim(),
      time: "now",
    };

    const mockAgentReply = {
      id: Date.now() + 1,
      from: "agent",
      text:
        "Got it. I will translate this into Sui transactions. (Here you will call your backend / AI agent API.)",
      time: "now",
    };

    setMessages((prev) => [...prev, userMessage, mockAgentReply]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="agent-page">
      <div className="agent-main-column">
        <div className="agent-chat-header">
          <h2 className="agent-title page-title--xl">AI Agent</h2>
          <p>
            Type a command and your agent will build Sui transactions from your
            prompt.
          </p>
        </div>

        <div className="agent-chat-area" ref={chatRef}>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                "chat-bubble chat-bubble--" +
                (msg.from === "user" ? "user" : "agent")
              }
            >
              <div className="chat-bubble-meta">
                <span className="chat-bubble-from">
                  {msg.from === "user" ? "You" : "Agent"}
                </span>
                <span className="chat-bubble-time">{msg.time}</span>
              </div>
              <p className="chat-bubble-text">{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="agent-input-bar">
          <textarea
            placeholder='Example: "Swap 100 SUI to USDC and send to 0xabc..."'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>

      <div className="agent-coins-column">
  <h3 className="coins-title">Coins</h3>
  <p className="coins-subtitle">Hover to see the mini chart.</p>

  {/* 👇 yeni scroll container */}
  <div className="agent-coins-scroll">
    <CoinList coins={coins} />
  </div>
</div>
    </div>
  );
}

// ---- COIN LIST + MINI CHART ----

function CoinMiniChart({ coin }) {
  const data = coin.sparkline || [30, 40, 35, 45, 50, 55, 60];

  return (
    <div className="coin-popup-inner">
      <div className="coin-popup-header">
        <span>
          {coin.name} ({coin.symbol})
        </span>
        <span>${coin.price.toLocaleString()}</span>
      </div>
      <div className="coin-popup-body">
        {data.map((v, i) => (
          <div
            key={i}
            className="coin-popup-bar"
            style={{ height: `${v}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function CoinList({ coins }) {
  return (
    <div className="coin-list coin-list--sidebar">
      {coins.map((coin) => (
        <div key={coin.symbol} className="coin-row">
          <div className="coin-popup">
            <CoinMiniChart coin={coin} />
          </div>

          <div className="coin-row-left">
            <div className="coin-avatar">{coin.symbol[0]}</div>
            <div>
              <div className="coin-name">{coin.name}</div>
              <div className="coin-price">
                ${coin.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- COIN DETAIL CHART ----

function CoinDetailChart({ coin }) {
  const data = coin.sparkline || [40, 55, 50, 70, 65, 80, 75, 90];

  return (
    <div className="coin-chart">
      <div className="coin-chart-header">
        <h3>
          {coin.name} <span className="coin-symbol">({coin.symbol})</span>
        </h3>
        <div className="coin-chart-price-line">
          <div className="coin-chart-price">
            ${coin.price.toLocaleString()}
          </div>
          <div
            className={
              "coin-change " +
              (coin.change24h >= 0 ? "coin-change--up" : "coin-change--down")
            }
          >
            {coin.change24h >= 0 ? "+" : ""}
            {coin.change24h.toFixed(2)}%
          </div>
        </div>
        <p className="coin-chart-caption">
          Mock 1D sparkline — later connect to real price history.
        </p>
      </div>

      <div className="coin-chart-body">
        {data.map((v, i) => (
          <div
            key={i}
            className="coin-chart-bar"
            style={{ height: `${v}%` }}
          />
        ))}
      </div>

      <div className="coin-chart-stats">
        <div className="coin-chart-stat">
          <span>Market cap</span>
          <strong>{coin.marketCap}</strong>
        </div>
        <div className="coin-chart-stat">
          <span>24h volume</span>
          <strong>{coin.volume24h}</strong>
        </div>
        <div className="coin-chart-stat">
          <span>Dominance</span>
          <strong>{coin.dominance}</strong>
        </div>
        <div className="coin-chart-stat">
          <span>Circulating supply</span>
          <strong>{coin.circulatingSupply}</strong>
        </div>
      </div>

      <div className="coin-chart-footer">
        <span>1D</span>
        <span>1W</span>
        <span>1M</span>
        <span>1Y</span>
      </div>
    </div>
  );
}

// ---- PAGE: COINS ----

function CoinsPage({ coins }) {
  const [selectedCoin, setSelectedCoin] = useState(coins[0] || null);

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title--xl">Coins</h2>
        <p>
          Market overview. Select a coin on the left to see its chart on the
          right.
        </p>
      </div>

      <div className="coins-page">
       <div className="page-card coins-table-card">
  <div className="coins-table-header">
    <div>
      <h3>All markets</h3>
      <p>Static demo data — later you will plug your API here.</p>
    </div>
    <div className="coins-table-controls">
      <input
        type="text"
        placeholder="Search coin..."
        className="coins-search"
      />
      <select className="coins-currency">
        <option>USD</option>
        <option>EUR</option>
      </select>
    </div>
  </div>

  {/* 👇 TABLOYU SARAN SCROLL ALANI */}
  <div className="coins-table-scroll">
    <table className="table coins-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Asset</th>
          <th>Price</th>
          <th>24h</th>
          <th>7d</th>
          <th>Holdings</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => {
          const isActive =
            selectedCoin && selectedCoin.symbol === coin.symbol;

          return (
            <tr
              key={coin.symbol}
              className={
                isActive ? "coins-row coins-row--active" : "coins-row"
              }
              onClick={() => setSelectedCoin(coin)}
            >
              <td>{index + 1}</td>
              <td>
                <div className="table-asset">
                  <div className="coin-avatar small">
                    {coin.symbol[0]}
                  </div>
                  <div className="coin-name">
                    {coin.name}{" "}
                    <span className="coin-symbol">· {coin.symbol}</span>
                  </div>
                </div>
              </td>
              <td>${coin.price.toLocaleString()}</td>
              <td>
                <span
                  className={
                    "coin-change " +
                    (coin.change24h >= 0
                      ? "coin-change--up"
                      : "coin-change--down")
                  }
                >
                  {coin.change24h >= 0 ? "+" : ""}
                  {coin.change24h.toFixed(2)}%
                </span>
              </td>
              <td>
                <span className="badge badge-outline">soon</span>
              </td>
              <td>
                {coin.holdings != null ? (
                  <span className="mono">
                    {coin.holdings} {coin.symbol}
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>


        <div className="page-card coins-chart-card">
          {selectedCoin ? (
            <CoinDetailChart coin={selectedCoin} />
          ) : (
            <div className="empty-text">
              Select a coin from the left to see its chart.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- PAGE: STAKING ----

function StakingPage({ nfts, onToggleStake }) {
  const stakeable = nfts.filter((n) => !n.staked);
  const staked = nfts.filter((n) => n.staked);

  return (
    <div className="page">
      <div className="page-header">
        <h2>NFT Staking</h2>
        <p>
          Stake / unstake NFTs via your AI agent or directly from this UI
          (frontend-only toggle here; real logic lives on-chain).
        </p>
      </div>

      <div className="staking-layout">
        <div className="page-card staking-column">
          <h3>Available to stake</h3>
          {stakeable.length === 0 && (
            <p className="empty-text">No NFTs available to stake.</p>
          )}
          <div className="staking-list">
            {stakeable.map((nft) => (
              <div key={nft.id} className="staking-row">
                <div>
                  <div className="staking-title">{nft.name}</div>
                  <div className="staking-sub">
                    {nft.apy}% APY • Prompt: {nft.prompt}
                  </div>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => onToggleStake(nft.id)}
                >
                  Stake
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="page-card staking-column">
          <h3>Currently staked</h3>
          {staked.length === 0 && (
            <p className="empty-text">No active NFT stakes yet.</p>
          )}
          <div className="staking-list">
            {staked.map((nft) => (
              <div key={nft.id} className="staking-row">
                <div>
                  <div className="staking-title">{nft.name}</div>
                  <div className="staking-sub">
                    Earning {nft.apy}% APY • Prompt: {nft.prompt}
                  </div>
                </div>
                <button
                  className="btn btn-ghost"
                  onClick={() => onToggleStake(nft.id)}
                >
                  Unstake
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- PAGE: HISTORY ----

function HistoryPage({ history }) {
  return (
    <div className="page">
      <div className="page-header">
        <h2>Transaction history</h2>
        <p>
          All activity executed by you or your AI agent. Read-only, pulled from
          Sui / explorer / your backend.
        </p>
      </div>

      {/* Coins / Staking’teki gibi, tüm dikeyi kullanan layout */}
      <div className="history-layout">
        <div className="page-card history-card">
          <table className="table">
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>Type</th>
                <th>Asset</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
                <th>Prompt</th>
              </tr>
            </thead>
            <tbody>
              {history.map((tx) => (
                <tr key={tx.id}>
                  <td className="mono">{tx.id}</td>
                  <td>{tx.type}</td>
                  <td>{tx.asset}</td>
                  <td>{tx.amount}</td>
                  <td>
                    <span
                      className={
                        "badge " +
                        (tx.status === "Success"
                          ? "badge-success"
                          : tx.status === "Pending"
                          ? "badge-warning"
                          : "badge-danger")
                      }
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="mono">{tx.time}</td>
                  <td className="history-prompt">
                    {tx.promptSummary}
                    {tx.viaAgent && (
                      <span className="badge badge-outline">
                        via AI Agent
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


// ---- PAGE: WALLET ----

function WalletPage({ wallet, coins }) {
  return (
    <div className="page">
      <div className="page-header">
        <h2>Wallet overview</h2>
        <p>
          Data here will come from Slash wallet / Sui wallet adapter. This is a
          read-only overview for your agent.
        </p>
      </div>
      <div className="wallet-layout">
        <div className="page-card wallet-card">
          <h3>Address</h3>
          {wallet.connected ? (
            <>
              <p className="mono wallet-address-big">{wallet.address}</p>
              <p className="wallet-balance-big">
                {wallet.suiBalance.toFixed(2)} SUI
              </p>
              <p className="helper-text">
                You can fetch this from Sui RPC / explorer or Slash wallet SDK.
              </p>
            </>
          ) : (
            <p className="empty-text">
              Wallet not connected. Use the button in the top-right.
            </p>
          )}
        </div>

        <div className="page-card wallet-card">
          <h3>Token balances (mock)</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Est. balance</th>
                <th>Value (approx)</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr key={coin.symbol}>
                  <td>
                    <div className="table-asset">
                      <div className="coin-avatar small">
                        {coin.symbol[0]}
                      </div>
                      <span>
                        {coin.name} ({coin.symbol})
                      </span>
                    </div>
                  </td>
                  <td>—</td>
                  <td>${coin.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="helper-text">
            Replace this table with real balances from Slash / Sui RPC.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
