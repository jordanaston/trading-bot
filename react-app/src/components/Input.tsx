import { useState, useEffect } from 'react';
import axios from 'axios';

function Input() {
  const [usdt, setUsdt] = useState('');
  const [conversionRate, setConversionRate] = useState<number | null>(null);
  const btc = conversionRate ? parseFloat(usdt) / conversionRate : 0;

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        setConversionRate(response.data.bitcoin.usd);
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
      }
    };

    fetchConversionRate();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <input
        type="number"
        value={usdt}
        onChange={(e) => setUsdt(e.target.value)}
        placeholder="Enter USDT"
        className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {usdt && (
        <p className="mt-8 text-lg font-bold text-blue-500 bg-gray-800 p-2 rounded-lg shadow-lg">
          BTC: {btc.toFixed(8)}
        </p>
      )}
    </div>
  );
}

export default Input;