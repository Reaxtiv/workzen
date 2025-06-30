// WalletConnectButton.js - Botón para conectar con MetaMask
import React, { useState, useEffect } from 'react';

const WalletConnectButton = ({ onWalletConnected, className = '' }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  // Verificar si MetaMask está instalado
  useEffect(() => {
    const checkMetaMask = () => {
      if (typeof window !== 'undefined') {
        setIsMetaMaskInstalled(typeof window.ethereum !== 'undefined');
      }
    };
    checkMetaMask();
  }, []);

  // Conectar con MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      setError('MetaMask is not installed. Please install MetaMask extension.');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      // Solicitar acceso a las cuentas
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        
        // Simular datos del empleado basados en la wallet
        const employeeData = {
          walletAddress: address,
          name: `Employee ${address.slice(-4)}`, // Últimos 4 caracteres
          email: `${address.slice(2, 8)}@company.com`,
          position: 'Team Member',
          role: 'employee'
        };

        // Llamar al callback con los datos del empleado
        if (onWalletConnected) {
          onWalletConnected(employeeData);
        }

        console.log('🔗 Wallet connected:', address);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      if (error.code === 4001) {
        setError('Connection rejected by user');
      } else {
        setError('Failed to connect wallet. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Desconectar wallet (limpiar estado local)
  const disconnectWallet = () => {
    setWalletAddress('');
    setError('');
    if (onWalletConnected) {
      onWalletConnected(null);
    }
  };

  // Si ya está conectada la wallet
  if (walletAddress) {
    return (
      <div className={`flex flex-col items-center space-y-3 ${className}`}>
        <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="text-sm">
            <p className="font-semibold text-green-700">Wallet Connected</p>
            <p className="text-green-600 font-mono text-xs">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Botón principal de conexión */}
      <button
        onClick={connectWallet}
        disabled={isConnecting || !isMetaMaskInstalled}
        className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-lg ${
          isConnecting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : isMetaMaskInstalled
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isConnecting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-orange-500">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span>Connect with MetaMask</span>
          </>
        )}
      </button>

      {/* Mensajes de error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Mensaje si MetaMask no está instalado */}
      {!isMetaMaskInstalled && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md">
          <p className="text-sm text-yellow-700 mb-2">
            <strong>MetaMask Required</strong>
          </p>
          <p className="text-xs text-yellow-600 mb-3">
            You need MetaMask to login with your wallet. It's a secure way to manage your blockchain identity.
          </p>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-lg text-sm text-yellow-700 hover:bg-yellow-200 transition-colors"
          >
            <span>Install MetaMask</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}

      {/* Información adicional */}
      <div className="text-center text-xs text-gray-500 max-w-sm">
        <p>
          🔒 Your wallet address will be used as your unique employee ID. 
          No passwords needed - blockchain provides the security.
        </p>
      </div>
    </div>
  );
};

export default WalletConnectButton;
