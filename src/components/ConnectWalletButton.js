// ConnectWalletButton.js - Botón para conectar con MetaMask
import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

const ConnectWalletButton = ({ onConnect, className = '' }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Verificar si MetaMask está instalado
  useEffect(() => {
    const checkMetaMask = async () => {
      const provider = await detectEthereumProvider();
      setIsMetaMaskInstalled(!!provider);
      
      // Verificar si ya hay una cuenta conectada
      if (provider && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            if (onConnect) {
              onConnect(accounts[0]);
            }
          }
        } catch (error) {
          console.error('Error checking existing accounts:', error);
        }
      }
    };

    checkMetaMask();
  }, [onConnect]);

  // Conectar con MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      // Solicitar conexión a MetaMask
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        setAccount(walletAddress);
        
        // Llamar al callback con la dirección de la wallet
        if (onConnect) {
          onConnect(walletAddress);
        }

        console.log('🔗 Wallet connected:', walletAddress);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      
      if (error.code === 4001) {
        setError('Connection rejected by user');
      } else if (error.code === -32002) {
        setError('Connection request already pending');
      } else {
        setError('Failed to connect wallet. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Desconectar wallet (solo localmente)
  const disconnectWallet = () => {
    setAccount(null);
    if (onConnect) {
      onConnect(null);
    }
  };

  // Instalar MetaMask
  const installMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  // Si no está instalado MetaMask
  if (!isMetaMaskInstalled) {
    return (
      <div className={`w-full ${className}`}>
        <button
          onClick={installMetaMask}
          className="w-full flex items-center justify-center px-6 py-3 border border-red-300 rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
        >
          <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Install MetaMask
        </button>
        <p className="text-sm text-gray-500 mt-2 text-center">
          MetaMask is required to connect your wallet
        </p>
      </div>
    );
  }

  // Si ya está conectado
  if (account) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-green-800">Wallet Connected</p>
              <p className="text-xs text-green-600">
                {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="text-xs text-green-700 hover:text-green-900 underline"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  // Botón para conectar
  return (
    <div className={`w-full ${className}`}>
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-white font-medium transition-all duration-200 ${
          isConnecting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105'
        }`}
      >
        {isConnecting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Connecting...
          </>
        ) : (
          <>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
            </svg>
            Connect Wallet
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          Connect your MetaMask wallet to access WorkZen
        </p>
      </div>
    </div>
  );
};

export default ConnectWalletButton;
