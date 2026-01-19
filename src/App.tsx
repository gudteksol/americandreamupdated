import { useState, useEffect } from 'react';

interface TokenData {
  priceUsd: string;
  volume24h: string;
  liquidity: string;
  marketCap: string;
  priceChange24h: string;
}

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  useEffect(() => {
    setIsVisible(true);

    const fetchTokenData = async () => {
      try {
        const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/51akgSdiNy3UvFqSu82wL2TNYPtXZJ1yWXGENp9obonk');
        const data = await response.json();

        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setTokenData({
            priceUsd: parseFloat(pair.priceUsd).toFixed(8),
            volume24h: parseFloat(pair.volume.h24).toLocaleString('en-US', { maximumFractionDigits: 0 }),
            liquidity: parseFloat(pair.liquidity.usd).toLocaleString('en-US', { maximumFractionDigits: 0 }),
            marketCap: pair.marketCap ? parseFloat(pair.marketCap).toLocaleString('en-US', { maximumFractionDigits: 0 }) : 'N/A',
            priceChange24h: pair.priceChange.h24
          });
        }
      } catch (error) {
        console.error('Error fetching token data:', error);
      }
    };

    fetchTokenData();
    const interval = setInterval(fetchTokenData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4e8d8] newspaper-texture">
      {/* Newspaper Header */}
      <header className="border-b-8 border-double border-[#2c1810] bg-[#f9f3e8] py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="body-text text-sm text-[#6b5d4f] mb-2 animate-fade-in-up">Est. 2026 • Vol. 1</p>
            <img
              src="/johnny_pfp_(9).png"
              alt="The American Dream"
              className="w-48 h-48 mx-auto mb-2 animate-coin-flip animate-shine rounded-full"
            />
            <p className="fancy-text text-lg italic text-[#8b735a] animate-fade-in-up">"All The Dreams Fit To Print"</p>
          </div>

          {/* Decorative border bottom */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-[#2c1810] to-[#2c1810] animate-slide-in-left"></div>
            <div className="body-text text-xs text-[#6b5d4f] px-4 animate-pulse">DAILY EDITION</div>
            <div className="flex-1 h-1 bg-gradient-to-r from-[#2c1810] via-[#2c1810] to-transparent animate-slide-in-right"></div>
          </div>
        </div>
      </header>

      {/* Token Data Ticker */}
      {tokenData && (
        <div className="bg-[#2c1810] border-y-4 border-[#1a1410] overflow-hidden">
          <div className="ticker-wrapper">
            <div className="ticker-content">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="ticker-items flex items-center whitespace-nowrap">
                  <div className="ticker-item">
                    <span className="headline-text text-[#ffd700]">PRICE:</span>
                    <span className="body-text text-[#f4e8d8] ml-2">${tokenData.priceUsd}</span>
                  </div>
                  <div className="ticker-separator">★</div>
                  <div className="ticker-item">
                    <span className="headline-text text-[#ffd700]">24H CHANGE:</span>
                    <span className={`body-text ml-2 ${parseFloat(tokenData.priceChange24h) >= 0 ? 'text-[#00ff00]' : 'text-[#ff4444]'}`}>
                      {parseFloat(tokenData.priceChange24h) >= 0 ? '▲' : '▼'} {Math.abs(parseFloat(tokenData.priceChange24h)).toFixed(2)}%
                    </span>
                  </div>
                  <div className="ticker-separator">★</div>
                  <div className="ticker-item">
                    <span className="headline-text text-[#ffd700]">MARKET CAP:</span>
                    <span className="body-text text-[#f4e8d8] ml-2">${tokenData.marketCap}</span>
                  </div>
                  <div className="ticker-separator">★</div>
                  <div className="ticker-item">
                    <span className="headline-text text-[#ffd700]">LIQUIDITY:</span>
                    <span className="body-text text-[#f4e8d8] ml-2">${tokenData.liquidity}</span>
                  </div>
                  <div className="ticker-separator">★</div>
                  <div className="ticker-item">
                    <span className="headline-text text-[#ffd700]">24H VOLUME:</span>
                    <span className="body-text text-[#f4e8d8] ml-2">${tokenData.volume24h}</span>
                  </div>
                  <div className="ticker-separator">★</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Headline Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? 'animate-rotate-in' : 'opacity-0'}`}
          >
            {/* Main Headline */}
            <div className="relative border-8 border-double border-[#2c1810] bg-[#f9f3e8] p-8 md:p-12 mb-8 shadow-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transition-all duration-500">
              {/* American Flag Background */}
              <img
                src="/image copy.png"
                alt="American Flag"
                className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
              />

              {/* Content */}
              <div className="relative z-10">
              <h2 className="headline-text text-7xl md:text-8xl font-black text-[#1a1410] mb-6 leading-tight animate-ink-spread hover:scale-110 transition-transform duration-300 cursor-default">
                $DREAM
              </h2>
              <div className="w-32 h-1 bg-[#2c1810] mx-auto mb-6 animate-slide-in-left"></div>
              <p className="fancy-text text-3xl md:text-4xl font-bold text-[#8b0000] mb-4 italic animate-slide-in-right">
                The American Dream Token
              </p>
              <p className="body-text text-xl text-[#4a3f35] leading-relaxed max-w-2xl mx-auto animate-fade-in-up">
                Revolutionary new currency promises prosperity for all patriots.
                Market experts stunned by unprecedented community support.
              </p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://dexscreener.com/solana/9f36ee8r4cfmmjrfaok93esf2c6chbgehnhe2t7gun6w"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-[#2c1810] hover:bg-[#4a3f35] text-[#f4e8d8] headline-text text-lg transition-all duration-300 transform hover:scale-110 hover:rotate-1 shadow-lg border-2 border-[#6b5d4f] animate-slide-in-left hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] animate-delay-400"
              >
                BUY $DREAM
              </a>
              <button
                onClick={() => document.getElementById('chart-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-[#fff8ec] hover:bg-[#f9f3e8] text-[#2c1810] headline-text text-lg transition-all duration-300 transform hover:scale-110 hover:-rotate-1 shadow-lg border-4 border-[#2c1810] hover:shadow-[0_0_30px_rgba(44,24,16,0.3)] animate-slide-in-right animate-delay-400"
              >
                VIEW CHART
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Report Section */}
      <section id="chart-section" className="relative py-12 px-4 border-y-4 border-[#2c1810] bg-[#fff8ec]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="headline-text text-4xl font-black text-[#2c1810] mb-2 animate-slide-in-left">MARKET REPORT</h2>
            <div className="w-48 h-1 bg-[#8b0000] mx-auto mb-4 animate-pulse"></div>
            <p className="body-text text-lg text-[#6b5d4f] italic animate-slide-in-right">Live trading data from the exchange floor</p>
          </div>

          <div className="bg-white border-8 border-double border-[#2c1810] overflow-hidden shadow-2xl animate-paper-unfold hover:shadow-[0_0_50px_rgba(139,0,0,0.2)] transition-all duration-500">
            <div className="bg-[#2c1810] text-[#f4e8d8] py-3 px-6 animate-slide-in-left">
              <p className="headline-text text-center text-sm tracking-widest">DEXSCREENER LIVE FEED</p>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '600px' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://dexscreener.com/solana/51akgSdiNy3UvFqSu82wL2TNYPtXZJ1yWXGENp9obonk?embed=1&theme=light&trades=0&info=0"
                title="DEXScreener Chart"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Museum Gallery Section */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-[#2a2520] to-[#1a1410]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="headline-text text-5xl font-black text-[#ffd700] mb-4 animate-rotate-in tracking-wider">
              THE $DREAM MUSEUM
            </h2>
            <div className="w-64 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto mb-4 animate-pulse"></div>
            <p className="fancy-text text-xl text-[#c4b5a0] italic animate-fade-in-up">
              Curated Collection of Historical Artifacts • Est. 2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Exhibit 1 */}
            <div className="group animate-fade-in-up">
              <div className="relative bg-gradient-to-br from-[#3d2f1f] to-[#2a1f15] p-8 border-4 border-[#8b7355] shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,215,0,0.3)]">
                {/* Museum Frame */}
                <div className="relative">
                  {/* Spotlight Effect */}
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-[#ffd700]/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Inner Frame */}
                  <div className="border-8 border-double border-[#c9a961] bg-[#1a1410] p-2 shadow-inner">
                    <div className="border-2 border-[#8b7355] p-1">
                      <img
                        src="/image copy copy.png"
                        alt="Exhibit A"
                        className="w-full h-auto aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Museum Plaque */}
                  <div className="mt-6 bg-gradient-to-b from-[#c9a961] to-[#8b7355] p-4 border-2 border-[#6b5d4f] shadow-lg">
                    <div className="bg-[#1a1410] p-4 border border-[#8b7355]">
                      <p className="fancy-text text-2xl text-[#ffd700] mb-2 tracking-wide">
                        "The Grind"
                      </p>
                      <p className="body-text text-sm text-[#c4b5a0] mb-1">
                        Medium: Historical Photograph
                      </p>
                      <p className="body-text text-xs text-[#8b7355] italic">
                        Circa 1908 • The Origins Collection
                      </p>
                      <div className="mt-3 pt-3 border-t border-[#8b7355]">
                        <p className="body-text text-xs text-[#c4b5a0] leading-relaxed">
                          Where it all began - the factory floor, the hustle, the dream.
                          Young visionary already planning his escape to financial freedom.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exhibit 2 */}
            <div className="group animate-fade-in-up animate-delay-200">
              <div className="relative bg-gradient-to-br from-[#3d2f1f] to-[#2a1f15] p-8 border-4 border-[#8b7355] shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,215,0,0.3)]">
                <div className="relative">
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-[#ffd700]/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="border-8 border-double border-[#c9a961] bg-[#1a1410] p-2 shadow-inner">
                    <div className="border-2 border-[#8b7355] p-1">
                      <img
                        src="/johnny_pfp_(9).png"
                        alt="Exhibit B"
                        className="w-full h-auto aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="mt-6 bg-gradient-to-b from-[#c9a961] to-[#8b7355] p-4 border-2 border-[#6b5d4f] shadow-lg">
                    <div className="bg-[#1a1410] p-4 border border-[#8b7355]">
                      <p className="fancy-text text-2xl text-[#ffd700] mb-2 tracking-wide">
                        "The Coin"
                      </p>
                      <p className="body-text text-sm text-[#c4b5a0] mb-1">
                        Medium: Commemorative Gold Token
                      </p>
                      <p className="body-text text-xs text-[#8b7355] italic">
                        Minted 2026 • The Currency Collection
                      </p>
                      <div className="mt-3 pt-3 border-t border-[#8b7355]">
                        <p className="body-text text-xs text-[#c4b5a0] leading-relaxed">
                          The $DREAM token itself - forged in digital gold.
                          Each coin represents a piece of the American Dream, now available to all.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exhibit 3 */}
            <div className="group animate-fade-in-up animate-delay-400">
              <div className="relative bg-gradient-to-br from-[#3d2f1f] to-[#2a1f15] p-8 border-4 border-[#8b7355] shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,215,0,0.3)]">
                <div className="relative">
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-[#ffd700]/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="border-8 border-double border-[#c9a961] bg-[#1a1410] p-2 shadow-inner">
                    <div className="border-2 border-[#8b7355] p-1">
                      <img
                        src="/johnny_pfp_(19) copy copy copy.png"
                        alt="Exhibit C"
                        className="w-full h-auto aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="mt-6 bg-gradient-to-b from-[#c9a961] to-[#8b7355] p-4 border-2 border-[#6b5d4f] shadow-lg">
                    <div className="bg-[#1a1410] p-4 border border-[#8b7355]">
                      <p className="fancy-text text-2xl text-[#ffd700] mb-2 tracking-wide">
                        "The Arrival"
                      </p>
                      <p className="body-text text-sm text-[#c4b5a0] mb-1">
                        Medium: AI-Generated Paradise
                      </p>
                      <p className="body-text text-xs text-[#8b7355] italic">
                        Circa 2026 • The Achievement Collection
                      </p>
                      <div className="mt-3 pt-3 border-t border-[#8b7355]">
                        <p className="body-text text-xs text-[#c4b5a0] leading-relaxed">
                          Living the dream - passive income, beautiful family, fireworks at dusk.
                          This is what happens when you hodl $DREAM.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exhibit 4 */}
            <div className="group animate-fade-in-up animate-delay-600">
              <div className="relative bg-gradient-to-br from-[#3d2f1f] to-[#2a1f15] p-8 border-4 border-[#8b7355] shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,215,0,0.3)]">
                <div className="relative">
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-[#ffd700]/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="border-8 border-double border-[#c9a961] bg-[#1a1410] p-2 shadow-inner">
                    <div className="border-2 border-[#8b7355] p-1">
                      <img
                        src="/johnny_pfp_(18) copy.png"
                        alt="Exhibit D"
                        className="w-full h-auto aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="mt-6 bg-gradient-to-b from-[#c9a961] to-[#8b7355] p-4 border-2 border-[#6b5d4f] shadow-lg">
                    <div className="bg-[#1a1410] p-4 border border-[#8b7355]">
                      <p className="fancy-text text-2xl text-[#ffd700] mb-2 tracking-wide">
                        "The Patriot"
                      </p>
                      <p className="body-text text-sm text-[#c4b5a0] mb-1">
                        Medium: Digital Meme Art
                      </p>
                      <p className="body-text text-xs text-[#8b7355] italic">
                        Circa 2026 • The Legendary Collection
                      </p>
                      <div className="mt-3 pt-3 border-t border-[#8b7355]">
                        <p className="body-text text-xs text-[#c4b5a0] leading-relaxed">
                          When you make it big with $DREAM - money raining, flag waving, living free.
                          This is peak American prosperity captured in meme form.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Museum Footer Notice */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-[#2a1f15] border-2 border-[#8b7355] px-8 py-4 animate-fade-in-up">
              <p className="body-text text-xs text-[#c4b5a0] uppercase tracking-widest">
                ★ Museum Hours: Open 24/7 • Admission: Free for Token Holders ★
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 bg-[#2c1810] text-[#f4e8d8] border-t-8 border-double border-[#1a1410]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="fancy-text text-lg italic text-[#c4b5a0] animate-fade-in-up hover:text-[#f4e8d8] transition-colors duration-300">$DREAM Token • Living the American Dream</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
