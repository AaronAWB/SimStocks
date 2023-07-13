import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { CompanyMethods, UserContext, formatDollarAmount } from '@utils/index'
import type { QuoteData } from '@utils/index'




function TradeTable({ quote, selectedStock }: QuoteData) {

  const user = useContext(UserContext)
  const userId = user.id
  const symbol = selectedStock.symbol.toString()
  
  const [userCash, setUserCash] = useState<any>(0)
  const [portfolio, setPortfolio] = useState<any>([])
  const [sharesOwned, setSharesOwned] = useState<any>(0)

  useEffect(() => {
    const fetchData = async () => {
      await getUserPortfolio(userId);
      await getUserCash(userId);
    };
    fetchData();
  }, []);

  useEffect(() => {
    getSharesOwned(symbol)
  }, [portfolio])

  const getUserPortfolio = async (userId) => {
    const portfolioRes = await Axios.get(`/api/get_portfolio/${userId}`)
    setPortfolio([portfolioRes.data])
  }

  const getUserCash = async (userId) => {
    const res= await Axios.get(`/api/get_cash/${userId}`)
    const formattedCash = formatDollarAmount(res.data.cash)
    setUserCash(formattedCash)
  }

  const getSharesOwned = (symbol) => {
    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].symbol === symbol) {
        setSharesOwned(portfolio[i].shares)
      }
    }
  }

  return (
    <>
      <p>TRADE</p>
      <Table borderless size='sm'>
        <tbody>
          <tr>
            <td>Shares Owned:</td>
            <td className='text-start'>{sharesOwned}</td>
          </tr>
          <tr>
            <td>Cash Balance:</td>
            <td className='text-start'>$ {userCash}</td>
          </tr>
          <tr>
            <td>Buying Power:</td>
            <td className='text-start'>0</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TradeTable;