export default function BasicTest() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#0070f3' }}>🎉 ¡La aplicación funciona!</h1>
      <p>Si puedes ver esto, Next.js está funcionando correctamente.</p>
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '20px', 
        borderRadius: '8px', 
        marginTop: '20px' 
      }}>
        <h2>Test básico completado</h2>
        <p>Fecha: {new Date().toLocaleDateString()}</p>
        <p>Hora: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
