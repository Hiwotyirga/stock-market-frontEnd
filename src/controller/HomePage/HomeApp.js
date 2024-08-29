import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';
import LatestNews from './LatestNews';
import SectorNews from './SectorNews';
import StockOverview from './StockOverview';
import StockDetails from './StockDetails';
import Watchlist from './Watchlist';
import StockAnalysis from './StockAnalysis';
import MarketOverview from './MarketOverview';
import LiveTrading from './LiveTrading';
import OrderHistory from './OrderHistory';

function  HomeApp () {
  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/market-news/latest" element={<LatestNews />} />
          <Route path="/market-news/sector" element={<SectorNews />} />
          <Route path="/stocks/overview" element={<StockOverview />} />
          <Route path="/stocks/details" element={<StockDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/analysis/stock" element={<StockAnalysis />} />
          <Route path="/analysis/market" element={<MarketOverview />} />
          <Route path="/trading/live" element={<LiveTrading />} />
          <Route path="/trading/history" element={<OrderHistory />} />
          <Route path="/" element={<LatestNews />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default HomeApp;
