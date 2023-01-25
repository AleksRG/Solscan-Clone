import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [tokens, setTokens] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://public-api.solscan.io/token/list?sortBy=holder&direction=desc&limit=50&offset=0"
      )
      .then((response) => {
        setTokens(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return (
    <div className="bg-slate-900 flex justify-center items-center h-screen w-full">
      <div className="bg-gradient-to-tr from-slate-900/50 via-sky-900/50 to-gray-900/50 shadow-2xl shadow-violet-900 flex items-center w-[900px] ring-1 rounded-xl ring-white/10 flex-col">
        {/* Header */}
        <div className="text-violet-700 h-18 flex justify-start items-center">
          <div className="flex items-center h-8 w-44 space-x-1.5 px-3">
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
          </div>
          <div className="w-32">Holders</div>
          <div className="w-36">Price</div>
          <div className="w-36">Market Cap</div>
          <div className="w-16">24H</div>
          <div className="w-16">7D</div>
        </div>
        {/* Body */}
        <div className="overflow-auto w-full scrollbar-hide max-h-[500px] overflow-y-scroll items-center flex flex-col text-slate-200">
          {tokens.length != 0 &&
            tokens.map(
              (
                {
                  icon,
                  tokenSymbol,
                  holder,
                  priceUst,
                  marketCapFD,
                  coingeckoInfo,
                }: {
                  icon: string;
                  tokenSymbol: string;
                  holder: string;
                  priceUst: string;
                  marketCapFD: number;
                  coingeckoInfo: any;
                },
                id
              ) => (
                <div
                  key={id}
                  className="h-18 w-full px-2 flex items-center justify-center border-t-[0.5px] border-slate-500/30 hover:scale-110 duration-200"
                >
                  <div className="w-44 flex items-center space-x-2">
                    {" "}
                    <img src={icon} className="h-9 w-9 rounded-full p-1" />
                    <a className="text-sky-500 font-semibold">{tokenSymbol}</a>
                  </div>
                  <div className="w-32">{holder}</div>
                  <div className="w-36">
                    {priceUst ? (
                      <a>$ {priceUst}</a>
                    ) : (
                      <a className="text-rose-600">- - -</a>
                    )}
                  </div>
                  <div className="w-36">
                    {marketCapFD ? (
                      <a>{marketCapFD.toFixed(2)}</a>
                    ) : (
                      <a className="text-rose-600">- - -</a>
                    )}
                  </div>
                  <div
                    className={`w-16 ${
                      coingeckoInfo?.marketData?.priceChangePercentage24h >= 0
                        ? "text-lime-500"
                        : "text-rose-600"
                    }`}
                  >
                    {coingeckoInfo?.marketData?.priceChangePercentage24h.toFixed(
                      2
                    )}
                    {coingeckoInfo?.marketData?.priceChangePercentage24h ? (
                      <a>%</a>
                    ) : (
                      <a className="text-rose-600">- - -</a>
                    )}
                  </div>
                  <div
                    className={`w-16 ${
                      coingeckoInfo?.marketData?.priceChangePercentage7d >= 0
                        ? "text-lime-500"
                        : "text-rose-600"
                    }`}
                  >
                    {coingeckoInfo?.marketData?.priceChangePercentage7d.toFixed(
                      2
                    )}
                    {coingeckoInfo?.marketData?.priceChangePercentage7d ? (
                      <a>%</a>
                    ) : (
                      <a className="text-rose-600">- - -</a>
                    )}
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}
