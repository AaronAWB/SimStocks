import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { 
  removeCommas, 
  formatDollarAmount, 
  calculatePercentChange, 
  roundDown 
} from '@/utils/index'

import '@styles/PortfolioSummary.css'

interface HoldingData {
  currentValue: number;
  changeValue: number;
  prevCloseValue: number;
  cost: number;
}

interface PortfolioSummaryProps {
  holdings: HoldingData[];
  userCash: number;
}

function PortfolioSummary({ holdings, userCash }: PortfolioSummaryProps) {

  const [stockValue, setStockValue] = useState<number>(0);
  
  const [todaysGainLoss, setTodaysGainLoss] = useState<string>('');
  const [todaysGainLossPercentage, setTodaysGainLossPercentage] = useState<number>(0);
  
  const [totalGainLoss, setTotalGainLoss] = useState<string>('');
  const [totalGainLossPercentage, setTotalGainLossPercentage] = useState<number>(0);

  const [todaysGainLossColor, setTodaysGainLossColor] = useState<string>('green');
  const [totalGainLossColor, setTotalGainLossColor] = useState<string>('green');

  const cash: number = removeCommas(userCash);
  const cashAsDollars: string = formatDollarAmount(userCash);
  const formattedStockValue = stockValue > 0 ? formatDollarAmount(stockValue) : 0;
  const totalValue = (holdings && holdings.length > 0) ? formatDollarAmount(stockValue + cash) : cashAsDollars;

  useEffect (() => {
    calculateStockValue();
  }, [holdings]);

  useEffect (() => {
    getTodaysGainLoss();
    getTodaysGainLossPercentage();
    getTotalGainLoss();
    getTotalGainLossPercentage();
  }, [stockValue])

  
  const calculateStockValue = () => {
    if (holdings && holdings.length > 0) {
      const totalStockValue = holdings.reduce((accumulator, holding) => {
        return accumulator + holding.currentValue;
      }, 0);
      setStockValue(totalStockValue);
    }
  }

  const calculateCost = () => {
    if (holdings && holdings.length > 0) {
      const totalCost = holdings.reduce((accumulator, holding) => {
        const cost = removeCommas(holding.cost);
        return accumulator + (isNaN(cost) ? 0 : cost); // Handles cases where cost is not a valid number to prevent NaN if caused by async issues
      }, 0);
      return totalCost;
    }
    return 0;
  };
 
  const getTodaysGainLoss = () => {
    if (holdings && holdings.length > 0) {
      const totalChange = holdings.reduce((accumulator, holding) => {
        return accumulator + holding.changeValue;
      }, 0)
      const changeInDollars = formatDollarAmount(totalChange);
      setTodaysGainLoss(changeInDollars);
    }
  }

  const getTodaysGainLossPercentage = () => {
    if (holdings && holdings.length > 0) {
      const totalPrevCloseValue = holdings.reduce((accumulator, holding) => {
        return accumulator + holding.prevCloseValue;
      }, 0);
      const percentageDifference = roundDown(calculatePercentChange(stockValue, totalPrevCloseValue));
      percentageDifference >= 0 ? setTodaysGainLossColor('green') : setTodaysGainLossColor('red');
      setTodaysGainLossPercentage(percentageDifference);
    }
  }

  const getTotalGainLoss = () => {
    if (holdings && holdings.length > 0 && stockValue !== 0) {
      const totalCost = calculateCost();
      const changeAmount = stockValue - totalCost;
      const changeInDollars = formatDollarAmount(changeAmount);
      changeAmount >= 0 ? setTotalGainLossColor('green') : setTotalGainLossColor('red');
      setTotalGainLoss(changeInDollars);
    }
  }

  const getTotalGainLossPercentage = () => {
    if (holdings && holdings.length > 0) {
      const totalCost = calculateCost();
      const percentage = roundDown(calculatePercentChange(stockValue, totalCost));
      setTotalGainLossPercentage(percentage);
    }
  }

  return(
    <Container className='shadow-sm summary-container'>
      <Row>
        <Col className='d-flex flex-column justify-content-center align-items-center' md={2}>
          <h5 className='summary-header'>Cash</h5>
          <h4 className='summary-content'>$ {cashAsDollars} </h4>
        </Col>
        <Col className='d-flex flex-column justify-content-center align-items-center' md={2}>
          <h5 className='summary-header'>Stock Value</h5>
          <h4 className='summary-content'>$ {formattedStockValue}</h4>
        </Col>
        <Col className='d-flex flex-column justify-content-center align-items-center' md={2}>
          <h5 className='summary-header'>Total Value</h5>
          <h4 className='summary-content'>$ {totalValue}</h4>
        </Col>
        <Col className='d-flex flex-column justify-content-center align-items-center' md={3}>
          <h5 className='summary-header'>Today's Change</h5>
          <h4 className='summary-content'>
            $ {todaysGainLoss + ' '}
            (
            <span className={todaysGainLossColor}>
              {todaysGainLossPercentage} %
            </span>
            )
          </h4>
        </Col>
        <Col className='d-flex flex-column justify-content-center align-items-center' md={3}>
          <h5 className='summary-header'>Total Gain/Loss</h5>
          <h4 className='summary-content'>
            $ {totalGainLoss + ' '}
            (
            <span className={totalGainLossColor}>
              {totalGainLossPercentage} %
            </span>
            )
          </h4>
        </Col>
      </Row>
    </Container>
  );
}

export default PortfolioSummary;