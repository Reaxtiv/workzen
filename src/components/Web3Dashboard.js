// Web3Dashboard.js - Dashboard principal con wallet y sistema de puntos
import React, { useState, useEffect } from 'react';
import { useProductivityMetrics } from '../hooks/useProductivityMetrics';
import PointsSystem from '../services/PointsSystem';
import BlockchainReporter from '../services/BlockchainReporter';

const Web3Dashboard = ({ className = '' }) => {
  const { metrics } = useProductivityMetrics();
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [pointsSystem] = useState(() => new PointsSystem());
  const [blockchainReporter] = useState(() => new BlockchainReporter());
  const [lastReportSent, setLastReportSent] = useState(null);

  // 🔗 Conectar wallet al cargar el componente
  useEffect(() => {
    checkWalletConnection();
  }, []);

  // 📊 Actualizar datos del empleado cuando cambia la wallet o métricas
  useEffect(() => {
    if (walletAddress && metrics) {
      updateEmployeeData();
    }
  }, [walletAddress, metrics]);

  // 🔍 Verificar si hay wallet conectada
  const checkWalletConnection = async () => {
    try {
      const isConnected = await blockchainReporter.isConnected();
      if (isConnected) {
        const address = await blockchainReporter.getCurrentAddress();
        const balance = await blockchainReporter.getWalletBalance();
        setWalletAddress(address);
        setWalletBalance(balance);
        loadEmployeeData(address);
      }
    } catch (error) {
      console.log('No wallet connected initially');
    }
  };

  // 🔗 Conectar MetaMask
  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      const address = await blockchainReporter.connectWallet();
      const balance = await blockchainReporter.getWalletBalance();
      
      setWalletAddress(address);
      setWalletBalance(balance);
      
      // Cargar datos del empleado
      loadEmployeeData(address);
      
      console.log('✅ Wallet connected successfully:', address);
    } catch (error) {
      console.error('❌ Error connecting wallet:', error);
      alert('Error connecting wallet. Please make sure MetaMask is installed.');
    } finally {
      setIsConnecting(false);
    }
  };

  // 📖 Cargar datos del empleado
  const loadEmployeeData = (address) => {
    const data = pointsSystem.getEmployeeData(address);
    setEmployeeData(data);
  };

  // 🔄 Actualizar datos del empleado con métricas actuales
  const updateEmployeeData = () => {
    if (!walletAddress || !metrics) return;

    const dailyPoints = pointsSystem.calculateDailyPoints(metrics);
    const updatedData = pointsSystem.saveEmployeePoints(walletAddress, dailyPoints, metrics);
    setEmployeeData(updatedData);
  };

  // 📤 Enviar reporte manual a blockchain
  const sendReportToBlockchain = async () => {
    if (!walletAddress || !metrics) {
      alert('Wallet not connected or no metrics available');
      return;
    }

    try {
      console.log('📤 Sending report to blockchain...');
      const result = await blockchainReporter.submitDailyReport(walletAddress, metrics);
      
      if (result) {
        setLastReportSent(result);
        alert(`✅ Report sent successfully!\nTransaction: ${result.transactionHash}`);
      } else {
        alert('ℹ️ Report already sent for today');
      }
    } catch (error) {
      console.error('❌ Error sending report:', error);
      alert('Error sending report. Check console for details.');
    }
  };

  // 💰 Canjear puntos
  const redeemBenefit = (benefit) => {
    if (!walletAddress) return;

    try {
      const updatedData = pointsSystem.redeemPoints(walletAddress, benefit.cost, benefit.name);
      setEmployeeData(updatedData);
      alert(`🎉 ${benefit.name} redeemed successfully!`);
    } catch (error) {
      alert(error.message);
    }
  };

  // 🏆 Verificar logros
  const checkAchievements = () => {
    if (!walletAddress) return;

    const newAchievements = pointsSystem.checkAchievements(walletAddress);
    if (newAchievements.length > 0) {
      alert(`🏆 New achievements unlocked: ${newAchievements.join(', ')}`);
      loadEmployeeData(walletAddress);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Wallet Connection */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🔗 Web3 Connection</h3>
          {walletAddress && (
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </div>

        {!walletAddress ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Connect your wallet to enable blockchain features and earn points
            </p>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isConnecting ? '🔄 Connecting...' : '🦊 Connect MetaMask'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Wallet Address:</span>
              <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                {formatAddress(walletAddress)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Balance:</span>
              <span className="text-sm font-semibold">
                {walletBalance ? `${parseFloat(walletBalance).toFixed(4)} ETH` : 'Loading...'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Points System */}
      {walletAddress && employeeData && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">🎯 Points System</h3>
            <button
              onClick={checkAchievements}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Check Achievements
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{employeeData.totalPoints}</div>
              <div className="text-xs text-gray-500">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{employeeData.totalDays}</div>
              <div className="text-xs text-gray-500">Days Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{employeeData.averageProductivity}%</div>
              <div className="text-xs text-gray-500">Avg Productivity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{employeeData.achievements.length}</div>
              <div className="text-xs text-gray-500">Achievements</div>
            </div>
          </div>

          {/* Today's Points */}
          {metrics && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Today's Points Calculation</h4>
              <div className="text-sm text-blue-800">
                <div>Productivity Score: {metrics.productivity}% → {metrics.productivity >= 90 ? 50 : metrics.productivity >= 80 ? 40 : 30} points</div>
                <div>Web Productivity: {metrics.webProductivity || 100}% → {(metrics.webProductivity || 100) >= 85 ? 20 : 15} points</div>
                <div>Focus Time: {metrics.focusTime.toFixed(1)}h → {metrics.focusTime >= 7 ? 20 : 15} points</div>
                <div className="font-semibold mt-2">
                  Estimated Daily Points: {pointsSystem.calculateDailyPoints(metrics)}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Blockchain Reporting */}
      {walletAddress && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">📊 Blockchain Reporting</h3>
            <span className="text-xs text-gray-500">Auto-send at midnight</span>
          </div>

          <div className="space-y-4">
            <button
              onClick={sendReportToBlockchain}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              📤 Send Daily Report to Blockchain
            </button>

            {lastReportSent && (
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-800">
                  <div className="font-semibold">✅ Last Report Sent:</div>
                  <div>Transaction: {formatAddress(lastReportSent.transactionHash)}</div>
                  <div>Block: #{lastReportSent.blockNumber}</div>
                  <div>Gas Used: {lastReportSent.gasUsed}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Benefits Store */}
      {walletAddress && employeeData && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🏪 Benefits Store</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pointsSystem.getBenefitsCatalog().map((benefit) => (
              <div key={benefit.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{benefit.icon}</span>
                    <span className="font-medium">{benefit.name}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{benefit.cost} zens</span>
                </div>
                <button
                  onClick={() => redeemBenefit(benefit)}
                  disabled={employeeData.totalPoints < benefit.cost}
                  className="w-full py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {employeeData.totalPoints >= benefit.cost ? 'Redeem' : 'Insufficient Points'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Web3Dashboard;
